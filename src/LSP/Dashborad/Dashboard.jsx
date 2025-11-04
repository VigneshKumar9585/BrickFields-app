import React from "react";
import Navbar from "../../componts/LspNavbar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  CheckCircle,
  AssignmentTurnedIn,
  PendingActions,
  PeopleAlt,
  SupervisorAccount,
  Handshake,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ✅ Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// ✅ Line Chart Data
const lineChartData = [
  { name: "Jan", value: 0 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 20 },
  { name: "Apr", value: 40 },
  { name: "May", value: 15 },
  { name: "Jun", value: 25 },
  { name: "Jul", value: 30 },
  { name: "Aug", value: 35 },
];

const recentActivities = [
  { id: 1, manager: "Manager Name", task: "Task ID is assigned to LSP Name", date: "Aug 2, 2025" },
  { id: 2, manager: "Manager Name", task: "Task ID is assigned to LSP Name", date: "Aug 2, 2025" },
  { id: 3, manager: "New Enquiry", task: "New Enquiry Added", date: "Aug 2, 2025" },
  { id: 4, manager: "Technician Complete Task", task: "Technician Completed The Assigned Task", date: "Aug 2, 2025" },
];

// ✅ Line Chart
const lineData = {
  labels: lineChartData.map((d) => d.name),
  datasets: [
    {
      label: "Total Enquiry",
      data: lineChartData.map((d) => d.value),
      borderColor: "#556ee6",
      backgroundColor: "rgba(85,110,230,0.1)",
      borderWidth: 2.5,
      tension: 0.3,
      pointBackgroundColor: "#556ee6",
      pointBorderColor: "#fff",
      pointHoverRadius: 7,
      fill: true,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      ticks: { color: "#495057", font: { weight: "500" } },
      grid: { color: "rgba(0,0,0,0.05)" },
    },
    y: {
      ticks: { color: "#495057" },
      grid: { color: "rgba(0,0,0,0.05)" },
      min: 0,
      max: 80,
      stepSize: 10,
    },
  },
};

// ✅ Pie Chart Data
const pieChartData = [
  { name: "Closed", value: 60, color: "#556ee6" },
  { name: "Pending", value: 90, color: "#74788d" },
  { name: "Denied", value: 20, color: "#f1b44c" },
  { name: "Other", value: 40, color: "#34c38f" },
];

function Dashboard() {
  const cardData = [
    { title: "No Of Enquiry", value: 150, icon: <Handshake fontSize="large" sx={{ color: "#556ee6" }} /> },
    { title: "Enquiry Closed", value: 60, icon: <AssignmentTurnedIn fontSize="large" sx={{ color: "#34c38f" }} /> },
    { title: "Enquiry Pending", value: 90, icon: <PendingActions fontSize="large" sx={{ color: "#f1b44c" }} /> },
    { title: "Total Manager", value: 42, icon: <SupervisorAccount fontSize="large" sx={{ color: "#74788d" }} /> },
    { title: "Total LSP", value: 180, icon: <PeopleAlt fontSize="large" sx={{ color: "#556ee6" }} /> },
  ];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100%",
          pb: 4,
          pl:5
        }}
      >
        <Box sx={{ width: "400px" }} />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} sx={{ pl: 5, pt: 1 }}>
            {/* Top Cards */}
            {cardData.map((item, index) => (
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

            {/* Line Chart */}
            <Grid item sx={{ ml: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: "20px", md: "24px" },
                  pt: 2,
                  pb: 2,
                  fontWeight: "600",
                  textAlign: "center",
                  color: "#495057",
                }}
              >
                Total Enquiry
              </Typography>
              <Card
                sx={{
                  p: 2,
                  height: 330,
                  width: 380,
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Line data={lineData} options={lineOptions} />
                </Box>
              </Card>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={4} sx={{ ml: "12px", mr: "14px" }}>
              <Typography
                sx={{
                  fontSize: { xs: "20px", md: "24px" },
                  pt: 2,
                  pb: 2,
                  fontWeight: "600",
                  textAlign: "center",
                  color: "#495057",
                }}
              >
                Enquiry Status
              </Typography>
              <Card
                sx={{
                  height: "330px",
                  width: "350px",
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
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={75}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ mt: "12px" }}>
                    {pieChartData.map((item, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
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
                sx={{
                  fontSize: { xs: "20px", md: "24px" },
                  pt: 2,
                  pb: 2,
                  fontWeight: "600",
                  textAlign: "center",
                  color: "#495057",
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
                  height: "330px",
                  width: "380px",
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
