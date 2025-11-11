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
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Sample Data ---
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

  const handleRowClick = (task) => {
    navigate("/admin-new-enquiry-Details");
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
                {/* Filters */}
                <FormControl sx={{ width: "120px" }} size="small">
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
                    <MenuItem value="Queens">Queens</MenuItem>
                    <MenuItem value="Manhattan">Manhattan</MenuItem>
                    <MenuItem value="Bronx">Bronx</MenuItem>
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

          {/* --- Modern Table --- */}
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
                  "td": {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.88rem",
                    padding: "8px 12px",
                    textAlign: "center",
                  },
                  "th": {
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
                      "Enquiry Id",
                      "Name",
                      "Address",
                      "Email",
                      "Mobile",
                      "District",
                      "City",
                      "Assign Date",
                      "Total Sq.Feet",
                      "Action",
                    ].map((head) => (
                      <TableCell key={head}>{head}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentItems.map((task, idx) => (
                    <TableRow
                      key={task.id}
                      onClick={() => handleRowClick(task)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f5f5f5" },
                        transition: "background 0.2s ease",
                      }}
                    >
                      <TableCell>{startIndex + idx + 1}</TableCell>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.address}</TableCell>
                      <TableCell>{task.email}</TableCell>
                      <TableCell>{task.mobile}</TableCell>
                      <TableCell>{task.district}</TableCell>
                      <TableCell>{task.city}</TableCell>
                      <TableCell>{task.assignDate}</TableCell>
                      <TableCell>{task.totalSqFeet}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDialog(task);
                          }}
                        >
                          <Eye size={18} />
                        </IconButton>
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
                    color: currentPage === page ? "white" : "#029898",
                    bgcolor: currentPage === page ? "#029898" : "transparent",
                    "&:hover": {
                      bgcolor:
                        currentPage === page
                          ? "#027777"
                          : "rgba(2, 152, 152, 0.1)",
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
