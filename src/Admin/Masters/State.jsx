import React, { useState, useEffect } from "react";
import Navbar from "../../componts/AdminNavbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Trash2, Search, Map } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Input field styling matching AddManager.jsx
const getTextFieldSx = () => ({
  width: "100%",
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

// Small dropdown styling for country selector
const getSmallSelectSx = () => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: "40px",
    fontSize: "12px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    "& fieldset": { borderColor: "#d1d5db" },
    "&:hover fieldset": { borderColor: "#029898" },
    "&.Mui-focused fieldset": {
      borderColor: "#029898",
      borderWidth: "2px",
    },
  },
  "& .MuiSelect-select": { fontSize: "12px", padding: "10px 14px" },
  "& .MuiOutlinedInput-input": { fontSize: "12px" },
});

// Filter dropdown styling
const selectSx = {
  width: "150px",
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
  "& .MuiSelect-select": { fontSize: "12px", padding: "6px 10px" },
};

// 🔹 Add/Edit State Card
const AddStateCard = ({
  isEditMode,
  stateName,
  selectedCountry,
  countries,
  onStateChange,
  onCountryChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Card
      sx={{
        mb: 3,
        bgcolor: "#fff",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#029898",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2.5,
          py: 1.5,
        }}
      >
        <Typography variant="subtitle1" fontWeight="600" fontSize="15px">
          {isEditMode ? "Edit State" : "Add State"}
        </Typography>

        <Box display="flex" gap={1}>
          {isEditMode && (
            <Button
              variant="outlined"
              size="small"
              onClick={onCancel}
              sx={{
                bgcolor: "transparent",
                color: "#fff",
                borderColor: "#fff",
                textTransform: "none",
                fontSize: "12px",
                px: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "#fff" },
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            onClick={onSubmit}
            sx={{
              bgcolor: "#fff",
              color: "#029898",
              textTransform: "none",
              fontSize: "12px",
              fontWeight: 600,
              px: 3,
              "&:hover": { bgcolor: "#f1f1f1" },
            }}
          >
            {isEditMode ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {/* Country Dropdown */}
          <Box sx={{ minWidth: "250px", flex: 1 }}>
            <Typography
              sx={{
                mb: 1.5,
                color: "#2d3748",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Country
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              sx={getSmallSelectSx()}
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af", fontSize: "12px" }}>Select Country</span>;
                  }
                  return selected;
                },
              }}
            >
              <MenuItem value="" sx={{ fontSize: "12px" }}>Select Country</MenuItem>
              {countries.map((country, idx) => (
                <MenuItem key={idx} value={country.countryName} sx={{ fontSize: "12px" }}>
                  {country.countryName}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* State Name */}
          <Box sx={{ minWidth: "250px", flex: 1 }}>
            <Typography
              sx={{
                mb: 1.5,
                color: "#2d3748",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              State Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={stateName}
              onChange={(e) => onStateChange(e.target.value)}
              placeholder="Enter State Name"
              sx={getTextFieldSx()}
              InputProps={{
                startAdornment: (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 1 }}>
                    <Map size={18} color="#029898" />
                    <Box
                      sx={{
                        width: "1px",
                        height: "20px",
                        bgcolor: "#e5e7eb",
                      }}
                    />
                  </Box>
                ),
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function MasterState() {
  const [countries, setCountries] = useState([]);
  const [rows, setRows] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [stateName, setStateName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
    fetchStates();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/get-countries`);
      setCountries(response.data || []);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to fetch countries");
    }
  };

  const fetchStates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/get-states`);
      setRows(response.data || []);
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Failed to fetch states");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!stateName.trim() || !selectedCountry) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await axios.put(`${BACKEND_URL}/api/update-state/${selectedId}`, {
          stateName: stateName,
          countryName: selectedCountry,
        });
        toast.success("State updated successfully");
      } else {
        await axios.post(`${BACKEND_URL}/api/add-state`, {
          stateName: stateName,
          countryName: selectedCountry,
        });
        toast.success("State added successfully");
      }

      fetchStates();
      setIsEditMode(false);
      setStateName("");
      setSelectedCountry("");
      setSelectedId(null);
    } catch (error) {
      console.error("Error saving state:", error);
      toast.error(error.response?.data?.message || "Failed to save state");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setStateName(row.stateName);
    setSelectedCountry(row.countryName);
    setSelectedId(row._id);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setStateName("");
    setSelectedCountry("");
    setSelectedId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this state?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${BACKEND_URL}/api/delete-state/${id}`);
      toast.success("State deleted successfully");
      fetchStates();
    } catch (error) {
      console.error("Error deleting state:", error);
      toast.error(error.response?.data?.message || "Failed to delete state");
    } finally {
      setLoading(false);
    }
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.stateName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !filterCountry || row.countryName === filterCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <>
      <Navbar />
      <Box minHeight="100vh" bgcolor="#fff" display="flex">
        <Box
          sx={{
            flex: 1,
            p: 2,
            ml: { xs: "0px", md: "260px" },
          }}
        >
          {/* Filter Bar */}
          <Card elevation={0} sx={{ display: "flex", height: "60px", mt: 1, mb: 2 }}>
            <CardContent
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography
                color="rgb(0,0,0)"
                sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "600" }}
              >
                Master <Typography component="span" sx={{ color: "#666", fontWeight: 400 }}>| State</Typography>
              </Typography>

              <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
                {/* Country Filter */}
                <FormControl size="small" sx={selectSx}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    label="Country"
                    sx={{ height: "34px", fontSize: "12px" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {countries.map((country, idx) => (
                      <MenuItem key={idx} value={country.countryName}>{country.countryName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Search */}
                <TextField
                  size="small"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search style={{ marginRight: 8 }} size={16} />,
                  }}
                  sx={{
                    width: "200px",
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      bgcolor: "#f9f9f9",
                      borderRadius: "6px",
                      "& fieldset": { borderColor: "#d1d5db" },
                      "&:hover fieldset": { borderColor: "#029898" },
                      "&.Mui-focused fieldset": { borderColor: "#029898", borderWidth: 2 },
                      "& input": { padding: "6px 10px", fontSize: "12px" },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          <Box maxWidth="1200px">
            <AddStateCard
              isEditMode={isEditMode}
              stateName={stateName}
              selectedCountry={selectedCountry}
              countries={countries}
              onStateChange={setStateName}
              onCountryChange={setSelectedCountry}
              onSubmit={handleAddOrUpdate}
              onCancel={handleCancel}
            />

            {/* Manage Table */}
            <Card sx={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.08)", bgcolor: "#fff" }}>
              <Box sx={{ px: 2.5, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
                <Typography variant="h6" sx={{ fontWeight: "600", fontSize: "16px" }}>
                  Manage States
                </Typography>
              </Box>
              <TableContainer
                component={Paper}
                sx={{
                  bgcolor: "#fafafa",
                  boxShadow: "none",
                  overflowX: "auto",
                }}
              >
                <Table
                  sx={{
                    minWidth: "100%",
                    td: {
                      fontSize: "13px",
                      padding: "12px 16px",
                      borderBottom: "1px solid #e0e0e0",
                    },
                    th: {
                      fontSize: "13px",
                      padding: "12px 16px",
                      color: "#fff",
                      backgroundColor: "#029898",
                      fontWeight: 600,
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "80px" }}>S.No</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell align="center" sx={{ width: "120px" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4, color: "#666" }}>
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : filteredRows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4, color: "#666" }}>
                          No states found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRows.map((row, index) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            bgcolor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                            "&:hover": { bgcolor: "#f0f7f7" },
                          }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.countryName}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.stateName}</TableCell>
                          <TableCell align="center">
                            <Box display="flex" justifyContent="center" gap={0.5}>
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(row)}
                                sx={{ color: "#0288d1" }}
                                disabled={loading}
                              >
                                <Edit size={18} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(row._id)}
                                sx={{ color: "#d32f2f" }}
                                disabled={loading}
                              >
                                <Trash2 size={18} />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
}
