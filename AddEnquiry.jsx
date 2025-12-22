import React, { useState, useEffect } from "react";
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
    MenuItem,
    CircularProgress,
    Alert,
    Select,
    FormControl,
    FormHelperText,
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
import NavigationIcon from "@mui/icons-material/Navigation";
import GroupIcon from "@mui/icons-material/Group";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// --- Styled Components ---
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FormPaper = styled(Paper)(() => ({
    borderRadius: "24px",
    background: "#ffffff",
    border: "1px solid #e0e7ff",
    boxShadow: "0 20px 60px rgba(99, 102, 241, 0.08)",
    overflow: "hidden",
}));

const SectionHeader = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
    paddingBottom: "16px",
    borderBottom: "2px solid #f0f4ff",
    "& .icon-wrapper": {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "linear-gradient(135deg, #029898 0%, #029898 100%)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 8px 16px rgba(99, 102, 241, 0.2)",
        fontSize: "24px",
    },
    "& .title": {
        fontSize: "20px",
        fontWeight: 700,
        color: "#1e293b",
        letterSpacing: "-0.5px",
    }
}));

const SectionDivider = styled(Divider)(() => ({
    borderColor: "#e0e7ff",
    margin: "0 !important",
}));

const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "& fieldset": {
            borderColor: "#e2e8f0",
            borderWidth: "2px"
        },
        "&:hover": {
            backgroundColor: "#f1f5f9",
            "& fieldset": {
                borderColor: "#cbd5e1",
            }
        },
        "&.Mui-focused": {
            backgroundColor: "#fff",
            boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)",
            "& fieldset": {
                borderColor: "#029898",
                borderWidth: "2px"
            },
        },
    },
    "& .MuiInputBase-input": {
        fontSize: "15px",
        padding: "14px 16px",
        color: "#334155",
        fontWeight: "500",
    },
    "& .MuiFormHelperText-root": {
        marginLeft: "4px",
        fontSize: "13px",
        fontWeight: "500",
    }
});

// NEW: Separate styled component for Select dropdowns
const CustomSelect = styled(Select)({
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e2e8f0",
        borderWidth: "2px",
    },
    "&:hover": {
        backgroundColor: "#f1f5f9",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#cbd5e1",
        }
    },
    "&.Mui-focused": {
        backgroundColor: "#fff",
        boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#029898",
            borderWidth: "2px",
        }
    },
    "&.Mui-disabled": {
        backgroundColor: "#f1f5f9",
        cursor: "not-allowed",
    },
    "& .MuiSelect-select": {
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    "& .MuiSelect-icon": {
        color: "#029898",
        fontSize: "24px",
    }
});

const DropBox = styled(Box)(() => ({
    width: "100%",
    height: "180px",
    border: "3px dashed #cbd5e1",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    marginTop: "16px",
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
    },
    "&:hover": {
        borderColor: "#029898",
        backgroundColor: "#eef2ff",
        transform: "translateY(-4px)",
        boxShadow: "0 12px 32px rgba(99, 102, 241, 0.15)",
        "&::before": {
            opacity: 1,
        }
    },
}));

const ImagePreviewCard = styled(Box)(() => ({
    position: "relative",
    width: "110px",
    height: "110px",
    borderRadius: "14px",
    overflow: "hidden",
    border: "3px solid #e0e7ff",
    boxShadow: "0 8px 20px rgba(99, 102, 241, 0.12)",
    transition: "all 0.3s ease",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    "&:hover": {
        transform: "scale(1.08) rotate(2deg)",
        borderColor: "#029898",
        boxShadow: "0 12px 28px rgba(99, 102, 241, 0.25)",
    }
}));

