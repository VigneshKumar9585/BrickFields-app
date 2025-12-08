import { useEffect, useState } from "react";
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
  Grid,
  DialogTitle,
  DialogContent     
} from "@mui/material";
import { Search, Eye, Pencil, Trash2, FileImage, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export default function ManageEnquiry() {
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


  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchManagers();
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
  // Fetch all managers and normalize
  // -------------------------
  const fetchManagers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/get-managers`);
      const managers = Array.isArray(res.data) ? res.data : res.data?.data || [];

      const normalized = managers.map((m) => ({
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
        degreeCertificateUrls: (m.degreeCertificate || []).map(
          (fname) => `${BACKEND_URL}/uploads/${fname}`
        ),
        aadhaarCardUrls: (m.aadhaarCard || []).map(
          (fname) => `${BACKEND_URL}/uploads/${fname}`
        ),
        provisionalCertificateUrls: (m.provisionalCertificate || []).map(
          (fname) => `${BACKEND_URL}/uploads/${fname}`
        ),
        experienceCertificateUrls: (m.experienceCertificate || []).map(
          (fname) => `${BACKEND_URL}/uploads/${fname}`
        ),
      }));

      setTasks(normalized);
    } catch (error) {
      console.error("Error fetching managers:", error);
      Swal.fire({ icon: "error", title: "Failed to load managers" });
    }
  };

  // -------------------------
  // Open View dialog (fetch single manager)
  // -------------------------
  const handleOpenViewDialog = async (task) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/get-manager/${task._id}`);
      const m = res.data && !Array.isArray(res.data) ? res.data : res.data?.data || task;

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
          (fname) => `${BACKEND_URL}/uploads/${fname}`
        ),
        aadhaarCardUrls: (m.aadhaarCard || []).map(
          (fname) => `${BACKEND_URL}/uploads/${fname}`
        ),
        provisionalCertificateUrls: (m.provisionalCertificate || []).map(
          (fname) => `${BACKEND_URL}/uploads/${fname}`
        ),
        experienceCertificateUrls: (m.experienceCertificate || []).map(
          (fname) => `${BACKEND_URL}/uploads/${fname}`
        ),
      };

      setSelectedTask(normalized);
      setOpenViewDialog(true);
    } catch (err) {
      console.error("Failed to fetch manager:", err);
      Swal.fire({ icon: "error", title: "Failed to load details" });
    }
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedTask(null);
  };

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
      await axios.delete(`${BACKEND_URL}/api/delete-manager/${selectedTask._id}`);

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
   navigate("/admin-add-manager", { state: { task } });

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

      <Box minHeight="100vh"  bgcolor="#fff" display="flex">
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
            Manage Managers
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
      "Name",
      "Mobile",
      "Address",
      "Email",
      "Country",
      "State",
      "District",
      "Region",
      "Degree Certificate",
      "Adhaar Card",
      "Provisional Certificate",
      "Experience Certificate",
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
        <TableCell>{task.mobile || "-"}</TableCell>
        <TableCell>{task.address || "-"}</TableCell>
        <TableCell>{task.email || "-"}</TableCell>
        <TableCell>{task.country || "-"}</TableCell>
        <TableCell>{task.state || "-"}</TableCell>
        <TableCell>{task.district || "-"}</TableCell>
        <TableCell>{task.region || "-"}</TableCell>

        {/* Degree Certificate */}
       <TableCell>
  {task.degreeCertificate ? (
    <span
      style={{ color: "#029898", cursor: "pointer", textDecoration: "underline" }}
      onClick={(e) =>
        handleOpenDocDialog("Degree Certificate", task.degreeCertificate, e)
      }
    >
      View
    </span>
  ) : (
    <span style={{ color: "gray" }}>Not Uploaded</span>
  )}
</TableCell>

<TableCell>
  {task.aadhaarCard ? (
    <span
      style={{ color: "#029898", cursor: "pointer", textDecoration: "underline" }}
      onClick={(e) =>
        handleOpenDocDialog("Adhaar Card", task.aadhaarCard, e)
      }
    >
      View
    </span>
  ) : (
    <span style={{ color: "gray" }}>Not Uploaded</span>
  )}
</TableCell>

<TableCell>
  {task.provisionalCertificate ? (
    <span
      style={{ color: "#029898", cursor: "pointer", textDecoration: "underline" }}
      onClick={(e) =>
        handleOpenDocDialog("Provisional Certificate", task.provisionalCertificate, e)
      }
    >
      View
    </span>
  ) : (
    <span style={{ color: "gray" }}>Not Uploaded</span>
  )}
</TableCell>

<TableCell>
  {task.experienceCertificate ? (
    <span
      style={{ color: "#029898", cursor: "pointer", textDecoration: "underline" }}
      onClick={(e) =>
        handleOpenDocDialog("Experience Certificate", task.experienceCertificate, e)
      }
    >
      View
    </span>
  ) : (
    <span style={{ color: "gray" }}>Not Uploaded</span>
  )}
</TableCell>


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
      <Dialog
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
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <img
              src={img.startsWith("http") ? img : `https://bf-back.appblocky.com/upload-site-images/${img}`}
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
