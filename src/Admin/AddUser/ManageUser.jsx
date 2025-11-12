import { useState } from "react";
import Navbar from "../../componts/AdminNavbar";
import {
  Box,
  Card,
  Avatar,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
  Dialog,
  Divider,
} from "@mui/material";
import { Search, Eye, Pencil, Trash2, Pen, FileImage, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageEnquiry() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    {
      _id: "1",
      companyName: "TechVision Pvt Ltd",
      businessType: "Software",
      phone: "9876543210",
      email: "info@techvision.com",
      pointOfContact: "Rahul Mehta",
      pointOfContactMobile: "9988776655",
      district: "Bangalore Urban",
      city: "Bangalore",
      serviceableCities: ["Mysore", "Mangalore"],
      status: "Open",
      documents: [
        "Aadhaar Card",
        "Degree Certificate",
        "Experience Certificate",
      ],
    },
  ]);

  const handleEditClick = (task) => {
    navigate(`/user/addLSP`, { state: { task } });
  };

  const handleOpenViewDialog = (task) => {
    setSelectedTask(task);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedTask(null);
  };

  const handleOpenDeleteDialog = (task) => {
    setSelectedTask(task);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      setTasks((prev) => prev.filter((t) => t._id !== selectedTask._id));
      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        showConfirmButton: false,
        timer: 1200,
      });
    }
    handleCloseDeleteDialog();
  };

  const itemsPerPage = 10;
  const totalItems = tasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = tasks.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />

      <Box minHeight="100vh" bgcolor="#fff" display="flex" gap={3}>
        <Box sx={{ width: "250px", height: "100px" }} />
        <Box sx={{ m: 0, p: 0 }}>
          <Typography
            color="rgb(0,0,0)"
            sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "500" }}
          >
            Manage LSP
          </Typography>

          {/* Filter Bar */}
          <Card
            elevation={0}
            sx={{ display: "flex", height: "60px", mt: 1, boxShadow: "none" }}
          >
            <CardContent
              sx={{
                width: "1195px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: 0,
                "&:last-child": { pb: 0 },
              }}
            >
              <Box display="flex" gap={2} alignItems="center">
                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>
                    {selectedStaff ? selectedStaff : "Select Role"}
                  </InputLabel>
                  <Select
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    label={selectedStaff ? selectedStaff : "Select Role"}
                  >
                    <MenuItem value="Staff">Staff</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>State</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>Region</InputLabel>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    label="City"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Brooklyn">Brooklyn</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  sx={{ width: "200px" }}
                  size="small"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Search style={{ marginRight: 8 }} size={18} />
                    ),
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Table */}
          <Card
            sx={{
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
              bgcolor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              width: "1180px",
              mt: 2,
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "10px",
                bgcolor: "#fafafa",
                boxShadow: "none",
              }}
            >
              <Table
                sx={{
                  "td, th": {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.88rem",
                    textAlign: "center",
                    padding: "8px 12px",
                  },
                  th: {
                    color: "#fff",
                    bgcolor: "#029898",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    {[
                      "S.No",
                      "Name",
                      "Mobile",
                      "Address",
                      "Email",
                      "Country",
                      "State",
                      "District",
                      selectedStaff === "Manager" ? "Region" : "Role",
                      "Action",
                    ].map((head) => (
                      <TableCell key={head}>{head}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentItems.map((task, idx) => (
                    <TableRow
                      key={task._id}
                      sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                    >
                      <TableCell>{startIndex + idx + 1}</TableCell>
                      <TableCell>{task.companyName}</TableCell>
                      <TableCell>{task.businessType}</TableCell>
                      <TableCell>{task.phone}</TableCell>
                      <TableCell>{task.email}</TableCell>
                      <TableCell>{task.pointOfContact}</TableCell>
                      <TableCell>{task.pointOfContactMobile}</TableCell>
                      <TableCell>{task.district}</TableCell>
                      <TableCell>
                        {selectedStaff === "Manager" ? "Developer" : task.city}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="center" gap={0.5}>
                          <IconButton
                            onClick={() => handleOpenViewDialog(task)}
                            sx={{ color: "#00796B" }}
                          >
                            <Eye size={18} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditClick(task)}
                            sx={{ color: "#0288d1" }}
                          >
                            <Pencil size={18} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenDeleteDialog(task)}
                            sx={{ color: "#d32f2f" }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>

      {/* ✅ Redesigned VIEW POPUP (Figma Style) */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "visible",
            mr:60 
          },
        }}
      >
        {selectedTask && (
          <Box sx={{ bgcolor: "#fff", borderRadius: "16px", p: 3,width:"1100px",}}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" pb={2}>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 ,}}>
                User Details | Manager
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Pen size={16} />
                <Typography
                  fontSize="14px"
                  fontWeight="500"
                  sx={{ cursor: "pointer" }}
                >
                  Edit
                </Typography>
                <IconButton onClick={handleCloseViewDialog}>
                  <X size={18} />
                </IconButton>
              </Box>
            </Box>

            {/* Body */}
            <Box display="flex" gap={2}>
              {/* Left Section */}
              <Box
                sx={{
                  bgcolor: "#f4f4f4",
                  width: "330px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // justifyContent: "center",
                  py: 3,
                  gap: 1,
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }} />
                <Typography fontWeight="600">
                  {selectedTask.companyName}
                </Typography>
                <Typography fontSize="14px" color="text.secondary">
                  5 Years of Experience
                </Typography>
              </Box>

              {/* Right Section */}
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "#f4f4f4",
                  borderRadius: "10px",
                  // p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {/* Personal Data */}
                <Box p={2}>
                <Typography fontWeight="600" pb={1}>Personal Data</Typography>
                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1}>
                  <TextField size="small" label="Mobile No." />
                  <TextField size="small" label="Email ID" />
                  <TextField size="small" label="Address" />
                  <TextField size="small" label="Country" />
                  <TextField size="small" label="State" />
                  <TextField size="small" label="City" />
                  <TextField size="small" label="Region" />
                </Box>
                </Box>

                <Divider />

                {/* Social Media */}
                <Box p={2}>
                <Typography pb={1} fontWeight="600">Social Media Platforms</Typography>
                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                  <TextField size="small" label="Instagram" />
                  <TextField size="small" label="YouTube" />
                  <TextField size="small" label="LinkedIn" />
                </Box>
                </Box>

                <Divider />

                {/* Documents */}
                <Box p={2}>
                <Typography fontWeight="600">Document Data</Typography>
                <Box display="flex" gap={3}>
                  {["Adhaar Card", "Degree Certificate", "Provisional Certificate", "Experience Certificate"].map(
                    (doc, i) => (
                      <Box
                        key={i}
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography
                          sx={{
                            textDecoration: "underline",
                            color: "#0077b6",
                            fontSize: "14px",
                          }}
                        >
                          {doc}
                        </Typography>
                        <FileImage size={16} />
                      </Box>
                    )
                  )}
                </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>

      {/* ✅ DELETE POPUP */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{ sx: { borderRadius: "18px" } }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          sx={{ width: "600px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Trash2 size={40} style={{ color: "black" }} />
            <Typography variant="h6" fontWeight="bold">
              Delete Data
            </Typography>
            <Typography textAlign="center">
              Are You Sure You Want To Delete This Information
            </Typography>
          </Box>
          <Divider sx={{ width: "100%", border: "2px solid #ceccccff" }} />
          <Box display="flex" gap={2} pb={2}>
            <Button
              variant="outlined"
              onClick={handleCloseDeleteDialog}
              sx={{ width: "100px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmDelete}
              sx={{
                bgcolor: "#db0303ff",
                "&:hover": { bgcolor: "#333" },
                width: "100px",
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
