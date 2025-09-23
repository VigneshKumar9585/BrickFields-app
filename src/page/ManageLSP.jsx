import { useState, useEffect } from "react";
import Navbar from "../componts/Navbar.jsx";
import {
  Box,
  Card,
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
  CircularProgress,
} from "@mui/material";
import { Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageEnquiry() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Popup states
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false); // 👁 view popup state

  // API Data
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch LSPs
  useEffect(() => {
    const fetchLSPs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:2444/lsp-get");
        setTasks(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch LSP data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLSPs();
  }, []);

  const handleEditClick = (task) => {
    navigate(`/user/addLSP`, { state: { task } });
  };

  const handleOpenDialog = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
    setActiveTab(0);
  };

  // DELETE dialog handlers
  const handleOpenDeleteDialog = (task) => {
    setSelectedTask(task);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedTask(null);
  };

  // ✅ Delete function integrated with backend
  const handleConfirmDelete = async () => {
    if (!selectedTask?._id) return;

    try {
      await axios.delete(`http://localhost:2444/lsp-delete/${selectedTask._id}`);
      Swal.fire("Deleted!", "LSP deleted successfully.", "success");

      // ✅ Remove from table
      setTasks((prev) => prev.filter((task) => task._id !== selectedTask._id));

      setOpenDeleteDialog(false);
      setSelectedTask(null);
    } catch (err) {
      console.error("Error deleting LSP:", err);
      Swal.fire("Error!", "Failed to delete LSP.", "error");
    }
  };

  // VIEW dialog handlers
  const handleOpenViewDialog = (task) => {
    setSelectedTask(task);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedTask(null);
  };

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const itemsPerPage = 10;
  const totalItems = tasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = tasks.slice(startIndex, endIndex);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Box minHeight="100vh" bgcolor="#fff" display="flex" gap={3}>
        <Box sx={{ width: "250px", height: "100px" }} />
        <Box sx={{ m: 0, p: 0 }}>
          <Typography color="rgb(0,0,0)" sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "500" }}>
            Manage LSP
          </Typography>

          {/* Filter Bar */}
          <Card elevation={0} sx={{ display: "flex", height: "60px", mt: 1, boxShadow: "none" }}>
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
                  <InputLabel>District</InputLabel>
                  <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} label="Status">
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>City</InputLabel>
                  <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} label="City">
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
                  InputProps={{ startAdornment: <Search style={{ marginRight: 8 }} size={18} /> }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Table */}
          <Card
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              mt: 2,
              ml: "20px",
              bgcolor: "rgb(0,0,0)",
              width: "1180px",
              borderRadius: "12px",
            }}
          >
            <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <Table>
                <TableHead sx={{ bgcolor: "#029898" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>S.No</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>Company Name</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>Business Type</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>Company Phone No.</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>Company Email</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>Point Of Contact Name</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>Point Of Contact Mobile</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>District</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>City</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>Serviceable Cities</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((task, idx) => (
                    <TableRow key={task._id}>
                      <TableCell sx={{ textAlign: "center" }}>{startIndex + idx + 1}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.companyName}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.businessType}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.phone}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.email}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.pointOfContact}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.pointOfContactMobile}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.district}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.city}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{task.serviceableCities}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          {/* 👁 View button */}
                          <IconButton size="small" onClick={() => handleOpenViewDialog(task)}>
                            <Eye size={18} />
                          </IconButton>

                          {/* ✏ Edit button */}
                          <IconButton size="small" onClick={() => handleEditClick(task)}>
                            <Pencil size={18} />
                          </IconButton>

                          {/* 🗑 Delete button */}
                          <IconButton size="small" onClick={() => handleOpenDeleteDialog(task)}>
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

          {/* Pagination */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography variant="body2">
              Showing {startIndex + 1} to {endIndex} of {totalItems} results
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Button
                variant="outlined"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} /> Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "contained" : "text"}
                  onClick={() => setCurrentPage(page)}
                  sx={{
                    minWidth: "36px",
                    mx: 0.5,
                    color: currentPage === page ? "white" : "#029898",
                    bgcolor: currentPage === page ? "#029898" : "transparent",
                    "&:hover": { bgcolor: currentPage === page ? "#027777" : "rgba(2, 152, 152, 0.1)" },
                  }}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outlined"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight size={16} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* DELETE POPUP */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{ sx: { borderRadius: "18px" } }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ width: "600px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
            <Trash2 size={40} style={{ color: "black" }} />
            <Typography variant="h6" fontWeight="bold">Delete Data</Typography>
            <Typography textAlign="center">Are You Sure You Want To Delete This Information</Typography>
          </Box>
          <Divider sx={{ width: "100%", border: "2px solid #ceccccff" }} />
          <Box display="flex" gap={2} pb={2}>
            <Button variant="outlined" onClick={handleCloseDeleteDialog} sx={{ width: "100px" }}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleConfirmDelete}
              sx={{ bgcolor: "#db0303ff", "&:hover": { bgcolor: "#333" }, width: "100px" }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* VIEW POPUP */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} PaperProps={{ sx: { borderRadius: "18px", p: 2, width: "600px" } }}>
        {selectedTask && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              LSP Details
            </Typography>
            <Divider />
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography><b>Company Name:</b> {selectedTask.companyName}</Typography>
              <Typography><b>Business Type:</b> {selectedTask.businessType}</Typography>
              <Typography><b>Phone:</b> {selectedTask.phone}</Typography>
              <Typography><b>Email:</b> {selectedTask.email}</Typography>
              <Typography><b>Point Of Contact:</b> {selectedTask.pointOfContact}</Typography>
              <Typography><b>Contact Mobile:</b> {selectedTask.pointOfContactMobile}</Typography>
              <Typography><b>District:</b> {selectedTask.district}</Typography>
              <Typography><b>City:</b> {selectedTask.city}</Typography>
              <Typography><b>Serviceable Cities:</b> {selectedTask.serviceableCities}</Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" onClick={handleCloseViewDialog}>
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}
