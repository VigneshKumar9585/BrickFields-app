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
import logo from "../../assets/logo/logo.webp";

function Dashboard() {
  const location = useLocation();
  const taskData = location.state?.task;
  const isEditMode = !!taskData;

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

  const [uploadedDocs, setUploadedDocs] = useState({});

  const handleFileSelect = (field, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);

    setUploadedDocs((prev) => ({
      ...prev,
      [field]: fileUrl,
    }));
  };

  const getTextFieldSx = (field, width = "170px") => ({
    width: field === "Address" ? "353px" : width,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f9fbfb",
      borderRadius: "8px",
      height: "32px",
      transition: "all 0.2s ease",
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#b2e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#029898",
        borderWidth: "1px",
      },
      "&.Mui-focused": {
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(2,152,152,0.15)",
      },
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
      padding: "10px 14px",
      color: "#2d3748",
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
        {/* Sidebar */}
        <Box sx={{ width: "280px", flexShrink: 0 }} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Tabs */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Typography sx={{ fontWeight: 600, cursor: "pointer" }}>
              Add User
            </Typography>
            |
            <Typography sx={{ color: "#000", cursor: "pointer" }}>
              {isEditMode ? "Edit Manager" : "Add Manager"}
            </Typography>
          </Box>

          {/* Main Box */}
          <Box sx={{ width: "100%", maxWidth: "1050px" }}>
            {/* ------------------------------- PERSONAL DATA ------------------------------- */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none",  }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#000",
                    mb: 2,
                  }}
                >
                  Personal Data
                </Typography>

                <Box sx={{ display: "flex", gap: 4 }}>
                  <Grid container spacing={2} sx={{ flex: 1 }}>
                    {personalFields.map((fieldObj, i) => (
                      <Grid item xs={12} sm={6} md={3} key={i}>
                        <Typography
                          sx={{
                            mb: 1,
                            color: "#000",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {fieldObj.label}
                        </Typography>

                        {["Country", "State", "Region", "District"].includes(
                          fieldObj.label
                        ) ? (
                          <TextField
                            size="small"
                            sx={getTextFieldSx(fieldObj.label)}
                            InputProps={{
                              startAdornment: (
                                <Box sx={{ mr: 1, display: "flex" }}>
                                  {React.cloneElement(fieldObj.icon, { fontSize: "small" })}
                                </Box>
                              ),
                            }}
                          >
                            {/* <MenuItem value="">Select {fieldObj.label}</MenuItem> */}
                          </TextField>
                        ) : (
                          <TextField
                            size="small"
                            sx={getTextFieldSx(fieldObj.label)}
                            InputProps={{
                              startAdornment: (
                                <Box sx={{ mr: 1, display: "flex" }}>
                                  {React.cloneElement(fieldObj.icon, { fontSize: "small" })}
                                </Box>
                              ),
                            }}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  {/* Profile Right Side */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                    sx={{ position: "relative", mr: 10 }}
                  >
                    <Box
                      component="img"
                      src={logo}
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

            {/* ------------------------------- DOCUMENT UPLOAD ------------------------------- */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#000",
                    mb: 2,
                  }}
                >
                  Document Data
                </Typography>

                <Grid container spacing={2}>
                  {documentFields.map((field, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Typography
                        sx={{
                          mb: 1,
                          color: "#222",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {field}
                      </Typography>

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        id={`upload-${field}`}
                        style={{ display: "none" }}
                        onChange={(event) => handleFileSelect(field, event)}
                      />

                      {/* Upload Button with Icon */}
                      <Button
                        sx={{
                          width: "210px",
                          height: "32px",
                          textTransform: "none",
                          fontSize: "12px",
                          color: "#2d3748",
                          backgroundColor: "#f9fbfb",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          "&:hover": {
                            backgroundColor: "#fff",
                            borderColor: "#b2e0e0",
                            boxShadow: "0 4px 12px rgba(2,152,152,0.15)",
                          },
                        }}
                        onClick={() =>
                          document.getElementById(`upload-${field}`).click()
                        }
                      >
                        <CloudUploadIcon sx={{ fontSize: 20, color: "#029898" }} />
                      </Button>

                      {/* Preview below button */}
                     {uploadedDocs[field] && (
  <Box
    mt={1}
    sx={{ position: "relative", display: "inline-block" }}
  >
    {/* Delete Icon */}
    <IconButton
      size="small"
      onClick={() => {
        setUploadedDocs((prev) => {
          const newDocs = { ...prev };
          delete newDocs[field];
          return newDocs;
        });
      }}
      sx={{
        position: "absolute",
        top: -8,
        right: -8,
        bgcolor: "rgba(0,0,0,0.6)",
        color: "#fff",
        "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
        width: 20,
        height: 20,
        padding: 0,
      }}
    >
      <Close sx={{ fontSize: 14 }} />
    </IconButton>

    {/* Preview Image */}
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

            {/* ------------------------------- SOCIAL MEDIA ------------------------------- */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none", mb: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#000",
                    mb: 2,
                  }}
                >
                  Social Media Platforms
                </Typography>

                <Grid container spacing={2}>
                  {socialFields.map((fieldObj, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography
                        sx={{
                          mb: 1,
                          color: "#000",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
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
                            transition: "all 0.2s ease",
                            "& fieldset": { borderColor: "#e0e0e0" },
                            "&:hover fieldset": { borderColor: "#b2e0e0" },
                            "&.Mui-focused fieldset": { borderColor: "#029898", borderWidth: "1px" },
                            "&.Mui-focused": {
                              backgroundColor: "#fff",
                              boxShadow: "0 4px 12px rgba(2,152,152,0.15)",
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, display: "flex" }}>
                              {React.cloneElement(fieldObj.icon, { fontSize: "small" })}
                            </Box>
                          ),
                          // endAdornment: (
                          //   <IconButton size="small">
                          //     <Close sx={{ fontSize: 16, color: "#000" }} />
                          //   </IconButton>
                          // ),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* ------------------------------- BOTTOM BUTTONS ------------------------------- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  borderColor: "#bdbdbd",
                  color: "#424242",
                  bgcolor: "#f5f5f5",
                  "&:hover": { bgcolor: "#e0e0e0" },
                  width: "120px",
                }}
              >
                Clear
              </Button>

              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  bgcolor: "#029898",
                  color: "white",
                  "&:hover": { bgcolor: "#036d6dff" },
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
