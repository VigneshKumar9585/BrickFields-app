import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Grid,
    Typography,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Divider,
    Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DescriptionIcon from '@mui/icons-material/Description';
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PushPinIcon from "@mui/icons-material/PushPin";
// --- Styled Components ---

const FormPaper = styled(Paper)(() => ({
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid #e0e0e0",
    boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
    overflow: "hidden",
}));

const SectionHeader = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
    "& .icon-wrapper": {
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        backgroundColor: "#e0f2f2",
        color: "#029898",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    "& .title": {
        fontSize: "17px",
        fontWeight: 700,
        color: "#2c3e50",
    }
}));

const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#f9fbfb",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        "& fieldset": { borderColor: "#e0e0e0" },
        "&:hover fieldset": { borderColor: "#b2e0e0" },
        "&.Mui-focused": {
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(2,152,152,0.08)",
            "& fieldset": { borderColor: "#029898", borderWidth: "1px" },
        },
    },
    "& .MuiInputBase-input": {
        fontSize: "14px",
        padding: "14px",
        color: "#2d3748",
    },
});

const DropBox = styled(Box)(() => ({
    width: "100%",
    height: "140px",
    border: "2px dashed #b2e0e0",
    borderRadius: "12px",
    background: "#f8fdfe",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    "&:hover": {
        borderColor: "#029898",
        backgroundColor: "#effffb",
        transform: "translateY(-2px)",
    },
}));

const ImagePreviewCard = styled(Box)(() => ({
    position: "relative",
    width: "90px",
    height: "90px",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #eee",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
}));

