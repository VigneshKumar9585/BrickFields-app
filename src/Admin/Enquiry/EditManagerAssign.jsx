import React, { useState, useEffect } from "react";
import Navbar from "../../componts/AdminNavbar"; // Assuming Admin context based on usage
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Divider,
  TextField,
  MenuItem,
  Avatar,
  IconButton,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const formatTime = (timeString) => {
  if (!timeString) return "";
  if (timeString.includes("AM") || timeString.includes("PM")) return timeString;
  const [hours, minutes] = timeString.split(":");
  let h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;          // convert 0 → 12
  h = h || 12;         // handle midnight (0 becomes 12)
  return `${h}:${minutes} ${ampm}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-IN", {
    weekday: 'short',
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

function EditManagerAssign() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task || {};

  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState(task.assignedManager?._id || "");
  const [loading, setLoading] = useState(false);

  // Filters
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    fetchManagers();

    // If task has assigned manager ID but not object, or we want to ensure it's selected
    if (task.assignedManager?._id) {
      setSelectedManagerId(task.assignedManager._id);
    }
  }, [task]);

  const fetchManagers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/get-managers`);
      setManagers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching managers:", error);
      toast.error("Failed to load managers");
    }
  };

  const handleUpdate = async () => {
    if (!selectedManagerId) {
      toast.error("Please select a manager");
      return;
    }

    try {
      setLoading(true);
      // Use the same API as NewTaskDetails for consistency
      await axios.put(`${BACKEND_URL}/api/assign-manager`, {
        enquiryId: task._id,
        managerId: selectedManagerId,
      });
      toast.success("Manager assigned successfully");
      navigate(-1); // Go back
    } catch (error) {
      console.error("Error assigning manager:", error);
      toast.error(error.response?.data?.message || "Failed to update manager");
    } finally {
      setLoading(false);
    }
  };

  // Filter managers based on search and filters
  const filteredManagers = managers.filter((m) => {
    const matchSearch = (m.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchCity = selectedCity ? m.city === selectedCity : true;
    const matchRegion = selectedRegion ? m.district === selectedRegion : true;
    return matchSearch && matchCity && matchRegion;
  });

  // Unique lists for dropdowns
  const uniqueCities = [...new Set(managers.map(m => m.city).filter(Boolean))];
  const uniqueRegions = [...new Set(managers.map(m => m.district).filter(Boolean))];

  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
        {/* Sidebar spacer if needed, matching Admin layout */}
        <Box sx={{ width: { md: "250px" }, display: { xs: "none", md: "block" } }} />

        {/* Main Content */}
        <Box sx={{ flex: 1, p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
            Edit Assign Manager
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
                {/* Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    bgcolor: "#029898",
                    color: "#fff",
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={600}>Task ID: {task.enquiryId}</Typography>
                  <Typography variant="caption" sx={{ fontSize: "12px" }}>
                    {task.enquiryDate ? new Date(task.enquiryDate).toLocaleDateString() : "N/A"}
                  </Typography>
                </Box>

                {/* Visitor Details */}
                <Box sx={{ px: { xs: 1.5, sm: 2 }, pt: 1.5, pb: 2 }}>
                  <Typography sx={{ fontSize: { xs: "13px", sm: "14px" }, fontWeight: 700, color: "#029898", mb: 1.5 }}>
                    Visitor Details
                  </Typography>

                  {[
                    { label: "Name", value: task.name },
                    { label: "State", value: task.state },
                    { label: "District", value: task.district },
                    { label: "Phone", value: task.phoneNumber },
                    { label: "Email", value: task.email },
                    { label: "Address", value: task.street },
                    { label: "Sq. Feet", value: task.sqFeet },
                    { label: "Slot Date", value: formatDate(task.preferDate) },
                    { label: "Slot Time", value: formatTime(task.preferTime) }
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

            {/* Right Section: Managers List */}
            <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
              <CardContent sx={{
                border: "1px solid #abababff",
                borderRadius: "14px",
                p: 0,
                overflow: "hidden",
                bgcolor: "#fff",
                height: "fit-content"
              }}>
                {/* Search & Filter */}
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: { xs: 1.5, sm: 2 },
                  flexWrap: "wrap",
                  borderBottom: "1px solid #eee",
                  bgcolor: "#fff"
                }}>
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
                    placeholder="Search Manager..."
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

                {/* List */}
                <Box sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "500px" }}>
                  {filteredManagers.map((manager) => (
                    <Box
                      key={manager._id}
                      onClick={() => setSelectedManagerId(manager._id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: { xs: 1.5, sm: 2 },
                        borderBottom: "1px solid #f0f0f0",
                        bgcolor: selectedManagerId === manager._id ? "#f1f8e9" : "transparent",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f9fafb" },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "#029898", width: 40, height: 40 }}>{manager.name?.[0]}</Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600} fontSize="14px">{manager.name}</Typography>
                          <Typography variant="caption" color="textSecondary" display="block" fontSize="12px">
                            {manager.city}, {manager.district}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" fontSize="11px">
                            Mob: {manager.phoneNumber}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        variant={selectedManagerId === manager._id ? "contained" : "outlined"}
                        size="small"
                        sx={{
                          textTransform: "none",
                          borderColor: "#029898",
                          minWidth: "80px",
                          color: selectedManagerId === manager._id ? "#fff" : "#029898",
                          bgcolor: selectedManagerId === manager._id ? "#029898" : "transparent",
                          "&:hover": {
                            bgcolor: selectedManagerId === manager._id ? "#027c7c" : "#e0f7fa"
                          }
                        }}
                      >
                        {selectedManagerId === manager._id ? "Selected" : "Select"}
                      </Button>
                    </Box>
                  ))}
                  {filteredManagers.length === 0 && (
                    <Box p={3} textAlign="center">
                      <Typography color="textSecondary">No managers found.</Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>

              {/* Action Buttons */}
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

export default EditManagerAssign;
