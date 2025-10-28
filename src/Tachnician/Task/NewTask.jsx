import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Button,
  IconButton,
  Divider,
  Modal,
  Fade,
  Paper,
   Avatar
} from "@mui/material";
import { Search, Eye, X } from "lucide-react";

export default function ManageEnquiry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);
  const [remarkText, setRemarkText] = useState("");
  const [selectedRemark, setSelectedRemark] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const navigate = useNavigate();

  const tasks = [
    {
      id: "T001",
      assignDate: "2025-10-27",
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      email: "john@example.com",
      mobile: "9876543210",
      totalSqft: "1200",
      preferDate: "2025-10-30",
      preferTime: "2:00 PM",
    },
    {
      id: "T002",
      assignDate: "2025-10-26",
      name: "Jane Smith",
      address: "45 Park Ave",
      city: "Brooklyn",
      email: "jane@example.com",
      mobile: "9876500000",
      totalSqft: "950",
      preferDate: "2025-10-31",
      preferTime: "4:00 PM",
    },
    {
      id: "T003",
      assignDate: "2025-10-25",
      name: "Robert Brown",
      address: "22 Lake View",
      city: "Queens",
      email: "robert@example.com",
      mobile: "9988776655",
      totalSqft: "1400",
      preferDate: "2025-10-29",
      preferTime: "11:00 AM",
    },
  ];

  const remarkOptions = [
    "Out Of Station",
    "Irregular Weather",
    "Equipment Need",
    "Rural Zone",
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedRemark("");
    setRemarkText("");
  };

  const handleAccept = () => navigate("/technician-current-task");
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

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

                <FormControl sx={{ width: "100px" }} size="small">
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

          {/* --- Task Cards --- */}
          <Box display="flex" gap="40px" sx={{ m: 2, ml: 5, flexWrap: "wrap" }}>
            {tasks.map((task) => (
              <Grid sx={{ width: "350px" }} item xs={12} md={6} key={task.id}>
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

                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={handleOpen}
                        sx={{
                          flex: 1,
                          height: "30px",
                          textTransform: "none",
                          bgcolor: "#fff",
                          color: "#029898",
                          borderRadius: "18px",
                        }}
                      >
                        Deny
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleAccept}
                        sx={{
                          flex: 1,
                          height: "30px",
                          textTransform: "none",
                          bgcolor: "#fff",
                          color: "#029898",
                          borderRadius: "18px",
                        }}
                      >
                        Accept
                      </Button>
                    </Box>
                  </Box>

                  {/* --- Clickable Body --- */}
                  <Box sx={{ p: 2, cursor: "pointer" }} onClick={handleOpenDetails}>
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
                        <Typography fontSize="14px">{task.address}</Typography>
                      </Box>

                      <Box sx={{ display: "flex" }}>
                        <Typography fontSize="14px">{task.city}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Divider />
                  <Box>
                    <Box sx={{ display: "flex", pl: 2, py: 1.5, gap: 8 }}>
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
                    Total Square Feet: {task.totalSqft}
                  </Typography>

                  <Divider />
                  <Box display="flex" sx={{ p: 2, pt: 1, pb: 0 }}>
                    <Typography sx={{ fontWeight: 600, pr: 11.5, fontSize: "13px" }}>
                      {task.preferDate}
                    </Typography>
                    <Typography sx={{ fontWeight: 600, pr: 2, fontSize: "13px" }}>
                      {task.preferTime}
                    </Typography>
                  </Box>
                </CardContent>
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>

      {/* --- Deny Remark Modal --- */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#fff",
              boxShadow: 24,
              borderRadius: "12px",
              width: 800,
              p: 3,
            }}
          >
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "18px" }}>
                Add Remark
              </Typography>
              <IconButton onClick={handleClose}>
                <X size={20} />
              </IconButton>
            </Box>

            <Box display="flex" gap={1.5} flexWrap="wrap" mb={2}>
              {remarkOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedRemark === option ? "contained" : "outlined"}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    bgcolor: selectedRemark === option ? "#029898" : "transparent",
                    color: selectedRemark === option ? "#fff" : "#000",
                    "&:hover": {
                      bgcolor:
                        selectedRemark === option ? "#028080" : "rgba(0,0,0,0.04)",
                    },
                  }}
                  onClick={() => setSelectedRemark(option)}
                >
                  {option}
                </Button>
              ))}
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              sx={{ background: "#ebe8e8ff" }}
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
            />

            <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  textTransform: "none",
                  color: "#000",
                  borderColor: "#000",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  bgcolor: "#029898",
                  "&:hover": { bgcolor: "#028181ff" },
                }}
                onClick={handleClose}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* --- Full Details Popup --- */}
      <Modal open={openDetails} onClose={handleCloseDetails} closeAfterTransition>
        <Fade in={openDetails}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#fff",
              boxShadow: 24,
              borderRadius: "12px",
              width: 960,
              p: 3,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Task  Details
              </Typography>
              <IconButton onClick={handleCloseDetails}>
                <X size={20} />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              {/* Visitor Details */}
                             <Grid container spacing={2}>
                      {/* Visitor Details (Left Side) */}
                      <Grid item xs={12} md={7}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1,
                            pl: 0,
                            pr: 0,
                            pb: 2,
                            width: "500px",
                            bgcolor: "rgba(240, 238, 238, 1)",
                            borderRadius: 2.5,
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
                              gap: "8px",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: 16, fontWeight: 800, pl: 2, pt: 1 }}
                              component="dt"
                            >
                              Task ID
                            </Typography>

                            <Box display="flex" gap="130px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Name
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Enquiry Date
                              </Typography>
                            </Box>

                            <Box display="flex" gap="128px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Country
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 0.3 }}
                              >
                                State
                              </Typography>
                            </Box>

                            <Box display="flex" gap="124px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Region
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                District
                              </Typography>
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Ctiy
                              </Typography>
                            </Box>

                            <Box display="flex" gap="100px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Address
                              </Typography>
                            </Box>

                            <Box display="flex" gap="101px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Mobile No
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                E-mail
                              </Typography>
                            </Box>

                            <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />

                            <Box display="flex" gap="116px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Service
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Total sq.feet
                              </Typography>
                            </Box>
                            <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />

                            <Box display="flex" gap="90px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Prefer Date
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Prefer Time
                              </Typography>
                            </Box>


                           
                          </Box>
                        </Paper>
                      </Grid>

                      {/* Right Side (Manager, LSP, Technician Details) */}
                      <Grid item xs={12} md={5}>
                        <Box display="flex" sx={{ gap: 2, mb: 2 }}>
                          {/* Manager Details */}
                          <Box
                            sx={{
                              p: 1,
                              pl: 0,
                              pr: 0,
                              pb: 2,
                              bgcolor: "rgba(240, 238, 238, 1)",
                              borderRadius: 2.5,
                              width: "395px",
                              height:"320px"
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600, mb: 1, pl: 2, pt: 0.6 }}
                            >
                              Local Service Partner Details
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                pl: 2,
                                pb: 3,
                                pt: 2,
                              }}
                            >
                              <Avatar sx={{ width: 60, height: 60 }} />
                              <Box>
                                <Typography sx={{ fontWeight: 600 }}>
                                  Manager Name
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Mobile No.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Email
                                </Typography>
                              </Box>
                              <Box sx={{ml:4,mb:4}}> <Typography variant="body2" color="text.secondary">
                                  Assign Date
                                </Typography></Box>
                            </Box>
                          </Box>













                        </Box>


                        
                      </Grid>
                    </Grid>
         
              

            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
