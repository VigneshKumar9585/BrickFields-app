import { useState } from "react";
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit3,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sampleTasks = [
  {
    id: "TSK001",
    name: "John Doe",
    address: "123 Main St, Downtown",
    email: "john.doe@email.com",
    preferDate: "2024-01-15",
    preferTime: "10:00 AM",
    assignedLSP: "LSP-101",
    lspAssignDate: "2024-01-14",
    city: "New York",
    technicians: "Mike",
    status: "Open",
  },
  {
    id: "TSK002",
    name: "Jane Smith",
    address: "456 Oak Ave, Midtown",
    email: "jane.smith@email.com",
    preferDate: "2024-01-16",
    preferTime: "2:00 PM",
    assignedLSP: "LSP-102",
    lspAssignDate: "2024-01-15",
    city: "Brooklyn",
    technicians: "Anna",
    status: "Open",
  },
];

export default function ManageEnquiry() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLSP, setSelectedLSP] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const handleEditClick = (task) => {
    navigate(`/edit/assign`, { state: { task } });
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

  const handleOpenDeleteDialog = (task) => {
    setSelectedTask(task);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting task:", selectedTask?.id);
    setOpenDeleteDialog(false);
  };

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const itemsPerPage = 10;
  const totalItems = sampleTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = sampleTasks.slice(startIndex, endIndex);

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
            Managing Tasks Details
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
                  <InputLabel>LSP</InputLabel>
                  <Select
                    value={selectedLSP}
                    onChange={(e) => setSelectedLSP(e.target.value)}
                    label="LSP"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="LSP-101">LSP-101</MenuItem>
                    <MenuItem value="LSP-102">LSP-102</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>Status</InputLabel>
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

                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>Date</InputLabel>
                  <Select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    label="Date"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="last-7-days">Last 7 Days</MenuItem>
                  </Select>
                </FormControl>

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
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
              bgcolor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              width: "1180px",
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
                  td: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.88rem",
                    padding: "8px 12px",
                    textAlign: "center",
                  },
                  th: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.88rem",
                    padding: "12px 12px",
                    textAlign: "center",
                    color: "#fff",
                  },
                }}
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: "#029898" }}>
                    {[
                      "S.No",
                      "Task Id",
                      "Name",
                      "Address",
                      "Mobile",
                      "Service",
                      "Enquiry Date",
                      "Verified Date",
                      "Payment",
                      "Assigned Manager",
                      "LSP",
                      "Status",
                      "Action",
                    ].map((head) => (
                      <TableCell key={head}>{head}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentItems.map((task, idx) => (
                    <TableRow key={task.id}>
                      <TableCell>{startIndex + idx + 1}</TableCell>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell align="left">{task.address}</TableCell>
                      <TableCell>{task.email}</TableCell>
                      <TableCell>{task.preferDate}</TableCell>
                      <TableCell>{task.preferTime}</TableCell>
                      <TableCell>{task.assignedLSP}</TableCell>
                      <TableCell>{task.lspAssignDate}</TableCell>
                      <TableCell>{task.city}</TableCell>
                      <TableCell>{task.technicians}</TableCell>
                      <TableCell>
                        <Chip
                          label={task.status}
                          size="small"
                          sx={{
                            fontWeight: 500,
                            color:
                              task.status === "Open" ? "#0F5132" : "#0C5460",
                            bgcolor:
                              task.status === "Open" ? "#D1E7DD" : "#D1ECF1",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="center" gap={0.5}>
                          <IconButton onClick={() => handleOpenDialog(task)}>
                            <Eye size={18} />
                          </IconButton>
                          <IconButton onClick={() => handleEditClick(task)}>
                            <Pencil size={18} />
                          </IconButton>
                          <IconButton
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
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                <ChevronLeft size={16} /> Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "contained" : "text"}
                  onClick={() => setCurrentPage(page)}
                  sx={{
                    minWidth: "36px",
                    color: currentPage === page ? "white" : "#029898",
                    bgcolor: currentPage === page ? "#029898" : "transparent",
                  }}
                >
                  {page}
                </Button>
              ))}
              <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next <ChevronRight size={16} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ✅ NEW VIEW POPUP EXACTLY LIKE FIGMA */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "14px",
            overflow: "hidden",
            bgcolor: "#fff",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          py={0}
          borderBottom="1px solid #ddd"
          bgcolor={"#029898"}
          color={"#fff"}
        >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            color:"#fff",
            "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
            "& .Mui-selected": { color: "#fff" },
            "& .MuiTabs-indicator": { bgcolor: "#fff" },
            pl: 2,
          }}
        >
          <Tab label="Enquiry Details" />
          <Tab label="Payment Details" />
        </Tabs>
     
          <Box display="flex" alignItems="center" gap={1}>
            <Edit3 size={18} />
            <Typography sx={{ textDecoration: "underline", cursor: "pointer" }}>
              Edit
            </Typography>
            <IconButton  onClick={handleCloseDialog}>
              <X color="#ffffffff"/>
            </IconButton>
          </Box>
        </Box>


        <DialogContent sx={{ p: 3 }}>
          {/* Enquiry Details */}
          {activeTab === 0 && (
            <>
              <Typography fontWeight="600" mb={1}>
                Visitor Details
              </Typography>
              <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2} mb={2}>
                {[
                  "Enquiry ID",
                  "Name",
                  "Country",
                  "State",
                  "District",
                  "Region",
                  "Address",
                  "Mobile No.",
                  "E-Mail",
                  "Service",
                  "Total Sq. Feet",
                  "Enquired Date",
                ].map((label) => (
                  <TextField
                    key={label}
                    label={label}
                    size="small"
                    
                    fullWidth
                  />
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight="600" mb={1}>
                Conversion Details
              </Typography>
              <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                {[
                  "Task ID",
                  "Bg Verification Date",
                  "Assigned Manager",
                  "Status",
                  "Preferred Date",
                  "Preferred Time",
                  "Remarks",
                ].map((label) => (
                  <TextField
                    key={label}
                    label={label}
                    size="small"
                    
                    fullWidth
                  />
                ))}
              </Box>
            </>
          )}

          {/* Payment Details */}
          {activeTab === 1 && (
            <TableContainer
              component={Paper}
              sx={{
                mt: 2,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                borderRadius: "10px",
              }}
            >
              <Table>
                <TableHead sx={{ bgcolor: "#029898" }}>
                  <TableRow>
                    {[
                      "Payment %",
                      "Task Id",
                      "Name",
                      "Total Sq.Ft",
                      "Grand Amount",
                      "Date",
                      "Paid Amount",
                      "Pending Amount",
                      "Mode Of Transaction",
                      "Evidence",
                      "Action",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          color: "#fff",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[10, 40, 50].map((p) => (
                    <TableRow key={p}>
                      <TableCell align="center">{p}%</TableCell>
                      <TableCell align="center">TSK00{p / 10}</TableCell>
                      <TableCell align="center">John Doe</TableCell>
                      <TableCell align="center">1500</TableCell>
                      <TableCell align="center">$2000</TableCell>
                      <TableCell align="center">2024-01-15</TableCell>
                      <TableCell align="center">$1000</TableCell>
                      <TableCell align="center">$1000</TableCell>
                      <TableCell align="center">Online</TableCell>
                      <TableCell align="center">---</TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <Pencil size={16} />
                        </IconButton>
                        <IconButton size="small">
                          <Trash2 size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Popup */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{ sx: { borderRadius: "18px" } }}
      >
        <Box p={3} textAlign="center">
          <Trash2 size={40} />
          <Typography variant="h6" mt={2}>
            Delete Data
          </Typography>
          <Typography>
            Are you sure you want to delete this information?
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
