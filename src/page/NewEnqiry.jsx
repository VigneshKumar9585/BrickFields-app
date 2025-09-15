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
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


// Sample data
const sampleTasks = [
  {
    id: "TSK001",
    name: "John Doe",
    address: "123 Main St, Downtown",
    email: "john.doe@email.com",
    mobile: "+1 234-567-8901",
    district: "Central",
    city: "New York",
    assignDate: "2024-01-15",
    totalSqFeet: 1500,
  },
  {
    id: "TSK002",
    name: "Jane Smith",
    address: "456 Oak Ave, Midtown",
    email: "jane.smith@email.com",
    mobile: "+1 234-567-8902",
    district: "North",
    city: "Brooklyn",
    assignDate: "2024-01-16",
    totalSqFeet: 2200,
  },
  {
    id: "TSK006",
    name: "Jane Smith",
    address: "456 Oak Ave, Midtown",
    email: "jane.smith@email.com",
    mobile: "+1 234-567-8902",
    district: "North",
    city: "Brooklyn",
    assignDate: "2024-01-16",
    totalSqFeet: 2200,
  },
  {
    id: "TSK007",
    name: "Jane Smith",
    address: "456 Oak Ave, Midtown",
    email: "jane.smith@email.com",
    mobile: "+1 234-567-8902",
    district: "North",
    city: "Brooklyn",
    assignDate: "2024-01-16",
    totalSqFeet: 2200,
  },
  {
    id: "TSK003",
    name: "Mike Johnson",
    address: "789 Pine St, Uptown",
    email: "mike.johnson@email.com",
    mobile: "+1 234-567-8903",
    district: "South",
    city: "Queens",
    assignDate: "2024-01-17",
    totalSqFeet: 1800,
  },
  {
    id: "TSK004",
    name: "Sarah Wilson",
    address: "321 Elm Dr, Riverside",
    email: "sarah.wilson@email.com",
    mobile: "+1 234-567-8904",
    district: "East",
    city: "Manhattan",
    assignDate: "2024-01-18",
    totalSqFeet: 3000,
  },
  {
    id: "TSK005",
    name: "David Brown",
    address: "654 Cedar Ln, Hillside",
    email: "david.brown@email.com",
    mobile: "+1 234-567-8905",
    district: "West",
    city: "Bronx",
    assignDate: "2024-01-19",
    totalSqFeet: 1200,
  },
];

