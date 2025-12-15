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
    Chip,
    Card,
    CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PushPinIcon from "@mui/icons-material/PushPin";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// --- Styled Components ---
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

const TimeSlotButton = styled(Button)(({ selected }) => ({
    padding: "14px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "none",
    minWidth: "110px",
    border: `2px solid ${selected ? "#029898" : "#e0e0e0"}`,
    backgroundColor: selected ? "#029898" : "#fff",
    color: selected ? "#fff" : "#555",
    transition: "all 0.3s ease",
    boxShadow: selected ? "0 4px 12px rgba(2,152,152,0.25)" : "none",
    "&:hover": {
        borderColor: "#029898",
        backgroundColor: selected ? "#027878" : "#f0f9f9",
        transform: "translateY(-3px)",
        boxShadow: "0 6px 16px rgba(2,152,152,0.2)",
    },
    "&:disabled": {
        backgroundColor: "#f5f5f5",
        color: "#ccc",
        borderColor: "#e0e0e0",
        cursor: "not-allowed",
    }
}));

const SlotBookingCard = styled(Card)({
    background: "linear-gradient(135deg, #f8fdfe 0%, #eef9f9 100%)",
    borderRadius: "16px",
    border: "1px solid #d0e8e8",
    boxShadow: "0 6px 20px rgba(2,152,152,0.08)",
    overflow: "visible",
});

