// src/pages/Dashboard.js
import React from "react";
import Navbar from "../componts/Navbar.jsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import logo from "../assets/logo/logo.webp";

function Dashboard() {
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

  const getTextFieldSx = (field, width = "160px") => ({
    width: field === "Address" ? "300px" : width,
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
          {/* Page Title */}
          <Typography
            color="rgb(0,0,0)"
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              textAlign: "left",
              mb: 2,
            }}
          >
            Profile
          </Typography>

          {/* Container */}
          <Box sx={{ width: "100%", maxWidth: "1190px" }}>
            {/* Personal Data Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontSize: "14px", color: "gray" }}
                  >
                    Personal Data
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                  {/* Left side - Fields */}
                  <Grid container spacing={2} sx={{ flex: 1 }}>
                    {personalFields.map((field, i) => (
                      <Grid item xs={12} sm={6} md={3} key={i}>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 1,
                            pr: 3,
                            color: "gray",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {field}
                        </Typography>
                        <TextField
                          variant="outlined"
                          size="small"
                          sx={getTextFieldSx(field)}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Right side - Profile image & Edit */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                    sx={{ pr: "100px" }}
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontSize: "14px", color: "gray" }}
                  >
                    Document Data
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {documentFields.map((field, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1,
                          pr: 3,
                          color: "gray",
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
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none" }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontSize: "14px", color: "gray" }}
                  >
                    Social Media Platforms
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {socialFields.map((field, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1,
                          pr: 3,
                          color: "gray",
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
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "#333" },
                  width: "120px",
                }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