export default function ManageEnquiry() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [extraTableOpen, setExtraTableOpen] = useState(false); 

  const itemsPerPage = 5;
  const totalItems = sampleTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = sampleTasks.slice(startIndex, endIndex);

  const handleOpenDialog = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
    setOpenDialog(false);
  };

  // NEW: handle extra table for rows > 5
 const handleRowClick = (task) => {
    navigate('/enquiry/new/details'); // Row click navigates to new page
  };

  const handleCloseExtraTable = () => {
    setExtraTableOpen(false);
    setSelectedTask(null);
  };

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
            New Tasks
          </Typography>

          {/* --- Filter Card --- */}
          <Card
            elevation={0}
            sx={{ display: "flex", height: "60px", mt: 0, boxShadow: "none" }}
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
                {/* District */}
                <FormControl sx={{ width: "100px" }} size="small">
                  <InputLabel>District</InputLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    label="District"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Central">Central</MenuItem>
                    <MenuItem value="North">North</MenuItem>
                    <MenuItem value="South">South</MenuItem>
                    <MenuItem value="East">East</MenuItem>
                    <MenuItem value="West">West</MenuItem>
                  </Select>
                </FormControl>

                {/* City */}
                <FormControl sx={{ width: "100px" }} size="small">
                  <InputLabel>City</InputLabel>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    label="City"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Brooklyn">Brooklyn</MenuItem>
                    <MenuItem value="Queens">Queens</MenuItem>
                    <MenuItem value="Manhattan">Manhattan</MenuItem>
                    <MenuItem value="Bronx">Bronx</MenuItem>
                  </Select>
                </FormControl>

                {/* Date */}
                <FormControl
                  sx={{ width: "100px", borderRadius: "10px" }}
                  size="small"
                >
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
                    <MenuItem value="last-30-days">Last 30 Days</MenuItem>
                  </Select>
                </FormControl>

                {/* Search */}
                <TextField
                  sx={{ width: "200px" }}
                  size="small"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search style={{ marginRight: 8 }} />,
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* --- Table --- */}
          <Card
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              mt: 0,
              ml: "20px",
              bgcolor: "rgb(0,0,0)",
              width: "1180px",
              borderRadius: "12px",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{ borderRadius: "12px", overflow: "hidden", width: "1180px" }}
            >
              <Table>
                <TableHead sx={{ bgcolor: "#029898" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" ,textAlign:"center"}}>S.No</TableCell>
                    <TableCell sx={{ color: "white" ,textAlign:"center" }}>Task Id</TableCell>
                    <TableCell sx={{ color: "white" ,textAlign:"center" }}>Name</TableCell>
                    <TableCell sx={{ color: "white" ,textAlign:"center" }}>Address</TableCell>
                    <TableCell sx={{ color: "white" ,textAlign:"center" }}>Email</TableCell>
                    <TableCell sx={{ color: "white" ,textAlign:"center" }}>Mobile</TableCell>
                    <TableCell sx={{ color: "white",textAlign:"center"  }}>District</TableCell>
                    <TableCell sx={{ color: "white" ,textAlign:"center" }}>City</TableCell>
                    <TableCell sx={{ color: "white", width: "120px",textAlign:"center"  }}>
                      Assign Date
                    </TableCell>
                    <TableCell sx={{ color: "white",textAlign:"center"  }}>Total Sq.Feet</TableCell>
                    <TableCell sx={{ color: "white",textAlign:"center"  }}>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentItems.map((task, idx) => (
                    <TableRow
                      key={task.id}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(task)}
                    >
                      <TableCell sx={{textAlign:"center"}}>{startIndex + idx + 1}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.id}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.name}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.address}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.email}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.mobile}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.district}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.city}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.assignDate}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>{task.totalSqFeet.toLocaleString()}</TableCell>
                      <TableCell sx={{textAlign:"center"}}>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDialog(task);
                          }}
                        >
                          <Eye />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* --- Task Details Dialog --- */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "18px",
                width: "1500px",
              },
            }}
          >
            <DialogTitle
              sx={{
                bgcolor: "#029898",
                color: "white",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              Task Details
            </DialogTitle>
            <DialogContent dividers>
              {selectedTask && (
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                  {/* Visitor Details */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      pl: 0,
                      pr: 0,
                      width: "430px",
                      bgcolor: "rgba(240, 238, 238, 1)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      gutterBottom
                      sx={{ p: 0.5, pl: 2 }}
                    >
                      Visitor Details
                    </Typography>
                    <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />

                    <Box
                      component="dl"
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        rowGap: 1,
                        p: 2,
                        pl: 2,
                      }}
                    >
                      <Typography component="dt" fontWeight="500">
                        Task ID
                      </Typography>
                      <Typography component="dd">{selectedTask.id}</Typography>

                      <Typography component="dt" fontWeight="500">
                        Name
                      </Typography>
                      <Typography component="dd">{selectedTask.name}</Typography>

                      <Typography component="dt" fontWeight="500">
                        Address
                      </Typography>
                      <Typography component="dd">{selectedTask.address}</Typography>

                      <Typography component="dt" fontWeight="500">
                        Email
                      </Typography>
                      <Typography component="dd">{selectedTask.email}</Typography>

                      <Typography component="dt" fontWeight="500">
                        Mobile
                      </Typography>
                      <Typography component="dd">{selectedTask.mobile}</Typography>

                      <Typography component="dt" fontWeight="500">
                        District
                      </Typography>
                      <Typography component="dd">{selectedTask.district}</Typography>

                      <Typography component="dt" fontWeight="500">
                        City
                      </Typography>
                      <Typography component="dd">{selectedTask.city}</Typography>

                      <Typography component="dt" fontWeight="500">
                        Assign Date
                      </Typography>
                      <Typography component="dd">{selectedTask.assignDate}</Typography>

                      <Typography component="dt" fontWeight="500">
                        Total Sq. Feet
                      </Typography>
                      <Typography component="dd">{selectedTask.totalSqFeet}</Typography>
                    </Box>
                  </Paper>

                  {/* Admin Details */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      pl: 0,
                      pr: 0,
                      width: "410px",
                      bgcolor: "rgba(240, 238, 238, 1)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      gutterBottom
                      sx={{ p: 0.5, pl: 2 }}
                    >
                      Admin Details
                    </Typography>
                    <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />

                    <Box display="flex" alignItems="center" gap={2} sx={{ p: 2, pb: 0 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          bgcolor: "grey.300",
                        }}
                      />
                      <Box>
                        <Typography fontWeight="600">Admin Name</Typography>
                        <Typography variant="body2">+91 98765 43210</Typography>
                        <Typography variant="body2">admin@email.com</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ p: 2, pl: "92px", pt: 0 }}>
                      <Typography sx={{ mt: 2 }} fontWeight="500">
                        Assign Date
                      </Typography>
                      <Typography>{selectedTask.assignDate}</Typography>
                    </Box>
                  </Paper>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  bgcolor: "#029898",
                  color: "white",
                  borderRadius: "6px",
                  mr: "18px",
                  "&:hover": { bgcolor: "#027777" },
                }}
                onClick={handleCloseDialog}
              >
                Verified
              </Button>
            </DialogActions>
          </Dialog>

          {/* --- Extra Table Dialog for >5 rows --- */}
          <Dialog
            open={extraTableOpen}
            onClose={handleCloseExtraTable}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: "18px", width: "1000px" } }}
          >
            <DialogTitle sx={{ bgcolor: "#029898", color: "white", fontWeight: "600" }}>
              Task Row Details
            </DialogTitle>
            <DialogContent dividers>
              {selectedTask && (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Task Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>District</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Assign Date</TableCell>
                        <TableCell>Total Sq.Feet</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>{selectedTask.id}</TableCell>
                        <TableCell>{selectedTask.name}</TableCell>
                        <TableCell>{selectedTask.address}</TableCell>
                        <TableCell>{selectedTask.email}</TableCell>
                        <TableCell>{selectedTask.mobile}</TableCell>
                        <TableCell>{selectedTask.district}</TableCell>
                        <TableCell>{selectedTask.city}</TableCell>
                        <TableCell>{selectedTask.assignDate}</TableCell>
                        <TableCell>{selectedTask.totalSqFeet}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseExtraTable} sx={{ bgcolor: "#029898", color: "#fff" }}>
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* --- Pagination --- */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography variant="body2">
              Showing {startIndex + 1} to {endIndex} of {totalItems} results
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Button
                variant="outlined"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft /> Previous
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
                Next <ChevronRight />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
