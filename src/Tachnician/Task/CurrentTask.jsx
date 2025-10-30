import { useState } from "react";
import Navbar from "../../componts/TachnicanNavbar.jsx";
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
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManageEnquiry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  // ✅ Task Data (for mapping)
  const tasks = [
    {
      id: "T001",
      assignDate: "2025-10-29",
      timeLeft: "10 Hr 30 mints left",
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      email: "john@example.com",
      mobile: "9876543210",
      sqft: "1200",
      preferDate: "2025-10-31",
      preferTime: "10:00 AM",
    },
    {
      id: "T002",
      assignDate: "2025-10-28",
      timeLeft: "1 Hr 44 mints left",
      name: "Jane Smith",
      address: "456 Park Ave",
      city: "Brooklyn",
      email: "jane@example.com",
      mobile: "9123456780",
      sqft: "900",
      preferDate: "2025-10-30",
      preferTime: "02:30 PM",
    },
    {
      id: "T003",
      assignDate: "2025-10-27",
      timeLeft: "2 Days left",
      name: "Alex Johnson",
      address: "789 Queens Blvd",
      city: "Queens",
      email: "alex@example.com",
      mobile: "9988776655",
      sqft: "1500",
      preferDate: "2025-11-01",
      preferTime: "09:15 AM",
    },
  ];

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
            Current Tasks
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

          {/* --- Card Section --- */}
          <Box display="flex" gap="40px" sx={{ m: 2, ml: 5 }}>
            {tasks.map((task) => (
              <Grid key={task.id} sx={{ width: "350px" }} item xs={12} md={6}>
                <Box
                  onClick={() => navigate("/technician-new-enquiry")}
                  sx={{
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      border: "1px solid #abababff",
                      borderRadius: "14px",
                      p: 0,
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Header */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        bgcolor: "#029898",
                        color: "#fff",
                        px: 2,
                        py: 1,
                        borderRadius: "8px 8px 0 0",
                        boxShadow: 3,
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                          {task.id}
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          {task.assignDate}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          borderRadius: "18px",
                          p: 2,
                          mt: 1,
                          bgcolor: "white",
                          color: "#029898",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "150px",
                          height: "20px",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px" }}>
                          {task.timeLeft}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ p: 2, pb: 0 }}>
                      <Box sx={{ height: "100px", mb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            pb: 1,
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontSize="14px">{task.name}</Typography>
                          <IconButton size="small">
                            <Eye size={22} />
                          </IconButton>
                        </Box>

                        <Box sx={{ display: "flex", pb: 2 }}>
                          <Typography fontSize="14px">
                            {task.address}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex" }}>
                          <Typography fontSize="14px">{task.city}</Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider />

                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          pl: 2,
                          py: 1.5,
                          gap: 18,
                        }}
                      >
                        <Typography fontSize="14px">{task.email}</Typography>
                        <Typography fontSize="14px">{task.mobile}</Typography>
                      </Box>
                    </Box>

                    <Divider />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "14px",
                        pl: 2,
                        py: 1.5,
                        borderRadius: 1,
                      }}
                    >
                      Total Square Feet: {task.sqft}
                    </Typography>

                    <Divider />
                    <Box display="flex" sx={{ p: 2, pt: 1, pb: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          pr: 11.5,
                          fontSize: "13px",
                        }}
                      >
                        {task.preferDate}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          pr: 2,
                          fontSize: "13px",
                        }}
                      >
                        {task.preferTime}
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
