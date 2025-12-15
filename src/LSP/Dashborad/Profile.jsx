// src/pages/AddLsp.jsx
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
} from "@mui/material";

import { Edit } from "@mui/icons-material";
import logo from "../../assets/logo/logo.webp";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


function AddLsp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Edit mode
  const taskData = location.state?.task || null;

  // Form Data
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

  // Prefill edit mode
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

  // Errors
  const [errors, setErrors] = useState({});

  // Input change
  const handleChange = (field, value) => {
    if (field === "phone" || field === "pointOfContactMobile") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // File uploads
  const adhaarFileRef = useRef(null);
  const gstFileRef = useRef(null);
  const companyFileRef = useRef(null);

  const handleFileSelect = (field, file) => {
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file.name }));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });

    if (formData.phone && formData.phone.length !== 10)
      newErrors.phone = "Must be 10 digits";

    if (
      formData.pointOfContactMobile &&
      formData.pointOfContactMobile.length !== 10
    )
      newErrors.pointOfContactMobile = "Must be 10 digits";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (taskData) {
        await axios.put(`${BACKEND_URL}/lsp-update/${taskData._id}`, formData);

        Swal.fire({
          title: "LSP Updated",
          text: "Technician updated successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await axios.post(`${API_BASE}/lsp-form`, formData);

        Swal.fire({
          title: "LSP Added",
          text: "Technician added successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      navigate("/user/manageLSP");
    } catch (err) {
      console.error("❌ Error saving LSP:", err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  // Corrected Field List
  const personalFields = [
    { label: "Company Name", key: "companyName" },
    { label: "Business Type", key: "businessType" },
    { label: "Company Phone No.", key: "phone" },
    { label: "Company Email", key: "email" },
    { label: "Point Of Contact Name", key: "pointOfContact" },
    { label: "Point Of Contact Mobile", key: "pointOfContactMobile" },
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

  const getTextFieldSx = (field, width = "165px") => ({
    width:
      field === "Address" || field === "Serviceable Cities"
        ? "346px"
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

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ width: "280px" }} />

        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}>
            Profile
          </Typography>

          <Box sx={{ width: "100%", maxWidth: "1190px" }}>
            {/* Personal Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 2 }}>
                  Personal Data
                </Typography>

                <Box sx={{ display: "flex", gap: 4 }}>
                  <Grid container spacing={2} sx={{ flex: 1 }}>
                    {personalFields.map((field, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Typography
                          sx={{
                            mb: 1,
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#000",
                          }}
                        >
                          {field.label}
                        </Typography>

                        <TextField
                          value={formData[field.key]}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value)
                          }
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

                  <Box display="flex" flexDirection="column" alignItems="center" mr={20}>
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

            {/* Document Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 2 }}>
                  Document Data
                </Typography>

                <Grid container spacing={2}>
                  {documentFields.map((field, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Typography
                        sx={{
                          mb: 1,
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#000",
                        }}
                      >
                        {field.label}
                      </Typography>

                      {/* Hidden Inputs */}
                      {field.key === "adhaarCard" && (
                        <input
                          type="file"
                          ref={adhaarFileRef}
                          accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileSelect("adhaarCard", e.target.files[0])
                          }
                        />
                      )}

                      {field.key === "gstDocument" && (
                        <input
                          type="file"
                          ref={gstFileRef}
                          accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileSelect("gstDocument", e.target.files[0])
                          }
                        />
                      )}

                      {field.key === "companyDocument" && (
                        <input
                          type="file"
                          ref={companyFileRef}
                          accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileSelect("companyDocument", e.target.files[0])
                          }
                        />
                      )}

                      <TextField
                        value={formData[field.key]}
                        onClick={() => {
                          if (field.key === "adhaarCard") adhaarFileRef.current.click();
                          if (field.key === "gstDocument") gstFileRef.current.click();
                          if (field.key === "companyDocument") companyFileRef.current.click();
                        }}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors[field.key]}
                        helperText={errors[field.key] || ""}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "30px",
                            bgcolor: "#e0e0e0",
                            borderRadius: "4px",
                            "& input": {
                              padding: "4px 8px",
                              fontSize: "12px",
                              cursor: "pointer",
                            },
                            "& fieldset": { border: "none" },
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Divider />

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                p: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  width: "170px",
                  fontSize: "14px",
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
                  textTransform: "none",
                  width: "170px",
                  fontSize: "14px",
                  bgcolor: "#029898",
                }}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddLsp;
