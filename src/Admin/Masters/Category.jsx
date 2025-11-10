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
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// 🔹 Common TextField style
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
  "& .MuiSelect-select": {
    padding: "6px 8px",
    fontSize: "12px",
    color: "#000",
  },
});

// 🔹 Add/Edit Category Card
const AddCategoryCard = ({
  isEditing,
  categoryName,
  checklist,
  onCategoryChange,
  onChecklistChange,
  onSubmit,
  checklistOptions,
}) => (
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
        {isEditing ? "Edit Category" : "Add Category"}
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
      <Box display="flex" gap={2} alignItems="center" width="60%">
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 500, mb: 0.5 }}>
            {isEditing ? "Edit Category" : "Add Category"}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            sx={getTextFieldSx()}
            value={categoryName}
            onChange={onCategoryChange}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 500, mb: 0.5 }}>
            Checklist
          </Typography>
          <TextField
            select
            fullWidth
            variant="outlined"
            sx={getTextFieldSx()}
            value={checklist}
            onChange={onChecklistChange}
          >
            {checklistOptions.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
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
              Category
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
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.checklist}</TableCell>
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
export default function MasterCategory() {
  const [rows, setRows] = useState([
    { id: 1, category: "Electrical", checklist: "Safety Inspection" },
    { id: 2, category: "Plumbing", checklist: "Material Quality Check" },
  ]);

  const [categoryName, setCategoryName] = useState("");
  const [checklist, setChecklist] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const checklistOptions = [
    "Safety Inspection",
    "Material Quality Check",
    "Site Cleanliness",
  ];

  const handleSubmit = () => {
    if (!categoryName.trim() || !checklist) return;

    if (isEditing) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editId
            ? { ...row, category: categoryName, checklist }
            : row
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setRows((prev) => [
        ...prev,
        { id: prev.length + 1, category: categoryName, checklist },
      ]);
    }

    setCategoryName("");
    setChecklist("");
  };

  const handleEdit = (row) => {
    setCategoryName(row.category);
    setChecklist(row.checklist);
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
              | Category
            </Typography>
          </Typography>

          <Box maxWidth="1150px">
            <AddCategoryCard
              isEditing={isEditing}
              categoryName={categoryName}
              checklist={checklist}
              onCategoryChange={(e) => setCategoryName(e.target.value)}
              onChecklistChange={(e) => setChecklist(e.target.value)}
              onSubmit={handleSubmit}
              checklistOptions={checklistOptions}
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
