import { useEffect,useState } from "react";
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
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

   const [tasks, setTasks] = useState([]);
   useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/manager/all`);
      setTasks(response.data.data); // data.data comes from your backend structure
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const handleEditClick = (task) => {
    if (selectedStaff === "Staff") {
      navigate("/admin-add-staff", { state: { task } });
    } else if (selectedStaff === "Manager") {
      navigate("/admin-add-manager", { state: { task } });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Select Role First",
        text: "Please select Staff or Manager before editing.",
        confirmButtonColor: "#029898",
      });
    }
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
  sx={{ display: "flex", height: "60px", mt: 1 }}
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

      {/* Role Select */}
      <FormControl
        size="small"
        sx={{
          width: "120px",
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
        }}
      >
        <InputLabel>{selectedStaff ? selectedStaff : "Select Role"}</InputLabel>
        <Select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          label={selectedStaff ? selectedStaff : "Select Role"}
          sx={{ height: "34px", fontSize: "12px" }}
        >
          <MenuItem value="Staff">Staff</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
        </Select>
      </FormControl>

      {/* Country */}
      <FormControl
        size="small"
        sx={{
          width: "120px",
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
        }}
      >
        <InputLabel>Country</InputLabel>
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          label="Status"
          sx={{ height: "34px", fontSize: "12px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>

      {/* State */}
      <FormControl
        size="small"
        sx={{
          width: "120px",
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
        }}
      >
        <InputLabel>State</InputLabel>
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          label="Status"
          sx={{ height: "34px", fontSize: "12px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>

      {/* Region */}
      <FormControl
        size="small"
        sx={{
          width: "120px",
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
        }}
      >
        <InputLabel>Region</InputLabel>
        <Select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          label="City"
          sx={{ height: "34px", fontSize: "12px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="Brooklyn">Brooklyn</MenuItem>
        </Select>
      </FormControl>

      {/* Search */}
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

          {/* Table */}
  <Card
  sx={{
    boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
    bgcolor: "#fff",
    width: "100%",
    mt: 2,
  }}
>
  <TableContainer
    component={Paper}
    sx={{
      bgcolor: "#fafafa",
      boxShadow: "none",
      width: "100%",
      overflowX: "auto",
      overflowY: "auto",   // ✅ ENABLE VERTICAL SCROLL
      maxHeight: "480px",  // ✅ SET TABLE HEIGHT FOR SCROLL
      whiteSpace: "nowrap",
    }}
  >
    <Table
      stickyHeader    // ✅ MAKES HEADER FIXED WHILE SCROLLING
      sx={{
        minWidth: "100px",   // ✅ FIX TABLE WIDTH
        width: "full",      // ✅ REMAINS SAME AS OTHER TABLE
        tableLayout: "auto",

        td: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "12px",
          padding: "4px 4px",
          textAlign: "center",
          borderBottom: "1px solid #e0e0e0",
        },

        th: {
          whiteSpace: "nowrap",
          border: "1px solid #e0e0e0",
          fontSize: "12px",
          padding: "6px 4px",
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
            selectedStaff === "Manager" ? "Region" : "Role",
            "Action",
          ].map((head) => (
            <TableCell key={head}>{head}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {currentItems.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} style={{ textAlign: "center", padding: "20px" }}>
              No data found
            </TableCell>
          </TableRow>
        ) : (
          currentItems.map((task, idx) => (
            <TableRow
              key={task._id}
              sx={{
                cursor: "pointer",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <TableCell>{startIndex + idx + 1}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.mobile}</TableCell>
              <TableCell>{task.address}</TableCell>
              <TableCell>{task.email}</TableCell>
              <TableCell>{task.country}</TableCell>
              <TableCell>{task.state}</TableCell>
              <TableCell>{task.district}</TableCell>
              <TableCell>
                {selectedStaff === "Manager" ? "Developer" : task.city}
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

      {/* ✅ Redesigned VIEW POPUP */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "visible",
            mr: 60,
          },
        }}
      >
        {selectedTask && (
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: "16px",
              p: 3,
              width: "1100px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pb={2}
            >
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                User Details 
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
               
                <IconButton onClick={handleCloseViewDialog}>
                  <X size={18} />
                </IconButton>
              </Box>
            </Box>

            <Box display="flex" gap={2}>
              <Box
                sx={{
                  bgcolor: "#f4f4f4",
                  width: "280px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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

              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "#f4f4f4",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box p={2}>
                  <Typography fontWeight="600" pb={1}>
                    Personal Data
                  </Typography>
                  <Box  >
                    <Box display={"flex"} gap={3}>
                    <Box mt={2}>
                                          <Typography fontWeight="600" fontSize="13px">Mobile No</Typography>
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
                                         <Typography fontWeight="600" fontSize="13px">Email ID</Typography>
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
                      <Typography fontWeight="600" fontSize="13px">Address </Typography>
                      <TextField
                        size="small"
                        sx={{
                          mt: 1,
                          width:"350px",
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


                    <Box display={"flex"} gap={3}>

                    <Box mt={2}>
                      <Typography fontWeight="600" fontSize="13px">Country</Typography>
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
                      <Typography fontWeight="600" fontSize="13px">State</Typography>
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
                      <Typography fontWeight="600" fontSize="13px">City</Typography>
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
                      <Typography fontWeight="600" fontSize="13px">Region</Typography>
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
                    </Box>
                  </Box>
                </Box>

                <Divider />

                <Box p={2}>
                  <Typography pb={1} fontWeight="600">
                    Social Media Platforms
                  </Typography>
                  <Box display="flex" gap={2}>
                    <Box mt={2}>
                      <Typography fontWeight="600" fontSize="13px">Instagram</Typography>
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
                      <Typography fontWeight="600" fontSize="13px">Youtube</Typography>
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
                      <Typography fontWeight="600" fontSize="13px">Linkedin</Typography>
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
                  </Box>
                </Box>

                <Divider />

                <Box p={2}>
                  <Typography fontWeight="600">Document Data</Typography>
                  <Box display="flex" gap={3}>
                    {[
                      "Adhaar Card",
                      "Degree Certificate",
                      "Provisional Certificate",
                      "Experience Certificate",
                    ].map((doc, i) => (
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
                            color: "#000000ff",
                            fontSize: "14px",
                            mt:1
                          }}
                        >
                          {doc}
                        </Typography>
                        <FileImage size={16} />
                      </Box>
                    ))}
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
