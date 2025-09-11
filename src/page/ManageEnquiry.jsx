import { useState } from "react";
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
  X,
} from "lucide-react";

// Sample data
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

  // Popup states
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleOpenDialog = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
    setActiveTab(0);
  };

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const itemsPerPage = 10;
  const totalItems = sampleTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = sampleTasks.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />

      <Box minHeight="100vh" bgcolor="#fff" display="flex" gap={3}>
        <Box sx={{ width: "250px", height: "100px" }} />
        <Box sx={{ m: 0, p: 0 }}>
          <Typography
            color="rgb(0,0,0)"
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: "500",
            }}
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
                {/* LSP */}
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

                {/* Status */}
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

                {/* Date */}
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

                {/* Search */}
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
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              mt: 2,
              ml: "20px",
              bgcolor: "rgb(0,0,0)",
              width: "1180px",
              borderRadius: "12px",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <Table>
                <TableHead sx={{ bgcolor: "#029898" }}>
                  <TableRow>
                    {[
                      "S.No",
                      "Task Id",
                      "Name",
                      "Address",
                      "Email",
                      "Prefer Date",
                      "Prefer Time",
                      "Assigned LSP",
                      "LSP Assign Date",
                      "City",
                      "Technicians",
                      "Status",
                      "Action",
                    ].map((head, idx) => (
                      <TableCell
                        key={head}
                        sx={{
                          color: "white",
                          py: 2,
                          width:
                            head === "Email"
                              ? "220px"
                              : head === "Action"
                              ? "120px"
                              : "auto",
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((task, idx) => (
                    <TableRow key={task.id}>
                      <TableCell sx={{ py: 2, px: 2 }}>
                        {startIndex + idx + 1}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0 }}>{task.id}</TableCell>
                      <TableCell sx={{ py: 2, px: 0 }}>{task.name}</TableCell>
                      <TableCell sx={{ py: 2, px: 2 }}>{task.address}</TableCell>
                      <TableCell
                        sx={{
                          width: "100px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          py: 2,
                          px: 0,
                        }}
                      >
                        {task.email}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2 }}>
                        {task.preferDate}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0 }}>
                        {task.preferTime}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0 }}>
                        {task.assignedLSP}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0 }}>
                        {task.lspAssignDate}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2 }}>{task.city}</TableCell>
                      <TableCell sx={{ py: 2, px: 0 }}>
                        {task.technicians}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0 }}>
                        <Chip
                          label={task.status}
                          color={task.status === "Open" ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ width: "120px", py: 2, px: 0 }}>
                        <Box display="flex" gap={1}>
                          <IconButton size="small" onClick={() => handleOpenDialog(task)}>
                            <Eye size={18} />
                          </IconButton>
                          <IconButton size="small">
                            <Pencil size={18} />
                          </IconButton>
                          <IconButton size="small">
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="body2">
              Showing {startIndex + 1} to {endIndex} of {totalItems} results
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Button
                variant="outlined"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} /> Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "contained" : "outlined"}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight size={16} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ===== POPUP ===== */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" sx={{width:"1600px"}} >
        <DialogTitle sx={{p:1,bgcolor:"#029898" ,color:"#ffffffff" }}>
          <Typography variant="h6">Task Details</Typography>
        
        </DialogTitle>
        <Divider />
        <Tabs value={activeTab} onChange={handleTabChange} sx={{pt: 1 }}>
          <Tab label="Visitor Details" />
          <Tab label="Local Service Partner Details" />
        </Tabs>
        <DialogContent dividers>
          {activeTab === 0 && selectedTask && (
            <Box border="1px solid #ddd" borderRadius="8px" p={2} sx={{width:"600px",height:"300px",bgcolor:"#f0f0f0ff"}}>
              <Typography variant="subtitle2" fontWeight="bold">
                Enquiry ID: {selectedTask.id}
              </Typography>
              <Typography>Name: {selectedTask.name}</Typography>
              <Typography>Email: {selectedTask.email}</Typography>
              <Typography>City: {selectedTask.city}</Typography>
              <Typography>Address: {selectedTask.address}</Typography>
              <Typography>Prefer Date: {selectedTask.preferDate}</Typography>
              <Typography>Prefer Time: {selectedTask.preferTime}</Typography>
            </Box>
          )}
          {activeTab === 1 && selectedTask && (
            <Box border="1px solid #ddd" borderRadius="8px" p={2}>
              <Typography variant="subtitle2" fontWeight="bold">
                Assigned LSP: {selectedTask.assignedLSP}
              </Typography>
              <Typography>Assigned Date: {selectedTask.lspAssignDate}</Typography>
              <Typography>Status: {selectedTask.status}</Typography>
              <Typography>Technicians: {selectedTask.technicians}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
