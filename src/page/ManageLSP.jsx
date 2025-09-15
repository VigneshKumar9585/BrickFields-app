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
import { useNavigate } from "react-router-dom";


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

  // Delete popup state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();

const handleEditClick = (task) => {
  navigate(`/edit/assign`, { state: { task } }); // pass task data
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
            Manage LSP
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
    <TableCell
      sx={{ color: "white",textAlign:"center", fontWeight: "bold", fontSize: "14px", py: 2, width: "60px", textAlign: "center" }}
    >
      S.No
    </TableCell>

    <TableCell sx={{ color: "white", textAlign:"center",fontWeight: "bold", fontSize: "14px", py: 2, px:0,width: "160px" }}>
      Company Name
    </TableCell>

    <TableCell sx={{ color: "white",textAlign:"center", fontWeight: "bold", fontSize: "14px", py: 2, width: "140px" }}>
      Business Type
    </TableCell>

    <TableCell sx={{ color: "white", textAlign:"center",fontWeight: "bold", fontSize: "14px", py: 2,px:0, width: "140px" }}>
      Company Phone No.
    </TableCell>

    <TableCell sx={{ color: "white",textAlign:"center", fontWeight: "bold", fontSize: "14px", py: 2, width: "180px" }}>
      Company Email
    </TableCell>

    <TableCell sx={{ color: "white", textAlign:"center",fontWeight: "bold", fontSize: "14px", py: 2,px:0, width: "160px" }}>
      Point Of Contact Name
    </TableCell>

    <TableCell sx={{ color: "white",textAlign:"center", fontWeight: "bold", fontSize: "14px", py: 2, width: "160px" }}>
      Point Of Contact Mobile
    </TableCell>

    <TableCell sx={{ color: "white", textAlign:"center",fontWeight: "bold", fontSize: "14px", py: 2, width: "120px" }}>
      District
    </TableCell>

    <TableCell sx={{ color: "white",textAlign:"center", fontWeight: "bold", fontSize: "14px", py: 2, width: "100px" }}>
      City
    </TableCell>

    <TableCell sx={{ color: "white", textAlign:"center",fontWeight: "bold", fontSize: "14px", py: 2, width: "150px" }}>
      Serviceable Cities
    </TableCell>

    <TableCell
      sx={{ color: "white",textAlign:"center", fontWeight: "bold", fontSize: "14px", py: 2, width: "100px", textAlign: "center" }}
    >
      Action
    </TableCell>
  </TableRow>
</TableHead>


  <TableBody>
    {currentItems.map((task, idx) => (
      <TableRow key={task.id}>
        <TableCell sx={{textAlign:"center"}}>{startIndex + idx + 1}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.companyName || "LSP Company"}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.businessType || "Manufacturer"}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.phone || "+91 98765 43210"}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.email}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.pointOfContact || "Mr. John"}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.pointOfContactMobile || "+91 98765 12345"}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.district || "Chennai"}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.city}</TableCell>
        <TableCell sx={{textAlign:"center"}}>{task.serviceableCities || "3"}</TableCell>

        {/* Action Icons */}
        <TableCell>
          <Box display="flex" gap={1}>
            <IconButton size="small" onClick={() => handleOpenDialog(task)}>
              <Eye size={18} />
            </IconButton>
            <IconButton size="small" onClick={() => handleEditClick(task)}>
              <Pencil size={18} />
            </IconButton>
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
             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
  <Button
    key={page}
    variant={currentPage === page ? "contained" : "text"}
    onClick={() => setCurrentPage(page)}
    sx={{
      minWidth: "36px",
      mx: 0.5,
      color: currentPage === page ? "white" : "#029898", // ✅ text color for inactive
      bgcolor: currentPage === page ? "#029898" : "transparent", // ✅ background for active
      "&:hover": {
        bgcolor:
          currentPage === page
            ? "#027777" // darker shade when active
            : "rgba(2, 152, 152, 0.1)", // light hover effect for inactive
      },
    }}
  >
    {page}
  </Button>
))}

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

      {/* ===== VIEW POPUP ===== */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: "18px" } }}
      >
        <DialogTitle
          sx={{
            p: 1.5,
            bgcolor: "#029898",
            color: "#ffffffff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Task Details</Typography>
        </DialogTitle>
        <Divider />
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            pt: 1,
            pl: 14,
            "& .MuiTab-root": {
              color: "#888888ff",
            },
            "& .Mui-selected": {
              color: "#029898",
              fontWeight: "bold",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#029898",
            },
          }}
        >
          <Tab label="Visitor Details" />
          <Tab label="Local Service Partner Details" />
        </Tabs>

        <DialogContent dividers>{activeTab === 0 && selectedTask && (
  <Box
    border="1px solid #ddd"
    sx={{
      width: "570px",
      height: "300px",
      bgcolor: "#f0f0f0ff",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 1.5 }}>
      <Typography sx={{ fontSize: "14px" }}>
        Enquiry ID: {selectedTask.id}
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>Enquiry Data</Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* Name / Mobile / Email / Country */}
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 1.5 }}>
      <Typography sx={{ fontSize: "14px" }}>Name:</Typography>
      <Typography sx={{ fontSize: "14px" }}>Mobile:</Typography>
      <Typography sx={{ fontSize: "14px" }}>Email:</Typography>
      <Typography sx={{ fontSize: "14px" }}>Country:</Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* State / District / City */}
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 1.5 }}>
      <Typography sx={{ fontSize: "14px" }}>State:</Typography>
      <Typography sx={{ fontSize: "14px" }}>District:</Typography>
      <Typography sx={{ fontSize: "14px" }}>City: {selectedTask.city}</Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* Address */}
    <Box sx={{ p: 1.5 }}>
      <Typography sx={{ fontSize: "14px" }}>Address:</Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* Prefer Date / Prefer Time */}
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 1.5 }}>
      <Typography sx={{ fontSize: "14px" }}>Prefer Date:</Typography>
      <Typography sx={{ fontSize: "14px" }}>
        Prefer Time: {selectedTask.preferTime}
      </Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* Remark */}
    <Typography sx={{ fontSize: "14px", p: 1.5 }}>Remark:</Typography>
  </Box>
)}

