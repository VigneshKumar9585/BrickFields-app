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
import { Edit, Trash2, Search, Globe } from "lucide-react";

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

// 🔹 Add/Edit Country Card
const AddCountryCard = ({
  isEditMode,
  countryName,
  onChange,
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
          {isEditMode ? "Edit Country" : "Add Country"}
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
        <Box sx={{ maxWidth: "400px" }}>
          <Typography
            sx={{
              mb: 1.5,
              color: "#2d3748",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Country Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={countryName}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter Country Name"
            sx={getTextFieldSx()}
            InputProps={{
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 1 }}>
                  <Globe size={18} color="#029898" />
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
      </CardContent>
    </Card>
  );
};

export default function MasterCountry() {
  const [rows, setRows] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/get-countries`);
      console.log(response.data);
      setRows(response.data || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to fetch countries");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!countryName.trim()) {
      toast.error("Please enter country name");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        console.log(selectedId);
        await axios.put(`${BACKEND_URL}/api/update-country/${selectedId}`, {
          countryName: countryName,
        });
        toast.success("Country updated successfully");
      } else {
        await axios.post(`${BACKEND_URL}/api/add-country`, {
          countryName: countryName,
        });
        toast.success("Country added successfully");
      }

      fetchCountries();
      setIsEditMode(false);
      setCountryName("");
      setSelectedId(null);
    } catch (error) {
      console.error("Error saving country:", error);
      toast.error(error.response?.data?.message || "Failed to save country");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setCountryName(row.countryName);
    setSelectedId(row._id);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setCountryName("");
    setSelectedId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${BACKEND_URL}/api/countries/${id}`);
      toast.success("Country deleted successfully");
      fetchCountries();
    } catch (error) {
      console.error("Error deleting country:", error);
      toast.error(error.response?.data?.message || "Failed to delete country");
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filteredRows = rows.filter((row) =>
    row.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                Master <Typography component="span" sx={{ color: "#666", fontWeight: 400 }}>| Country</Typography>
              </Typography>

              <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
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
            <AddCountryCard
              isEditMode={isEditMode}
              countryName={countryName}
              onChange={setCountryName}
              onSubmit={handleAddOrUpdate}
              onCancel={handleCancel}
            />

            {/* Manage Table */}
            <Card sx={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.08)", bgcolor: "#fff" }}>
              <Box sx={{ px: 2.5, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
                <Typography variant="h6" sx={{ fontWeight: "600", fontSize: "16px" }}>
                  Manage Countries
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
                      <TableCell align="center" sx={{ width: "120px" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 4, color: "#666" }}>
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : filteredRows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 4, color: "#666" }}>
                          No countries found
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
