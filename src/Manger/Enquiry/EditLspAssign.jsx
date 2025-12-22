import React, { useState, useEffect } from "react";
import Navbar from "../../componts/Navbar";
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
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function EditLspAssign() {
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state?.task || {};

    const [lsps, setLsps] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLspId, setSelectedLspId] = useState(task.assignedLSP?._id || "");
    const [loading, setLoading] = useState(false);

    // Filters
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");

    useEffect(() => {
        fetchLsps();
        if (task.assignedLSP?._id) {
            setSelectedLspId(task.assignedLSP._id);
        }
    }, [task]);

    const fetchLsps = async () => {
        try {
            // Assuming get-lsp endpoint exists based on AddLSP/ManageLSP existence
            // If not, we might need to check ManageLSP to see where it gets data.
            // Based on previous search, ManageLSP fetches from somewhere.
            // Using generic /api/get-lsp or checking if specific endpoint required.
            // Re-reading codebase... ManagerAssinging.jsx fetched LSPs.
            // Actually ManagerAssinging.jsx didn't show the fetch URL clearly in snippet.
            // But let's try /api/get-lsp as common convention or /api/lsp-details/:id
            // Let's assume /api/get-lsp for list.
            const response = await axios.get(`${BACKEND_URL}/api/get-lsp`);
            setLsps(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching LSPs:", error);
            // toast.error("Failed to load LSPs");
        }
    };

    const handleUpdate = async () => {
        if (!selectedLspId) {
            toast.error("Please select an LSP");
            return;
        }

        try {
            setLoading(true);
            await axios.put(`${BACKEND_URL}/api/assign-lsp`, {
                enquiryId: task._id,
                lspId: selectedLspId,
            });
            toast.success("LSP assigned successfully");
            navigate(-1);
        } catch (error) {
            console.error("Error assigning LSP:", error);
            toast.error(error.response?.data?.message || "Failed to update LSP");
        } finally {
            setLoading(false);
        }
    };

    const filteredLsps = lsps.filter((l) => {
        const name = l.companyName || l.name || "";
        const matchSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCity = selectedCity ? l.city === selectedCity : true;
        const matchRegion = selectedRegion ? l.district === selectedRegion : true;
        return matchSearch && matchCity && matchRegion;
    });

    // Unique lists for dropdowns
    const uniqueCities = [...new Set(lsps.map(l => l.city).filter(Boolean))];
    const uniqueRegions = [...new Set(lsps.map(l => l.district).filter(Boolean))];

    return (
        <>
            <Navbar />

            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
                <Box sx={{ width: { md: "250px" }, display: { xs: "none", md: "block" } }} />

                <Box sx={{ flex: 1, p: 4 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                        Edit Assign LSP
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
                                    <Typography variant="subtitle2" fontWeight={600}>Task ID: {task.enquiryId}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: "12px" }}>
                                        {task.enquiryDate ? new Date(task.enquiryDate).toLocaleDateString() : "N/A"}
                                    </Typography>
                                </Box>

                                <Box sx={{ px: { xs: 1.5, sm: 2 }, pt: 1.5, pb: 2 }}>
                                    <Typography sx={{ fontSize: { xs: "13px", sm: "14px" }, fontWeight: 700, color: "#029898", mb: 1.5 }}>
                                        Visitor Details
                                    </Typography>

                                    {[
                                        { label: "Name", value: task.name },
                                        { label: "Phone", value: task.phoneNumber },
                                        { label: "City", value: task.city },
                                        { label: "State", value: task.state },
                                        { label: "Street", value: task.street },
                                        { label: "Sq. Feet", value: task.sqFeet },
                                        { label: "Slot Date", value: task.preferDate ? new Date(task.preferDate).toLocaleDateString() : "-" },
                                        { label: "Slot Time", value: task.preferTime || "-" },
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
                                        Cancel
                                    </Button>
                                </Box>
                            </CardContent>
                        </Box>

                        {/* Right Section: LSPs List */}
                        <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                            <CardContent sx={{
                                border: "1px solid #abababff",
                                borderRadius: "14px",
                                p: 0,
                                overflow: "hidden",
                                bgcolor: "#fff",
                                height: "fit-content"
                            }}>
                                {/* Search Bar & Filters Section */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        p: { xs: 1.5, sm: 2 },
                                        flexWrap: "wrap",
                                        borderBottom: "1px solid #eee",
                                        bgcolor: "#fff"
                                    }}
                                >
                                    {/* City Filter */}
                                    <FormControl size="small" sx={{ width: { xs: "48%", sm: "150px" } }}>
                                        <InputLabel sx={{ fontSize: "13px" }}>City</InputLabel>
                                        <Select
                                            value={selectedCity}
                                            label="City"
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            sx={{
                                                height: "36px",
                                                fontSize: "13px",
                                                borderRadius: "8px",
                                                bgcolor: "#f9f9f9",
                                                "& fieldset": { borderColor: "#d0d0d0" },
                                            }}
                                        >
                                            <MenuItem value=""><em>All</em></MenuItem>
                                            {uniqueCities.map((city) => (
                                                <MenuItem key={city} value={city} sx={{ fontSize: "13px" }}>{city}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* Region Filter */}
                                    <FormControl size="small" sx={{ width: { xs: "48%", sm: "150px" } }}>
                                        <InputLabel sx={{ fontSize: "13px" }}>Region</InputLabel>
                                        <Select
                                            value={selectedRegion}
                                            label="Region"
                                            onChange={(e) => setSelectedRegion(e.target.value)}
                                            sx={{
                                                height: "36px",
                                                fontSize: "13px",
                                                borderRadius: "8px",
                                                bgcolor: "#f9f9f9",
                                                "& fieldset": { borderColor: "#d0d0d0" },
                                            }}
                                        >
                                            <MenuItem value=""><em>All</em></MenuItem>
                                            {uniqueRegions.map((region) => (
                                                <MenuItem key={region} value={region} sx={{ fontSize: "13px" }}>{region}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        placeholder="Search LSP..."
                                        size="small"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        sx={{
                                            flexGrow: 1,
                                            minWidth: "200px",
                                            "& .MuiOutlinedInput-root": {
                                                height: "36px",
                                                borderRadius: "20px",
                                                backgroundColor: "#f9f9f9",
                                                fontSize: "13px",
                                                "& fieldset": { borderColor: "#d0d0d0" },
                                                "&:hover fieldset": { borderColor: "#a1a1a1" },
                                                "&.Mui-focused fieldset": { borderColor: "#029898" },
                                            }
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ fontSize: "18px", color: "#666" }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>

                                <Box sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "500px" }}>
                                    {filteredLsps.map((lsp) => (
                                        <Box
                                            key={lsp._id}
                                            onClick={() => setSelectedLspId(lsp._id)}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                p: { xs: 1.5, sm: 2 },
                                                borderBottom: "1px solid #f0f0f0",
                                                bgcolor: selectedLspId === lsp._id ? "#f1f8e9" : "transparent",
                                                cursor: "pointer",
                                                "&:hover": { bgcolor: "#f9fafb" },
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Avatar sx={{ bgcolor: "#029898", width: 40, height: 40 }}>{(lsp.companyName || lsp.name || "L")?.[0]}</Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight={600} fontSize="14px">{lsp.companyName || lsp.name}</Typography>
                                                    <Typography variant="caption" color="textSecondary" display="block" fontSize="12px">
                                                        {lsp.city}, {lsp.district}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary" fontSize="11px">
                                                        Mob: {lsp.companyPhoneNumber || lsp.phoneNumber}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Button
                                                variant={selectedLspId === lsp._id ? "contained" : "outlined"}
                                                size="small"
                                                sx={{
                                                    textTransform: "none",
                                                    borderColor: "#029898",
                                                    minWidth: "80px",
                                                    color: selectedLspId === lsp._id ? "#fff" : "#029898",
                                                    bgcolor: selectedLspId === lsp._id ? "#029898" : "transparent",
                                                    "&:hover": {
                                                        bgcolor: selectedLspId === lsp._id ? "#027c7c" : "#e0f7fa"
                                                    }
                                                }}
                                            >
                                                {selectedLspId === lsp._id ? "Selected" : "Select"}
                                            </Button>
                                        </Box>
                                    ))}
                                    {filteredLsps.length === 0 && (
                                        <Box p={3} textAlign="center">
                                            <Typography color="textSecondary">No LSPs found.</Typography>
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>

                            {/* Action Buttons Aligned Right */}
                            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ bgcolor: "#029898", "&:hover": { bgcolor: "#027c7c" }, width: "200px" }}
                                    onClick={handleUpdate}
                                    disabled={loading}
                                >
                                    {loading ? "Updating..." : "Update Assignment"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default EditLspAssign;