{activeTab === 1 && selectedTask && (
  <Box
    border="1px solid #ddd"
    sx={{
      width: "570px",
      height: "300px",
      bgcolor: "#f0f0f0ff",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <Box sx={{ display: "flex", gap: 6, p: 1.2, pl: 2 }}>
      <Typography sx={{ fontSize: "14px" }} fontWeight="bold">
        Task ID
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>Assigned Date</Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* Company Box */}
    <Box sx={{ display: "flex", p: 2, py: 1 }}>
      <Box
        sx={{
          width: "100px",
          height: "80px",
          bgcolor: "#d0cfcfff",
          border: "3px solid #7e7e7eff",
          borderRadius: "10px",
        }}
      />
      <Box sx={{ p: 2, py: 1 }}>
        <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
          Company Name
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>Point of Contact Name</Typography>
        <Typography sx={{ fontSize: "13px" }}>Point of Contact Mobile</Typography>
      </Box>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* Address / Email */}
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, py: 1 }}>
      <Typography sx={{ fontSize: "14px" }}>Company Address</Typography>
      <Typography sx={{ fontSize: "14px" }}>Company Email</Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* Business Type */}
    <Box sx={{ p: 2, py: 1 }}>
      <Typography sx={{ fontSize: "14px" }}>Business Type</Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* District / City / Pincode */}
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, py: 1 }}>
      <Typography sx={{ fontSize: "14px" }}>District</Typography>
      <Typography sx={{ fontSize: "14px" }}>City</Typography>
      <Typography sx={{ fontSize: "14px" }}>Pincode</Typography>
    </Box>

    <Divider sx={{ width: "100%" }} />

    {/* Status */}
    <Box sx={{ p: 2, py: 1 }}>
      <Typography sx={{ fontSize: "14px" }}>Status</Typography>
    </Box>
  </Box>
)}
  </DialogContent>
      </Dialog>

      {/* ===== DELETE POPUP ===== */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{ sx: { borderRadius: "18px" } }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{width:"600px"}}>
         <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",p:2}}>
          <Trash2 size={40} style={{ color: "black"}}  />
          <Typography variant="h6" fontWeight="bold">
            Delete Data
          </Typography>
          <Typography textAlign="center">
            Are You Sure You Want To Delete This Information
          </Typography>
          </Box>
          <Divider sx={{ width: "100%", border:"2px solid #ceccccff"}} />
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
