import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../componts/AdminNavbar.jsx";
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
  DialogTitle,
  DialogContent,
  DialogActions,
  Popover,
  Chip,
} from "@mui/material";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
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

  // API data
  const [tasks, setTasks] = useState([]);

  // Fetch enquiries
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/get-enquiry`)
      .then((res) => {
        setTasks(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

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
    navigate(`/admin-new-enquiry-Details/${id}`);
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

          {/* ---- TABLE ---- */}
          <Card
            sx={{
              boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
              bgcolor: "#fff",
              width: "100%",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                bgcolor: "#fafafa",
                boxShadow: "none",
                width: "100%",
                overflowX: "auto",      // ENABLE SCROLL
                overflowY: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Table
                sx={{
                  minWidth: 2000,        // 👈 NECESSARY FOR SCROLL
                  tableLayout: "auto",
                  width: "100%",

                  td: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "12px",
                    padding: "4px 4px",
                    textAlign: "center",
                  },
                  th: {
                    whiteSpace: "nowrap",
                    border: "1px solid #e0e0e0",
                    fontSize: "12px",
                    padding: "6px 4px",
                    textAlign: "center",
                    color: "#fff",
                  },
                }}
              >

                <TableHead>
                  <TableRow sx={{ bgcolor: "#029898" }}>
                    {[
                      "S.No",
                      "Enquiry Id",
                      "Name",
                      "Mobile",
                      "Email",
                      "Sq.Feet",
                      "State",
                      "District",
                      "Street",
                      "Landmark",
                      "Preferd Date",
                      "Prefered Time",
                      "Initial Amount",
                      "Assigned",
                      "Site Images",
                      "Enquired Date",
                      "Action",
                    ]
                      .map((head) => (
                        <TableCell key={head}>{head}</TableCell>
                      ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={16} style={{ textAlign: "center", padding: "20px" }}>
                        No enquiries found
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentItems.map((task, idx) => (
                      <TableRow
                        key={task._id}
                        onClick={() => handleRowClick(task._id)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#f5f5f5" },
                          // Blink entire row if payment done but not assigned
                          ...(task.initialAmount && !task.assignedTo && {
                            animation: "blink 1.5s ease-in-out infinite",
                            backgroundColor: "#fff9e6",
                          }),
                        }}
                      >
                        <TableCell>{startIndex + idx + 1}</TableCell>
                        <TableCell>{task.enquiryId}</TableCell>
                        <TableCell>{task.name}</TableCell>
                        <TableCell>{task.phoneNumber}</TableCell>
                        <TableCell>{task.email}</TableCell>
                        <TableCell>{task.sqFeet}</TableCell>
                        {/* <TableCell>{task.country}</TableCell> */}
                        <TableCell>{task.state}</TableCell>
                        <TableCell>{task.district}</TableCell>
                        <TableCell>{task.street}</TableCell>
                        <TableCell>{task.landmark}</TableCell>
                        <TableCell>{formatDate(task.preferDate)}</TableCell>
                        <TableCell>{formatTime(task.preferTime)}</TableCell>

                        {/* Initial Amount - Pill Style */}
                        <TableCell>
                          <Chip
                            label={task.initialAmount ? "Paid" : "Pending"}
                            size="small"
                            sx={{
                              bgcolor: task.initialAmount ? "#d4edda" : "#f8d7da",
                              color: task.initialAmount ? "#155724" : "#721c24",
                              fontWeight: 600,
                              fontSize: "11px",
                              height: "22px",
                              borderRadius: "12px",
                            }}
                          />
                        </TableCell>

                        {/* Assigned Status - Pill Style */}
                        <TableCell>
                          {/* Case 1: Initial Amount NOT paid */}
                          {!task.initialAmount ? (
                            <Chip
                              label="Pending"
                              size="small"
                              sx={{
                                bgcolor: "#f8d7da",
                                color: "#721c24",
                                fontWeight: 600,
                                fontSize: "11px",
                                height: "22px",
                                borderRadius: "12px",
                              }}
                            />
                          ) : (
                            // Case 2 and 3: Initial Amount Paid
                            <>
                              {task.assignedTo ? (
                                // Case 3: Already assigned
                                <Chip
                                  label="Assigned"
                                  size="small"
                                  sx={{
                                    bgcolor: "#d4edda",
                                    color: "#155724",
                                    fontWeight: 600,
                                    fontSize: "11px",
                                    height: "22px",
                                    borderRadius: "12px",
                                  }}
                                />
                              ) : (
                                // Case 2: Not assigned yet → show clickable chip (row already blinks)
                                <Chip
                                  label="Need To Assign"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenDialog(task);
                                  }}
                                  sx={{
                                    bgcolor: "#d1ecf1",
                                    color: "#0c5460",
                                    fontWeight: 600,
                                    fontSize: "11px",
                                    height: "22px",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    "&:hover": {
                                      bgcolor: "#bee5eb",
                                    },
                                  }}
                                />
                              )}
                            </>
                          )}
                        </TableCell>


                        <TableCell>
                          {task.siteImage && task.siteImage.length > 0 ? (
                            <span
                              style={{
                                color: "#029898",
                                cursor: "pointer",
                                textDecoration: "underline",
                                fontSize: "12px",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog(task);
                              }}
                            >
                              View
                            </span>
                          ) : (
                            <span style={{ color: "gray", fontSize: "12px" }}>
                              No Image Provided
                            </span>
                          )}
                        </TableCell>



                        <TableCell>
                          {formatDate(task.enquiryDate)}
                        </TableCell>

                        <TableCell>
                          <IconButton
                            onClick={() => handleRowClick(task._id)}
                          >
                            <Eye size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

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

    </>
  );
}
