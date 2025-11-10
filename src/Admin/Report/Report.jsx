import { useState } from "react";
import Navbar from "../../componts/AdminNavbar";
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
  Divider,
} from "@mui/material";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import pdf from "../../assets/icons/pdf.png";
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
            Reports
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
                  <InputLabel>Task</InputLabel>
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

                {/* LSP */}
                <FormControl sx={{ width: "120px" }} size="small">
                  <InputLabel>LSP</InputLabel>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    label="LSP"
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

          {/* Export Icons + Generate Button */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="rgba(243, 245, 245, 1)"
            sx={{ width: "1180px", m: 1, mx: 2, p: 2, borderRadius: 3 }}
          >
            <Box display="flex" gap={2}>
              {/* PDF ICON */}
              <Box
                onClick={() => setSelectedExport("pdf")}
                sx={{
                  position: "relative",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  border:
                    selectedExport === "pdf"
                      ? "2px solid black"
                      : "2px solid transparent",
                  bgcolor: "#f9f9f9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={pdf}
                  alt="Notifications"
                  style={{ width: 30, height: 35 }}
                />
              </Box>

              {/* EXCEL ICON */}
              <Box
                onClick={() => setSelectedExport("excel")}
                sx={{
                  position: "relative",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  border:
                    selectedExport === "excel"
                      ? "2px solid black"
                      : "2px solid transparent",
                  bgcolor: "#f9f9f9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={excel}
                  style={{ width: 30, height: 35, color: "#8be059ff" }}
                />
              </Box>
            </Box>

            {/* Generate Button */}
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgba(34, 115, 117, 1)",
                color: "white",
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                mx: 2,
                "&:hover": { bgcolor: "#029898" },
              }}
            >
              Generate
            </Button>
          </Box>

          {/* ✅ Table with single-line headers + horizontal scroll */}
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
              sx={{
                borderRadius: "12px",
                overflowX: "auto", // ✅ enable horizontal scroll
                whiteSpace: "nowrap", // ✅ prevent wrapping
              }}
            >
              <Table  sx={{
         "td": {
          whiteSpace: "nowrap", // ✅ single line only
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "0.88rem",
          padding: "8px 12px", // compact padding
          textAlign: "center",
        },
        "th":{
            whiteSpace: "nowrap", // ✅ single line only
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "0.88rem",
          padding: "12px 12px", // compact padding
          textAlign: "center",
          color:"#fff"
        }
      }}>
                <TableHead sx={{ bgcolor: "#029898" }}>
                  <TableRow>
                    {[
                      "S.No",
                      "Task Id",
                      "Name",
                      "Address",
                      "Service",
                      "Payment",
                      "Assigned Manager",
                      "Assigned LSP",
                      "Assigned Technicians",
                      "Start Date",
                      "End Date",
                      "Status",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentItems.map((task, idx) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        {startIndex + idx + 1}
                      </TableCell>
                      <TableCell >{task.id}</TableCell>
                      <TableCell >
                        {task.name}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2 }}>{task.address}</TableCell>
                      <TableCell
                        sx={{
                          width: "100px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          py: 2,
                          textAlign: "center",
                          px: 0,
                        }}
                      >
                        {task.email}
                      </TableCell>
                      <TableCell >
                        {task.preferDate}
                      </TableCell>
                      <TableCell >
                        {task.preferTime}
                      </TableCell>
                      <TableCell >
                        {task.assignedLSP}
                      </TableCell>
                      <TableCell >
                        {task.lspAssignDate}
                      </TableCell>
                      <TableCell >
                        {task.city}
                      </TableCell>
                      <TableCell >
                        {task.technicians}
                      </TableCell>
                      <TableCell >
                        <Chip
                          label={task.status}
                          color={task.status === "Complete" ? "success" : "default"}
                          size="small"
                        />
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
                    variant={currentPage === page ? "contained" : "text"}
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      minWidth: "36px",
                      mx: 0.5,
                      color:
                        currentPage === page ? "white" : "#029898",
                      bgcolor:
                        currentPage === page
                          ? "#029898"
                          : "transparent",
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
              >
                Next <ChevronRight size={16} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