export default function EnquiryForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        state: "",
        district: "",
        street: "",
        // country:"",
        city: "",
        landmark: "",
        sqFeet: "",
        preferDate: "",
        preferTime: "",
    });
    const [errors, setErrors] = useState({});

    const [images, setImages] = useState([]);
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full Name is required";

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone Number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Phone Number must be 10 digits";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid Email format";
        }

        if (!formData.state) newErrors.state = "State is required";
        if (!formData.district) newErrors.district = "District is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.street) newErrors.street = "Street is required";
        if (!formData.landmark) newErrors.landmark = "Landmark is required";

        if (!formData.sqFeet || formData.sqFeet <= 0)
            newErrors.sqFeet = "Area is required";

        if (!formData.preferDate) newErrors.preferDate = "Preferred date is required";
        if (!formData.preferTime) newErrors.preferTime = "Preferred time is required";

        return newErrors;
    };



    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleImageUpload = (e) => {
        if (e.target.files) {
            setImages((prev) => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // do NOT show toast here
        }

        // prepare form-data
        const sendData = new FormData();
        Object.keys(formData).forEach(key => sendData.append(key, formData[key]));
        images.forEach(img => sendData.append("siteImage", img));

        try {
            await axios.post(
                "https://bf-back.appblocky.com/api/create-enquiry",
                sendData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success("Enquiry submitted successfully!");

            // Reset form
            setFormData({
                name: "",
                email: "",
                phoneNumber: "",
                state: "",
                district: "",
                street: "",
                city: "",
                landmark: "",
                sqFeet: "",
                preferDate: "",
                preferTime: "",
            });

            setImages([]);
            setErrors({}); // clear errors

        } catch (err) {
            toast.error("Failed to submit enquiry!");
        }
    };



    // Component Helper
    const InputField = ({ label, field, icon, type = "text", xs = 12, sm = 6 }) => {
        return (
            <Grid item xs={xs} sm={sm}>
                <Typography fontSize="13px" fontWeight={600} color="#555" mb={0.8} ml={0.5}>
                    {label}
                </Typography>

                <CustomTextField
                    fullWidth
                    type={type}
                    placeholder={label}
                    value={formData[field]}
                    onChange={(e) => {
                        handleChange(field, e.target.value);
                        setErrors({ ...errors, [field]: "" });
                    }}
                    error={Boolean(errors[field])}
                    helperText={errors[field] || ""}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" sx={{ color: "#029898", opacity: 0.7 }}>
                                {icon}
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        min: type === "date" ? new Date().toISOString().split("T")[0] : undefined,
                    }}
                />

            </Grid>
        );
    };



    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f4f7f8", py: 5, px: 2 }}>
            <ToastContainer
                position="top-right"
                theme="colored"
                autoClose={2000}
                hideProgressBar={true}
                pauseOnHover={true}
            />



            <Box sx={{ maxWidth: "850px", margin: "0 auto" }}>

                {/* Header */}
                <Box textAlign="center" mb={5}>
                    <Typography variant="h4" fontWeight={800} color="#029898">
                        Book Your Property Check Now
                    </Typography>
                    <Typography color="text.secondary" mt={1}>
                        Fill out the details below to start your project enquiry.
                    </Typography>
                </Box>

                <FormPaper elevation={0}>

                    {/* SECTION 1: Personal Details */}
                    <Box p={4}>
                        <SectionHeader>
                            <Box className="icon-wrapper"><PersonIcon fontSize="small" /></Box>
                            <Typography className="title">Personal Information</Typography>
                        </SectionHeader>
                        <Grid container spacing={3}>
                            {InputField({ label: "Full Name", field: "name", icon: <PersonIcon />, sm: 6 })}
                            {InputField({ label: "Phone Number  ", field: "phoneNumber", icon: <PhoneIcon />, type: "number", sm: 6 })}
                            {InputField({ label: "Email Address", field: "email", icon: <EmailIcon />, type: "email", sm: 12 })}
                        </Grid>
                    </Box>

                    <Divider sx={{ borderColor: "#eee" }} />

                    {/* SECTION 2: Location (State/District + Address) */}
                    <Box p={4}>
                        <SectionHeader>
                            <Box className="icon-wrapper"><HomeWorkIcon fontSize="small" /></Box>
                            <Typography className="title">Location Details</Typography>
                        </SectionHeader>

                        <Grid container spacing={3}>
                            {/* Row 1: State & District */}
                            {InputField({ label: "State", field: "state", icon: <MapIcon />, sm: 6 })}
                            {InputField({ label: "District", field: "district", icon: <LocationOnIcon />, sm: 6 })}
                            {InputField({ label: "City", field: "city", icon: <MyLocationIcon />, sm: 6 })}
                            {InputField({ label: "Street", field: "street", icon: <MapsHomeWorkIcon />, sm: 8, xs: 12 })}
                            {InputField({ label: "Landmark", field: "landmark", icon: <PushPinIcon />, sm: 6 })}
                        </Grid>
                    </Box>

                    <Divider sx={{ borderColor: "#eee" }} />

                    {/* SECTION 3: Requirements */}
                    <Box p={4}>
                        <SectionHeader>
                            <Box className="icon-wrapper"><SquareFootIcon fontSize="small" /></Box>
                            <Typography className="title">Project Requirements</Typography>
                        </SectionHeader>
                        <Grid container spacing={3}>
                            {InputField({ label: "Total Area (Sq. Ft)", field: "sqFeet", icon: <SquareFootIcon />, type: "number", sm: 4 })}
                            {InputField({
                                label: "Preferred Date",
                                field: "preferDate",
                                icon: <CalendarTodayIcon />,
                                type: "date",
                                sm: 4,
                                min: new Date().toISOString().split("T")[0]
                            })}
                            {InputField({ label: "Preferred Time", field: "preferTime", icon: <AccessTimeIcon />, type: "time", sm: 4 })}
                        </Grid>
                    </Box>

                    <Divider sx={{ borderColor: "#eee" }} />

                    {/* SECTION 4: Uploads */}
                    <Box p={4}>
                        <SectionHeader>
                            <Box className="icon-wrapper"><CloudUploadIcon fontSize="small" /></Box>
                            <Typography className="title">Site Images / Documents</Typography>
                        </SectionHeader>

                        {/* DROPBOX - FULL WIDTH */}
                        <Grid >
                            <Grid item xs={12} lg={12}>
                                <DropBox onClick={() => document.getElementById("imageUpload").click()}>
                                    <CloudUploadIcon sx={{ fontSize: 44, color: "#029898", mb: 1, opacity: 0.6 }} />
                                    <Typography fontWeight={600} color="#029898">
                                        Click to Upload Site Images
                                    </Typography>
                                    <Typography fontSize="12px" color="#999">
                                        Max size: 5MB per file
                                    </Typography>
                                </DropBox>
                                <input id="imageUpload" type="file" accept="image/*" multiple hidden onChange={handleImageUpload} width="100%" />
                            </Grid>

                            {/* PREVIEWS - BELOW DROPBOX */}
                            {images.length > 0 && (
                                <Grid item xs={12}>
                                    <Typography fontSize="13px" fontWeight={600} color="#555" mt={3} mb={1}>
                                        Uploaded Files ({images.length})
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                        {images.map((img, index) => (
                                            <Fade in={true} key={index}>
                                                <ImagePreviewCard>
                                                    <img src={URL.createObjectURL(img)} alt="preview" />
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => removeImage(index)}
                                                        sx={{
                                                            position: "absolute",
                                                            top: 2,
                                                            right: 2,
                                                            bgcolor: "rgba(255,255,255,0.9)",
                                                            padding: "3px",
                                                            "&:hover": { bgcolor: "#fff", color: "red" }
                                                        }}
                                                    >
                                                        <DeleteOutlineIcon sx={{ fontSize: "16px" }} />
                                                    </IconButton>
                                                </ImagePreviewCard>
                                            </Fade>
                                        ))}
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Box>

                    {/* Footer Button */}
                    <Box p={3} bgcolor="#f8fdfe" borderTop="1px solid #eef2f2" textAlign="right">
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                bgcolor: "#029898",
                                color: "#fff",
                                px: 6,
                                py: 1.5,
                                fontSize: "16px",
                                fontWeight: 600,
                                borderRadius: "8px",
                                textTransform: "none",
                                boxShadow: "0 8px 16px rgba(2, 152, 152, 0.2)",
                                "&:hover": { bgcolor: "#027c7c", boxShadow: "0 8px 20px rgba(2, 152, 152, 0.3)" },
                            }}
                        >
                            Submit Enquiry
                        </Button>
                    </Box>

                </FormPaper>
            </Box>
        </Box>
    );
}