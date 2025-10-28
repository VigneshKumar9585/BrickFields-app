import { useState, useEffect } from "react";
import Navbar from "../../componts/Navbar.jsx";
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
  CircularProgress,
} from "@mui/material";
import { Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Pen
} from "lucide-react";

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
 const [tasks] = useState([
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
    serviceableCities: "Mysore, Mangalore",
    status: "Open",
  },
  {
    _id: "2",
    companyName: "BuildPro Solutions",
    businessType: "Construction",
    phone: "9876543211",
    email: "support@buildpro.com",
    pointOfContact: "Priya Nair",
    pointOfContactMobile: "9988776644",
    district: "Ernakulam",
    city: "Kochi",
    serviceableCities: "Kollam, Thrissur",
    status: "Closed",
  },
]);

  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch LSPs
  // useEffect(() => {
  //   const fetchLSPs = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get("http://localhost:2444/lsp-get");
  //       setTasks(res.data.data || []);
  //     } catch (err) {
  //       console.error("Failed to fetch LSP data", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchLSPs();
  // }, []);

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

          {/* Table with horizontal scroll & single-line headers */}
        {/* Table Section */}
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
      overflowX: "auto",
      whiteSpace: "nowrap",
      bgcolor: "#fafafa",
      boxShadow: "none",
    }}
  >
    <Table 
    sx={{
         "td": {
          whiteSpace: "nowrap", // ✅ single line only
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "0.88rem",
          padding: "8px 12px", // compact padding
          textAlign: "center",
        },
        "th":{
            whiteSpace: "nowrap", // ✅ single line only
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "0.88rem",
          padding: "12px 12px", // compact padding
          textAlign: "center",
          color:"#fff"
        }
      }}>
      <TableHead>
        <TableRow sx={{ bgcolor: "#029898" }}>
          {[
            "S.No",
            "Company Name",
            "Business Type",
            "Phone",
            "Email",
            "Point of Contact",
            "Contact Mobile",
            "District",
            "City",
            "Serviceable Cities",
            "Status",
            "Action",
          ].map((head) => (
            <TableCell
              key={head}
             
            >
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {currentItems.map((task, idx) => (
          <TableRow
            key={task._id}
            sx={{
              "&:hover": { backgroundColor: "#f5f5f5" },
              transition: "background 0.2s ease",
            }}
          >
            <TableCell align="center">{startIndex + idx + 1}</TableCell>
            <TableCell align="center">{task.companyName}</TableCell>
            <TableCell align="center">{task.businessType}</TableCell>
            <TableCell align="center">{task.phone}</TableCell>
            <TableCell align="center">{task.email}</TableCell>
            <TableCell align="center">{task.pointOfContact}</TableCell>
            <TableCell align="center">{task.pointOfContactMobile}</TableCell>
            <TableCell align="center">{task.district}</TableCell>
            <TableCell align="center">{task.city}</TableCell>
            <TableCell align="center">{task.serviceableCities}</TableCell>

            {/* ✅ Added static status for style */}
            {/* <TableCell align="center">
              <Pen
                label={task.status || "Active"}
                size="small"
                sx={{
                  fontWeight: 500,
                  color:
                    task.status === "Open"
                      ? "#0F5132"
                      : task.status === "Closed"
                      ? "#842029"
                      : "#055160",
                  bgcolor:
                    task.status === "Open"
                      ? "#D1E7DD"
                      : task.status === "Closed"
                      ? "#F8D7DA"
                      : "#D1ECF1",
                }}
              />
            </TableCell> */}

            <TableCell align="center">
              <Box display="flex" justifyContent="center" gap={0.5}>
                <IconButton
                  size="small"
                  sx={{
                    color: "#00796B",
                    "&:hover": { bgcolor: "rgba(0,121,107,0.08)" },
                  }}
                  onClick={() => handleOpenViewDialog(task)}
                >
                  <Eye size={18} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "#0288d1",
                    "&:hover": { bgcolor: "rgba(2,136,209,0.08)" },
                  }}
                  onClick={() => handleEditClick(task)}
                >
                  <Pencil size={18} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "#d32f2f",
                    "&:hover": { bgcolor: "rgba(211,47,47,0.08)" },
                  }}
                  onClick={() => handleOpenDeleteDialog(task)}
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
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} PaperProps={{ sx: { borderRadius: "18px",  width: "600px" } }}>
        {selectedTask && (
          <Box display="flex" flexDirection="column"   >
            <Typography variant="h6" fontWeight="bold" sx={{p:2,bgcolor:"#029898",color:"white"}} >
              LSP Details
            </Typography>
            <Divider />
            <Box display="flex"  >
                                        <Box
                                          sx={{
                                            m:3,
                                            mr:0,
                                            bgcolor: "rgba(240, 238, 238, 1)",
                                            borderRadius: 2.5,
                                            width: "180px",
                                            height:"300px",
                                            display:"grid",
                                              justifyContent: "center",


                                          }}
                                        >
                                          <Box
                                            sx={{
                                              gap: 2,
                                            }}
                                          >

                                            <Avatar sx={{ width: 90, height: 90 ,ml:2,mt:4,mb:1}} />
                                            <Box sx={{textAlign:"center"}}>
                                              <Typography sx={{ fontWeight: 600 }}>
                                                Company Name
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary">
                                                District
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Box>

                                        <Box
                                          sx={{
                                            m:3,
                                            bgcolor: "rgba(240, 238, 238, 1)",
                                            borderRadius: 2.5,
                                            width: "700px",
                                            height:"300px",
                                            display:"grid",
                                              justifyContent: "center",


                                          }}
                                        >
                                          <Box
                                            sx={{
                                              gap: 2,
                                            }}
                                          >

                                            <Box sx={{textAlign:"center"}}>
                                              <Typography sx={{ fontWeight: 600 }}>
                                                Company Name
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary">
                                                District
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Box>
              

             </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}
