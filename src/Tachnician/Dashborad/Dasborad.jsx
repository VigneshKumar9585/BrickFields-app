import React, { useState, useEffect } from "react";
import Navbar from "../../componts/TachnicanNavbar";
import axios from "../../utils/axios.js";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  AssignmentTurnedIn,
  PendingActions,
  Handshake,
  CheckCircle,
} from "@mui/icons-material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    ongoingTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    newAssignments: [],
    statusCounts: {
      Closed: 0,
      Pending: 0,
      Assigned: 0,
      Ongoing: 0,
    }
  });

  useEffect(() => {
    const fetchTechnicianData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) return;

        const response = await axios.get(`${BACKEND_URL}/api/technician-enquiry/${userId}`);
        const tasks = response.data || [];

        const ongoing = tasks.filter(t => t.status === "Ongoing").length;
        const completed = tasks.filter(t => t.status === "Closed").length;
        const pending = tasks.filter(t => t.status === "Pending").length;
        const assigned = tasks.filter(t => t.status === "Assigned");

        const statusCounts = {
          Closed: completed,
          Pending: pending,
          Ongoing: ongoing,
          Assigned: assigned.length,
        };

        setData({
          ongoingTasks: ongoing,
          completedTasks: completed,
          pendingTasks: pending,
          newAssignments: assigned.slice(0, 10), // Limit to 10
          statusCounts
        });
      } catch (error) {
        console.error("Error fetching technician dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicianData();
  }, []);

  const topCards = [
    { title: "Ongoing Tasks", value: data.ongoingTasks, icon: <Handshake fontSize="large" sx={{ color: "#556ee6" }} /> },
    { title: "Completed Tasks", value: data.completedTasks, icon: <AssignmentTurnedIn fontSize="large" sx={{ color: "#34c38f" }} /> },
    { title: "Pending Tasks", value: data.pendingTasks, icon: <PendingActions fontSize="large" sx={{ color: "#f1b44c" }} /> },
  ];

  const pieChartData = [
    { name: "Completed", value: data.statusCounts.Closed, color: "#34c38f" },
    { name: "Pending", value: data.statusCounts.Pending, color: "#f1b44c" },
    { name: "Ongoing", value: data.statusCounts.Ongoing, color: "#556ee6" },
    { name: "New", value: data.statusCounts.Assigned, color: "#74788d" },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', ml: "250px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
        {/* Sidebar Spacer */}
        <Box sx={{ width: "250px", flexShrink: 0 }} />

        <Box sx={{ flexGrow: 1, p: 3, overflowX: "hidden" }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "#2d3436" }}>
            Technician Dashboard
          </Typography>

          <Grid container spacing={3}>
            {/* Top Cards */}
            {topCards.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "16px",
                    transition: "0.3s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3 }}>
                    {item.icon}
                    <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#6c757d", mt: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: "28px", mt: 0.5, color: "#2d3436" }}>
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* New Assignments Section */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", height: '450px', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>New Assignments</Typography>
                  <Box sx={{ flex: 1, overflowY: "auto", pr: 1, "&::-webkit-scrollbar": { width: "4px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "#adb5bd", borderRadius: "10px" } }}>
                    {data.newAssignments.length > 0 ? (
                      data.newAssignments.map((task, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #f1f3f5",
                            py: 1.5,
                            flexWrap: { xs: 'wrap', sm: 'nowrap' },
                            gap: 1
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", gap: 2, alignItems: 'center', mb: 0.5 }}>
                              <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#556ee6" }}>{task.enquiryId}</Typography>
                              <Typography sx={{ fontSize: "12px", color: "#6c757d" }}>{new Date(task.preferDate).toLocaleDateString()}</Typography>
                            </Box>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={6}>
                                <Typography sx={{ fontSize: "13px", color: "#495057", fontWeight: 500 }}>{task.name}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography sx={{ fontSize: "13px", color: "#6c757d" }}>{task.city}, {task.district}</Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                color: "#f1b44c",
                                borderColor: "#f1b44c",
                                borderRadius: "30px",
                                textTransform: "none",
                                fontSize: "11px",
                                "&:hover": { borderColor: "#d09530", bgcolor: "rgba(241,180,76,0.05)" }
                              }}
                            >
                              Deny
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                bgcolor: "#34c38f",
                                borderRadius: "30px",
                                textTransform: "none",
                                fontSize: "11px",
                                boxShadow: 'none',
                                "&:hover": { bgcolor: "#2cae7e", boxShadow: 'none' }
                              }}
                            >
                              Accept
                            </Button>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, color: '#adb5bd' }}>
                        <AssignmentTurnedIn sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                        <Typography>No new assignments today</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Status Pie Chart */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", height: '450px' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Enquiry Status Summary</Typography>
                  <Box sx={{ flex: 1, minHeight: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" stroke="none" paddingAngle={5}>
                          {pieChartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {pieChartData.map((item, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Box sx={{ width: 12, height: 12, bgcolor: item.color, mr: 1.5, borderRadius: "50%" }} />
                        <Typography sx={{ color: "#495057", fontWeight: 500, fontSize: '14px' }}>
                          {item.name}: {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;

