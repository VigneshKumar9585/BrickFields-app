import React from "react";
import Navbar from "../../componts/TachnicanNavbar";
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
} from "@mui/material";
import {
  AssignmentTurnedIn,
  PendingActions,
  PeopleAlt,
  SupervisorAccount,
  Handshake,
  CheckCircle,
  Assignment,
  Group,
  Business,
} from "@mui/icons-material";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ✅ Pie Chart Data
const pieChartData = [
  { name: "Closed", value: 60, color: "#556ee6" },
  { name: "Pending", value: 90, color: "#74788d" },
  { name: "Denied", value: 20, color: "#f1b44c" },
  { name: "Steve", value: 40, color: "#34c38f" },
];

const recentActivities = [
  {
    id: 1,
    manager: "Manager Name",
    task: "Task ID Is Assigned To Lsp Name",
    date: "Aug 2, 2025",
  },
  {
    id: 2,
    manager: "Manager Name",
    task: "Task ID Is Assigned To Lsp Name",
    date: "Aug 2, 2025",
  },
  {
    id: 3,
    manager: "New Enquiry",
    task: "New Enquiry Added",
    date: "Aug 2, 2025",
  },
  {
    id: 4,
    manager: "Technician Complete Task",
    task: "Technician Completed The Assigned Task",
    date: "Aug 2, 2025",
  },
];

const unAcceptTasks = [
  { id: "Task ID", date: "Assign Date", name: "Name", address: "Address", mobile: "Mobile No" },
  { id: "Task ID", date: "Assign Date", name: "Name", address: "Address", mobile: "Mobile No" },
  { id: "Task ID", date: "Assign Date", name: "Name", address: "Address", mobile: "Mobile No" },
  { id: "Task ID", date: "Assign Date", name: "Name", address: "Address", mobile: "Mobile No" },
  { id: "Task ID", date: "Assign Date", name: "Name", address: "Address", mobile: "Mobile No" },
  { id: "Task ID", date: "Assign Date", name: "Name", address: "Address", mobile: "Mobile No" },
];

// ✅ New top card style (from your second code)
const topCards = [
  { title: "No Of Enquiry", value: 150, icon: <Handshake fontSize="large" sx={{ color: "#556ee6" }} /> },
  { title: "Enquiry Closed", value: 60, icon: <AssignmentTurnedIn fontSize="large" sx={{ color: "#34c38f" }} /> },
  { title: "Enquiry Pending", value: 90, icon: <PendingActions fontSize="large" sx={{ color: "#f1b44c" }} /> },
  { title: "Total Manager", value: 42, icon: <SupervisorAccount fontSize="large" sx={{ color: "#74788d" }} /> },
  { title: "Total LSP", value: 180, icon: <PeopleAlt fontSize="large" sx={{ color: "#556ee6" }} /> },
];

function Dashboard() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100%",
          pb: 4,
        }}
      >
        {/* Sidebar */}
        <Box sx={{ width: "470px" }} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "grid",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {/* <Typography
              color="#495057"
              sx={{
                fontSize: { xs: "20px", md: "24px" },
                pl: 5,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Dashboard
            </Typography> */}
          </Box>

          <Grid container spacing={3} sx={{ pl: 5 }}>
            {/* ✅ Top State Cards (Updated Only This Section) */}
            {topCards.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={2.4}
                key={index}
                sx={{
                  flexBasis: { md: "16%" },
                  mr: "13px",
                  mt: "20px",
                  ml: "10px",
                }}
              >
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
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      py: 3,
                    }}
                  >
                    {item.icon}
                    <Typography
                      sx={{ fontSize: "16px", fontWeight: "500", color: "#495057", mt: 1 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 700, fontSize: "34px", mt: 0.5, color: "#000" }}
                    >
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* ✅ Un Accept Task */}
            <Grid item sx={{ ml: 1 }}>
              <Typography
                color="#495057"
                sx={{
                  fontSize: { xs: "20px", md: "24px" },
                  pt: 2,
                  pb: 2,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Un Accept Task
              </Typography>
              <Card
                sx={{
                  p: 2,
                  height: 285,
                  width: 430,
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": { width: "6px" },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#adb5bd",
                    borderRadius: "10px",
                  },
                }}
              >
                {unAcceptTasks.map((task, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #e9ecef",
                      py: 1.2,
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", gap: 4 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#495057" }}>
                          {task.id}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#6c757d" }}>
                          {task.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 5 }}>
                        <Typography sx={{ fontSize: "12px", color: "#495057" }}>{task.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "#495057" }}>{task.address}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "#495057" }}>{task.mobile}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "#495057",
                          borderColor: "#adb5bd",
                          borderRadius: "30px",
                          mr: 1,
                          textTransform: "none",
                          fontSize: "12px",
                          width: "60px",
                        }}
                      >
                        Deny
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: "#556ee6",
                          borderRadius: "30px",
                          textTransform: "none",
                          fontSize: "12px",
                          width: "70px",
                          "&:hover": { bgcolor: "#4455cc" },
                        }}
                      >
                        Accept
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Card>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={3} sx={{ ml: "12px", mr: "14px" }}>
              <Typography
                color="#495057"
                sx={{
                  fontSize: { xs: "20px", md: "24px" },
                  pt: 2,
                  pb: 2,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Enquiry Status
              </Typography>
              <Card
                sx={{
                  height: "290px",
                  width: "200px",
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  background: "#fff",
                }}
              >
                <CardContent>
                  <Box sx={{ height: "150px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={75} dataKey="value">
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ mt: "12px" }}>
                    {pieChartData.map((item, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Box
                          sx={{
                            width: 14,
                            height: 14,
                            bgcolor: item.color,
                            mr: 1.5,
                            ml: 3,
                            borderRadius: "3px",
                          }}
                        />
                        <Typography sx={{ color: "#495057", fontWeight: 500 }}>
                          {item.name}: {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={3}>
              <Typography
                color="#495057"
                sx={{
                  fontSize: { xs: "20px", md: "24px" },
                  pt: 2,
                  pb: 2,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Recent Activity
              </Typography>
              <Card
                sx={{
                  borderRadius: "16px",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  height: "290px",
                  width: "460px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    "&::-webkit-scrollbar": { width: "6px" },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#adb5bd",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <List>
                    {recentActivities.map((activity) => (
                      <ListItem key={activity.id} sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: "#556ee6",
                              width: 42,
                              height: 42,
                              boxShadow: "0 2px 5px rgba(85,110,230,0.4)",
                            }}
                          >
                            <CheckCircle sx={{ color: "white" }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#495057" }}>
                              {activity.manager}
                            </Typography>
                          }
                          secondary={
                            <Typography sx={{ fontSize: "0.8rem", color: "#6c757d" }}>
                              {activity.task}
                            </Typography>
                          }
                        />
                        <Typography variant="caption" sx={{ color: "#6c757d" }}>
                          {activity.date}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
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
