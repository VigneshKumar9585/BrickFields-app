import React, { useState, useEffect } from "react";
import Navbar from "../../componts/LspNavbar";
import {
    Box,
    Typography,
    Grid,
    CardContent,
    Divider,
    TextField,
    Avatar,
    InputAdornment,
    Button,
    Skeleton,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function EditTechnicianAssign() {
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state?.task || {};

    const [technicians, setTechnicians] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [assignedTech1, setAssignedTech1] = useState(task.assignedTechnician1?._id || task.assignedTechnician1 || null);
    const [assignedTech2, setAssignedTech2] = useState(task.assignedTechnician2?._id || task.assignedTechnician2 || null);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        fetchTechnicians();
        // Simulate initial page loading for skeleton effect
        setTimeout(() => setPageLoading(false), 800);
    }, []);

    const fetchTechnicians = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/get-technician`);
            setTechnicians(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching Technicians:", error);
        }
    };

    const assignTechnician = async (technicianId, slot) => {
        try {
            setLoading(true);
            // Optimistic update checks
            if ((slot === 1 && assignedTech1 === technicianId) || (slot === 2 && assignedTech2 === technicianId)) {
                toast.info("Technician already assigned to this slot");
                setLoading(false);
                return;
            }

            // Simulating logic from LspAssigningDetails:
            // Clear if moving slots
            let newTech1 = assignedTech1;
            let newTech2 = assignedTech2;

            if (slot === 1) {
                if (newTech2 === technicianId) newTech2 = null;
                newTech1 = technicianId;
            } else if (slot === 2) {
                if (newTech1 === technicianId) newTech1 = null;
                newTech2 = technicianId;
            }

            await axios.put(`${BACKEND_URL}/api/assign-technician`, {
                enquiryId: task._id || task.id, // Handle both if structure differs
                technicianId: technicianId,
                slot: slot
            });

            setAssignedTech1(newTech1);
            setAssignedTech2(newTech2);
            toast.success(`Slot ${slot} assigned successfully`);

        } catch (error) {
            console.error("Error assigning technician:", error);
            toast.error(error.response?.data?.message || "Failed to assign technician");
        } finally {
            setLoading(false);
        }
    };

    const filteredTechnicians = technicians.filter((t) => {
        const name = t.name || t.companyName || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const formatToDDMMYYYY = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (isNaN(date)) return "N/A";
        return date.toLocaleDateString();
    };

    return (
        <>
            <Navbar />

            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
                {/* Sidebar Placeholder (Hidden on mobile, matching other pages) */}
                <Box
                    sx={{
                        width: "260px",
                        bgcolor: "#333",
                        color: "#fff",
                        display: { xs: "none", md: "block" }, // Changed to block to act as spacer if needed, or flex if content
                        flexDirection: "column",
                        p: 3,
                    }}
                />

                <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 3 }, pt: 2 }}>

                    {pageLoading ? (
                        /* SKELETON LOADING STATE */
                        <Box>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                                <Skeleton width={200} />
                            </Typography>
                            {/* Main Content Skeleton */}
                            <Grid container spacing={3} sx={{ width: "100%" }}>
                                <Grid item xs={12} md={3}>
                                    <Stack spacing={2}>
                                        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: "10px" }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "10px" }} />
                                </Grid>
                            </Grid>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                                Edit Assign Technician
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, width: "100%" }}>
                                {/* Left Section: Task Details */}
                                <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                                    <CardContent
                                        sx={{
                                            border: "1px solid #d0d0d0",
                                            borderRadius: "10px",
                                            p: 0,
                                            bgcolor: "#fff",
                                            overflow: "hidden",
                                            boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                                            fontSize: "13px",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", justifyContent: "space-between", bgcolor: "#029898", color: "#fff", px: 2, py: 1.5 }}>
                                            <Typography variant="subtitle2" fontWeight={600}>Task ID: {task.enquiryId || task.id}</Typography>
                                            <Typography variant="caption" sx={{ fontSize: "12px" }}>
                                                {task.enquiryDate ? formatToDDMMYYYY(task.enquiryDate) : "N/A"}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ px: { xs: 1.5, sm: 2 }, pt: 1.5, pb: 2 }}>
                                            <Typography sx={{ fontSize: { xs: "13px", sm: "14px" }, fontWeight: 700, color: "#029898", mb: 1.5 }}>
                                                Visitor Details
                                            </Typography>

                                            {[
                                                { label: "Name", value: task.name },
                                                { label: "Phone", value: task.phoneNumber },
                                                { label: "State", value: task.state },
                                                { label: "City", value: task.city },
                                                { label: "Street", value: task.street },
                                                { label: "Sq. Feet", value: task.sqFeet },
                                                { label: "Slot Date", value: task.preferDate ? formatToDDMMYYYY(task.preferDate) : "-" },
                                            ].map((field, idx) => (
                                                <Box key={idx}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, gap: 1 }}>
                                                        <Typography sx={{ fontWeight: 600, fontSize: "13px", width: "100px" }}>
                                                            {field.label}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#333", flex: 1, textAlign: "right" }}>
                                                            {field.value || "-"}
                                                        </Typography>
                                                    </Box>
                                                    <Divider sx={{ mb: 1.2 }} />
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    color: "#029898",
                                                    borderColor: "#029898",
                                                    "&:hover": { bgcolor: "#e0f7fa", borderColor: "#029898" }
                                                }}
                                                onClick={() => navigate(-1)}
                                            >
                                                Back to List
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Box>

                                {/* Right Section: Technicians List */}
                                <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>

                                    <CardContent sx={{
                                        border: "1px solid #abababff",
                                        borderRadius: "14px",
                                        p: 0,
                                        overflow: "hidden",
                                        bgcolor: "#fff"
                                    }}>
                                        {/* Filter & Search Bar Section */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: { xs: 1, sm: 2 },
                                                p: { xs: 1.5, sm: 2 },
                                                flexWrap: "wrap",
                                                borderBottom: "1px solid #eee",
                                                bgcolor: "#fff"
                                            }}
                                        >
                                            {/* Dummy Filters to match design */}
                                            {[
                                                { label: "Country", options: ["India", "USA"] },
                                                { label: "Region", options: ["North", "South"] }
                                            ].map((filter, idx) => (
                                                <FormControl
                                                    key={idx}
                                                    size="small"
                                                    sx={{
                                                        width: { xs: "calc(50% - 4px)", sm: "140px" },
                                                        backgroundColor: "#f9f9f9",
                                                        borderRadius: "6px",
                                                        "& .MuiOutlinedInput-root": {
                                                            height: "34px",
                                                            fontSize: "12px",
                                                            borderRadius: "6px",
                                                            "& fieldset": { borderColor: "#d0d0d0" },
                                                            "&:hover fieldset": { borderColor: "#a1a1a1" },
                                                            "&.Mui-focused fieldset": { borderColor: "#029898" },
                                                        },
                                                        "& .MuiInputLabel-root": { fontSize: "12px", color: "#666" },
                                                    }}
                                                >
                                                    <InputLabel>{filter.label}</InputLabel>
                                                    <Select label={filter.label} defaultValue="" sx={{ height: "34px" }}>
                                                        <MenuItem value="" sx={{ fontSize: "12px" }}>All</MenuItem>
                                                        {filter.options.map((opt) => (
                                                            <MenuItem key={opt} value={opt} sx={{ fontSize: "12px" }}>{opt}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            ))}

                                            <TextField
                                                placeholder="Search Technician..."
                                                size="small"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                sx={{
                                                    width: { xs: "100%", sm: "240px" },
                                                    ml: { xs: 0, sm: "auto" },
                                                    "& .MuiOutlinedInput-root": {
                                                        height: "34px",
                                                        borderRadius: "20px",
                                                        backgroundColor: "#f9f9f9",
                                                        fontSize: "12px",
                                                        "& fieldset": { borderColor: "#d0d0d0" },
                                                        "&:hover fieldset": { borderColor: "#a1a1a1" },
                                                        "&.Mui-focused fieldset": { borderColor: "#029898" },
                                                    },
                                                    "& input": { padding: "8px 12px" }
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <SearchIcon sx={{ fontSize: "18px", color: "#666" }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "600px" }}>
                                            {filteredTechnicians.map((tech) => (
                                                <Box
                                                    key={tech._id}
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: { xs: "column", sm: "row" },
                                                        alignItems: { xs: "flex-start", sm: "center" },
                                                        justifyContent: "space-between",
                                                        p: { xs: 1.5, sm: 2 },
                                                        borderBottom: "1px solid #f0f0f0",
                                                        bgcolor: (assignedTech1 === tech._id || assignedTech2 === tech._id) ? "#f1f8e9" : "transparent",
                                                        "&:hover": { bgcolor: "#f9fafb" },
                                                        gap: 2
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: { sm: "35%" } }}>
                                                        <Avatar sx={{ bgcolor: "#029898", width: 40, height: 40 }}>{(tech.name || "T")?.[0]}</Avatar>
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} fontSize="14px">{tech.name}</Typography>
                                                            <Typography variant="caption" color="textSecondary" display="block" fontSize="11px">
                                                                {tech.companyPhoneNumber || tech.phoneNumber}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ width: { sm: "30%" } }}>
                                                        {/* Tags */}
                                                        <Box display={"flex"} gap={1} flexWrap="wrap">
                                                            {[tech.city, tech.district].filter(Boolean).map((tag, i) => (
                                                                <Box
                                                                    key={i}
                                                                    sx={{
                                                                        border: "1px solid #e0e0e0",
                                                                        px: 1,
                                                                        py: 0.25,
                                                                        fontSize: "10px",
                                                                        bgcolor: "#f5f5f5",
                                                                        color: "#666",
                                                                        borderRadius: "4px",
                                                                    }}
                                                                >
                                                                    {tag}
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ display: "flex", gap: 1 }}>
                                                        <Button
                                                            variant={assignedTech1 === tech._id ? "contained" : "outlined"}
                                                            size="small"
                                                            onClick={() => assignTechnician(tech._id, 1)}
                                                            disabled={loading}
                                                            sx={{
                                                                textTransform: "none",
                                                                minWidth: "60px",
                                                                borderColor: "#029898",
                                                                color: assignedTech1 === tech._id ? "#fff" : "#029898",
                                                                bgcolor: assignedTech1 === tech._id ? "#029898" : "transparent",
                                                                "&:hover": { bgcolor: assignedTech1 === tech._id ? "#027c7c" : "#e0f7fa" }
                                                            }}
                                                        >
                                                            Slot 1
                                                        </Button>
                                                        <Button
                                                            variant={assignedTech2 === tech._id ? "contained" : "outlined"}
                                                            size="small"
                                                            onClick={() => assignTechnician(tech._id, 2)}
                                                            disabled={loading}
                                                            sx={{
                                                                textTransform: "none",
                                                                minWidth: "60px",
                                                                borderColor: "#029898",
                                                                color: assignedTech2 === tech._id ? "#fff" : "#029898",
                                                                bgcolor: assignedTech2 === tech._id ? "#029898" : "transparent",
                                                                "&:hover": { bgcolor: assignedTech2 === tech._id ? "#027c7c" : "#e0f7fa" }
                                                            }}
                                                        >
                                                            Slot 2
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            ))}
                                            {filteredTechnicians.length === 0 && (
                                                <Box p={3} textAlign="center">
                                                    <Typography color="textSecondary">No Technicians found.</Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </CardContent>

                                    {/* Done Button aligned to Right */}
                                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{ bgcolor: "#029898", "&:hover": { bgcolor: "#027c7c" }, width: "150px" }}
                                            onClick={() => navigate(-1)}
                                        >
                                            Done
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default EditTechnicianAssign;
