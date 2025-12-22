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
import { Edit, Trash2, Search, Navigation } from "lucide-react";

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

// 🔹 Add/Edit Region Card
const AddRegionCard = ({
  isEditMode,
  regionName,
  selectedCountry,
  selectedState,
  selectedDistrict,
  countries,
  states,
  districts,
  onRegionChange,
  onCountryChange,
  onStateChange,
  onDistrictChange,
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
          {isEditMode ? "Edit Region" : "Add Region"}
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
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {/* Country Dropdown */}
          <Box sx={{ minWidth: "180px", flex: 1 }}>
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
                    return <span style={{ color: "#9ca3af" }}>Select Country</span>;
                  }
                  return selected;
                },
              }}
            >
              <MenuItem value="">Select Country</MenuItem>
              {countries.map((country, idx) => (
                <MenuItem key={idx} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* State Dropdown */}
          <Box sx={{ minWidth: "180px", flex: 1 }}>
            <Typography
              sx={{
                mb: 1.5,
                color: "#2d3748",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              State
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedState}
              onChange={(e) => onStateChange(e.target.value)}
              sx={getTextFieldSx()}
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Select State</span>;
                  }
                  return selected;
                },
              }}
            >
              <MenuItem value="">Select State</MenuItem>
              {states.map((state, idx) => (
                <MenuItem key={idx} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* District Dropdown */}
          <Box sx={{ minWidth: "180px", flex: 1 }}>
            <Typography
              sx={{
                mb: 1.5,
                color: "#2d3748",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              District
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e.target.value)}
              sx={getTextFieldSx()}
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Select District</span>;
                  }
                  return selected;
                },
              }}
            >
              <MenuItem value="">Select District</MenuItem>
              {districts.map((district, idx) => (
                <MenuItem key={idx} value={district.name}>
                  {district.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Region Name */}
          <Box sx={{ minWidth: "180px", flex: 1 }}>
            <Typography
              sx={{
                mb: 1.5,
                color: "#2d3748",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Region Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={regionName}
              onChange={(e) => onRegionChange(e.target.value)}
              placeholder="Enter Region Name"
              sx={getTextFieldSx()}
              InputProps={{
                startAdornment: (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 1 }}>
                    <Navigation size={18} color="#029898" />
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

export default function MasterRegion() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [rows, setRows] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [regionName, setRegionName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchDistricts();
    fetchRegions();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/countries`);
      setCountries(response.data || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to fetch countries");
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/states`);
      setStates(response.data || []);
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Failed to fetch states");
    }
  };

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/districts`);
      setDistricts(response.data || []);
    } catch (error) {
      console.error("Error fetching districts:", error);
      toast.error("Failed to fetch districts");
    }
  };

  const fetchRegions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/regions`);
      setRows(response.data || []);
    } catch (error) {
      console.error("Error fetching regions:", error);
      toast.error("Failed to fetch regions");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!regionName.trim() || !selectedCountry || !selectedState || !selectedDistrict) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await axios.put(`${BACKEND_URL}/api/regions/${selectedId}`, {
          name: regionName,
          country: selectedCountry,
          state: selectedState,
          district: selectedDistrict,
        });
        toast.success("Region updated successfully");
      } else {
        await axios.post(`${BACKEND_URL}/api/regions`, {
          name: regionName,
          country: selectedCountry,
          state: selectedState,
          district: selectedDistrict,
        });
        toast.success("Region added successfully");
      }

      fetchRegions();
      setIsEditMode(false);
      setRegionName("");
      setSelectedCountry("");
      setSelectedState("");
      setSelectedDistrict("");
      setSelectedId(null);
    } catch (error) {
      console.error("Error saving region:", error);
      toast.error(error.response?.data?.message || "Failed to save region");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setRegionName(row.name);
    setSelectedCountry(row.country);
    setSelectedState(row.state);
    setSelectedDistrict(row.district);
    setSelectedId(row._id);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setRegionName("");
    setSelectedCountry("");
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this region?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${BACKEND_URL}/api/regions/${id}`);
      toast.success("Region deleted successfully");
      fetchRegions();
    } catch (error) {
      console.error("Error deleting region:", error);
      toast.error(error.response?.data?.message || "Failed to delete region");
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !filterCountry || row.country === filterCountry;
    const matchesState = !filterState || row.state === filterState;
    const matchesDistrict = !filterDistrict || row.district === filterDistrict;
    return matchesSearch && matchesCountry && matchesState && matchesDistrict;
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
                Master <Typography component="span" sx={{ color: "#666", fontWeight: 400 }}>| Region</Typography>
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
                      <MenuItem key={idx} value={country.name}>{country.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* State Filter */}
                <FormControl size="small" sx={selectSx}>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    label="State"
                    sx={{ height: "34px", fontSize: "12px" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {states.map((state, idx) => (
                      <MenuItem key={idx} value={state.name}>{state.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* District Filter */}
                <FormControl size="small" sx={selectSx}>
                  <InputLabel>District</InputLabel>
                  <Select
                    value={filterDistrict}
                    onChange={(e) => setFilterDistrict(e.target.value)}
                    label="District"
                    sx={{ height: "34px", fontSize: "12px" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {districts.map((district, idx) => (
                      <MenuItem key={idx} value={district.name}>{district.name}</MenuItem>
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
            <AddRegionCard
              isEditMode={isEditMode}
              regionName={regionName}
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              countries={countries}
              states={states}
              districts={districts}
              onRegionChange={setRegionName}
              onCountryChange={setSelectedCountry}
              onStateChange={setSelectedState}
              onDistrictChange={setSelectedDistrict}
              onSubmit={handleAddOrUpdate}
              onCancel={handleCancel}
            />

            {/* Manage Table */}
            <Card sx={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.08)", bgcolor: "#fff" }}>
              <Box sx={{ px: 2.5, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
                <Typography variant="h6" sx={{ fontWeight: "600", fontSize: "16px" }}>
                  Manage Regions
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
                      <TableCell>District</TableCell>
                      <TableCell>Region</TableCell>
                      <TableCell align="center" sx={{ width: "120px" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#666" }}>
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : filteredRows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#666" }}>
                          No regions found
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
                          <TableCell sx={{ fontWeight: 500 }}>{row.country}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.state}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.district}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
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
