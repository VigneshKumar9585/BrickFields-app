// AddLsp.jsx
import React, { useState, useEffect, useRef } from "react";
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

const API_BASE = "http://localhost:2444/api";

function AddLsp() {
  const navigate = useNavigate();
  const location = useLocation();

  const taskData = location.state?.task || null; // if editing, data comes here

  // ------------------- Form Data -------------------
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    phone: "",
    email: "",
    pointOfContact: "",
    pointOfContactMobile: "",
    district: "",
    city: "",
    address: "",
    serviceableCities: "",
    adhaarCard: "",
    gstDocument: "",
    companyDocument: "",
  });

  const [errors, setErrors] = useState({});

  // ------------------- Prefill Form if Editing -------------------
  useEffect(() => {
    if (taskData) {
      setFormData({
        companyName: taskData.companyName || "",
        businessType: taskData.businessType || "",
        phone: taskData.phone || "",
        email: taskData.email || "",
        pointOfContact: taskData.pointOfContact || "",
        pointOfContactMobile: taskData.pointOfContactMobile || "",
        district: taskData.district || "",
        city: taskData.city || "",
        address: taskData.address || "",
        serviceableCities: taskData.serviceableCities || "",
        adhaarCard: taskData.adhaarCard || "",
        gstDocument: taskData.gstDocument || "",
        companyDocument: taskData.companyDocument || "",
      });
    }
  }, [taskData]);

  // ------------------- Form Change -------------------
  const handleChange = (field, value) => {
    if (field === "phone" || field === "pointOfContactMobile") {
      if (!/^\d{0,10}$/.test(value)) return; // allow max 10 digits
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ------------------- File Upload -------------------
  const adhaarFileRef = useRef(null);
  const gstFileRef = useRef(null);
  const companyFileRef = useRef(null);

  const handleFileSelect = (field, file) => {
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file.name }));
    }
  };

  // ------------------- Submit Handler -------------------
  const handleSubmit = async () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "Required field";
    });

    if (formData.phone && formData.phone.length !== 10)
      newErrors.phone = "10 digits required";

    if (formData.pointOfContactMobile && formData.pointOfContactMobile.length !== 10)
      newErrors.pointOfContactMobile = "10 digits required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (taskData?._id) {
        // Update existing technician
        await axios.put(`${API_BASE}/lsp-update/${taskData._id}`, formData);

        Swal.fire({
          title: "Success",
          text: "Technician updated successfully",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        // Add new technician
        await axios.post(`${API_BASE}/lsp-form`, formData);

        Swal.fire({
          title: "Added",
          text: "Technician added successfully",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      }

      navigate("/user/manageLSP");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  // ------------------- Personal Fields -------------------
  const personalFields = [
    { label: "Employee ID", key: "companyName", icon: <Person /> },
    { label: "Full Name", key: "businessType", icon: <Person /> },
    { label: "Gender", key: "phone", icon: <Person /> },
    { label: "Date Of Birth", key: "email", icon: <CalendarMonth /> },
    { label: "Age", key: "pointOfContact", icon: <Numbers /> },
    { label: "Marital Status", key: "pointOfContactMobile", icon: <Favorite /> },
    { label: "Address", key: "district", icon: <LocationOn /> },
    { label: "Mobile Number", key: "city", icon: <Phone /> },
    { label: "Email ID", key: "serviceableCities", icon: <Email /> },
    { label: "Category Of Service", key: "address", icon: <Work /> },
    { label: "Area/City Of Operation", key: "serviceableCities", icon: <LocationCity /> },
    { label: "Year Of Experience", key: "serviceableCities", icon: <AutoAwesome /> },
    { label: "Language Spoken", key: "serviceableCities", icon: <Translate /> },
    { label: "Emergency Phone No", key: "serviceableCities", icon: <Phone /> },
  ];

  const documentFields = [
    { label: "ID Proof", key: "adhaarCard", ref: adhaarFileRef },
    { label: "GST Document", key: "gstDocument", ref: gstFileRef },
    { label: "Company Document", key: "companyDocument", ref: companyFileRef },
  ];

  const getTextFieldSx = () => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      height: "40px",
      "& fieldset": { borderColor: "#d1d5db" },
      "&:hover fieldset": { borderColor: "#029898" },
      "&.Mui-focused fieldset": { borderColor: "#029898", borderWidth: 2 },
      "&.Mui-focused": { backgroundColor: "#fff", boxShadow: "0 0 0 3px rgba(2,152,152,0.1)" },
      "& input": { fontSize: 13, padding: "10px 14px" },
    },
  });

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 2 },
            ml: { xs: 0, md: "260px" },
            transition: "0.3s",
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 700, mb: 2 }}>
            {taskData ? "Edit Technician" : "Add Technician"}
          </Typography>

          {/* Personal Details */}
          <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none", mb: 3 }}>
            <CardContent>
              <Typography sx={{ mb: 2, fontWeight: 600, fontSize: 14 }}>
                Personal Details
              </Typography>

              <Grid container spacing={2}>
                {personalFields.map((field, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>
                      {field.label}
                    </Typography>

                    <TextField
                      fullWidth
                      value={formData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      size="small"
                      error={!!errors[field.key]}
                      helperText={errors[field.key]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ color: "#029898" }}>
                            {React.cloneElement(field.icon, { sx: { color: "#029898" } })}
                          </InputAdornment>
                        ),
                      }}
                      sx={getTextFieldSx()}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none" }}>
            <CardContent>
              <Typography sx={{ mb: 2, fontWeight: 600, fontSize: 14 }}>
                Documents
              </Typography>

              <Grid container spacing={2}>
                {documentFields.map((df, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Typography sx={{ fontSize: 13, mb: 1, fontWeight: 600 }}>
                      {df.label}
                    </Typography>

                    <input
                      type="file"
                      ref={df.ref}
                      accept=".jpg,.jpeg,.png,.pdf,.webp"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileSelect(df.key, e.target.files[0])}
                    />

                    <Box
                      onClick={() => df.ref.current.click()}
                      sx={{
                        height: 40,
                        bgcolor: "#fff",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        px: 1.5,
                        cursor: "pointer",
                        border: "1px solid #d1d5db",
                        "&:hover": { borderColor: "#029898", boxShadow: "0 0 0 3px rgba(2,152,152,0.1)" },
                      }}
                    >
                      <UploadFile sx={{ mr: 1, color: "#029898" }} />
                      <span style={{ fontSize: 13 }}>{formData[df.key] || "Choose File"}</span>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                width: 150,
                textTransform: "none",
                fontSize: 13,
                fontWeight: 600,
                borderRadius: "8px",
                borderColor: "#d1d5db",
                "&:hover": { borderColor: "#029898" },
              }}
              onClick={() =>
                setFormData({
                  companyName: "",
                  businessType: "",
                  phone: "",
                  email: "",
                  pointOfContact: "",
                  pointOfContactMobile: "",
                  district: "",
                  city: "",
                  address: "",
                  serviceableCities: "",
                  adhaarCard: "",
                  gstDocument: "",
                  companyDocument: "",
                })
              }
            >
              Clear
            </Button>

            <Button
              variant="contained"
              sx={{
                width: 150,
                bgcolor: "#029898",
                textTransform: "none",
                fontSize: 13,
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": { bgcolor: "#027d7d" },
              }}
              onClick={handleSubmit}
            >
              {taskData ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddLsp;
