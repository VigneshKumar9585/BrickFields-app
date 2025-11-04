// src/pages/addLsp.js
import React, { useState, useEffect } from "react";
import Navbar from "../../componts/LspNavbar";
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

const API_BASE = "http://localhost:2444";

function AddLsp() {
  const navigate = useNavigate();
  const location = useLocation();

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

  // ✅ Handle input change
  const handleChange = (field, value) => {
    if (field === "phone" || field === "pointOfContactMobile") {
      if (!/^\d{0,10}$/.test(value)) return; // allow only numbers, max 10
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on change
  };

  // ✅ Handle submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = "Must be exactly 10 digits";
    }
    if (
      formData.pointOfContactMobile &&
      formData.pointOfContactMobile.length !== 10
    ) {
      newErrors.pointOfContactMobile = "Must be exactly 10 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (taskData) {
        // ✅ UPDATE
        await axios.put(`${API_BASE}/lsp-update/${taskData._id}`, formData);
        Swal.fire({
          title: "LSP Updated",
          text: "Your LSP has been successfully updated.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        // ✅ CREATE
        await axios.post(`${API_BASE}/lsp-form`, formData);
        Swal.fire({
          title: "LSP Added",
          text: "Your LSP has been successfully saved.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      navigate("/user/manageLSP");
    } catch (err) {
      console.error("❌ Error saving LSP", err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const personalFields = [
    { label: "Employee ID", key: "companyName" },
    { label: "Full Name", key: "businessType" },
    { label: "Gender", key: "phone" },
    { label: "Date Of Birth", key: "email" },
    { label: "Age", key: "pointOfContact" },
    { label: "Marital Status", key: "pointOfContactMobile" },
    { label: "Address", key: "district" },
    { label: "Mobile Number", key: "city" },
    { label: "Email ID", key: "serviceableCities" },
    { label: "Category Of Service", key: "address" },
    { label: "Area/City Of Operation", key: "serviceableCities" },
    { label: "Year Of Expriebce", key: "serviceableCities" },
    { label: "Language Spoken", key: "serviceableCities" },
    { label: "Emergency Phone No", key: "serviceableCities" },
  ];

  const documentFields = [
    { label: "ID Proof", key: "adhaarCard" },
    { label: "Upload- ", key: "gstDocument" },
  ];

  const getTextFieldSx = (field, width = "165px") => ({
    width:
      field === "Address" || field === "Category Of Service" || field === "Area/City Of Operation"
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
                  {documentFields.map((field, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
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
                        {field.label}
                      </Typography>
                      <TextField
                        value={formData[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
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
                            },
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    </Grid>
                  ))}
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
