import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../componts/TachnicanNavbar.jsx";
import toast from "react-hot-toast";

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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Popover,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Add CSS for blinking animation
const styles = `
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default function NewEnquiry() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = sessionStorage.getItem("role");

  // API data
  const [tasks, setTasks] = useState([]);

  // Fetch enquiries
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/technician-enquiry/${user.id}`)
      .then((res) => {
        setTasks(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(tasks)
  const [openRejectPopup, setOpenRejectPopup] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const formatTime = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");
    let h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;          // convert 0 → 12
    h = h || 12;         // handle midnight (0 becomes 12)

    return `${h}:${minutes} ${ampm}`;
  };

  // Format date to DD-MM-YY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };




  // 🔍 Filter logic for search
  const filteredTasks = tasks.filter((task) => {
    const term = searchTerm.toLowerCase();

    return (
      task.name?.toLowerCase().includes(term) ||
      task.email?.toLowerCase().includes(term) ||
      task.phoneNumber?.toString().includes(term) ||
      task.enquiryId?.toLowerCase().includes(term) ||
      task.state?.toLowerCase().includes(term) ||
      task.district?.toLowerCase().includes(term) ||
      task.city?.toLowerCase().includes(term) ||
      task.landmark?.toLowerCase().includes(term) ||
      task.street?.toLowerCase().includes(term) ||
      (task.preferDate &&
        new Date(task.preferDate).toLocaleDateString().includes(term))
    );
  });

  const handleDateClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseDatePicker = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const totalItems = filteredTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const currentItems = filteredTasks.slice(startIndex, endIndex);


  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));


  const handleOpenDialog = (task) => {
    setSelectedImages(task.siteImage || []);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedImages([]);
    setOpenDialog(false);
  };

  const handleRowClick = (id) => {
    navigate(`/technician-task-details/${id}`);
  };



  const rejectEnquiry = async () => {
    try {
      const requiredData = {
        enquiryId: selectedTaskId,
        reason: rejectionReason,
        technicianId: user.id,
        role: role
      }
      const res = await axios.put(
        `${BACKEND_URL}/api/reject-technician-enquiry`,
        requiredData
      );
      toast.success("Enquiry rejected successfully!");
      setOpenRejectPopup(false);
      setRejectionReason("");
      setSelectedTaskId(null);
      // Refresh the tasks list
      setTasks(tasks.filter(t => t._id !== selectedTaskId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject enquiry.");
    }
  };
  const acceptEnquiry = async (id) => {
    try {
      console.log(selectedTaskId)
      const requiredData = {
        enquiryId: id,
        technicianId: user.id
      }
      const res = await axios.put(
        `${BACKEND_URL}/api/accept-technician`,
        requiredData
      );
      toast.success("Enquiry Accepted successfully!");
      // setShowAssignLsp(true);
      navigate("/dashboard")

    } catch (err) {
      console.error(err);
      toast.error("Failed to accept enquiry.");
    }
  };


  // Date label text
  const formatRange = (range) => {
    const start = range[0].startDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const end = range[0].endDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  return (
    <>
      <Navbar />

      <Box minHeight="100vh" bgcolor="#fff" display="flex" gap={3}>

        {/* Sidebar Spacer (keeps table aligned to the right side) */}
        <Box sx={{ width: "250px", flexShrink: 0 }} />

        {/* Main Content (full width) */}
        <Box
          sx={{
            flexGrow: 1,
            m: 0,
            pl: 0,
            pr: 3,
            overflowX: "auto"   // 👈 ENABLE PARENT SCROLLING
          }}
        >

          {/* ---- FILTER CARD ---- */}
          <Card
            elevation={0}
            sx={{ display: "flex", height: "60px", mt: 1, boxShadow: "none" }}
          >
            <CardContent
              sx={{
                width: "1195px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 0,
                "&:last-child": { pb: 0 },
              }}
            >
              {/* Left side - New Tasks Title */}
              <Typography
                color="rgb(0,0,0)"
                sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "500" }}
              >
                New Tasks
              </Typography>

              {/* Right side - Filters */}
              <Box display="flex" gap={2} alignItems="center">
                {/* Show entries dropdown */}
                <Typography sx={{ fontSize: "12px", color: "#666" }}>Show</Typography>
                <FormControl
                  size="small"
                  sx={{
                    width: "80px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      "& fieldset": {
                        borderColor: "#d0d0d0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#a1a1a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#029898",
                      },
                    },
                    "& .MuiSelect-select": {
                      fontSize: "12px",
                      padding: "6px 10px",
                    },
                  }}
                >
                  <Select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(e.target.value);
                      setCurrentPage(1);
                    }}
                    sx={{
                      height: "34px",
                      fontSize: "12px",
                      "& .MuiSelect-select": {
                        padding: "6px 10px",
                        fontSize: "12px",
                      },
                    }}
                  >
                    <MenuItem value={10} sx={{ fontSize: "12px" }}>10</MenuItem>
                    <MenuItem value={20} sx={{ fontSize: "12px" }}>20</MenuItem>
                    <MenuItem value={30} sx={{ fontSize: "12px" }}>30</MenuItem>
                    <MenuItem value={40} sx={{ fontSize: "12px" }}>40</MenuItem>
                    <MenuItem value={50} sx={{ fontSize: "12px" }}>50</MenuItem>
                  </Select>
                </FormControl>
                {/* <Typography sx={{ fontSize: "12px", color: "#666" }}>entries</Typography> */}

                {/* Country Filter */}
                <FormControl
                  size="small"
                  sx={{
                    width: "140px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      "& fieldset": {
                        borderColor: "#d0d0d0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#a1a1a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#029898",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiSelect-select": {
                      fontSize: "12px",
                      padding: "6px 10px",
                    },
                  }}
                >
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    label="Country"
                    sx={{
                      height: "34px",
                      fontSize: "12px",
                      "& .MuiSelect-select": {
                        padding: "6px 10px",
                        fontSize: "12px",
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: "12px" }}>All</MenuItem>
                    <MenuItem value="Central" sx={{ fontSize: "12px" }}>Central</MenuItem>
                    <MenuItem value="North" sx={{ fontSize: "12px" }}>North</MenuItem>
                    <MenuItem value="South" sx={{ fontSize: "12px" }}>South</MenuItem>
                    <MenuItem value="East" sx={{ fontSize: "12px" }}>East</MenuItem>
                    <MenuItem value="West" sx={{ fontSize: "12px" }}>West</MenuItem>
                  </Select>

                </FormControl>

                <FormControl
                  size="small"
                  sx={{
                    width: "140px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      "& fieldset": {
                        borderColor: "#d0d0d0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#a1a1a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#029898",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiSelect-select": {
                      fontSize: "12px",
                      padding: "6px 10px",
                    },
                  }}
                >
                  <InputLabel>Region</InputLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    label="Country"
                    sx={{
                      height: "34px",
                      fontSize: "12px",
                      "& .MuiSelect-select": {
                        padding: "6px 10px",
                        fontSize: "12px",
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: "12px" }}>All</MenuItem>
                    <MenuItem value="Central" sx={{ fontSize: "12px" }}>Central</MenuItem>
                    <MenuItem value="North" sx={{ fontSize: "12px" }}>North</MenuItem>
                    <MenuItem value="South" sx={{ fontSize: "12px" }}>South</MenuItem>
                    <MenuItem value="East" sx={{ fontSize: "12px" }}>East</MenuItem>
                    <MenuItem value="West" sx={{ fontSize: "12px" }}>West</MenuItem>
                  </Select>

                </FormControl>

                <FormControl
                  size="small"
                  sx={{
                    width: "140px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      "& fieldset": {
                        borderColor: "#d0d0d0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#a1a1a1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#029898",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiSelect-select": {
                      fontSize: "12px",
                      padding: "6px 10px",
                    },
                  }}
                >
                  <InputLabel>District</InputLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    label="Country"
                    sx={{
                      height: "34px",
                      fontSize: "12px",
                      "& .MuiSelect-select": {
                        padding: "6px 10px",
                        fontSize: "12px",
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: "12px" }}>All</MenuItem>
                    <MenuItem value="Central" sx={{ fontSize: "12px" }}>Central</MenuItem>
                    <MenuItem value="North" sx={{ fontSize: "12px" }}>North</MenuItem>
                    <MenuItem value="South" sx={{ fontSize: "12px" }}>South</MenuItem>
                    <MenuItem value="East" sx={{ fontSize: "12px" }}>East</MenuItem>
                    <MenuItem value="West" sx={{ fontSize: "12px" }}>West</MenuItem>
                  </Select>

                </FormControl>

                {/* ---- SEARCH FIELD ---- */}
                <TextField
                  sx={{
                    width: "200px",
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      bgcolor: "#f9f9f9",
                      borderRadius: "6px",
                      "& fieldset": { borderColor: "#d0d0d0" },
                      "&:hover fieldset": { borderColor: "#a1a1a1" },
                      "&.Mui-focused fieldset": { borderColor: "#029898" },
                      "& input": { padding: "6px 10px", fontSize: "12px" },
                    },
                  }}
                  size="small"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search style={{ marginRight: 8 }} size={16} />,
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* ---- CARDS GRID ---- */}
          {currentItems.length === 0 ? (
            <Box sx={{ textAlign: "center", padding: "40px 20px" }}>
              <Typography variant="body1" sx={{ fontSize: "14px", color: "#666" }}>
                No enquiries found
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: 2,
                mb: 3,
              }}
            >
              {currentItems.map((task, idx) => (
                <Card
                  key={task._id}
                  sx={{
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                    bgcolor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
                      borderColor: "#029898",
                    },
                    // Blink entire card if payment done but not assigned
                    // ...(task.initialAmount && !task.assignedTo && {
                    //   animation: "blink 1.5s ease-in-out infinite",
                    //   backgroundColor: "#fff9e6",
                    // }),
                  }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    {/* Header with S.No and Enquiry ID */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#029898",
                          bgcolor: "#f0fffe",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "4px",
                        }}
                      >
                        #{startIndex + idx + 1}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#666",
                        }}
                      >
                        {task.enquiryId}
                      </Typography>
                    </Box>

                    {/* Name and Contact */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#000",
                          mb: 0.5,
                        }}
                      >
                        {task.name}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Typography sx={{ fontSize: "12px", color: "#666" }}>
                          <strong>Mobile:</strong> {task.phoneNumber}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#666" }}>
                          <strong>Email:</strong> {task.email}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Property Details */}
                    <Box sx={{ mb: 2, padding: "12px", bgcolor: "#f9f9f9", borderRadius: "6px" }}>
                      <Typography sx={{ fontSize: "11px", color: "#666", mb: 1 }}>
                        <strong>Sq.Feet:</strong> {task.sqFeet}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#666", mb: 1 }}>
                        <strong>State:</strong> {task.state}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#666", mb: 1 }}>
                        <strong>District:</strong> {task.district}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#666", mb: 1 }}>
                        <strong>Street:</strong> {task.street}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#666", mb: 1 }}>
                        <strong>Landmark:</strong> {task.landmark}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#666", mb: 1 }}>
                        <strong>Preferred Date:</strong> {formatDate(task.preferDate)}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#666" }}>
                        <strong>Preferred Time:</strong> {formatTime(task.preferTime)}
                      </Typography>
                    </Box>

                    {/* Site Images */}
                    <Box sx={{ mb: 2 }}>
                      {task.siteImage && task.siteImage.length > 0 ? (
                        <Button
                          size="small"
                          sx={{
                            color: "#029898",
                            textTransform: "none",
                            fontSize: "12px",
                            textDecoration: "underline",
                            p: 0,
                            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDialog(task);
                          }}
                        >
                          View Site Images ({task.siteImage.length})
                        </Button>
                      ) : (
                        <Typography sx={{ fontSize: "12px", color: "#999" }}>
                          No Site Images
                        </Typography>
                      )}
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 1, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: "#029898",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: "600",
                          py: 1,
                          textTransform: "none",
                          borderRadius: "6px",
                          "&:hover": { bgcolor: "#027878" },
                        }}
                        onClick={() => acceptEnquiry(task._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderColor: "#ff6b6b",
                          color: "#ff6b6b",
                          fontSize: "12px",
                          fontWeight: "600",
                          py: 1,
                          textTransform: "none",
                          borderRadius: "6px",
                          "&:hover": {
                            bgcolor: "#ffe6e6",
                            borderColor: "#ff6b6b",
                          },
                        }}
                        onClick={() => {
                          setSelectedTaskId(task._id);
                          setOpenRejectPopup(true);
                        }}
                      >
                        Deny
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* ---- PAGINATION ---- */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="body2" sx={{ fontSize: "12px", color: "#666" }}>
              Showing {startIndex + 1} to {endIndex} of {totalItems} results
            </Typography>

            <Box display="flex" gap={1} alignItems="center">
              <IconButton
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                sx={{
                  border: "1px solid #029898",
                  borderRadius: "6px",
                  width: "36px",
                  height: "36px",
                  color: currentPage === 1 ? "#ccc" : "#029898",
                  borderColor: currentPage === 1 ? "#e0e0e0" : "#029898",
                  "&:hover": {
                    bgcolor: currentPage === 1 ? "transparent" : "#f0f9f9",
                  },
                  "&.Mui-disabled": {
                    borderColor: "#e0e0e0",
                    color: "#ccc",
                  },
                }}
              >
                <ChevronLeft size={20} />
              </IconButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "contained" : "outlined"}
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      minWidth: "36px",
                      height: "36px",
                      mx: 0.5,
                      fontSize: "12px",
                      color: currentPage === page ? "white" : "#029898",
                      bgcolor: currentPage === page ? "#029898" : "transparent",
                      borderColor: "#029898",
                      "&:hover": {
                        bgcolor: currentPage === page ? "#027878" : "#f0f9f9",
                        borderColor: "#029898",
                      },
                    }}
                  >
                    {page}
                  </Button>
                )
              )}

              <IconButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                sx={{
                  border: "1px solid #029898",
                  borderRadius: "6px",
                  width: "36px",
                  height: "36px",
                  color: currentPage === totalPages ? "#ccc" : "#029898",
                  borderColor: currentPage === totalPages ? "#e0e0e0" : "#029898",
                  "&:hover": {
                    bgcolor: currentPage === totalPages ? "transparent" : "#f0f9f9",
                  },
                  "&.Mui-disabled": {
                    borderColor: "#e0e0e0",
                    color: "#ccc",
                  },
                }}
              >
                <ChevronRight size={20} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ---- IMAGE POPUP ---- */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            overflow: "hidden",
          }
        }}
      >
        {/* HEADER */}
        <DialogTitle
          sx={{
            backgroundColor: "#029898",
            color: "white",
            fontWeight: 600,
            fontSize: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            px: 2,
          }}
        >
          Site Images

          {/* CLOSE BUTTON */}
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "#029898",
              bgcolor: "white",
              textTransform: "none",
              fontSize: "12px",
              fontWeight: 600,
              borderRadius: "6px",
              "&:hover": {
                bgcolor: "#f1f1f1",
              },
            }}
          >
            Close
          </Button>
        </DialogTitle>

        {/* CONTENT */}
        <DialogContent sx={{ mt: 2, pb: 3 }}>
          {selectedImages.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "gray" }}>
              No images available
            </Typography>
          ) : (
            <Box
              display="flex"
              flexWrap="wrap"
              gap={2}
              justifyContent="center"
            >
              {selectedImages.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "220px",
                    height: "220px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                    border: "1px solid #e3e3e3",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <img
                    src={`${BACKEND_URL}/upload-site-images/${img}`}
                    alt="enquiry"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openRejectPopup}
        onClose={() => {
          setOpenRejectPopup(false);
          setRejectionReason("");
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "6px",
            border: "1px solid #ddd",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            padding: "2px",
          },
        }}
      >
        {/* HEADER */}
        <DialogTitle
          sx={{
            backgroundColor: "#029898",
            color: "white",
            fontWeight: 600,
            fontSize: "1rem",
            px: 2.5,
            py: 1.3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Rejection Reason

          <IconButton
            onClick={() => {
              setOpenRejectPopup(false);
              setRejectionReason("");
            }}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </DialogTitle>

        {/* CONTENT */}
        <DialogContent sx={{ px: 2.5, py: 2 }}>
          <Box>
            <Typography fontWeight="600" fontSize="13px" mb={1}>
              Please provide reason for rejection
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f1f1f1",
                  borderRadius: "6px",
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": {
                    border: "2px solid #029898 !important"
                  },
                  "& textarea": {
                    padding: "8px",
                    fontSize: "13px",
                    color: "#000",
                  }
                }
              }}
            />
          </Box>
        </DialogContent>

        {/* FOOTER */}
        <DialogActions sx={{ px: 2.5, pb: 2, pt: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenRejectPopup(false);
              setRejectionReason("");
            }}
            sx={{
              color: "#029898",
              borderColor: "#029898",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#027c7c",
                color: "#027c7c"
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={() => rejectEnquiry()}
            sx={{
              bgcolor: "#029898",
              color: "#fff",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              "&:hover": { bgcolor: "#027c7c" },
            }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
