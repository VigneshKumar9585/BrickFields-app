// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import Navbar from "../../componts/Navbar.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button as MuiButton,
    Grid as MuiGrid,
} from "@mui/material";
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
} from "@mui/icons-material";
import { Eye, X } from "lucide-react";
import logo from "../../assets/logo/logo.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


function EditLsp() {
    const { id } = useParams();
    const isEditMode = true;  // Always edit mode
    const navigate = useNavigate();
    const [existingDocs, setExistingDocs] = useState({});
    const [aadhaarCard, setAadhaarCard] = useState([]);
    const [degreeCertificate, setDegreeCertificate] = useState([]);
    const [provisionalCertificate, setProvisionalCertificate] = useState([]);
    const [experienceCertificate, setExperienceCertificate] = useState([]);



    const [viewImages, setViewImages] = useState([]);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    console.log("Editing lsp ID:", existingDocs);

useEffect(() => {
  if (!id) return;

  axios.get(`${BACKEND_URL}/api/get-lsp/${id}`)
    .then((res) => {
      const data = res.data;

      setFormValues({
        companyName: data.companyName || "",
        businessType: data.businessType || "",
        companyPhoneNumber: data.companyPhoneNumber || "",
        contactPerson: data.contactPerson || "",
        pointOfContactNumber: data.pointOfContactNumber || "",
        serviceableCities: data.serviceableCities || "",
        email: data.email || "",

        street: data.street || "",
        state: data.state || "",
        district: data.district || "",
        city: data.city || "",
        region: data.region || "",
        country: data.country || "",

        aadhaarCard: "",
        gstDocument: "",
        companyDocument: "",
      });

      setAadhaarCard(data.aadhaarCard || []);
      setDegreeCertificate(data.gstDocument || []);
      setProvisionalCertificate(data.companyDocument || []);
    })
    .catch((err) => console.error(err));
}, [id]);



    console.log(aadhaarCard, degreeCertificate, provisionalCertificate, experienceCertificate);


  const fieldKeyMap = {
  "Company Name": "companyName",
  "Business Type": "businessType",
  "Company Phone NO": "companyPhoneNumber",
  "Point Of Contact person": "contactPerson",
  "Point Of Contact Number": "pointOfContactNumber",
  "Serviceable Cities": "serviceableCities",

  "Email ID": "email",
//   "Password": "password",

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



    const personalFields = [
  { label: "Company Name", icon: <HomeWorkIcon sx={{ color: "#029898" }} /> },
  { label: "Business Type", icon: <HomeWorkIcon sx={{ color: "#029898" }} /> },
  { label: "Company Phone NO", icon: <PhoneIcon sx={{ color: "#029898" }} /> },
  { label: "Point Of Contact person", icon: <PersonIcon sx={{ color: "#029898" }} /> },
  { label: "Point Of Contact Number", icon: <PhoneIcon sx={{ color: "#029898" }} /> },
  { label: "Serviceable Cities", icon: <LocationOnIcon sx={{ color: "#029898" }} /> },

  { label: "Email ID", icon: <EmailIcon sx={{ color: "#029898" }} /> },
//   { label: "Password", icon: <LockIcon sx={{ color: "#029898" }} /> },

  // Address
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
  contactPerson: "",
  pointOfContactNumber: "",
  serviceableCities: "",
  email: "",

  street: "",
  state: "",
  district: "",
  city: "",
  region: "",
  country: "",

  aadhaarCard: "",
  gstDocument: "",
  companyDocument: "",
});






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

    const [errors, setErrors] = useState({});

    // const validate = () => {
    //     let temp = {};
    //     if (!formValues.name) temp.name = "Name is required";
    //     if (!formValues.phoneNumber) temp.phoneNumber = "Mobile No is required";
    //     else if (!/^\d{10}$/.test(formValues.phoneNumber)) temp.phoneNumber = "Mobile No must be 10 digits";

    //     if (!formValues.email) temp.email = "Email is required";
    //     else if (!/\S+@\S+\.\S+/.test(formValues.email)) temp.email = "Email is invalid";

    //     if (formValues.password && formValues.password.length < 6) temp.password = "Password must be at least 6 characters";

    //     setErrors(temp);
    //     return Object.keys(temp).length === 0;
    // };

    const handleSubmit = async () => {
        // if (!validate()) return;
        const formData = new FormData();

        // PERSONAL FIELDS
        personalFields.forEach((f) => {
            const key = fieldKeyMap[f.label];
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
            await axios.put(`${BACKEND_URL}/api/update-lsp/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("lsp Updated Successfully!");
            // setTimeout(() => navigate("/admin-manage-user"), 1000);

        } catch (error) {
            console.error(error);
            toast.error("Failed to update lsp.");
        }
    };

    const getStoredImages = (field) => {
        switch (field) {
            case "Adhaar Card":
                return aadhaarCard;
            case "Degree Certificate":
                return degreeCertificate;
            case "Provisional Certificate":
                return provisionalCertificate;
            case "Experience Certificate":
                return experienceCertificate;
            default:
                return [];
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
                            Edit lsp
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
                                                    onChange={(e) =>
                                                        setFormValues({
                                                            ...formValues,
                                                            [fieldKeyMap[fieldObj.label]]: e.target.value
                                                        })
                                                    }
                                                    placeholder={
                                                        ["country", "state", "region", "district"].includes(fieldObj.label)
                                                            ? ""
                                                            : `Enter ${fieldObj.label}`
                                                    }
                                                    sx={{
                                                        ...getTextFieldSx(fieldObj.label),
                                                        width: fieldObj.label === "Street" ? "500px" : "100%",
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
                                            <Button
                                                sx={{
                                                    width: "100%",
                                                    height: "35px",
                                                    mt: 1,
                                                    textTransform: "none",
                                                    fontSize: "13px",
                                                    color: "#027676",
                                                    backgroundColor: "#E6F7F7",
                                                    borderRadius: "8px",
                                                    border: "1px solid #b2dfdf",
                                                }}
                                                onClick={() => {
                                                    const stored = getStoredImages(field);
                                                    setViewImages(stored);
                                                    setOpenViewModal(true);
                                                }}
                                            >
                                                View Stored Images
                                            </Button>


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
                                                error={!!errors[fieldKeyMap[fieldObj.label]]}
                                                helperText={errors[fieldKeyMap[fieldObj.label]]}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card> */}

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
                                Update
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

            <Dialog
                open={openViewModal}
                onClose={() => setOpenViewModal(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        overflow: "hidden",
                    },
                }}
            >
                {/* HEADER */}
                <DialogTitle
                    sx={{
                        backgroundColor: "#029898",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "18px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1.5,
                        px: 2,
                    }}
                >
                    Stored Images
                    <Button
                        onClick={() => setOpenViewModal(false)}
                        sx={{
                            color: "#029898",
                            bgcolor: "white",
                            textTransform: "none",
                            fontSize: "12px",
                            fontWeight: 600,
                            borderRadius: "6px",
                            "&:hover": {
                                bgcolor: "#f1f1f1",
                            },
                        }}
                    >
                        Close
                    </Button>
                </DialogTitle>

                <DialogContent sx={{ mt: 2, pb: 3 }}>
                    {viewImages.length === 0 ? (
                        <Typography sx={{ textAlign: "center", color: "gray" }}>
                            No stored images for this document.
                        </Typography>
                    ) : (
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            gap={2}
                            justifyContent="center"
                        >
                            {viewImages.map((imgName, i) => {
                                const fullUrl = `${BACKEND_URL}/upload-lsp-images/${imgName}`;
                                return (
                                    <Box
                                        key={i}
                                        sx={{
                                            width: "220px",
                                            height: "220px",
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                                            border: "1px solid #e3e3e3",
                                            transition: "0.3s",
                                            cursor: "pointer",
                                            "&:hover": {
                                                transform: "scale(1.03)",
                                                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                                            },
                                        }}
                                        onClick={() => setPreviewImage(fullUrl)}
                                    >
                                        <img
                                            src={fullUrl}
                                            alt="doc"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                        {/* Eye Overlay Optional - simplified click to view */}
                                    </Box>
                                )
                            })}
                        </Box>
                    )}
                </DialogContent>
            </Dialog>

            {/* Full Screen Image Preview Dialog */}
            <Dialog
                open={Boolean(previewImage)}
                onClose={() => setPreviewImage(null)}
                maxWidth="xl"
                PaperProps={{
                    sx: {
                        bgcolor: "transparent",
                        boxShadow: "none",
                        overflow: "hidden",
                        maxHeight: "95vh",
                        maxWidth: "95vw",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }}
                slotProps={{
                    backdrop: {
                        sx: { backgroundColor: "rgba(0, 0, 0, 0.9)" }
                    }
                }}
            >
                <Box sx={{ position: "relative", outline: "none" }}>
                    <IconButton
                        onClick={() => setPreviewImage(null)}
                        sx={{
                            position: "absolute",
                            top: -40,
                            right: 0,
                            color: "white",
                            bgcolor: "rgba(255,255,255,0.2)",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.3)" }
                        }}
                    >
                        <X size={24} />
                    </IconButton>
                    <img
                        src={previewImage}
                        alt="Full Preview"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "90vh",
                            borderRadius: "8px",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
                        }}
                    />
                </Box>
            </Dialog>



        </>
    );
}

export default EditLsp;
