import { useState } from "react";
import Navbar from "../../componts/LspNavbar.jsx";
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
import { Search, Eye, Pencil, Trash2, Pen, FileImage } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageEnquiry() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    {
      _id: "1",
      companyName: "ComfortLiv",
      businessType: "Owner",
      phone: "9876543210",
      email: "info@techvision.com",
      pointOfContact: "Rahul Mehta",
      pointOfContactMobile: "9988776655",
      district: "Bangalore Urban",
      city: "Bangalore",
      serviceableCities: ["Mysore", "Mangalore"],
      status: "Open",
      documents: ["Aadhaar Card", "Degree Certificate", "Experience Certificate"],
    },
  ]);

  const handleEditClick = (task) => {
    navigate(`/lsp-addLSP`, { state: { task } });
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
        {/* Spacer Left */}
        <Box sx={{ width: "250px", height: "100px" }} />

        <Box sx={{ m: 0, p: 0 }}>
          <Typography
            color="rgb(0,0,0)"
            sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "500" }}
          >
            Manage Technician
          </Typography>

          {/* Filter Bar */}
          <Card elevation={0} sx={{ display: "flex", height: "60px", mt: 1 }}>
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
                {/* District */}
                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>District</InputLabel>
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

                {/* City */}
                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>City</InputLabel>
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

                {/* Search */}
                <TextField
                  sx={{ width: "200px" }}
                  size="small"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search style={{ marginRight: 8 }} size={18} />,
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Table */}
        <Card
  sx={{
    mt: 2,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    bgcolor: "#fff",
    overflow: "hidden",
    width: "1180px",
  }}
