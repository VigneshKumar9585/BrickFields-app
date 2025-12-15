import { useEffect, useState } from "react";
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
  Grid,
  DialogTitle,
  DialogContent,
  Chip
} from "@mui/material";
import {
  Search, Eye, Pencil, Trash2, FileImage, X, MapPin,
  Globe,
  Instagram,
  Linkedin,
  Youtube,
  FileText,
  Mail,
  Phone,
  User,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const InfoItem = ({ icon: Icon, label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
      {Icon && <Icon size={14} color="#029898" />}
      <Typography sx={{ fontSize: "12px", color: "#6b7280", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {label}
      </Typography>
    </Box>
    <Typography sx={{ fontWeight: 600, color: "#1a202c", fontSize: "14px", pl: Icon ? 3 : 0 }}>
      {value || "—"}
    </Typography>
  </Box>
);
export default function ManageLsp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDocDialog, setOpenDocDialog] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [dialogTitle, setDialogTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(null);


  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchlsps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handleOpenDocDialog = (title, files, e) => {
    e.stopPropagation();
    setDialogTitle(title);

    // Accepts single string OR array
    if (Array.isArray(files)) {
      setSelectedDocs(files);
    } else {
      setSelectedDocs([files]);
    }

    setOpenDocDialog(true);
  };

  const handleCloseDocDialog = () => {
    setOpenDocDialog(false);
    setSelectedDocs([]);
  };

  // -------------------------
  // Fetch all lsps and normalize
  // -------------------------
  const fetchlsps = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/get-lsp`);
      const lsps = Array.isArray(res.data) ? res.data : res.data?.data || [];

      const normalized = lsps.map((m) => ({
        ...m,
        mobile: m.phoneNumber || m.mobile || "",
        address:
          m.street ||
          (m.city || "") + (m.district ? `, ${m.district}` : "") ||
          m.address ||
          "",
        companyName: m.name || m.companyName || "",
        country: m.country || "",
        state: m.state || "",
        district: m.district || "",
        city: m.city || "",
        region: m.region || "",
        gstDocumentUrls: (m.gstDocument || []).map(
          (fname) => `${BACKEND_URL}/upload-lsp-images/${fname}`
        ),
        aadhaarCardUrls: (m.aadhaarCard || []).map(
          (fname) => `${BACKEND_URL}/upload-lsp-images/${fname}`
        ),
        companyDocumentUrls: (m.companyDocument || []).map(
          (fname) => `${BACKEND_URL}/upload-lsp-images/${fname}`
        )
      }));

      setTasks(normalized);
    } catch (error) {
      console.error("Error fetching lsps:", error);
      Swal.fire({ icon: "error", title: "Failed to load lsps" });
    }
  };

  console.log(selectedTask)

  // -------------------------
  // Open View dialog (fetch single lsp)
  // -------------------------
  const handleOpenViewDialog = async (task) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/get-lsp/${task._id}`);
      const m = res.data && !Array.isArray(res.data) ? res.data : res.data?.data || task;
      console.log(m);
      const normalized = {
        ...m,
        mobile: m.phoneNumber || m.mobile || task.mobile || "",
        address:
          m.street ||
          (m.city || "") + (m.district ? `, ${m.district}` : "") ||
          m.address ||
          task.address ||
          "",
        companyName: m.name || m.companyName || task.companyName || "",
        degreeCertificateUrls: (m.degreeCertificate || []).map(
          (fname) => `${BACKEND_URL}/upload-lsp-images/${fname}`
        ),
        aadhaarCardUrls: (m.aadhaarCard || []).map(
          (fname) => `${BACKEND_URL}/upload-lsp-images/${fname}`
        ),
        gstDocumentUrls: (m.gstDocument || []).map(
          (fname) => `${BACKEND_URL}/upload-lsp-images/${fname}`
        ),
        companyDocumentUrls: (m.companyDocument || []).map(
          (fname) => `${BACKEND_URL}/upload-lsp-images/${fname}`
        ),
      };

      setSelectedTask(normalized);
      setOpenViewDialog(true);
    } catch (err) {
      console.error("Failed to fetch lsp:", err);
      Swal.fire({ icon: "error", title: "Failed to load details" });
    }
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedTask(null);
  };

  console.log(selectedTask);

  // -------------------------
  // Delete flow (open dialog)
  // -------------------------
  const handleOpenDeleteDialog = (task) => {
    setSelectedTask(task);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedTask(null);
  };

  // -------------------------
  // Confirm delete (calls backend + updates UI)
  // -------------------------
  const handleConfirmDelete = async () => {
    if (!selectedTask) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/delete-lsp/${selectedTask._id}`);

      setTasks((prev) => prev.filter((t) => t._id !== selectedTask._id));

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire({ icon: "error", title: "Delete failed" });
    } finally {
      handleCloseDeleteDialog();
    }
  };

  // -------------------------
  // Edit navigation
  // -------------------------
  const handleEditClick = (task) => {
    navigate(`/edit-lsp/${task._id}`);
  };

  // -------------------------
  // Filtering + Pagination
  // -------------------------
  const itemsPerPage = 10;

  const filteredTasks = tasks.filter((t) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (t.companyName && t.companyName.toLowerCase().includes(q)) ||
      (t.name && t.name.toLowerCase().includes(q)) ||
      (t.mobile && t.mobile.toString().toLowerCase().includes(q)) ||
      (t.email && t.email.toLowerCase().includes(q));

    const matchesCountry = !selectedStatus || selectedStatus === "" || (t.country && t.country === selectedStatus);
    const matchesState = !selectedStatus || selectedStatus === "" || (t.state && t.state === selectedStatus);
    const matchesCity = !selectedCity || selectedCity === "" || (t.city && t.city === selectedCity);

    // selectedStaff is for deciding edit target; not filtering by role here unless you have role field
    return matchesSearch && matchesCountry && matchesState && matchesCity;
  });

  const totalItems = filteredTasks.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredTasks.slice(startIndex, endIndex);

  // If filters change reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCity, selectedStatus]);

  return (
    <>
      <Navbar />

      <Box minHeight="100vh" bgcolor="#fff" display="flex">
        <Box
          sx={{
            flex: 1,
            p: 2,
            ml: { xs: "0px", md: "260px" },
            width: 105
          }}
        >

          <Typography
            color="rgb(0,0,0)"
            sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "500", mb: 1 }}
          >
            Manage lsps
          </Typography>

          {/* Filter Bar */}
          <Card elevation={0} sx={{ display: "flex", height: "60px", mt: 1 }}>
            <CardContent
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: 1,
                flexWrap: "wrap",
              }}
            >

              

              <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">

                {/* Country (using selectedStatus state for demo) */}
                <FormControl size="small" sx={selectSx}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    label="Country"
                    sx={{ height: "34px", fontSize: "12px" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {/* You can populate these dynamically */}
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                  </Select>
                </FormControl>

                {/* State */}
                <FormControl size="small" sx={selectSx}>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    label="State"
                    sx={{ height: "34px", fontSize: "12px" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Karnataka">Karnataka</MenuItem>
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                  </Select>
                </FormControl>

                {/* Region / City */}
                <FormControl size="small" sx={selectSx}>
                  <InputLabel>Region</InputLabel>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    label="Region"
                    sx={{ height: "34px", fontSize: "12px" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Region A">Region A</MenuItem>
                    <MenuItem value="Region B">Region B</MenuItem>
                  </Select>
                </FormControl>

                {/* Search */}
                <TextField
                  size="small"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{ startAdornment: <Search style={{ marginRight: 8 }} size={16} /> }}
                  sx={{
                    width: "200px",
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      bgcolor: "#f9f9f9",
                      borderRadius: "6px",
                      "& fieldset": { borderColor: "#d1d5db" },
                      "&:hover fieldset": { borderColor: "#029898" },
                      "&.Mui-focused fieldset": { borderColor: "#029898", borderWidth: 2 },
                      "& input": { padding: "6px 10px", fontSize: "12px" },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Table */}
          <Card sx={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.08)", bgcolor: "#fff", width: "100%", mt: 2 }}>
            <TableContainer
              component={Paper}
              sx={{
                bgcolor: "#fafafa",
                boxShadow: "none",
                width: "100%",
                overflowX: "auto",  // ensures horizontal scrolling
                overflowY: "hidden",
                display: "block",
                maxWidth: "100%",
              }}
            >
              <Table
                sx={{
                  minWidth: "100%",       // adjust based on number of columns
                  width: "max-content", // allows table to grow horizontally
                  td: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "12px",
                    padding: "6px 8px",
                    textAlign: "center",
                    borderBottom: "1px solid #e0e0e0",
                  },
                  th: {
                    whiteSpace: "nowrap",
                    border: "1px solid #e0e0e0",
                    fontSize: "12px",
                    padding: "8px 8px",
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: "#029898",
                  },
                }}
              >

                <TableHead>
                  <TableRow>
                    {[
                      "S.No",
                      "Company Name",
                      "Contact Person",
                      
                      "Point Of Contact Number",
                      "Serviceable Cities",
                      "Email",
                      "Country",
                      "State",
                      "District",
                      "Region",
                      // "Degree Certificate",
                      // "Adhaar Card",
                      // "Provisional Certificate",
                      // "Experience Certificate",
                      "Action",
                    ].map((head) => (
                      <TableCell key={head}>{head}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={14} style={{ textAlign: "center", padding: "20px" }}>
                        No data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentItems.map((task, idx) => (
                      <TableRow
                        key={task._id || idx}
                        sx={{ cursor: "pointer", "&:hover": { bgcolor: "#f5f5f5" } }}
                      >
                        <TableCell>{startIndex + idx + 1}</TableCell>
                        <TableCell>{task.companyName || task.name || "-"}</TableCell>
                        <TableCell>{task.contactPerson || "-"}</TableCell>
                        <TableCell>{task.pointOfContactNumber || "-"}</TableCell>
                        <TableCell>{task.serviceableCities || "-"}</TableCell>
                        <TableCell>{task.email || "-"}</TableCell>
                        <TableCell>{task.country || "-"}</TableCell>
                        <TableCell>{task.state || "-"}</TableCell>
                        <TableCell>{task.district || "-"}</TableCell>
                        <TableCell>{task.region || "-"}</TableCell>


                        <TableCell>
                          <Box display="flex" justifyContent="center" gap={0.5}>
                            <IconButton
                              sx={{ color: "#00796B" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenViewDialog(task);
                              }}
                            >
                              <Eye size={18} />
                            </IconButton>

                            <IconButton
                              sx={{ color: "#0288d1" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(task);
                              }}
                            >
                              <Pencil size={18} />
                            </IconButton>

                            <IconButton
                              sx={{ color: "#d32f2f" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDeleteDialog(task);
                              }}
                            >
                              <Trash2 size={18} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>

              </Table>
            </TableContainer>

          </Card>
        </Box>
      </Box>

      {/* View Dialog */}
      {/* <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        PaperProps={{ sx: { borderRadius: "16px", overflow: "visible", } }}
        maxWidth="lg"
        fullWidth
      >
        {selectedTask && (
          <Box sx={{ bgcolor: "#fff", borderRadius: "16px", p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" pb={2}>
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>User Details</Typography>
              <IconButton onClick={handleCloseViewDialog}>
                <X size={18} />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    bgcolor: "#f4f4f4",
                    width: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 3,
                    gap: 1,
                  }}
                >
                  <Avatar sx={{ width: 100, height: 100 }} />
                  <Typography fontWeight="600">{selectedTask.companyName || "-"}</Typography>
                  <Typography fontSize="14px" color="text.secondary">
                    {selectedTask.experience || "Experience not provided"}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={9}>
                <Box sx={{ bgcolor: "#f4f4f4", borderRadius: "10px", p: 2 }}>
                  <Typography fontWeight="600" pb={1}>Personal Data</Typography>

                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight="600" fontSize="13px">Mobile No</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={selectedTask.mobile || ""}
                        InputProps={{ readOnly: true }}
                        sx={readOnlyFieldSx}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight="600" fontSize="13px">Email ID</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={selectedTask.email || ""}
                        InputProps={{ readOnly: true }}
                        sx={readOnlyFieldSx}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight="600" fontSize="13px">Address</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={selectedTask.address || ""}
                        InputProps={{ readOnly: true }}
                        sx={readOnlyFieldSx}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight="600" fontSize="13px">Country</Typography>
                      <TextField fullWidth size="small" value={selectedTask.country || ""} InputProps={{ readOnly: true }} sx={readOnlyFieldSx} />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight="600" fontSize="13px">State</Typography>
                      <TextField fullWidth size="small" value={selectedTask.state || ""} InputProps={{ readOnly: true }} sx={readOnlyFieldSx} />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight="600" fontSize="13px">City</Typography>
                      <TextField fullWidth size="small" value={selectedTask.city || ""} InputProps={{ readOnly: true }} sx={readOnlyFieldSx} />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight="600" fontSize="13px">Region</Typography>
                      <TextField fullWidth size="small" value={selectedTask.region || ""} InputProps={{ readOnly: true }} sx={readOnlyFieldSx} />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography pb={1} fontWeight="600">Social Media Platforms</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight="600" fontSize="13px">Instagram</Typography>
                      <TextField fullWidth size="small" value={selectedTask.instagramLink || ""} InputProps={{ readOnly: true }} sx={readOnlyFieldSx} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight="600" fontSize="13px">Youtube</Typography>
                      <TextField fullWidth size="small" value={selectedTask.youtubeLink || ""} InputProps={{ readOnly: true }} sx={readOnlyFieldSx} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography fontWeight="600" fontSize="13px">LinkedIn</Typography>
                      <TextField fullWidth size="small" value={selectedTask.linkedinLink || ""} InputProps={{ readOnly: true }} sx={readOnlyFieldSx} />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography fontWeight="600">Document Data</Typography>
                  <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                    {[
                      { label: "Adhaar Card", key: "aadhaarCardUrls" },
                      { label: "Degree Certificate", key: "degreeCertificateUrls" },
                      { label: "Provisional Certificate", key: "provisionalCertificateUrls" },
                      { label: "Experience Certificate", key: "experienceCertificateUrls" },
                    ].map((doc) => (
                      <Box key={doc.key} sx={{ minWidth: 140 }}>
                        <Typography sx={{ textDecoration: "underline", color: "#000", fontSize: 14 }}>{doc.label}</Typography>
                        <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                          {(selectedTask[doc.key] || []).length === 0 ? (
                            <Typography variant="caption" color="text.secondary">No file</Typography>
                          ) : (
                            (selectedTask[doc.key] || []).map((url, i) => (
                              <a key={i} href={url} target="_blank" rel="noreferrer" style={{ display: "inline-block" }}>
                                <img src={url} alt={doc.label} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6, border: "1px solid #ddd" }} />
                              </a>
                            ))
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Dialog> */}
      {/* View Details Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            bgcolor: "#F8FAFC",
            overflow: "hidden",
            maxHeight: "90vh",
          },
        }}
      >
        {/* --- Header --- */}
        <Box
          sx={{
            px: 3,
            py: 2,
            background: "linear-gradient(90deg, #029898 0%, #017a7a 100%)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box sx={{ p: 0.8, bgcolor: "rgba(255,255,255,0.2)", borderRadius: "8px" }}>
              <User size={20} color="white" />
            </Box>
            <Typography sx={{ fontSize: "18px", fontWeight: 600, letterSpacing: "0.5px" }}>
              lsp Details
            </Typography>
          </Box>
          <IconButton
            onClick={handleCloseViewDialog}
            sx={{
              color: "white",
              transition: "0.2s",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)", transform: "rotate(90deg)" },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* --- Content --- */}
        <DialogContent sx={{ p: 3, overflowY: "auto", bgcolor: "#F1F5F9" }}>

          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>

            {/* LEFT SIDEBAR: Identity Card */}
            <Box sx={{ width: { xs: "100%", md: "280px" }, flexShrink: 0 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  textAlign: "center",
                  bgcolor: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  height: "100%"
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    mb: 2,
                    mt: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: "2.5rem",
                      bgcolor: "#E0F2F2",
                      color: "#029898",
                      border: "4px solid white",
                      boxShadow: "0 4px 12px rgba(2, 152, 152, 0.2)",
                      fontWeight: 700,
                      margin: "0 auto"
                    }}
                  >
                    {(selectedTask?.companyName || selectedTask?.name || "U").charAt(0).toUpperCase()}
                  </Avatar>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      width: 16,
                      height: 16,
                      bgcolor: "#10B981",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </Box>

                <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
                  {selectedTask?.companyName || selectedTask?.name || "Unknown lsp"}
                </Typography>

                <Chip
                  label="Active lsp"
                  size="small"
                  sx={{
                    mb: 3,
                    bgcolor: "rgba(2, 152, 152, 0.1)",
                    color: "#029898",
                    fontWeight: 600,
                    fontSize: "11px",
                    px: 1
                  }}
                />

                <Divider sx={{ my: 2, borderColor: "#f1f5f9" }} />

                <Box sx={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box p={1} borderRadius="10px" bgcolor="#F0F6F6" color="#029898">
                      <Mail size={18} />
                    </Box>
                    <Box sx={{ overflow: "hidden" }}>
                      <Typography fontSize="11px" color="#64748b" fontWeight={500}>Email Address</Typography>
                      <Typography fontSize="13px" fontWeight={600} color="#334155" sx={{ wordBreak: "break-all" }}>
                        {selectedTask?.email || "-"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <Box p={1} borderRadius="10px" bgcolor="#F0F6F6" color="#029898">
                      <Phone size={18} />
                    </Box>
                    <Box>
                      <Typography fontSize="11px" color="#64748b" fontWeight={500}>Contact Person</Typography>
                      <Typography fontSize="13px" fontWeight={600} color="#334155">
                        {selectedTask?.contactPerson || "-"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <Box p={1} borderRadius="10px" bgcolor="#F0F6F6" color="#029898">
                      <Phone size={18} />
                    </Box>
                    <Box>
                      <Typography fontSize="11px" color="#64748b" fontWeight={500}>Contact Person Number</Typography>
                      <Typography fontSize="13px" fontWeight={600} color="#334155">
                        {selectedTask?.pointOfContactNumber || "-"}
                      </Typography>
                    </Box>
                  </Box>

                   <Box display="flex" alignItems="center" gap={2}>
                    <Box p={1} borderRadius="10px" bgcolor="#F0F6F6" color="#029898">
                      <Phone size={18} />
                    </Box>
                    <Box>
                      <Typography fontSize="11px" color="#64748b" fontWeight={500}>Business Type</Typography>
                      <Typography fontSize="13px" fontWeight={600} color="#334155">
                        {selectedTask?.businessType || "-"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <Box p={1} borderRadius="10px" bgcolor="#F0F6F6" color="#029898">
                      <MapPin size={18} />
                    </Box>
                    <Box>
                      <Typography fontSize="11px" color="#64748b" fontWeight={500}>Location</Typography>
                      <Typography fontSize="13px" fontWeight={600} color="#334155">
                        {selectedTask?.city ? `${selectedTask.city}, ` : ""}{selectedTask?.country || "-"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* RIGHT CONTENT AREA */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  bgcolor: "#ffffff",
                  height: "100%",
                }}
              >
                {/* SECTION 1: LOCATION & DETAILS */}
                <Box mb={3}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Globe size={18} color="#029898" />
                    <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#334155" }}>
                      Demographic Details
                    </Typography>
                  </Box>

                  <Box sx={{ bgcolor: "#F8FAFC", p: 2, borderRadius: "12px", border: "1px dashed #e2e8f0" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}><InfoItem label="Street Address" value={selectedTask?.street || selectedTask?.address} /></Grid>
                      <Grid item xs={6} md={4}><InfoItem label="City" value={selectedTask?.city} /></Grid>
                      <Grid item xs={6} md={4}><InfoItem label="District" value={selectedTask?.district} /></Grid>
                      <Grid item xs={6} md={4}><InfoItem label="State" value={selectedTask?.state} /></Grid>
                      <Grid item xs={6} md={4}><InfoItem label="Region" value={selectedTask?.region} /></Grid>
                      <Grid item xs={6} md={4}><InfoItem label="Country" value={selectedTask?.country} /></Grid>
                    </Grid>
                  </Box>
                </Box>

                {/* SECTION 2: SOCIAL MEDIA */}
               

                {/* SECTION 3: DOCUMENTS */}
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <FileText size={18} color="#029898" />
                    <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#334155" }}>
                      Documents Gallery
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {[
                      { label: "Aadhaar Card", key: "aadhaarCardUrls" },
                      { label: "Gst Certificate", key: "gstDocumentUrls" },
                      { label: "Company Document", key: "companyDocumentUrls" },
                    ].map((doc, idx) => {
                      console.log(selectedTask, doc.key);
                      const files = selectedTask ? selectedTask[doc.key] : [];
                      const hasFiles = files && files.length > 0;

                      return (
                        <Grid item xs={6} sm={6} md={3} key={idx}>
                          <Box
                            sx={{
                              border: hasFiles ? "1px solid #e2e8f0" : "1px dashed #cbd5e0",
                              borderRadius: "10px",
                              p: 1.5,
                              textAlign: "center",
                              transition: "0.2s",
                              bgcolor: hasFiles ? "#fff" : "#F8FAFC",
                              "&:hover": {
                                boxShadow: hasFiles ? "0 4px 6px -1px rgba(0,0,0,0.1)" : "none",
                                borderColor: hasFiles ? "#029898" : "#cbd5e0"
                              }
                            }}
                          >
                            <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#64748b", mb: 1, height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {doc.label}
                            </Typography>

                            {hasFiles ? (
                              <Box
                                onClick={(e) => handleOpenDocDialog(doc.label, files, e)}
                                sx={{
                                  position: "relative",
                                  height: "80px",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  cursor: "pointer",
                                  bgcolor: "#f1f5f9"
                                }}
                              >
                                {/* Preview First Image */}
                                <img
                                  src={files[0]}
                                  alt={doc.label}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                {/* Count Overlay if > 1 */}
                                {files.length > 1 && (
                                  <Box sx={{
                                    position: "absolute", bottom: 0, right: 0,
                                    bgcolor: "rgba(0,0,0,0.6)", color: "#fff",
                                    fontSize: "10px", px: 0.5, borderTopLeftRadius: "4px"
                                  }}>
                                    +{files.length - 1}
                                  </Box>
                                )}
                                <Box sx={{
                                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                                  width: "30px", height: "30px", bgcolor: "rgba(0,0,0,0.3)", borderRadius: "50%",
                                  display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                  <Eye size={14} color="white" />
                                </Box>
                              </Box>
                            ) : (
                              <Box sx={{ height: "80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
                                <FileImage size={24} strokeWidth={1.5} />
                                <Typography fontSize="10px" mt={0.5}>No Upload</Typography>
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>

              </Paper>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>



      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{ sx: { borderRadius: "18px" } }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ width: "600px", p: 2 }}>
          <Trash2 size={40} style={{ color: "black" }} />
          <Typography variant="h6" fontWeight="bold">Delete Data</Typography>
          <Typography textAlign="center">Are You Sure You Want To Delete This Information?</Typography>
          <Divider sx={{ width: "100%", border: "2px solid #ceccccff" }} />
          <Box display="flex" gap={2} pb={1}>
            <Button variant="outlined" onClick={handleCloseDeleteDialog} sx={{ width: 100 }}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirmDelete} sx={{ bgcolor: "#db0303ff", "&:hover": { bgcolor: "#b30000" }, width: 100 }}>Delete</Button>
          </Box>
        </Box>
      </Dialog>


      {/* Image popub */}
      <Dialog
        open={openDocDialog}
        onClose={handleCloseDocDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            overflow: "hidden",
          },
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
          {dialogTitle}

          {/* CLOSE BUTTON */}
          <Button
            onClick={handleCloseDocDialog}
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
          {selectedDocs.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "gray" }}>
              No documents available
            </Typography>
          ) : (
            <Box
              display="flex"
              flexWrap="wrap"
              gap={2}
              justifyContent="center"
            >
              {selectedDocs.map((img, index) => (
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
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                  onClick={() => setPreviewImage(img.startsWith("http") ? img : `${BACKEND_URL}/upload-site-images/${img}`)}
                >
                  <img
                    src={img.startsWith("http") ? img : `${BACKEND_URL}/upload-site-images/${img}`}
                    alt="document"
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

      {/* Full Screen Image Preview Dialog */}
      <Dialog
        open={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        maxWidth="xl"
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
            maxHeight: "95vh",
            maxWidth: "95vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: "rgba(0, 0, 0, 0.9)" }
          }
        }}
      >
        <Box sx={{ position: "relative", outline: "none" }}>
          <IconButton
            onClick={() => setPreviewImage(null)}
            sx={{
              position: "absolute",
              top: -40,
              right: 0,
              color: "white",
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" }
            }}
          >
            <X size={24} />
          </IconButton>
          <img
            src={previewImage}
            alt="Full Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              borderRadius: "8px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
            }}
          />
        </Box>
      </Dialog>


    </>
  );
}

/* -------------------------
   Styles
   ------------------------- */
const selectSx = {
  width: "140px",
  backgroundColor: "#f9f9f9",
  borderRadius: "6px",
  "& .MuiOutlinedInput-root": {
    height: "34px",
    fontSize: "12px",
    borderRadius: "6px",
    "& fieldset": { borderColor: "#d0d0d0" },
    "&:hover fieldset": { borderColor: "#a1a1a1" },
    "&.Mui-focused fieldset": { borderColor: "#029898" },
  },
  "& .MuiInputLabel-root": { fontSize: "12px" },
  "& .MuiSelect-select": { fontSize: "12px", padding: "6px 10px" },
};

const readOnlyFieldSx = {
  mt: 1,
  "& .MuiOutlinedInput-root": {
    height: "36px",
    bgcolor: "#eaeaea",
    borderRadius: "4px",
    "& input": { padding: "6px 8px", fontSize: "13px" },
    "& fieldset": { border: "none" },
  },
};