const TimeSlotButton = styled(Button)(({ selected }) => ({
    padding: "14px 24px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "none",
    minWidth: "120px",
    border: `2px solid ${selected ? "#029898" : "#e2e8f0"}`,
    backgroundColor: selected ? "#029898" : "#fff",
    color: selected ? "#fff" : "#475569",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: selected ? "0 8px 20px rgba(99, 102, 241, 0.3)" : "0 2px 8px rgba(0,0,0,0.05)",
    "&:hover": {
        borderColor: "#029898",
        backgroundColor: selected ? "#4f46e5" : "#eef2ff",
        transform: "translateY(-2px)",
        boxShadow: selected ? "0 12px 28px rgba(99, 102, 241, 0.4)" : "0 8px 20px rgba(99, 102, 241, 0.15)",
    },
    "&:disabled": {
        backgroundColor: "#f1f5f9",
        color: "#cbd5e1",
        borderColor: "#e2e8f0",
        cursor: "not-allowed",
        transform: "none",
    }
}));

const SlotBookingCard = styled(Card)({
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderRadius: "18px",
    border: "2px solid #e0e7ff",
    boxShadow: "0 12px 32px rgba(99, 102, 241, 0.08)",
    overflow: "visible",
});

const SubmitButton = styled(Button)({
    bgcolor: "#029898",
    color: "#fff",
    padding: "16px 48px",
    fontSize: "16px",
    fontWeight: 700,
    borderRadius: "14px",
    textTransform: "none",
    letterSpacing: "0.5px",
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
    background: "linear-gradient(135deg, #029898 0%, #029898 100%)",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        background: "linear-gradient(135deg, #029898 0%, #029898 100%)",
        boxShadow: "0 14px 40px rgba(99, 102, 241, 0.4)",
        transform: "translateY(-2px)"
    },
    "&:disabled": {
        background: "#e2e8f0",
        color: "#94a3b8",
        boxShadow: "none",
        transform: "none",
        cursor: "not-allowed"
    }
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
        region: "",
        sqFeet: "",
        preferDate: "",
        preferTime: "",
    });
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    // Backend data states
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [availableTechs, setAvailableTechs] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [techAvailability, setTechAvailability] = useState({
        available: null,
        count: 0,
    });


    // Available time slots
    const timeSlots = [
        "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    // Fetch initial data
    useEffect(() => {
        fetchMasterData();
    }, []);

    const fetchMasterData = async () => {
        try {
            setLoadingData(true);
            const [countriesRes, statesRes, districtsRes, citiesRes, regionsRes, techsRes] = await Promise.all([
                axios.get(`${BACKEND_URL}/api/get-countries`),
                axios.get(`${BACKEND_URL}/api/get-states`),
                axios.get(`${BACKEND_URL}/api/get-districts`),
                axios.get(`${BACKEND_URL}/api/get-cities`),
                axios.get(`${BACKEND_URL}/api/get-regions`),
                axios.get(`${BACKEND_URL}/api/get-technician`),
            ]);

            setCountries(countriesRes.data || []);
            setStates(statesRes.data || []);
            setDistricts(districtsRes.data || []);
            setCities(citiesRes.data || []);
            setRegions(regionsRes.data || []);
            setTechnicians(techsRes.data || []);
        } catch (error) {
            console.error("Error fetching master data:", error);
            toast.error("Failed to load location data");
        } finally {
            setLoadingData(false);
        }
    };

    const filteredDistricts = formData.state
        ? districts.filter(d => d.stateName === formData.state)
        : [];

    const filteredCities = formData.district
        ? cities.filter(c => c.districtName === formData.district)
        : [];
    console.log(regions)
    const filteredRegions = formData.city
        ? regions.filter(r => r.cityName === formData.city)
        : [];

    console.log(filteredRegions)

    // Check technician availability when region and time are selected
    useEffect(() => {
        if (formData.region && formData.preferDate && formData.preferTime) {
            checkTechnicianAvailability();
        } else {
            setAvailableTechs([]);
            setTechAvailability(null);
        }
    }, [formData.region, formData.preferDate, formData.preferTime]);

    const checkTechnicianAvailability = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/check-technician-availability`,
                {
                    region: formData.region,
                    date: formData.preferDate,
                    time: formData.preferTime,
                }
            );

            const techs = response.data.availableTechnicians || [];

            setAvailableTechs(techs);

            setTechAvailability({
                available: response.data.available, // 🔥 backend flag
                count: techs.length,
            });

            if (!response.data.available) {
                toast.warning("No technicians available for this time slot");
            }
        } catch (error) {
            console.error("Availability error:", error);
            setAvailableTechs([]);
            setTechAvailability({
                available: false,
                count: 0,
            });
        }
    };


    const isPastDate = (dateString) => {
        if (!dateString) return false;
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate < today;
    };

    const formatTimeDisplay = (time24) => {
        if (!time24) return "";
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
        if (!formData.region) newErrors.region = "Region is required";
        if (!formData.street) newErrors.street = "Street is required";
        if (!formData.landmark) newErrors.landmark = "Landmark is required";

        if (!formData.sqFeet || formData.sqFeet <= 0)
            newErrors.sqFeet = "Area is required";

        if (!formData.preferDate) {
            newErrors.preferDate = "Please select a preferred date";
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
    // 🔥 GRID LAYOUT CONFIG (CONTROL WIDTH FROM HERE)
const FIELD_LAYOUT = {
  three: { xs: 12, sm: 4, md: 4 },   // 3 fields in one row
  two: { xs: 12, sm: 6, md: 6 },     // 2 fields in one row
  full: { xs: 12, sm: 12, md: 12 },  // full width
};


    const handleSubmit = async () => {
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fill all required fields correctly");
            return;
        }

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

            setFormData({
                name: "",
                email: "",
                phoneNumber: "",
                state: "",
                district: "",
                street: "",
                city: "",
                landmark: "",
                region: "",
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

    // Input Field Component
   // ✅ FIXED INPUT FIELD (GRID CONTROLLED)
const InputField = ({
    label,
    field,
    icon,
    type = "text",
    layout = "normal",
    multiline = false,
    rows = 1,
}) => {
    const grid = FIELD_LAYOUT[layout];

    return (
        <Grid item {...grid}>
            <Typography
                fontSize="14px"
                fontWeight={600}
                color="#475569"
                mb={1.5}
                ml={0.5}
            >
                {label} <span style={{ color: "#ef4444" }}>*</span>
            </Typography>

            <CustomTextField
                fullWidth
                type={type}
                multiline={multiline}
                rows={rows}
                placeholder={`Enter ${label.toLowerCase()}`}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                error={Boolean(errors[field])}
                helperText={errors[field] || ""}
                InputProps={{
                    startAdornment: !multiline ? (
                        <InputAdornment
                            position="start"
                            sx={{ color: "#029898", mr: 0.5 }}
                        >
                            {icon}
                        </InputAdornment>
                    ) : null,
                }}
            />
        </Grid>
    );
};


    // Select Field Component
    const SelectField = ({ label, field, icon, options, disabled = false, xs = 12, sm = 6, valueKey = "name", labelKey = "name" }) => {
        return (
            <Grid item xs={xs} sm={sm}>
                <Typography fontSize="14px" fontWeight={600} color="#475569" mb={1.5} ml={0.5}>
                    {label} <span style={{ color: "#ef4444" }}>*</span>
                </Typography>

                <FormControl fullWidth error={Boolean(errors[field])}>
                    <CustomSelect
                        value={formData[field] || ""}
                        onChange={(e) => handleChange(field, e.target.value)}
                        disabled={disabled || loadingData}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start" sx={{ color: "#029898", ml: 1 }}>
                                {icon}
                            </InputAdornment>
                        }
                        IconComponent={ArrowDropDownIcon}
                    >
                        <MenuItem value="" disabled>
                            <p style={{ color: "#94a3b8" }}>Select {label}</p>
                        </MenuItem>
                        {options.map((option, index) => (
                            <MenuItem
                                key={option._id || index}
                                value={option[valueKey]}
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                    color: "#334155",
                                    "&:hover": {
                                        backgroundColor: "#eef2ff",
                                    },
                                    "&.Mui-selected": {
                                        backgroundColor: "#e0e7ff",
                                        "&:hover": {
                                            backgroundColor: "#ddd6fe",
                                        }
                                    }
                                }}
                            >
                                {option[labelKey]}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                    {errors[field] && (
                        <FormHelperText sx={{ ml: 0.5, fontSize: "13px", fontWeight: "500" }}>
                            {errors[field]}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #f5f3ff 100%)",
                py: 6,
                px: 2,
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "400px",
                    background: "linear-gradient(135deg, #029898 0%, #8b5cf6 100%)",
                    opacity: 0.06,
                    zIndex: 0,
                }
            }}>
                <ToastContainer
                    position="top-right"
                    theme="colored"
                    autoClose={3000}
                    hideProgressBar={false}
                    pauseOnHover={true}
                />

                <Box sx={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                    {/* Header Section */}
                    <Box textAlign="center" mb={6}>
                        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                            <Box sx={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "18px",
                                background: "linear-gradient(135deg, #029898 0%, #8b5cf6 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 12px 32px rgba(99, 102, 241, 0.35)",
                            }}>
                                <HomeWorkIcon sx={{ fontSize: "36px", color: "#fff" }} />
                            </Box>
                        </Box>
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                letterSpacing: "-1.5px",
                                mb: 2,
                                background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Book Your Property Inspection
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "17px",
                                maxWidth: "650px",
                                margin: "0 auto",
                                fontWeight: 500,
                                color: "#64748b",
                                lineHeight: 1.7,
                            }}
                        >
                            Complete the form below to schedule a professional property check. Our expert technicians are ready to assist you.
                        </Typography>
                    </Box>

                    <FormPaper elevation={0}>
                        {/* SECTION 1: Personal Details */}
                        <Box sx={{ p: 5, background: "#fafbfc" }}>
                            <SectionHeader>
                                <Box className="icon-wrapper"><PersonIcon sx={{ fontSize: "24px" }} /></Box>
                                <Typography className="title">Personal Information</Typography>
                            </SectionHeader>
                            <Grid container spacing={3}>
                                {InputField({ label: "Full Name", field: "name", icon: <PersonIcon />, sm: 6 })}
                                {InputField({ label: "Phone Number", field: "phoneNumber", icon: <PhoneIcon />, type: "tel", sm: 6 })}
                                {InputField({ label: "Email Address", field: "email", icon: <EmailIcon />, type: "email", sm: 12 })}
                            </Grid>
                        </Box>

                        <SectionDivider />

                        {/* SECTION 2: Location Details */}
                        <Box sx={{ p: 5 }}>
                            <SectionHeader>
                                <Box className="icon-wrapper"><LocationOnIcon sx={{ fontSize: "24px" }} /></Box>
                                <Typography className="title">Location Details</Typography>
                            </SectionHeader>

                            {loadingData && (
                                <Box display="flex" justifyContent="center" alignItems="center" gap={2} my={4}>
                                    <CircularProgress size={32} sx={{ color: "#029898" }} />
                                    <Typography color="#64748b" fontWeight={600}>Loading locations...</Typography>
                                </Box>
                            )}

                            <Grid container spacing={3}>
                                {/* State Dropdown */}
                                {SelectField({
                                    label: "State",
                                    field: "state",
                                    icon: <MapIcon sx={{ fontSize: "20px" }} />,
                                    options: states,
                                    sm: 6,
                                    valueKey: "stateName",
                                    labelKey: "stateName"
                                })}

                                {/* District Dropdown */}
                                {SelectField({
                                    label: "District",
                                    field: "district",
                                    icon: <LocationOnIcon sx={{ fontSize: "20px" }} />,
                                    options: filteredDistricts,
                                    disabled: !formData.state,
                                    sm: 6,
                                    valueKey: "districtName",
                                    labelKey: "districtName"
                                })}

                                {/* City Dropdown */}
                                {SelectField({
                                    label: "City",
                                    field: "city",
                                    icon: <MyLocationIcon sx={{ fontSize: "20px" }} />,
                                    options: filteredCities,
                                    disabled: !formData.district,
                                    sm: 6,
                                    valueKey: "cityName",
                                    labelKey: "cityName"
                                })}

                                {/* Region Dropdown */}
                                {SelectField({
                                    label: "Region",
                                    field: "region",
                                    icon: <NavigationIcon sx={{ fontSize: "20px" }} />,
                                    options: filteredRegions,
                                    disabled: !formData.city,
                                    sm: 6,
                                    valueKey: "regionName",
                                    labelKey: "regionName"
                                })}

                                {/* Landmark */}
                                {InputField({ label: "Landmark", field: "landmark", icon: <PushPinIcon />, sm: 6 })}

                                {/* Street - Full Width */}
                                {InputField({
                                    label: "Street Name",
                                    field: "street",
                                    icon: <MapsHomeWorkIcon />,
                                    xs: 12,
                                    sm: 12,
                                    md: 12,           // full width on desktop too
                                    //   multiline: true,
                                    //   rows: 2,          // optional: make it a bit taller
                                })}
                            </Grid>
                        </Box>

                        <SectionDivider />

                        {/* SECTION 3: Project Requirements */}
                        <Box sx={{ p: 5, background: "#fafbfc" }}>
                            <SectionHeader>
                                <Box className="icon-wrapper"><SquareFootIcon sx={{ fontSize: "24px" }} /></Box>
                                <Typography className="title">Project Details</Typography>
                            </SectionHeader>
                            <Grid container spacing={3}>
                                {InputField({ label: "Total Area (Sq. Feet)", field: "sqFeet", icon: <SquareFootIcon />, type: "number", sm: 12 })}
                            </Grid>
                        </Box>

                        <SectionDivider />

                        {/* SECTION 4: Slot Booking */}
                        <Box sx={{ p: 5 }}>
                            <SectionHeader>
                                <Box className="icon-wrapper"><EventAvailableIcon sx={{ fontSize: "24px" }} /></Box>
                                <Typography className="title">Book Your Inspection Slot</Typography>
                            </SectionHeader>

                            <SlotBookingCard elevation={0}>
                                <CardContent sx={{ p: 4 }}>
                                    <Grid container spacing={3}>
                                        {/* Date Selection */}
                                        <Grid item xs={12} md={formData.preferDate ? 6 : 12}>
                                            <Box
                                                sx={{
                                                    p: 3.5,
                                                    bgcolor: "#fff",
                                                    borderRadius: "16px",
                                                    border: "2px solid #e0e7ff",
                                                    height: "100%",
                                                    boxShadow: "0 4px 16px rgba(99, 102, 241, 0.08)"
                                                }}
                                            >
                                                <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                                                    <Box sx={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "12px",
                                                        background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}>
                                                        <CalendarTodayIcon sx={{ color: "#029898", fontSize: 20 }} />
                                                    </Box>
                                                    <Typography fontSize="16px" fontWeight={700} color="#1e293b">
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
                                                            placeholder: "Choose your preferred date",
                                                            sx: {
                                                                "& .MuiOutlinedInput-root": {
                                                                    borderRadius: "12px",
                                                                    bgcolor: "#f8fafc",
                                                                    fontSize: "15px",
                                                                    fontWeight: "500",
                                                                    "& fieldset": { borderColor: "#e2e8f0", borderWidth: "2px" },
                                                                    "&:hover fieldset": { borderColor: "#cbd5e1" },
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "#029898",
                                                                        borderWidth: "2px"
                                                                    },
                                                                }
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>

                                        {/* Time Slot Selection */}
                                        {formData.preferDate && (
                                            <Grid item xs={12} md={6}>
                                                <Fade in={true}>
                                                    <Box
                                                        sx={{
                                                            p: 3.5,
                                                            bgcolor: "#fff",
                                                            borderRadius: "16px",
                                                            border: "2px solid #e0e7ff",
                                                            height: "100%",
                                                            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.08)"
                                                        }}
                                                    >
                                                        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                                                            <Box sx={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "12px",
                                                                background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}>
                                                                <AccessTimeIcon sx={{ color: "#029898", fontSize: 20 }} />
                                                            </Box>
                                                            <Typography fontSize="16px" fontWeight={700} color="#1e293b">
                                                                Select Time Slot
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
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
                                                            <Typography color="error" fontSize="13px" mt={2} fontWeight={600}>
                                                                {errors.preferTime}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Fade>
                                            </Grid>
                                        )}

                                        {/* Technician Availability Status */}
                                        {formData.preferDate && formData.preferTime && (
                                            <Grid item xs={12}>
                                                <Fade in={true}>
                                                    <Box
                                                        sx={{
                                                            p: 3.5,
                                                            bgcolor: techAvailability?.available ? "#f0fdf4" : "#fef2f2",
                                                            borderRadius: "16px",
                                                            border: `2px solid ${techAvailability?.available ? "#bbf7d0" : "#fecaca"}`,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 3,
                                                            boxShadow: techAvailability?.available
                                                                ? "0 4px 16px rgba(34, 197, 94, 0.12)"
                                                                : "0 4px 16px rgba(239, 68, 68, 0.12)"
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 56,
                                                                height: 56,
                                                                borderRadius: "14px",
                                                                background: techAvailability?.available
                                                                    ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                                                                    : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "#fff",
                                                                boxShadow: techAvailability?.available
                                                                    ? "0 8px 16px rgba(34, 197, 94, 0.3)"
                                                                    : "0 8px 16px rgba(239, 68, 68, 0.3)"
                                                            }}
                                                        >
                                                            {techAvailability?.available ?
                                                                <CheckCircleIcon sx={{ fontSize: "32px" }} /> :
                                                                <EventAvailableIcon sx={{ fontSize: "32px" }} />
                                                            }
                                                        </Box>
                                                        <Box flex={1}>
                                                            <Typography fontSize="13px" color="#64748b" fontWeight={600} mb={0.5}>
                                                                Appointment Details
                                                            </Typography>
                                                            <Typography fontSize="16px" fontWeight={700} color={techAvailability?.available ? "#16a34a" : "#dc2626"} mb={1}>
                                                                {dayjs(formData.preferDate).format("dddd, DD MMMM YYYY")} at {formatTimeDisplay(formData.preferTime)}
                                                            </Typography>
                                                            {/* {techAvailability && (
                                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                    <Box
                                                                        sx={{
                                                                            width: "8px",
                                                                            height: "8px",
                                                                            borderRadius: "50%",
                                                                            bgcolor: techAvailability.isAvailable ? "#22c55e" : "#ef4444",
                                                                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                                                                            "@keyframes pulse": {
                                                                                "0%, 100%": { opacity: 1 },
                                                                                "50%": { opacity: 0.5 }
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Typography fontSize="14px" color={techAvailability.available ? "#16a34a" : "#dc2626"} fontWeight={600}>
                                                                        {techAvailability.available
                                                                            ? `${techAvailability.count} Technician${techAvailability.count > 1 ? 's' : ''} Available`
                                                                            : "No Technicians Available - Please select another time"}
                                                                    </Typography>
                                                                </Box>
                                                            )} */}
                                                        </Box>
                                                    </Box>
                                                </Fade>
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </SlotBookingCard>
                        </Box>

                        <SectionDivider />

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

                        {/* Footer Submit Button */}
                        <Box sx={{
                            p: 4.5,
                            background: "linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)",
                            borderTop: "2px solid #e0e7ff",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 3,
                        }}>
                            <SubmitButton
                                onClick={handleSubmit}
                                disabled={
                                    formData.region &&
                                    formData.preferDate &&
                                    formData.preferTime &&
                                    techAvailability?.available === false
                                }
                            >
                                Submit Enquiry
                            </SubmitButton>

                        </Box>
                    </FormPaper>
                </Box>
            </Box >
        </LocalizationProvider >
    );
}