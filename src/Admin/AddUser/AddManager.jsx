// src/pages/Dashboard.js
import React, { useState } from "react";
import Navbar from "../../componts/AdminNavbar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Close,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  HomeWork as HomeWorkIcon,
  MapsHomeWork as MapsHomeWorkIcon,
  PushPin as PushPinIcon,
  MyLocation as MyLocationIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo/logo.webp";

function Dashboard() {
  const location = useLocation();
  const taskData = location.state?.task;
  const isEditMode = !!taskData;

  // ---------------- FORM STATE ----------------
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    region: "",
    district: "",
    adhaarCard: "",
    degreeCertificate: "",
    provisionalCertificate: "",
    experienceCertificate: "",
    instagram: "",
    youtube: "",
    linkedin: ""
  });

  // ---------------- HANDLE INPUT CHANGE ----------------
  const handleChange = (label, value) => {
    const fieldMap = {
      "Name": "name",
      "Mobile No": "mobile",
      "Email ID": "email",
      "Address": "address",
      "Country": "country",
      "State": "state",
      "City": "city",
      "Region": "region",
      "District": "district",
      "Instagram": "instagram",
      "Youtube": "youtube",
      "Linkedin": "linkedin",
    };

    const fieldName = fieldMap[label];

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // ---------------- FILE UPLOAD (PREVIEW ONLY) ----------------
  const [uploadedDocs, setUploadedDocs] = useState({});

  const handleFileSelect = (field, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);

    const fieldMap = {
      "Adhaar Card": "adhaarCard",
      "Degree Certificate": "degreeCertificate",
      "Provisional Certificate": "provisionalCertificate",
      "Experience Certificate": "experienceCertificate",
    };

    const fieldName = fieldMap[field];

    setFormData((prev) => ({
      ...prev,
      [fieldName]: file.name, // only filename stored
    }));

    setUploadedDocs((prev) => ({
      ...prev,
      [field]: fileUrl,
    }));
  };

  // ---------------- SUBMIT TO BACKEND ----------------
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/manager/add",
        formData
      );

      alert("User added successfully!");
      console.log(response.data);

    } catch (error) {
      console.error(error);
      alert("Error while adding user");
    }
  };

  // ---------------- FIELD ARRAYS ----------------
  const personalFields = [
    { label: "Name", icon: <PersonIcon sx={{ color: "#029898" }} /> },
    { label: "Mobile No", icon: <PhoneIcon sx={{ color: "#029898" }} /> },
    { label: "Email ID", icon: <EmailIcon sx={{ color: "#029898" }} /> },
    { label: "Address", icon: <HomeWorkIcon sx={{ color: "#029898" }} /> },
    { label: "Country", icon: <MapsHomeWorkIcon sx={{ color: "#029898" }} /> },
    { label: "State", icon: <LocationOnIcon sx={{ color: "#029898" }} /> },
    { label: "City", icon: <MyLocationIcon sx={{ color: "#029898" }} /> },
    { label: "Region", icon: <PushPinIcon sx={{ color: "#029898" }} /> },
    { label: "District", icon: <LocationOnIcon sx={{ color: "#029898" }} /> },
  ];

  const documentFields = [
    "Adhaar Card",
    "Degree Certificate",
    "Provisional Certificate",
    "Experience Certificate",
  ];

  const socialFields = [
    { label: "Instagram", icon: <InstagramIcon sx={{ color: "#029898" }} /> },
    { label: "Youtube", icon: <YouTubeIcon sx={{ color: "#029898" }} /> },
    { label: "Linkedin", icon: <LinkedInIcon sx={{ color: "#029898" }} /> },
  ];

  // ---------------- INPUT STYLING ----------------
  const getTextFieldSx = (field, width = "170px") => ({
    width: field === "Address" ? "353px" : width,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f9fbfb",
      borderRadius: "8px",
      height: "32px",
      "& fieldset": { borderColor: "#e0e0e0" },
      "&:hover fieldset": { borderColor: "#b2e0e0" },
      "&.Mui-focused fieldset": { borderColor: "#029898", borderWidth: "1px" },
    },
  });

  // ---------------- RETURN JSX ----------------
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: "100%" }}>
        <Box sx={{ width: "280px", flexShrink: 0 }} />

        <Box sx={{ flexGrow: 1 }}>
          {/* Tabs */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>Add User</Typography> |
            <Typography>
              {isEditMode ? "Edit Manager" : "Add Manager"}
            </Typography>
          </Box>

          {/* Main Box */}
          <Box sx={{ width: "100%", maxWidth: "1200px" }}>

            {/* PERSONAL DATA */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: 2 }}>
                  Personal Data
                </Typography>

                <Box sx={{ display: "flex", gap: 4 }}>
                  <Grid container spacing={2} sx={{ flex: 1 }}>
                    {personalFields.map((fieldObj, i) => (
                      <Grid item xs={12} sm={6} md={3} key={i}>
                        <Typography sx={{ mb: 1, fontSize: "12px", fontWeight: 500 }}>
                          {fieldObj.label}
                        </Typography>

                        <TextField
                          size="small"
                          sx={getTextFieldSx(fieldObj.label)}
                          value={formData[
                            {
                              "Name": "name",
                              "Mobile No": "mobile",
                              "Email ID": "email",
                              "Address": "address",
                              "Country": "country",
                              "State": "state",
                              "City": "city",
                              "Region": "region",
                              "District": "district",
                            }[fieldObj.label]
                          ]}
                          onChange={(e) => handleChange(fieldObj.label, e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <Box sx={{ mr: 1, display: "flex" }}>
                                {React.cloneElement(fieldObj.icon, { fontSize: "small" })}
                              </Box>
                            ),
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Profile Image */}
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1} sx={{ mr: 10 }}>
                    <Box component="img" src={logo} sx={{ width: 100, height: 100, borderRadius: "50%" }} />
                    <Box display="flex" alignItems="center" gap={1}>
                      <Edit sx={{ fontSize: 16 }} />
                      <Typography sx={{ fontSize: 14 }}>Edit</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* DOCUMENT UPLOAD */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: 2 }}>
                  Document Data
                </Typography>

                <Grid container spacing={2}>
                  {documentFields.map((field, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Typography sx={{ mb: 1, fontSize: "12px", fontWeight: 500 }}>
                        {field}
                      </Typography>

                      <input
                        type="file"
                        id={`upload-${field}`}
                        style={{ display: "none" }}
                        onChange={(event) => handleFileSelect(field, event)}
                      />

                      <Button
                        sx={{
                          width: "210px",
                          height: "32px",
                          textTransform: "none",
                          fontSize: "12px",
                          backgroundColor: "#f9fbfb",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                        }}
                        onClick={() => document.getElementById(`upload-${field}`).click()}
                      >
                        <CloudUploadIcon sx={{ fontSize: 20, color: "#029898" }} />
                      </Button>

                      {uploadedDocs[field] && (
                        <Box mt={1} sx={{ position: "relative", display: "inline-block" }}>
                          <IconButton
                            size="small"
                            onClick={() =>
                              setUploadedDocs((prev) => {
                                const newDocs = { ...prev };
                                delete newDocs[field];
                                return newDocs;
                              })
                            }
                            sx={{
                              position: "absolute",
                              top: -8,
                              right: -8,
                              bgcolor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                            }}
                          >
                            <Close sx={{ fontSize: 14 }} />
                          </IconButton>

                          <img
                            src={uploadedDocs[field]}
                            alt="preview"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                            }}
                          />
                        </Box>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* SOCIAL MEDIA */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none", mb: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: 2 }}>
                  Social Media Platforms
                </Typography>

                <Grid container spacing={2}>
                  {socialFields.map((fieldObj, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography sx={{ mb: 1, fontSize: "12px", fontWeight: 500 }}>
                        {fieldObj.label}
                      </Typography>

                      <TextField
                        fullWidth
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#f9fbfb",
                            borderRadius: "8px",
                            height: "32px",
                          },
                        }}
                        value={formData[
                          {
                            "Instagram": "instagram",
                            "Youtube": "youtube",
                            "Linkedin": "linkedin",
                          }[fieldObj.label]
                        ]}
                        onChange={(e) => handleChange(fieldObj.label, e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, display: "flex" }}>
                              {React.cloneElement(fieldObj.icon, { fontSize: "small" })}
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* BUTTONS */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3, mb: 2 }}>
              <Button
                variant="outlined"
                sx={{ textTransform: "none", fontSize: "14px", width: "120px" }}
                onClick={() => window.location.reload()}
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
                  width: "120px",
                }}
              >
                {isEditMode ? "Update" : "Add"}
              </Button>
            </Box>

          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
