// src/pages/addLsp.js
import React, { useState, useEffect } from "react";
import Navbar from "../../componts/Navbar.jsx";
import Swal from "sweetalert2";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo/logo.webp";

const API_BASE = "http://localhost:2424/api";



function AddLsp() {
  const navigate = useNavigate();
  const location = useLocation();
const [adhaarFile, setAdhaarFile] = useState(null);
const [gstFile, setGstFile] = useState(null);
const [companyFile, setCompanyFile] = useState(null);

  // ✅ Read task data if we came from edit
  const taskData = location.state?.task || null;

  // ✅ Manage form state
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

  const handleChange = (key, value) => {
  setFormData((prev) => ({
    ...prev,
    [key]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [key]: "",
  }));
};


  // ✅ Prefill if edit mode
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

  // ✅ Manage errors
  const [errors, setErrors] = useState({});

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  // Validate ONLY text fields
  const textFields = [
    "companyName",
    "businessType",
    "phone",
    "email",
    "pointOfContact",
    "pointOfContactMobile",
    "district",
    "city",
    "address",
    "serviceableCities",
  ];

  textFields.forEach((key) => {
    if (!formData[key]) newErrors[key] = "This field is required";
  });

  // Validate file uploads
  if (!taskData && !adhaarFile)
    newErrors.adhaarCard = "Upload required";
  if (!taskData && !gstFile)
    newErrors.gstDocument = "Upload required";
  if (!taskData && !companyFile)
    newErrors.companyDocument = "Upload required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const data = new FormData();

    // Append text fields
    textFields.forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append files ONLY if newly uploaded
    if (adhaarFile) data.append("adhaarCard", adhaarFile);
    if (gstFile) data.append("gstDocument", gstFile);
    if (companyFile) data.append("companyDocument", companyFile);

    if (taskData) {
      // UPDATE
    await axios.put(`${API_BASE}/lsp-update/${taskData._id}`, data, {
  headers: { "Content-Type": "multipart/form-data" }
});


      Swal.fire("Updated!", "LSP updated successfully", "success");
    } else {
      // CREATE
     await axios.post(`${API_BASE}/lsp-form`, data, {
  headers: { "Content-Type": "multipart/form-data" }
});


      Swal.fire("Added!", "LSP added successfully", "success");
    }

    navigate("/user/manageLSP");
  } catch (err) {
    console.log(err);
    Swal.fire("Error", "Something went wrong!", "error");
  }
};



  const personalFields = [
    { label: "Company Name", key: "companyName" },
    { label: "Business Type", key: "businessType" },
    { label: "Company Phone No", key: "phone" },
    { label: "Company Email", key: "email" },
    { label: "Point of Contact Name", key: "pointOfContact" },
    { label: "Point of Contact Mobile", key: "pointOfContactMobile" },
    { label: "District", key: "district" },
    { label: "City", key: "city" },
    { label: "Address", key: "address" },
    { label: "Serviceable Cities", key: "serviceableCities" },
  ];

  const documentFields = [
    { label: "Adhaar Card", key: "adhaarCard" },
    { label: "GST Document", key: "gstDocument" },
    { label: "Company Document", key: "companyDocument" },
  ];

  const getTextFieldSx = (field, width = "200px") => ({
    width:
      field === "Address" || field === "Serviceable Cities"
        ? "416px"
        : width,
    "& .MuiOutlinedInput-root": {
      height: "30px",
      bgcolor: "#e0e0e0",
      borderRadius: "4px",
      "& input": {
        padding: "4px 8px",
        fontSize: "12px",
      },
      "& fieldset": { border: "none" },
    },
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100%",
        }}
      >
        <Box sx={{ width: "280px" }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="rgb(0,0,0)"
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              textAlign: "left",
              mb: 2,
            }}
          >
            {taskData ? "Edit LSP" : "Add LSP"}
          </Typography>

          <Box sx={{ width: "100%", maxWidth: "1190px" }}>
            {/* Personal Data Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "14px", color: "#000000ff", mb: 2 }}
                >
                  Personal Data
                </Typography>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                  <Grid container spacing={2} sx={{ flex: 1 }}>
                    {personalFields.map((field, i) => (
                      <Grid item xs={12} sm={6} md={3} key={i}>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 1,
                            pr: 3,
                            color: "#000",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {field.label}
                        </Typography>
                        <TextField
                          value={formData[field.key]}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          variant="outlined"
                          size="small"
                          error={!!errors[field.key]}
                          helperText={errors[field.key] || ""}
                          sx={getTextFieldSx(field.label)}
                          inputProps={
                            field.key === "phone" ||
                            field.key === "pointOfContactMobile"
                              ? { maxLength: 10, inputMode: "numeric" }
                              : {}
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Profile Image */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                    sx={{ pr: "100px" }}
                  >
                    <Box
                      component="img"
                      src={logo}
                      alt="profile"
                      sx={{ width: 100, height: 100, borderRadius: "50%" }}
                    />
                    <Box display="flex" alignItems="center" gap={1}>
                      <Edit sx={{ fontSize: 16 }} />
                      <Typography sx={{ fontSize: 14 }}>Edit</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Document Data Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none" }}>
              <CardContent sx={{ p: 3, pt: 0 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "14px", color: "#000", mb: 2 }}
                >
                  Document Data
                </Typography>

                <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <Typography
      variant="body2"
      sx={{
        mb: 1,
        pr: 3,
        color: "#000",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      Adhaar Card
    </Typography>

    <input
      type="file"
      onChange={(e) => setAdhaarFile(e.target.files[0])}
      style={{
        width: "100%",
        fontSize: "12px",
        padding: "6px 0",
      }}
    />

    {errors.adhaarCard && (
      <p style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
        {errors.adhaarCard}
      </p>
    )}
  </Grid>

  <Grid item xs={12} sm={6} md={4}>
    <Typography
      variant="body2"
      sx={{
        mb: 1,
        pr: 3,
        color: "#000",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      GST Document
    </Typography>

    <input
      type="file"
      onChange={(e) => setGstFile(e.target.files[0])}
      style={{
        width: "100%",
        fontSize: "12px",
        padding: "6px 0",
      }}
    />

    {errors.gstDocument && (
      <p style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
        {errors.gstDocument}
      </p>
    )}
  </Grid>

  <Grid item xs={12} sm={6} md={4}>
    <Typography
      variant="body2"
      sx={{
        mb: 1,
        pr: 3,
        color: "#000",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      Company Document
    </Typography>

    <input
      type="file"
      onChange={(e) => setCompanyFile(e.target.files[0])}
      style={{
        width: "100%",
        fontSize: "12px",
        padding: "6px 0",
      }}
    />

    {errors.companyDocument && (
      <p style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
        {errors.companyDocument}
      </p>
    )}
  </Grid>
</Grid>

              </CardContent>
            </Card>

            {/* Bottom Buttons */}
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                p: 2,
                bgcolor: "#f5f5f5",
                boxShadow: "none",
              }}
            >
              <Button
                variant="outlined"
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
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  borderColor: "#bdbdbd",
                  color: "#424242",
                  bgcolor: "#f5f5f5",
                  "&:hover": { bgcolor: "#e0e0e0" },
                  width: "170px",
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  bgcolor: "#029898",
                  color: "white",
                  "&:hover": { bgcolor: "#1f6b6bff" },
                  width: "170px",
                }}
              >
                {taskData ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddLsp;
