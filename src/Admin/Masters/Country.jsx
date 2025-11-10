import React, { useState } from "react";
import Navbar from "../../componts/AdminNavbar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const getTextFieldSx = () => ({
  "& .MuiOutlinedInput-root": {
    height: "34px",
    bgcolor: "#e0e0e0",
    borderRadius: "4px",
    "& input": {
      padding: "6px 8px",
      fontSize: "12px",
      color: "#000",
    },
    "& fieldset": { border: "none" },
  },
});

// 🔹 Reusable Card Component (Add / Edit Mode)
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
        boxShadow: 3,
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
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {isEditMode ? "Edit Country" : "Add Country"}
        </Typography>

        <Box display="flex" gap={1}>
          {isEditMode && (
            <Button
              variant="contained"
              size="small"
              onClick={onCancel}
              sx={{
                bgcolor: "#fff",
                color: "#000",
                textTransform: "none",
                fontSize: "12px",
                "&:hover": { bgcolor: "#f1f1f1" },
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
              color: "#000",
              textTransform: "none",
              fontSize: "12px",
              "&:hover": { bgcolor: "#f1f1f1" },
            }}
          >
            {isEditMode ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                mb: 0.5,
                color: "#000",
              }}
            >
              {isEditMode ? "Edit Country" : "Country Name"}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={countryName}
              onChange={(e) => onChange(e.target.value)}
              sx={getTextFieldSx()}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// 🔹 Table Component
const ManageTable = ({ onEdit }) => {
  const rows = [
    { id: 1, country: "India" },
    { id: 2, country: "USA" },
    { id: 3, country: "Canada" },
    { id: 4, country: "Germany" },
    { id: 5, country: "France" },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        Manage Table
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#029898" }}>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", width: "100px" }}
              >
                S.No
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Country
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  bgcolor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => onEdit(row)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// 🔹 Main Page Component
export default function MasterCountry() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleAddOrUpdate = () => {
    if (isEditMode) {
      console.log("Updated:", { id: selectedId, name: countryName });
      setIsEditMode(false);
      setCountryName("");
      setSelectedId(null);
    } else {
      console.log("Added:", countryName);
      setCountryName("");
    }
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setCountryName(row.country);
    setSelectedId(row.id);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setCountryName("");
    setSelectedId(null);
  };

  return (
    <>
      <Navbar />

      <Box minHeight="100vh" bgcolor="#fff" display="flex" gap={3}>
        <Box sx={{ width: "250px", height: "100px" }} />

        <Box sx={{ m: 0, p: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
            Master{" "}
            <Typography component="span" sx={{ color: "gray" }}>
              | Country
            </Typography>
          </Typography>

          <Box maxWidth="1150px">
            <AddCountryCard
              isEditMode={isEditMode}
              countryName={countryName}
              onChange={setCountryName}
              onSubmit={handleAddOrUpdate}
              onCancel={handleCancel}
            />
            <ManageTable onEdit={handleEdit} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
