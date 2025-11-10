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
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// 🔹 Reusable TextField style
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

// 🔹 Card for Adding or Editing State
const AddStateCard = ({ isEditing, stateName, country, onChange, onSubmit }) => {
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
          {isEditing ? "Edit State" : "Add State"}
        </Typography>
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
          {isEditing ? "Update" : "Add"}
        </Button>
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" gap={2} alignItems="center">
          {/* State Field */}
          <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                mb: 0.5,
                color: "#000",
              }}
            >
              {isEditing ? "Edit State" : "Add State"}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={getTextFieldSx()}
              value={stateName}
              name="stateName"
              onChange={onChange}
            />
          </Box>

          {/* Country Field */}
          <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                mb: 0.5,
                color: "#000",
              }}
            >
              Country
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              sx={getTextFieldSx()}
              name="country"
              value={country}
              onChange={onChange}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
            </TextField>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// 🔹 Manage Table (State + Country)
const ManageTable = ({ rows, onEdit, onDelete }) => {
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
              <TableCell sx={{ color: "#fff", fontWeight: "bold", width: "80px" }}>
                S.No
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>State</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Country</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
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
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => onEdit(row)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => onDelete(row.id)}>
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

// 🔹 Main Component
export default function MasterState() {
  const [rows, setRows] = useState([
    { id: 1, state: "Tamil Nadu", country: "India" },
    { id: 2, state: "California", country: "USA" },
    { id: 3, state: "Ontario", country: "Canada" },
  ]);

  const [form, setForm] = useState({ stateName: "", country: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.stateName || !form.country) return;

    if (isEditing) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editId ? { ...row, state: form.stateName, country: form.country } : row
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setRows((prev) => [
        ...prev,
        { id: prev.length + 1, state: form.stateName, country: form.country },
      ]);
    }
    setForm({ stateName: "", country: "" });
  };

  const handleEdit = (row) => {
    setForm({ stateName: row.state, country: row.country });
    setIsEditing(true);
    setEditId(row.id);
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
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
              | State
            </Typography>
          </Typography>

          <Box maxWidth="1150px">
            <AddStateCard
              isEditing={isEditing}
              stateName={form.stateName}
              country={form.country}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
            <ManageTable rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
