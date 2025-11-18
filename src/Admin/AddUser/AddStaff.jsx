// src/pages/Dashboard.js
import React from "react";
import Navbar from "../../componts/AdminNavbar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo.webp";

function Dashboard() {
  // ✅ Detect Edit Mode (from ManageUser navigation)
  const location = useLocation();
  const taskData = location.state?.task;
  const isEditMode = !!taskData;

  const personalFields = [
    "Name",
    "Mobile No",
    "Email ID",
    "Address",
    "Country",
    "State",
    "City",
    "Role",
  ];

  const documentFields = [
    "Adhaar Card",
    "Degree Certificate",
    "Experience Certificate",
  ];

  const socialFields = ["Instagram", "Youtube", "Linkedin"];

  const getTextFieldSx = (field, width = "170px") => ({
    width: field === "Address" ? "320px" : width,
    "& .MuiOutlinedInput-root": {
      height: "30px",
      bgcolor: "#e0e0e0",
      borderRadius: "4px",
      "& input": {
        padding: "4px 8px",
        fontSize: "12px",
      },
      "& fieldset": { border: "none" },
    },
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100%",
        }}
      >
        {/* Sidebar spacing */}
        <Box sx={{ width: "280px" }} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Tabs */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Typography sx={{ fontWeight: 600, cursor: "pointer" }}>
              Add User
            </Typography>
            |
            <Typography sx={{ color: "#000", cursor: "pointer" }}>
              {isEditMode ? "Edit Staff" : "Add Staff"}
            </Typography>
          </Box>

          {/* Container */}
          <Box sx={{ width: "100%", maxWidth: "1190px" }}>
            {/* Personal Data Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#000",
                    mb: 2,
                  }}
                >
                  Personal Data
                </Typography>

                <Box sx={{ display: "flex", gap: 4 }}>
                  {/* Left side - Fields */}
                  <Grid container spacing={2} sx={{ flex: 1 }}>
                    {personalFields.map((field, i) => (
                      <Grid item xs={12} sm={6} md={3} key={i}>
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 1,
                            color: "#000",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {field}
                        </Typography>
                        {["Country", "State", "Region", "District"].includes(
                          field
                        ) ? (
                          <TextField
                            select
                            variant="outlined"
                            size="small"
                            sx={getTextFieldSx(field)}
                            defaultValue={taskData ? taskData[field] || "" : ""}
                          >
                            <MenuItem value="">Select {field}</MenuItem>
                          </TextField>
                        ) : (
                          <TextField
                            variant="outlined"
                            size="small"
                            sx={getTextFieldSx(field)}
                            defaultValue={taskData ? taskData[field] || "" : ""}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  {/* Right side - Profile image & Add */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                    sx={{ position: "relative", mr: 10 }}
                  >
                    <Box
                      component="img"
                      src={logo}
                      alt="profile"
                      sx={{ width: 100, height: 100, borderRadius: "50%" }}
                    />

                    <Box display="flex" alignItems="center" gap={1}>
                      <Edit sx={{ fontSize: 16 }} />
                      <Typography sx={{ fontSize: 14 }}>Edit</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Document Data Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#000",
                    mb: 2,
                  }}
                >
                  Document Data
                </Typography>
                <Grid container spacing={2}>
                  {documentFields.map((field, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1,
                          color: "#222222ff",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {field}
                      </Typography>
                      <Button
                        sx={{
                          textTransform: "none",
                          fontSize: "12px",
                          width: "200px",
                          color: "#000",
                          bgcolor: "#e0e0e0",
                          "&:hover": { bgcolor: "#d5d5d5" },
                          height: 30,
                        }}
                      >
                        Upload
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none", mb: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#000",
                    mb: 2,
                  }}
                >
                  Social Media Platforms
                </Typography>
                <Grid container spacing={2}>
                  {socialFields.map((field, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1,
                          color: "#000",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {field}
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "30px",
                            bgcolor: "#e0e0e0",
                            borderRadius: "4px",
                            "& input": {
                              padding: "4px 8px",
                              fontSize: "12px",
                            },
                            "& fieldset": { border: "none" },
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <IconButton size="small">
                              <Close sx={{ fontSize: 16, color: "#000" }} />
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Bottom Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  borderColor: "#bdbdbd",
                  color: "#424242",
                  bgcolor: "#f5f5f5",
                  "&:hover": { bgcolor: "#e0e0e0" },
                  width: "120px",
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  bgcolor: "#029898",
                  color: "white",
                  "&:hover": { bgcolor: "#036d6dff" },
                  width: "120px",
                }}
              >
                {isEditMode ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box> 
    </>
  );
}

export default Dashboard;