>
  <TableContainer
    component={Paper}
    sx={{
      borderRadius: "10px",
      minWidth: "1100px",
      bgcolor: "#fafafa",
      boxShadow: "none",
      overflowX: "auto",  // horizontal scroll
      overflowY: "auto",  // vertical scroll
      maxHeight: "480px", // fixed height
      whiteSpace: "nowrap",
    }}
  >
    <Table
      stickyHeader
      sx={{
        width: "100%",
        tableLayout: "auto",
        td: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "12px",
          padding: "4px 8px", // compact padding
          textAlign: "center",
          borderBottom: "1px solid #e0e0e0",
        },
        th: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "12px",
          padding: "6px 8px",
          textAlign: "center",
          color: "#fff",
          backgroundColor: "#029898",
          borderBottom: "1px solid #e0e0e0",
        },
        "& .MuiTableRow-root:hover": {
          backgroundColor: "#f5f6f9", // row hover
        },
      }}
    >
      <TableHead>
        <TableRow>
          {[
            "S.No",
            "Employee id",
            "Full Name",
            "Year Of Exp",
            "Address",
            "Mobile No",
            "Email ID",
            "Category Of Service",
            "City Of Operation",
            "Active/Deactive",
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
            sx={{
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": { backgroundColor: "#f5f6f9" },
            }}
          >
            <TableCell>{startIndex + idx + 1}</TableCell>
            <TableCell>{task.companyName}</TableCell>
            <TableCell>{task.businessType}</TableCell>
            <TableCell>{task.phone}</TableCell>
            <TableCell>{task.email}</TableCell>
            <TableCell>{task.pointOfContact}</TableCell>
            <TableCell>{task.pointOfContactMobile}</TableCell>
            <TableCell>{task.district}</TableCell>
            <TableCell>{task.city}</TableCell>
            <TableCell>{task.status}</TableCell>

            <TableCell>
              <Box display="flex" justifyContent="center" gap={0.5}>
                <IconButton
                  onClick={() => handleOpenViewDialog(task)}
                  size="small"
                  sx={{
                    color: "#00796B",
                    "&:hover": { bgcolor: "rgba(0,121,107,0.08)" },
                  }}
                >
                  <Eye size={18} />
                </IconButton>

                <IconButton
                  onClick={() => handleEditClick(task)}
                  size="small"
                  sx={{
                    color: "#0288d1",
                    "&:hover": { bgcolor: "rgba(2,136,209,0.08)" },
                  }}
                >
                  <Pencil size={18} />
                </IconButton>

                <IconButton
                  onClick={() => handleOpenDeleteDialog(task)}
                  size="small"
                  sx={{
                    color: "#d32f2f",
                    "&:hover": { bgcolor: "rgba(211,47,47,0.08)" },
                  }}
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

      {/* VIEW POPUP */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            width: "2000px",
            overflow: "visible",
            mr: 50,
          },
        }}
      >
        {selectedTask && (
          <Box sx={{ bgcolor: "#fff", borderRadius: "12px", width: "1100px" }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" px={3} pt={3}>
              <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>LSP Details</Typography>

              <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: "pointer" }}>
                <Pen size={16} />
                <Typography fontSize="14px" fontWeight="500">Edit</Typography>
              </Box>
            </Box>

            {/* Main Content */}
            <Box display="flex" px={3} pb={3} pt={2}>
              {/* Left Section */}
              <Box
                sx={{
                  bgcolor: "#f4f4f4",
                  borderRadius: "8px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mr: 3,
                  pt: 3,
                }}
              >
                <Avatar sx={{ width: 90, height: 90, mb: 2 }} />
                <Typography fontWeight="600">Technician Name</Typography>
                <Typography variant="body2" color="text.secondary">Employee ID</Typography>
                <Typography variant="body2" color="text.secondary">Year Of Experience</Typography>
              </Box>

              {/* Right Section */}
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "#f4f4f4",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {/* Personal Data */}
                <Box p={2} pl={3}>
                  <Typography mb={1} fontWeight="600">Personal Data</Typography>

                  <Box display="grid" gap={3} gridTemplateColumns="repeat(4, 1fr)" mb={2}>
                    {["Gender", "Date Of Birth", "Age", "Marital Status"].map((label) => (
                      <Box key={label}>
                        <Typography fontWeight="600" fontSize="13px">{label}</Typography>
                        <TextField size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "30px",
                              bgcolor: "#e0e0e0",
                              borderRadius: "4px",
                              "& input": { padding: "4px 8px", fontSize: "12px" },
                              "& fieldset": { border: "none" },
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>

                  {/* Address + Contact */}
                  <Box display="flex" gap={2}>
                    <Box>
                      <Typography fontWeight="600" fontSize="13px">Address</Typography>
                      <TextField
                        size="small"
                        sx={{
                          width: "345px",
                          "& .MuiOutlinedInput-root": {
                            height: "30px",
                            bgcolor: "#e0e0e0",
                            borderRadius: "4px",
                            "& input": { padding: "4px 8px", fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography fontWeight="600" fontSize="13px">Mobile Number</Typography>
                      <TextField size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "30px",
                            bgcolor: "#e0e0e0",
                            borderRadius: "4px",
                            "& input": { padding: "4px 8px", fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography fontWeight="600" fontSize="13px">Email ID</Typography>
                      <TextField size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "30px",
                            bgcolor: "#e0e0e0",
                            borderRadius: "4px",
                            "& input": { padding: "4px 8px", fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <Box display="flex" gap={2}>
                    <Box mt={2}>
                      <Typography fontWeight="600" fontSize="13px">Emergency Mobile No</Typography>
                      <TextField
                        size="small"
                        sx={{
                          mt: 1,
                          "& .MuiOutlinedInput-root": {
                            height: "30px",
                            bgcolor: "#e0e0e0",
                            borderRadius: "4px",
                            "& input": { padding: "4px 8px", fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    </Box>

                    <Box mt={2}>
                      <Typography fontWeight="600" fontSize="13px">Language Spoken</Typography>

                      <Box display="flex" gap={2} mt={1}>
                        {["English", "Tamil", "Malayalam"].map((lang) => (
                          <Typography
                            key={lang}
                            sx={{
                              p: 1,
                              bgcolor: "#e0e0e0",
                              fontSize: "12px",
                              display: "flex",
                              justifyContent: "center",
                              borderRadius: "22px",
                            }}
                          >
                            {lang}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Divider />

                {/* Serviceable Cities */}
                <Box display="flex" gap={10} pl={3}>
                  <Box>
                    <Typography fontWeight="600" mb={1} fontSize="13px">
                      Category Of Services
                    </Typography>

                    <Box display="flex" gap={2}>
                      {["xxxxxx", "xxxxxx", "xxxxxxxxx"].map((c) => (
                        <Typography
                          key={c}
                          sx={{
                            p: 1,
                            bgcolor: "#e0e0e0",
                            fontSize: "12px",
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "15px",
                          }}
                        >
                          {c}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography fontWeight="600" mb={1} fontSize="13px">
                      Area/City of Operation
                    </Typography>

                    <Box display="flex" gap={2}>
                      {["xxxxxx", "xxxxxx", "xxxxxxxxx"].map((city) => (
                        <Typography
                          key={city}
                          sx={{
                            p: 1,
                            bgcolor: "#e0e0e0",
                            fontSize: "12px",
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "15px",
                          }}
                        >
                          {city}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Divider />

                {/* Document Data */}
                <Box ml={3} mb={5}>
                  <Typography fontWeight="600">Document Data</Typography>

                  <Box display="flex" alignItems="center" gap={0.5} mt={0.8}>
                    <Typography
                      sx={{
                        color: "#000",
                        fontSize: "14px",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      ID Proof
                    </Typography>
                    <FileImage size={16} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>

      {/* DELETE POPUP */}
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
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
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
            <Button variant="outlined" onClick={handleCloseDeleteDialog} sx={{ width: "100px" }}>
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
