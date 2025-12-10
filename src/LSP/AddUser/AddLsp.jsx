import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../componts/LspNavbar";
import Swal from "sweetalert2";
import axios from "axios";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Autocomplete,
  Chip,
} from "@mui/material";

import {
  Person,
  CalendarMonth,
  Numbers,
  Favorite,
  LocationOn,
  Phone,
  Email,
  Work,
  LocationCity,
  Translate,
  AutoAwesome,
  UploadFile,
} from "@mui/icons-material";

// Match this to your backend server
const API_BASE = "http://localhost:2424/api";

export default function AddLsp() {
  const navigate = useNavigate();
  const location = useLocation();
  const taskData = location.state?.task || null; // edit data if provided

  // refs for file inputs
  const idProofRef = useRef();
  const uploadedDocRef = useRef();

  // form state mapped to backend model
  const [formData, setFormData] = useState({
    empId: "",
    fullName: "",
    gender: "",
    dob: "",
    age: "",
    maritalStatus: "",
    address: "",
    phoneNumber: "",
    email: "",
    categoryOfService: "",
    areaOfOperation: "",
    yearOfExperience: "",
    languagesSpoken: [], // array
    emergencyPhoneNo: "",
  });

  // store currently selected File objects for upload
  const [files, setFiles] = useState({ idProof: [], uploadedDocument: [] });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Prefill if editing
  useEffect(() => {
    if (taskData) {
      // Note: backend returns idProof and uploadedDocument as arrays of filenames
      setFormData((prev) => ({
        ...prev,
        empId: taskData.empId || "",
        fullName: taskData.fullName || "",
        gender: taskData.gender || "",
        dob: taskData.dob ? taskData.dob.split("T")[0] : "",
        age: taskData.age || "",
        maritalStatus: taskData.maritalStatus || "",
        address: taskData.address || "",
        phoneNumber: taskData.phoneNumber || "",
        email: taskData.email || "",
        categoryOfService: taskData.categoryOfService || "",
        areaOfOperation: taskData.areaOfOperation || "",
        yearOfExperience: taskData.yearOfExperience || "",
        languagesSpoken: taskData.languagesSpoken || [],
        emergencyPhoneNo: taskData.emergencyPhoneNo || "",
      }));
    }
  }, [taskData]);

  

  // calculate age from dob automatically
  useEffect(() => {
    if (!formData.dob) return;
    const dob = new Date(formData.dob);
    const diff = Date.now() - dob.getTime();
    const ageDt = new Date(diff);
    const age = Math.abs(ageDt.getUTCFullYear() - 1970);
    if (!isNaN(age)) setFormData((p) => ({ ...p, age }));
  }, [formData.dob]);

  const handleChange = (key, value) => {
    // restrict phone fields to digits only and max 10
    if ((key === "phoneNumber" || key === "emergencyPhoneNo") && value !== "") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    // yearOfExperience restrict to digits
    if (key === "yearOfExperience" && value !== "") {
      if (!/^\d{0,2}$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFiles = (key, fileList) => {
    if (!fileList) return;
    const arr = Array.from(fileList);
    setFiles((prev) => ({ ...prev, [key]: arr }));
  };

  const validate = () => {
    const e = {};
    if (!formData.empId) e.empId = "Required";
    if (!formData.fullName) e.fullName = "Required";
    if (!formData.gender) e.gender = "Required";
    if (!formData.dob) e.dob = "Required";
    if (!formData.age) e.age = "Required";
    if (!formData.address) e.address = "Required";
    if (!formData.phoneNumber) e.phoneNumber = "Required";
    if (formData.phoneNumber && formData.phoneNumber.length !== 10) e.phoneNumber = "10 digits";
    if (!formData.email) e.email = "Required";
    if (!formData.categoryOfService) e.categoryOfService = "Required";
    if (!formData.areaOfOperation) e.areaOfOperation = "Required";
    if (!formData.yearOfExperience && formData.yearOfExperience !== 0) e.yearOfExperience = "Required";
    if (!formData.emergencyPhoneNo) e.emergencyPhoneNo = "Required";
    if (formData.emergencyPhoneNo && formData.emergencyPhoneNo.length !== 10) e.emergencyPhoneNo = "10 digits";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildFormData = () => {
    const fd = new FormData();

    // append simple fields
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "languagesSpoken") {
        // languages as array -> append each
        (v || []).forEach((lang) => fd.append("languagesSpoken", lang));
      } else {
        if (v !== undefined && v !== null) fd.append(k, v);
      }
    });

    // append files (multiple)
    files.idProof.forEach((f) => fd.append("idProof", f));
    files.uploadedDocument.forEach((f) => fd.append("uploadedDocument", f));

    return fd;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = buildFormData();

      if (taskData && taskData._id) {
        // Update
        await axios.put(`${API_BASE}/update-technician/${taskData._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.fire({ title: "Updated", text: "Technician updated", icon: "success", timer: 1500, showConfirmButton: false });
      } else {
        // Create
        await axios.post(`${API_BASE}/create-technician`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.fire({ title: "Added", text: "Technician added", icon: "success", timer: 1500, showConfirmButton: false });
      }

      navigate("/lsp-manageLSP");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // UI helpers
  const textSx = {
    "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: "8px",
    height: "40px",            // SAME HEIGHT FOR ALL
    "& input": { padding: "10px 12px" },
  },
  "& .MuiSelect-select": {
    padding: "10px 12px",      // SAME FOR SELECT
  },
  "& .MuiAutocomplete-inputRoot": {
    padding: "0px !important", // Fix Autocomplete size
    height: "44px !important",
  },
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, ml: { xs: 0, md: "260px" } }}>
          <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>{taskData ? "Edit Technician" : "Add Technician"}</Typography>

          <Card sx={{ bgcolor: "#F7FAFA", mb: 2 }}>
            <CardContent>
              <Typography sx={{ fontWeight: 600, mb: 2 }}>Personal Details</Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Employee ID</Typography>
                  <TextField fullWidth size="small" value={formData.empId} onChange={(e) => handleChange("empId", e.target.value)} error={!!errors.empId} helperText={errors.empId} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><Person sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Full Name</Typography>
                  <TextField fullWidth size="small" value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} error={!!errors.fullName} helperText={errors.fullName} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><Person sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Gender</Typography>
                 <Grid item xs={12} sm={6} md={6}>
  <TextField
    select
    fullWidth
    size="small"
    value={formData.gender}
    onChange={(e) => handleChange("gender", e.target.value)}
    error={!!errors.gender}
    helperText={errors.gender}
    sx={{ ...textSx, width: "268px" }}  // manually increased
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Person sx={{ color: "#029898" }} />
        </InputAdornment>
      )
    }}
  >
    <MenuItem value="Male">Male</MenuItem>
    <MenuItem value="Female">Female</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
  </TextField>
</Grid>

                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Date of Birth</Typography>
                  <TextField fullWidth type="date" size="small" value={formData.dob} onChange={(e) => handleChange("dob", e.target.value)} error={!!errors.dob} helperText={errors.dob} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><CalendarMonth sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Age</Typography>
                  <TextField fullWidth size="small" value={formData.age} onChange={(e) => handleChange("age", e.target.value)} error={!!errors.age} helperText={errors.age} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><Numbers sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Marital Status</Typography>
                  <TextField select fullWidth size="small" value={formData.maritalStatus} onChange={(e) => handleChange("maritalStatus", e.target.value)} sx={{ ...textSx, width: "268px" }}  InputProps={{ startAdornment: (<InputAdornment position="start"><Favorite sx={{ color: "#029898" }} /></InputAdornment>) }}>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Address</Typography>
                  <TextField fullWidth size="small" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} error={!!errors.address} helperText={errors.address} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOn sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Mobile Number</Typography>
                  <TextField fullWidth size="small" value={formData.phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} error={!!errors.phoneNumber} helperText={errors.phoneNumber} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><Phone sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Email</Typography>
                  <TextField fullWidth size="small" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} error={!!errors.email} helperText={errors.email} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><Email sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Category of Service</Typography>
                  <TextField fullWidth size="small" value={formData.categoryOfService} onChange={(e) => handleChange("categoryOfService", e.target.value)} error={!!errors.categoryOfService} helperText={errors.categoryOfService} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><Work sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Area / City of Operation</Typography>
                  <TextField fullWidth size="small" value={formData.areaOfOperation} onChange={(e) => handleChange("areaOfOperation", e.target.value)} error={!!errors.areaOfOperation} helperText={errors.areaOfOperation} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><LocationCity sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Year of Experience</Typography>
                  <TextField fullWidth size="small" value={formData.yearOfExperience} onChange={(e) => handleChange("yearOfExperience", e.target.value)} error={!!errors.yearOfExperience} helperText={errors.yearOfExperience} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><AutoAwesome sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Languages Spoken</Typography>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={formData.languagesSpoken}
                    onChange={(e, v) => handleChange("languagesSpoken", v)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Add languages" size="small"sx={{ ...textSx, width: "268px" }}  InputProps={{ ...params.InputProps, startAdornment: (<InputAdornment position="start"><Translate sx={{ color: "#029898" }} /></InputAdornment>) }} />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Emergency Phone No</Typography>
                  <TextField fullWidth size="small" value={formData.emergencyPhoneNo} onChange={(e) => handleChange("emergencyPhoneNo", e.target.value)} error={!!errors.emergencyPhoneNo} helperText={errors.emergencyPhoneNo} sx={textSx} InputProps={{ startAdornment: (<InputAdornment position="start"><Phone sx={{ color: "#029898" }} /></InputAdornment>) }} />
                </Grid>

              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: "#F7FAFA", mb: 2 }}>
            <CardContent>
              <Typography sx={{ fontWeight: 600, mb: 2 }}>Documents</Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>ID Proof (you may select multiple)</Typography>
                  <input ref={idProofRef} type="file" multiple accept="image/*,.pdf" style={{ display: "none" }} onChange={(e) => handleFiles("idProof", e.target.files)} />
                  <Box onClick={() => idProofRef.current.click()} sx={{ height: 44, bgcolor: "#fff", borderRadius: 1, display: "flex", alignItems: "center", px: 1.5, cursor: "pointer", border: "1px solid #d1d5db" }}>
                    <UploadFile sx={{ mr: 1, color: "#029898" }} />
                    <span style={{ fontSize: 13 }}>{files.idProof.length ? `${files.idProof.length} file(s) selected` : (taskData?.idProof?.length ? `${taskData.idProof.length} existing` : "Choose Files")}</span>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>Uploaded Documents (you may select multiple)</Typography>
                  <input ref={uploadedDocRef} type="file" multiple accept="image/*,.pdf" style={{ display: "none" }} onChange={(e) => handleFiles("uploadedDocument", e.target.files)} />
                  <Box onClick={() => uploadedDocRef.current.click()} sx={{ height: 44, bgcolor: "#fff", borderRadius: 1, display: "flex", alignItems: "center", px: 1.5, cursor: "pointer", border: "1px solid #d1d5db" }}>
                    <UploadFile sx={{ mr: 1, color: "#029898" }} />
                    <span style={{ fontSize: 13 }}>{files.uploadedDocument.length ? `${files.uploadedDocument.length} file(s) selected` : (taskData?.uploadedDocument?.length ? `${taskData.uploadedDocument.length} existing` : "Choose Files")}</span>
                  </Box>
                </Grid>

              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            <Button variant="outlined" sx={{ width: 140, textTransform: "none", borderRadius: 1 }} onClick={() => {
              setFormData({ empId: "", fullName: "", gender: "", dob: "", age: "", maritalStatus: "", address: "", phoneNumber: "", email: "", categoryOfService: "", areaOfOperation: "", yearOfExperience: "", languagesSpoken: [], emergencyPhoneNo: "" });
              setFiles({ idProof: [], uploadedDocument: [] });
            }}>Clear</Button>

            <Button disabled={submitting} variant="contained" sx={{ width: 140, textTransform: "none", bgcolor: "#029898", '&:hover': { bgcolor: '#027d7d' } }} onClick={handleSubmit}>{taskData ? 'Update' : 'Add'}</Button>
          </Box>

        </Box>
      </Box>
    </>
  );
}
