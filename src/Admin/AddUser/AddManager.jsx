// src/pages/Dashboard.js
import React, { useState } from "react";
import Navbar from "../../componts/AdminNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
import logo from "../../assets/logo/logo.webp";
import { useLocation, useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


function Dashboard() {
  const location = useLocation();
  const taskData = location.state?.task;
  const isEditMode = !!taskData;
const navigate = useNavigate();

  const fieldKeyMap = {
    "Name": "name",
    "Mobile No": "phoneNumber",
    "Email ID": "email",
    "Street": "street",
    "State": "state",
    "District": "district",
    "City": "city",
    "Region": "region",

    // Not in backend but UI has it
    "Country": "country",

    "Instagram": "instagramLink",
    "Youtube": "youtubeLink",
    "Linkedin": "linkedinLink",

    "Degree Certificate": "degreeCertificate",
    "Adhaar Card": "aadhaarCard",
    "Provisional Certificate": "provisionalCertificate",
    "Experience Certificate": "experienceCertificate",
  };


  const personalFields = [
    { label: "Name", icon: <PersonIcon sx={{ color: "#029898" }} /> },
    { label: "Mobile No", icon: <PhoneIcon sx={{ color: "#029898" }} /> },
    { label: "Email ID", icon: <EmailIcon sx={{ color: "#029898" }} /> },
    { label: "Country", icon: <MapsHomeWorkIcon sx={{ color: "#029898" }} /> },
    { label: "District", icon: <LocationOnIcon sx={{ color: "#029898" }} /> },
    { label: "Region", icon: <PushPinIcon sx={{ color: "#029898" }} /> },
    { label: "City", icon: <MyLocationIcon sx={{ color: "#029898" }} /> },
    { label: "State", icon: <LocationOnIcon sx={{ color: "#029898" }} /> },
    { label: "Street", icon: <HomeWorkIcon sx={{ color: "#029898" }} /> },
  ];

  const documentFields = [
    "Degree Certificate",
    "Adhaar Card",
    "Provisional Certificate",
    "Experience Certificate",
  ];

  const socialFields = [
    { label: "Instagram", icon: <InstagramIcon sx={{ color: "#029898" }} /> },
    { label: "Youtube", icon: <YouTubeIcon sx={{ color: "#029898" }} /> },
    { label: "Linkedin", icon: <LinkedInIcon sx={{ color: "#029898" }} /> },
  ];

  const [uploadedDocs, setUploadedDocs] = useState({});

  const [docTexts, setDocTexts] = useState({});

  const handleDocTextChange = (field, value) => {
    setDocTexts((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (field, event) => {
    const files = Array.from(event.target.files);

    const mapped = files.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setUploadedDocs((prev) => ({
      ...prev,
      [field]: prev[field] ? [...prev[field], ...mapped] : [...mapped]
    }));
  };
  const [formValues, setFormValues] = useState({
  name: "",
  phoneNumber: "",
  email: "",
  street: "",
  state: "",
  district: "",
  city: "",
  region: "",
  country: "",
  instagramLink: "",
  youtubeLink: "",
  linkedinLink: "",
});
React.useEffect(() => {
  if (!isEditMode || !taskData) return;

  setFormValues({
    name: taskData.name || "",
    phoneNumber: taskData.phoneNumber || "",
    email: taskData.email || "",
    street: taskData.street || "",
    state: taskData.state || "",
    district: taskData.district || "",
    city: taskData.city || "",
    region: taskData.region || "",
    country: taskData.country || "",
    instagramLink: taskData.instagramLink || "",
    youtubeLink: taskData.youtubeLink || "",
    linkedinLink: taskData.linkedinLink || "",
  });
}, [taskData]);



  const getTextFieldSx = (field, width = "100%") => ({
    width: width,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      height: "40px",
      transition: "all 0.2s ease",
      "& fieldset": {
        borderColor: "#d1d5db",
      },
      "&:hover fieldset": {
        borderColor: "#029898",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#029898",
        borderWidth: "2px",
      },
      "&.Mui-focused": {
        backgroundColor: "#fff",
        boxShadow: "0 0 0 3px rgba(2,152,152,0.1)",
      },
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "13px",
      padding: "10px 14px",
      color: "#1a202c",
    },
  });

const handleSubmit = async () => {
  if (!isEditMode && !taskData) {
    // Create new manager
    const formData = new FormData();

    // PERSONAL FIELDS
    personalFields.forEach((f) => {
      const key = fieldKeyMap[f.label];
      // if (key !== "country") 
        formData.append(key, formValues[key]);
    });

    // SOCIAL FIELDS
    socialFields.forEach((f) => {
      const key = fieldKeyMap[f.label];
      formData.append(key, formValues[key]);
    });

    // DOCUMENTS
    documentFields.forEach((label) => {
      const key = fieldKeyMap[label];
      if (uploadedDocs[label]) {
        uploadedDocs[label].forEach((d) => formData.append(key, d.file));
      }
    });

    try {
      await axios.post(`${BACKEND_URL}/api/create-manager`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Manager Added Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add manager.");
    }

  } else if (isEditMode && taskData?._id) {
    // Update existing manager
    const formData = new FormData();

    // PERSONAL FIELDS
    personalFields.forEach((f) => {
      const key = fieldKeyMap[f.label];
      // if (key !== "country") 
        formData.append(key, formValues[key]);
    });

    // SOCIAL FIELDS
    socialFields.forEach((f) => {
      const key = fieldKeyMap[f.label];
      formData.append(key, formValues[key]);
    });

    // DOCUMENTS (append if any new uploaded)
    documentFields.forEach((label) => {
      const key = fieldKeyMap[label];
      if (uploadedDocs[label]) {
        uploadedDocs[label].forEach((d) => formData.append(key, d.file));
      }
    });

   try {
  if (!isEditMode && !taskData) {
    await axios.post(`${BACKEND_URL}/api/create-manager`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Manager Added Successfully!");
  } else if (isEditMode && taskData?._id) {
    await axios.put(`${BACKEND_URL}/api/update-manager/${taskData._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Manager Updated Successfully!");
  }

  // Redirect after 1 second to allow toast to show
  setTimeout(() => {
    navigate("/admin-manage-user");
  }, 1000);

} catch (error) {
  console.error(error);
  toast.error("Failed to save manager.");
}

  }
};

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

        {/* Main Content */}<Box sx={{ flexGrow: 1, p: 3, ml: { xs: 0, md: "280px" } }}>

          {/* Tabs */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
            <Typography sx={{ fontWeight: 600, fontSize: "15px", color: "#1a202c", cursor: "pointer" }}>
              Add User
            </Typography>
            <Typography sx={{ color: "#9ca3af", fontSize: "15px" }}>|</Typography>
            <Typography sx={{ color: "#6b7280", fontSize: "15px", cursor: "pointer" }}>
              {isEditMode ? "Edit Manager" : "Add Manager"}
            </Typography>
          </Box>

          {/* Main Box */}
          <Box sx={{ width: "100%", maxWidth: "1200px" }}>
            {/* ------------------------------- PERSONAL DATA ------------------------------- */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none", mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#1a202c",
                    mb: 3,
                    letterSpacing: "0.3px",
                  }}
                >
                  Personal Data
                </Typography>

              <Box sx={{ width: "90%", mx: "auto" }}> {/* Center and 90% width */}
  <Grid container spacing={3}>
    {personalFields.map((fieldObj, i) => (
     <Grid item xs={12} sm={6} md={4} key={i}>
{/* Each takes 4/12 → 3 per row */}
        <Typography
          sx={{
            mb: 1.5,
            color: "#2d3748",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {fieldObj.label}
        </Typography>

       <TextField
  name={fieldObj.label}
  size="small"
  value={formValues[fieldKeyMap[fieldObj.label]] || ""}
  onChange={(e) =>
    setFormValues({ 
      ...formValues, 
      [fieldKeyMap[fieldObj.label]]: e.target.value 
    })
  }
  placeholder={
    ["Country", "State", "Region", "District"].includes(fieldObj.label)
      ? ""
      : `Enter ${fieldObj.label}`
  }
  sx={{
    ...getTextFieldSx(fieldObj.label),
    width: fieldObj.label === "Street" ? "390px" : "100%",
  }}
  InputProps={{
    startAdornment: (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {React.cloneElement(fieldObj.icon, { fontSize: "small" })}
        <Box sx={{ width: "1px", height: "20px", bgcolor: "#e5e7eb" }} />
      </Box>
    ),
  }}
/>


      </Grid>
    ))}
  </Grid>
</Box>


              </CardContent>
            </Card>

            {/* ------------------------------- DOCUMENT UPLOAD ------------------------------- */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none", mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#1a202c",
                    mb: 3,
                    letterSpacing: "0.3px",
                  }}
                >
                  Document Data
                </Typography>

                <Grid container spacing={3}>
                  {documentFields.map((field, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography
                        sx={{
                          mb: 1.5,
                          color: "#2d3748",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {field}
                      </Typography>


                      {/* Hidden File Input (images only) */}
                      <input
                        type="file"
                        id={`upload-${field}`}
                        multiple
                        accept="image/*"
                        aria-label={`Upload Image for ${field}`}
                        style={{ display: "none" }}
                        onChange={(event) => handleFileSelect(field, event)}
                      />

                      {/* Upload Button with Icon */}
                      <Button
                        sx={{
                          width: "100%",
                          height: "40px",
                          textTransform: "none",
                          fontSize: "13px",
                          color: "#029898",
                          backgroundColor: "#ffffff",
                          borderRadius: "8px",
                          border: "1px solid #d1d5db",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          "&:hover": {
                            backgroundColor: "#f0fdfd",
                            borderColor: "#029898",
                            boxShadow: "0 0 0 3px rgba(2,152,152,0.1)",
                          },
                        }}
                        onClick={() =>
                          document.getElementById(`upload-${field}`).click()
                        }
                        aria-label={`Upload Image for ${field}`}
                      >
                        <CloudUploadIcon sx={{ fontSize: 22, color: "#029898" }} />
                        <Box component="span" sx={{ ml: 1, fontSize: 13, color: "#029898", fontWeight: 600 }}>
                          Upload Image
                        </Box>
                      </Button>

                      {/* Preview below button */}
                      {uploadedDocs[field]?.map((doc, idx) => (
                        <Box key={idx} mt={1} sx={{ position: "relative", display: "inline-block", mr: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setUploadedDocs((prev) => {
                                const arr = [...prev[field]];
                                arr.splice(idx, 1);
                                return { ...prev, [field]: arr };
                              });
                            }}
                            sx={{
                              position: "absolute",
                              top: -8,
                              right: -8,
                              bgcolor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              width: 20,
                              height: 20,
                              padding: 0
                            }}
                          >
                            <Close sx={{ fontSize: 14 }} />
                          </IconButton>

                          <img
                            src={doc.url}
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
                      ))}


                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* ------------------------------- SOCIAL MEDIA ------------------------------- */}
            <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none", mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#1a202c",
                    mb: 3,
                    letterSpacing: "0.3px",
                  }}
                >
                  Social Media Platforms
                </Typography>

                <Grid container spacing={3}>
                  {socialFields.map((fieldObj, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography
                        sx={{
                          mb: 1.5,
                          color: "#2d3748",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {fieldObj.label}
                      </Typography>

                      <TextField
                         fullWidth
  size="small"
  name={fieldObj.label}
  value={formValues[fieldKeyMap[fieldObj.label]] || ""}
  onChange={(e) =>
    setFormValues({
      ...formValues,
      [fieldKeyMap[fieldObj.label]]: e.target.value,
    })
  }
                        placeholder={`Enter ${fieldObj.label} URL`}
                        sx={{

                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            height: "40px",
                            transition: "all 0.2s ease",
                            "& fieldset": { borderColor: "#d1d5db" },
                            "&:hover fieldset": { borderColor: "#029898" },
                            "&.Mui-focused fieldset": { borderColor: "#029898", borderWidth: "2px" },
                            "&.Mui-focused": {
                              backgroundColor: "#fff",
                              boxShadow: "0 0 0 3px rgba(2,152,152,0.1)",
                            },
                          },
                          "& .MuiOutlinedInput-input": {
                            fontSize: "13px",
                            padding: "10px 14px",
                            color: "#1a202c",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {React.cloneElement(fieldObj.icon, { fontSize: "small" })}
                              <Box sx={{ width: "1px", height: "20px", bgcolor: "#e5e7eb" }} />
                            </Box>
                          ),
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
                mt: 4,
                mb: 3,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderColor: "#d1d5db",
                  color: "#6b7280",
                  bgcolor: "#ffffff",
                  height: "42px",
                  borderRadius: "8px",
                  "&:hover": {
                    bgcolor: "#f9fafb",
                    borderColor: "#9ca3af",
                  },
                  width: "130px",
                }}
              >
                Clear
              </Button>

              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  bgcolor: "#029898",
                  color: "white",
                  height: "42px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: "#027676",
                    boxShadow: "0 4px 12px rgba(2,152,152,0.3)",
                  },
                  width: "130px",
                }}
                onClick={() => handleSubmit()}   // ← ADD THIS ONE LINE ONLY
              >
                {isEditMode ? "Update" : "Add"}
              </Button>

            </Box>
          </Box>
        </Box>
      </Box>
      {/* <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  /> */}
   <ToastContainer
                  position="top-right"
                  theme="colored"
                  autoClose={2000}
                  hideProgressBar={true}
                  pauseOnHover={true}
              />
  
    </>
  );
}

export default Dashboard;
