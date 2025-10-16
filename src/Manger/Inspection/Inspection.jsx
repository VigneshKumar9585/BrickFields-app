import { useState } from "react";
import Navbar from "../../componts/Navbar";
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
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import pdf from "../../assets/icons/pdf.png"
import excel from "../../assets/icons/excel.png";

// Sample data
const sampleTasks = [
  {
    id: "TSK001",
    name: "John Doe",
    address: "123 Main St, Downtown",
    email: "doe@email.com",
    preferDate: "2024-01-15",
    preferTime: "10:00 AM",
    assignedLSP: "LSP-101",
    lspAssignDate: "2024-01-14",
    city: "New York",
    technicians: "Mike",
    status: "Complete",
  },
  {
    id: "TSK002",
    name: "Jane Smith",
    address: "456 Oak Ave, Midtown",
    email: "smith@email.com",
    preferDate: "2024-01-16",
    preferTime: "2:00 PM",
    assignedLSP: "LSP-102",
    lspAssignDate: "2024-01-15",
    city: "Brooklyn",
    technicians: "Anna",
    status: "Complete",
  },
];

export default function ManageEnquiry() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLSP, setSelectedLSP] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedExport, setSelectedExport] = useState("pdf");

  const navigate = useNavigate();

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

  // ✅ Navigate function for Complete chip & Eye icon
  const handleNavigateToDetails = () => {
    navigate("/inspection-Details");
  };

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
           Inspection Details
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
                {/* Task */}
                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>Manager</InputLabel>
                  <Select
                    value={selectedLSP}
                    onChange={(e) => setSelectedLSP(e.target.value)}
                    label="Task"
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
                      <SearchIcon sx={{ mr: 1, color: "#666" }} fontSize="small" />
                    ),
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Export Table */}
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
                      "Service",
                      "Assigned Manger",
                      "Assigned LSP",
                      "Assigned Technician 1",
                      "Assigned Technician 2",
                      "Start Date",
                      "End Date",
                      "Status",
                      "Actions",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          color: "white",
                          textAlign: "center",
                          py: 2,
                          width:
                            head === "Actions"
                              ? "160px"
                              : head === "Email"
                              ? "200px"
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
                      <TableCell sx={{ py: 2, px: 2, textAlign: "center" }}>
                        {startIndex + idx + 1}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0 }}>{task.id}</TableCell>
                      <TableCell sx={{ py: 2, px: 0, textAlign: "center" }}>
                        {task.name}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2 }}>{task.address}</TableCell>
                      <TableCell sx={{ py: 2, px: 0, textAlign: "center" }}>
                        {task.email}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2, textAlign: "center" }}>
                        {task.preferDate}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0, textAlign: "center" }}>
                        {task.preferTime}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0, textAlign: "center" }}>
                        {task.assignedLSP}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2 }}>
                        {task.lspAssignDate}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0, textAlign: "center" }}>
                        {task.city}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0, textAlign: "center" }}>
                        {task.technicians}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 0, textAlign: "center" }}>
                        {/* ✅ Click Complete chip to navigate */}
                        <Chip
                          label={task.status}
                          color={
                            task.status === "Complete" ? "success" : "default"
                          }
                          size="small"
                          onClick={handleNavigateToDetails}
                          sx={{ cursor: "pointer" }}
                        />
                      </TableCell>

                      {/* ✅ Action Buttons */}
                      <TableCell sx={{ px: 3 }}>
                        <Box display="flex" gap={1}>
                          {/* 👁 View button → go to /inspection-Details */}
                          <IconButton
                            size="small"
                            onClick={handleNavigateToDetails}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>

                          {/* 🗑 Delete button */}
                          <IconButton size="small">
                            <DeleteIcon fontSize="small" />
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
                startIcon={<ChevronLeftIcon fontSize="small" />}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "contained" : "text"}
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      minWidth: "36px",
                      mx: 0.5,
                      color: currentPage === page ? "white" : "#029898",
                      bgcolor:
                        currentPage === page ? "#029898" : "transparent",
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
                )
              )}
              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                endIcon={<ChevronRightIcon fontSize="small" />}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