export default function EnquiryForm() {
    const [formData, setFormData] = useState({
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
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    // Available time slots
    const timeSlots = [
        "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    // Check if a date is in the past
    const isPastDate = (dateString) => {
        if (!dateString) return false;
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate < today;
    };

    // Format time for display (24h to 12h)
    const formatTimeDisplay = (time24) => {
        const [hours, minutes] = time24.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

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

        if (!formData.preferDate) {
            newErrors.preferDate = "Please select a slot date";
        } else if (isPastDate(formData.preferDate)) {
            newErrors.preferDate = "Cannot select a past date";
        }

        if (!formData.preferTime) {
            newErrors.preferTime = "Please select a time slot";
        }

        return newErrors;
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        if (newValue) {
            const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
            setFormData({ ...formData, preferDate: formattedDate, preferTime: "" });
            if (errors.preferDate) {
                setErrors({ ...errors, preferDate: "" });
            }
        } else {
            setFormData({ ...formData, preferDate: "", preferTime: "" });
        }
    };

    const handleTimeSlotSelect = (time) => {
        setFormData({ ...formData, preferTime: time });
        if (errors.preferTime) {
            setErrors({ ...errors, preferTime: "" });
        }
    };

    const handleImageUpload = (e) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files);
            // Validate file size (5MB max)
            const validImages = newImages.filter(img => {
                if (img.size > 5 * 1024 * 1024) {
                    toast.error(`${img.name} exceeds 5MB limit`);
                    return false;
                }
                return true;
            });
            setImages((prev) => [...prev, ...validImages]);
        }
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fill all required fields correctly");
            return;
        }

        // Prepare form-data
        const sendData = new FormData();
        Object.keys(formData).forEach(key => sendData.append(key, formData[key]));
        images.forEach(img => sendData.append("siteImage", img));

        try {
            await axios.post(
                `${BACKEND_URL}/api/create-enquiry`,
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

            setSelectedDate(null);
            setImages([]);
            setErrors({});

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to submit enquiry!");
        }
    };

    // Component Helper
    const InputField = ({ label, field, icon, type = "text", xs = 12, sm = 6, multiline = false, rows = 1 }) => {
        return (
            <Grid item xs={xs} sm={sm}>
                <Typography fontSize="13px" fontWeight={600} color="#555" mb={0.8} ml={0.5}>
                    {label}
                </Typography>

                <CustomTextField
                    fullWidth
                    type={type}
                    multiline={multiline}
                    rows={rows}
                    placeholder={label}
                    value={formData[field]}
                    onChange={(e) => {
                        handleChange(field, e.target.value);
                    }}
                    error={Boolean(errors[field])}
                    helperText={errors[field] || ""}
                    InputProps={{
                        startAdornment: !multiline ? (
                            <InputAdornment position="start" sx={{ color: "#029898", opacity: 0.7 }}>
                                {icon}
                            </InputAdornment>
                        ) : null,
                    }}
                    sx={multiline ? {
                        "& .MuiOutlinedInput-root": {
                            alignItems: "flex-start",
                            paddingTop: "14px",
                        }
                    } : {}}
                />
            </Grid>
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                {InputField({ label: "Phone Number", field: "phoneNumber", icon: <PhoneIcon />, type: "number", sm: 6 })}
                                {InputField({ label: "Email Address", field: "email", icon: <EmailIcon />, type: "email", sm: 12 })}
                            </Grid>
                        </Box>

                        <Divider sx={{ borderColor: "#eee" }} />

                        {/* SECTION 2: Location Details */}
                        <Box p={4}>
                            <SectionHeader>
                                <Box className="icon-wrapper"><HomeWorkIcon fontSize="small" /></Box>
                                <Typography className="title">Location Details</Typography>
                            </SectionHeader>

                            <Grid container spacing={3}>
                                {InputField({ label: "State", field: "state", icon: <MapIcon />, sm: 6 })}
                                {InputField({ label: "District", field: "district", icon: <LocationOnIcon />, sm: 6 })}
                                {InputField({ label: "City", field: "city", icon: <MyLocationIcon />, sm: 6 })}
                                {InputField({ label: "Landmark", field: "landmark", icon: <PushPinIcon />, sm: 6 })}
                                {/* Street - Full Width with Multiline */}
                                {InputField({ label: "Street", field: "street", icon: <MapsHomeWorkIcon />, xs: 12, sm: 12 })}
                            </Grid>
                        </Box>

                        <Divider sx={{ borderColor: "#eee" }} />

                        {/* SECTION 3: Project Requirements */}
                        <Box p={4}>
                            <SectionHeader>
                                <Box className="icon-wrapper"><SquareFootIcon fontSize="small" /></Box>
                                <Typography className="title">Project Requirements</Typography>
                            </SectionHeader>
                            <Grid container spacing={3}>
                                {InputField({ label: "Total Area (Sq. Ft)", field: "sqFeet", icon: <SquareFootIcon />, type: "number", sm: 12 })}
                            </Grid>
                        </Box>

                        <Divider sx={{ borderColor: "#eee" }} />

                        {/* SECTION 4: Slot Booking - Enhanced */}
                        <Box p={4}>
                            <SectionHeader>
                                <Box className="icon-wrapper"><EventAvailableIcon fontSize="small" /></Box>
                                <Typography className="title">Book Your Inspection Slot</Typography>
                            </SectionHeader>

                            <SlotBookingCard elevation={0}>
                                <CardContent sx={{ p: 3 }}>
                                    <Grid container spacing={4}>
                                        {/* Date Selection with MUI DatePicker */}
                                        <Grid item xs={12} md={formData.preferDate ? 6 : 12}>
                                            <Box
                                                sx={{
                                                    p: 3,
                                                    bgcolor: "#fff",
                                                    borderRadius: "12px",
                                                    border: "2px solid #e0e0e0",
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        borderColor: "#029898",
                                                        boxShadow: "0 4px 12px rgba(2,152,152,0.1)"
                                                    }
                                                }}
                                            >
                                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                                    <CalendarTodayIcon sx={{ color: "#029898", fontSize: 20 }} />
                                                    <Typography fontSize="15px" fontWeight={700} color="#2c3e50">
                                                        Select Date
                                                    </Typography>
                                                </Box>

                                                <DatePicker
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    minDate={dayjs()}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            error: Boolean(errors.preferDate),
                                                            helperText: errors.preferDate || "",
                                                            placeholder: "Select a date",
                                                            InputProps: {
                                                                startAdornment: (
                                                                    <InputAdornment position="start" sx={{ color: "#029898", opacity: 0.7 }}>
                                                                        <CalendarTodayIcon />
                                                                    </InputAdornment>
                                                                ),
                                                            },
                                                            sx: {
                                                                "& .MuiOutlinedInput-root": {
                                                                    backgroundColor: "#f9fbfb",
                                                                    borderRadius: "8px",
                                                                    transition: "all 0.2s ease",
                                                                    "& fieldset": { borderColor: "#e0e0e0" },
                                                                    "&:hover fieldset": { borderColor: "#b2e0e0" },
                                                                    "&.Mui-focused": {
                                                                        backgroundColor: "#fff",
                                                                        boxShadow: "0 4px 12px rgba(2,152,152,0.08)",
                                                                        "& fieldset": {
                                                                            borderColor: "#029898",
                                                                            borderWidth: "1px"
                                                                        },
                                                                    },
                                                                },
                                                                "& .MuiInputBase-input": {
                                                                    fontSize: "14px",
                                                                    padding: "14px",
                                                                    color: "#2d3748",
                                                                },
                                                            }
                                                        },
                                                        popper: {
                                                            sx: {
                                                                "& .MuiPaper-root": {
                                                                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                                                    borderRadius: "12px",
                                                                    border: "1px solid #e0e0e0",
                                                                    marginTop: "8px",
                                                                },
                                                                "& .MuiPickersCalendarHeader-root": {
                                                                    paddingLeft: "12px",
                                                                    paddingRight: "12px",
                                                                    marginTop: "8px",
                                                                    marginBottom: "4px",
                                                                },
                                                                "& .MuiPickersCalendarHeader-label": {
                                                                    fontSize: "14px",
                                                                    fontWeight: 600,
                                                                },
                                                                "& .MuiDayCalendar-header": {
                                                                    gap: "4px",
                                                                },
                                                                "& .MuiDayCalendar-weekContainer": {
                                                                    margin: "2px 0",
                                                                },
                                                                "& .MuiPickersDay-root": {
                                                                    fontSize: "13px",
                                                                    width: "32px",
                                                                    height: "32px",
                                                                    margin: "2px",
                                                                    "&.Mui-selected": {
                                                                        backgroundColor: "#029898",
                                                                        "&:hover": {
                                                                            backgroundColor: "#027878",
                                                                        },
                                                                    },
                                                                    "&:hover": {
                                                                        backgroundColor: "#e0f2f2",
                                                                    },
                                                                },
                                                                "& .MuiPickersYear-yearButton": {
                                                                    fontSize: "13px",
                                                                    "&.Mui-selected": {
                                                                        backgroundColor: "#029898",
                                                                        "&:hover": {
                                                                            backgroundColor: "#027878",
                                                                        },
                                                                    },
                                                                },
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>

                                        {/* Time Slot Selection - Only show when date is selected */}
                                        {formData.preferDate && (
                                            <Grid item xs={12} md={6}>
                                                <Box
                                                    sx={{
                                                        p: 3,
                                                        bgcolor: "#fff",
                                                        borderRadius: "12px",
                                                        border: "2px solid #e0e0e0",
                                                        minHeight: "200px",
                                                        transition: "all 0.3s ease",
                                                        "&:hover": {
                                                            borderColor: "#029898",
                                                            boxShadow: "0 4px 12px rgba(2,152,152,0.1)"
                                                        }
                                                    }}
                                                >
                                                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                                                        <AccessTimeIcon sx={{ color: "#029898", fontSize: 20 }} />
                                                        <Typography fontSize="15px" fontWeight={700} color="#2c3e50">
                                                            Select Time
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                        {timeSlots.map((slot) => (
                                                            <TimeSlotButton
                                                                key={slot}
                                                                selected={formData.preferTime === slot}
                                                                onClick={() => handleTimeSlotSelect(slot)}
                                                                size="small"
                                                            >
                                                                {formatTimeDisplay(slot)}
                                                            </TimeSlotButton>
                                                        ))}
                                                    </Box>

                                                    {errors.preferTime && (
                                                        <Typography color="error" fontSize="12px" mt={1.5}>
                                                            {errors.preferTime}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Grid>
                                        )}

                                        {/* Selected Slot Confirmation */}
                                        {formData.preferDate && formData.preferTime && (
                                            <Grid item xs={12}>
                                                <Fade in={true}>
                                                    <Box
                                                        sx={{
                                                            p: 2.5,
                                                            bgcolor: "#029898",
                                                            borderRadius: "12px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 2,
                                                            boxShadow: "0 4px 16px rgba(2,152,152,0.3)"
                                                        }}
                                                    >
                                                        <CheckCircleIcon sx={{ color: "#fff", fontSize: 28 }} />
                                                        <Box flex={1}>
                                                            <Typography fontSize="12px" color="rgba(255,255,255,0.9)" mb={0.5}>
                                                                Your Selected Slot
                                                            </Typography>
                                                            <Typography fontSize="16px" color="#fff" fontWeight={700}>
                                                                {new Date(formData.preferDate).toLocaleDateString('en-GB', {
                                                                    weekday: 'long',
                                                                    day: '2-digit',
                                                                    month: 'long',
                                                                    year: 'numeric'
                                                                })} at {formatTimeDisplay(formData.preferTime)}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Fade>
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </SlotBookingCard>
                        </Box>

                        <Divider sx={{ borderColor: "#eee" }} />

                        {/* SECTION 5: Uploads */}
                        <Box p={4}>
                            <SectionHeader>
                                <Box className="icon-wrapper"><CloudUploadIcon fontSize="small" /></Box>
                                <Typography className="title">Site Images / Documents</Typography>
                            </SectionHeader>

                            <Grid>
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
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        hidden
                                        onChange={handleImageUpload}
                                    />
                                </Grid>

                                {/* Image Previews */}
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
            </Box >
        </LocalizationProvider >
    );
}