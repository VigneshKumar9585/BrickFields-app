import React, { useState } from "react";
import Navbar from "../../componts/AdminNavbar";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// 🔹 TextField style
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

// 🔹 Add/Edit Checklist Card
const AddChecklistCard = ({ isEditing, checklistName, onChange, onSubmit }) => (
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
        {isEditing ? "Edit Checklist" : "Add Checklist"}
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
      <Box display="flex" gap={2} alignItems="center" width="40%">
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 500, mb: 0.5 }}>
            {isEditing ? "Edit Checklist" : "Add Checklist"}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            sx={getTextFieldSx()}
            value={checklistName}
            onChange={onChange}
          />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// 🔹 Manage Table
const ManageTable = ({ rows, onEdit, onDelete }) => (
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
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Checklist
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
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">
                <IconButton size="small" onClick={() => onEdit(row)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(row.id)}
                >
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

// 🔹 Main Component
export default function MasterChecklist() {
  const [rows, setRows] = useState([
    { id: 1, name: "Safety Inspection" },
    { id: 2, name: "Material Quality Check" },
    { id: 3, name: "Site Cleanliness" },
  ]);

  const [checklistName, setChecklistName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setChecklistName(e.target.value);

  const handleSubmit = () => {
    if (!checklistName.trim()) return;

    if (isEditing) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editId ? { ...row, name: checklistName } : row
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setRows((prev) => [...prev, { id: prev.length + 1, name: checklistName }]);
    }

    setChecklistName("");
  };

  const handleEdit = (row) => {
    setChecklistName(row.name);
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
              | Checklist
            </Typography>
          </Typography>

          <Box maxWidth="1150px">
            <AddChecklistCard
              isEditing={isEditing}
              checklistName={checklistName}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
            <ManageTable
              rows={rows}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
