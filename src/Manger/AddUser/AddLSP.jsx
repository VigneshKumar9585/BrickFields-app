// src/pages/Dashboard.js
import React, { useState } from "react";
import Navbar from "../../componts/Navbar.jsx";
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
  Lock as LockIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import logo from "../../assets/logo/logo.webp";
import { useLocation, useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


function AddLsp() {
  const location = useLocation();
  const taskData = location.state?.task;
  const [errors, setErrors] = useState({});

  // console.log("Task Data:", taskData);
  const isEditMode = !!taskData;
  const navigate = useNavigate();

  const fieldKeyMap = {
    "Company Name": "companyName",
    "Business Type": "businessType",
    "Company Phone NO": "companyPhoneNumber",

    "Point Of Contact person": "contactPerson",
    "Point Of Contact Number": "pointOfContactNumber",
    "Serviceable Cities": "serviceableCities",
    "Password": "password",
    "Email ID": "email",
    "Street": "street",
    "State": "state",
    "District": "district",
    "City": "city",
    "Region": "region",
    "Country": "country",
    "Adhaar Card": "aadhaarCard",
    "Gst Document": "gstDocument",
    "Company Document": "companyDocument",
  };

  const validateForm = () => {
    const newErrors = {};

    // -------------------- PERSONAL FIELDS --------------------
    // Name
    if (!formValues.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }

    // Phone
    if (!formValues.pointOfContactNumber.trim()) {
      newErrors.pointOfContactNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formValues.pointOfContactNumber)) {
      newErrors.pointOfContactNumber = "Mobile number must be 10 digits";
    }


    if (!formValues.password.trim()) {
      newErrors.password = "Password is required";
    }


    if (!formValues.pointOfContactNumber.trim()) {
      newErrors.pointOfContactNumber = "Point of contact number is required";
    }

    if (!formValues.companyPhoneNumber.trim()) {
      newErrors.companyPhoneNumber = "Company phone number is required";
    }


    if (!formValues.businessType.trim()) {
      newErrors.businessType = "Business Type is required";
    }


    if (!formValues.serviceableCities.trim()) {
      newErrors.serviceableCities = "Serviceable Cities is required";
    }

    // Email
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid email format";
    }

    // Address fields
    const addressFields = ["country", "state", "district", "region", "city", "street"];
    addressFields.forEach((key) => {
      if (!formValues[key] || !formValues[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });


    // -------------------- SOCIAL MEDIA (OPTIONAL BUT MUST BE VALID IF ENTERED) --------------------
    // const socialFields = ["instagramLink", "youtubeLink", "linkedinLink"];

    // const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;

    // socialFields.forEach((key) => {
    //   if (formValues[key] && formValues[key].trim() !== "") {
    //     if (!urlRegex.test(formValues[key])) {
    //       newErrors[key] = "Invalid URL format";
    //     }
    //   }
    // });


    // -------------------- DOCUMENT VALIDATION --------------------
    documentFields.forEach((label) => {
      const key = fieldKeyMap[label];

      // Check if user uploaded at least 1 file
      if (!uploadedDocs[label] || uploadedDocs[label].length === 0) {
        newErrors[key] = `${label} is required`;
      }
    });


    // Set errors to state
    setErrors(newErrors);

    // Return TRUE if no errors exist
    return Object.keys(newErrors).length === 0;
  };




  const personalFields = [
    { label: "Company Name", icon: <HomeWorkIcon sx={{ color: "#029898" }} /> },
    { label: "Business Type", icon: <BusinessIcon sx={{ color: "#029898" }} /> },
    { label: "Company Phone NO", icon: <PhoneIcon sx={{ color: "#029898" }} /> },
    { label: "Point Of Contact person", icon: <PersonIcon sx={{ color: "#029898" }} /> },
    { label: "Point Of Contact Number", icon: <PhoneIcon sx={{ color: "#029898" }} /> },
    { label: "Serviceable Cities", icon: <LocationOnIcon sx={{ color: "#029898" }} /> },

    { label: "Email ID", icon: <EmailIcon sx={{ color: "#029898" }} /> },
    { label: "Password", icon: <LockIcon sx={{ color: "#029898" }} /> },


    // Address fields
    { label: "Country", icon: <MapsHomeWorkIcon sx={{ color: "#029898" }} /> },
    { label: "State", icon: <LocationOnIcon sx={{ color: "#029898" }} /> },
    { label: "District", icon: <LocationOnIcon sx={{ color: "#029898" }} /> },
    { label: "City", icon: <MyLocationIcon sx={{ color: "#029898" }} /> },
    { label: "Region", icon: <PushPinIcon sx={{ color: "#029898" }} /> },
    { label: "Street", icon: <HomeWorkIcon sx={{ color: "#029898" }} /> },
  ];


  const documentFields = [
    "Adhaar Card",
    "Gst Document",
    "Company Document",
  ];

  const socialFields = [
    { label: "Instagram", icon: <InstagramIcon sx={{ color: "#029898" }} /> },
    { label: "Youtube", icon: <YouTubeIcon sx={{ color: "#029898" }} /> },
    { label: "Linkedin", icon: <LinkedInIcon sx={{ color: "#029898" }} /> },
  ];

  const resetForm = () => {
    setFormValues({
      companyName: "",
      businessType: "",
      companyPhoneNumber: "",
      companyEmail: "",
      contactPerson: "",
      pointOfContactNumber: "",
      serviceableCities: "",

      email: "",
      password: "",

      // Address fields
      street: "",
      state: "",
      district: "",
      city: "",
      region: "",
      country: "",

      // Social media (optional if needed)
      // instagramLink: "",
      // youtubeLink: "",
      // linkedinLink: "",

      // Documents (file inputs remain in uploadedDocs state)
      gstDocument: "",
      companyDocument: "",
      aadhaarCard: "",
    });

    setUploadedDocs({});
    setErrors({});
  };


  const [uploadedDocs, setUploadedDocs] = useState({});

  const [docTexts, setDocTexts] = useState({});

  const handleDocTextChange = (field, value) => {
    setDocTexts((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (field, event) => {
    const files = Array.from(event.target.files);

    const validFiles = files.filter((file) => {
      if (file.size > 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Max 1MB allowed.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const mapped = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setUploadedDocs((prev) => ({
      ...prev,
      [field]: prev[field] ? [...prev[field], ...mapped] : [...mapped]
    }));
  };
  const [formValues, setFormValues] = useState({
    companyName: "",
    businessType: "",
    companyPhoneNumber: "",
    companyEmail: "",
    contactPerson: "",
    pointOfContactNumber: "",
    serviceableCities: "",

    email: "",
    password: "",

    // Address fields
    street: "",
    state: "",
    district: "",
    city: "",
    region: "",
    country: "",

    // Social media (optional if needed)
    // instagramLink: "",
    // youtubeLink: "",
    // linkedinLink: "",

    // Documents (file inputs remain in uploadedDocs state)
    gstDocument: "",
    companyDocument: "",
    aadhaarCard: "",
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
      password: taskData.password || "",
      age: taskData.age || "",
      yearOfExperience: taskData.yearOfExperience,
      categoryOfService: taskData.categoryOfService
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
    if (!validateForm()) return;
    if (!isEditMode && !taskData) {
      // Create new lsp
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
        await axios.post(`${BACKEND_URL}/api/create-lsp`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("lsp Added Successfully!");
        resetForm();
      } catch (error) {
        console.error(error);
        toast.error("Failed to add lsp.");
      }

    } else if (isEditMode && taskData?._id) {
      // Update existing lsp
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
          await axios.post(`${BACKEND_URL}/api/create-lsp`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("lsp Added Successfully!");
        } else if (isEditMode && taskData?._id) {
          await axios.put(`${BACKEND_URL}/api/update-lsp/${taskData._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("lsp Updated Successfully!");
        }

        // Redirect after 1 second to allow toast to show
        setTimeout(() => {
          navigate("/admin-manage-user");
        }, 1000);

      } catch (error) {
        console.error(error);
        toast.error("Failed to save lsp.");
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
              {isEditMode ? "Edit lsp" : "Add lsp"}
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

                <Box sx={{ width: "90%" }}> {/* Center and 90% width */}
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
                          onChange={(e) => {
                            const fieldKey = fieldKeyMap[fieldObj.label];
                            let value = e.target.value;

                            // Only allow numbers for phone number fields
                            if (fieldKey === "companyPhoneNumber" || fieldKey === "pointOfContactNumber") {
                              value = value.replace(/\D/g, "");
                            }

                            setFormValues({
                              ...formValues,
                              [fieldKey]: value,
                            });

                            // Clear error while typing
                            setErrors({
                              ...errors,
                              [fieldKey]: "",
                            });
                          }}
                          placeholder={
                            ["country", "state", "region", "district"].includes(fieldObj.label)
                              ? ""
                              : `Enter ${fieldObj.label}`
                          }
                          sx={{
                            ...getTextFieldSx(fieldObj.label),
                            width: fieldObj.label === "Street" ? "490px" : "100%",
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

                        {/* 🔴 ERROR MESSAGE BELOW INPUT */}
                        {errors[fieldKeyMap[fieldObj.label]] && (
                          <Typography sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                            {errors[fieldKeyMap[fieldObj.label]]}
                          </Typography>
                        )}
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

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        id={`upload-${field}`}
                        multiple
                        accept="image/*"
                        aria-label={`Upload Image for ${field}`}
                        style={{ display: "none" }}
                        onChange={(event) => {
                          handleFileSelect(field, event);

                          // clear error on upload
                          setErrors({
                            ...errors,
                            [fieldKeyMap[field]]: "",
                          });
                        }}
                      />

                      {/* Upload Button */}
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

                      {/* 🔴 INLINE ERROR BELOW BUTTON */}
                      {errors[fieldKeyMap[field]] && (
                        <Typography sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                          {errors[fieldKeyMap[field]]}
                        </Typography>
                      )}

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
            {/* <Card sx={{ bgcolor: "#F0F6F6", boxShadow: "none", mb: 3 }}>
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
        onChange={(e) => {
          setFormValues({
            ...formValues,
            [fieldKeyMap[fieldObj.label]]: e.target.value,
          });

          // ⬅ clear error on typing
          setErrors({
            ...errors,
            [fieldKeyMap[fieldObj.label]]: "",
          });
        }}
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
              {/* <Button
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
                onClick={resetForm}
              >
                Clear
              </Button> */}

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

export default AddLsp;
