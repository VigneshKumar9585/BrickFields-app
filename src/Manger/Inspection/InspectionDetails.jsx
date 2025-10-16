// src/pages/Dashboard.js
import React, { useState } from "react";
import Navbar from "../../componts/Navbar";
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Divider,
  Avatar,
  Button,
} from "@mui/material";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Task Details");

  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "260px",
            bgcolor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            p: 3,
            fontSize: "18px",
            fontWeight: "500",
          }}
        ></Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, p: 4, pt: 2 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
            Inspection Details
          </Typography>

          <Grid container spacing={3}>
            <Box
              sx={{
                border: "3px solid #c8c4c4ff",
                borderRadius: "14px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                width: "100%",
              }}
            >
              {/* Button Tabs (Top of Divider) */}
              <Box sx={{ display: "flex", gap: 2, m: 2, mx: 3 }}>
                {["Task Details", "Status Line", "Checklist"].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "contained" : "outlined"}
                    onClick={() => setActiveTab(tab)}
                    sx={{
                      borderRadius: "25px",
                      textTransform: "none",
                      bgcolor: activeTab === tab ? "#f0f0f0" : "transparent",
                      color: "#000",
                      borderColor: "#ccc",
                      "&:hover": { bgcolor: "#e0e0e0" },
                    }}
                  >
                    {tab}
                  </Button>
                ))}
              </Box>

              <Divider />

              {/* Dynamic Content Below Divider */}
              <Box sx={{ p: 3 }}>
                {activeTab === "Task Details" && (
                  <Grid container spacing={2}>
                    {/* Visitor Details */}
                    <Grid item xs={12} md={7}>
                      <Box
                        sx={{
                          border: "2px solid #d0d0d0",
                          borderRadius: "10px",
                          p: 2,
                          mb: 3,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Visitor Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2}>
                          {[
                            ["Task ID", ""],
                            ["Name", ""],
                            ["Country", ""],
                            ["Region", ""],
                            ["Address", ""],
                            ["Mobile No.", ""],
                            ["Service", ""],
                            ["Prefer Date", ""],
                            ["Bg Verified Date", ""],
                            ["Assign To Manager Date", ""],
                          ].map(([label, value], i) => (
                            <Grid item xs={12} sm={6} key={i}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {label}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 500 }}
                              >
                                {value || "__________"}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={12} md={5}>
                      {/* Manager Details */}
                      <Box
                        sx={{
                          border: "2px solid #d0d0d0",
                          borderRadius: "10px",
                          p: 2,
                          mb: 3,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Manager Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                        </Box>
                      </Box>

                      {/* LSP Details */}
                      <Box
                        sx={{
                          border: "2px solid #d0d0d0",
                          borderRadius: "10px",
                          p: 2,
                          mb: 3,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          LSP Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ width: 60, height: 60 }} />
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>LSP Name</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Mobile No.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Email
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Technician Details */}
                      <Box
                        sx={{
                          border: "2px solid #d0d0d0",
                          borderRadius: "10px",
                          p: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Technician Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          {[1, 2].map((tech) => (
                            <Grid item xs={12} sm={6} key={tech}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Avatar sx={{ width: 60, height: 60 }} />
                                <Box>
                                  <Typography sx={{ fontWeight: 600 }}>
                                    Technician Name
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Mobile No.
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Email
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                )}

                {activeTab === "Status Line" && (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Status Line
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "2px solid #ccc",
                        borderRadius: "12px",
                        p: 3,
                        mx: 2,
                      }}
                    >
                      {[
                        "Manager To LSP",
                        "LSP Accept",
                        "LSP To Technician",
                        "Technician Accept",
                        "Tec. Departs",
                        "Reached Home",
                        "Work Starts",
                        "Complete Work",
                      ].map((label, index) => (
                        <Box key={index} sx={{ textAlign: "center" }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              border: "3px solid black",
                              mx: "auto",
                              mb: 1,
                            }}
                          />
                          <Typography variant="body2">{label}</Typography>
                          <Typography variant="caption" color="gray">
                            Date :
                          </Typography>
                          <Typography variant="caption" color="gray" display="block">
                            Time :
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 500,
                        textDecoration: "underline",
                        textAlign: "right",
                        mr: 3,
                      }}
                    >
                      Equipment Image
                    </Typography>
                  </Box>
                )}

                {activeTab === "Checklist" && (
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="h6">Checklist Content</Typography>
                    <Typography variant="body2" color="text.secondary">
                      (Add checklist items here...)
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
