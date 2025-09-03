import React from "react";
import Navbar from "../componts/Navbar.jsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
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
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";


// ✅ Import Recharts for Pie chart
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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
  {
    id: 1,
    manager: 'Manager Name',
    task: 'Task ID Is Assigned To Lsp Name',
    date: 'Aug 2, 2025',
  },
  {
    id: 2,
    manager: 'Manager Name',
    task: 'Task ID Is Assigned To Lsp Name',
    date: 'Aug 2, 2025',
  },
  {
    id: 3,
    manager: 'New Enquiry',
    task: 'New Enquiry Added',
    date: 'Aug 2, 2025',
  },
  {
    id: 4,
    manager: 'Technician Complete Task',
    task: 'Technician Completed The Assigned Task',
    date: 'Aug 2, 2025',
  },
];

const lineData = {
  labels: lineChartData.map((d) => d.name),
  datasets: [
    {
      label: "Total Enquiry",
      data: lineChartData.map((d) => d.value),
      borderColor: "#000000ff",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      borderWidth: 1,
      tension: 0, // straight lines
      pointBackgroundColor: "#000000ff",
      pointBorderColor: "#000000ff",
      pointHoverRadius: 6,
      pointRadius: (ctx) => {
        const index = ctx.dataIndex;
        const total = ctx.dataset.data.length;
        // ❌ no point on first (index 0) and last (index total-1)
        if (index === 0 || index === total - 1) return 0;
        return 2; // normal size for others
      },
      fill: false,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: {
      ticks: { color: "#000" },
      grid: {
        drawTicks: true,
        color: "transparent", // hide vertical grid lines
        lineWidth: 2, // thickness of X-axis baseline
      },
      border: {
        display: true,
        color: "#000",
        width: 3, // make X-axis line thicker
      },
    },
    y: {
      ticks: { color: "#000" },
      grid: { display: false },
      min: 0,
      max: 80,
      stepSize: 10,
      border: {
        display: true,
        color: "#000",
        width: 3,
      },
    },
  },
};

// ✅ Pie Chart Data
const pieChartData = [
  { name: "Closed", value: 60, color: "#b2acacff" },
  { name: "Pending", value: 90, color: "#797775ff" },
  { name: "Denied", value: 20, color: "#545151ff" },
  { name: "Steve", value: 40, color: "#191919ff" },
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
        }}
      >
        {/* Sidebar */}
        <Box sx={{ width:"400px"  }} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Page Title */}
          <Box
            sx={{
              display: "grid",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Typography
              color="rgb(0,0,0)"
              sx={{
                fontSize: { xs: "20px", md: "24px" },
                pl: 5,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Dashboard
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ pl: 5 }}>
            {/* Top Stats Cards */}
            {[
              { title: "No Of Enquiry", value: 150 },
              { title: "Enquiry Closed", value: 60 },
              { title: "Enquiry Pending", value: 90 },
              { title: "Total Manager", value: 42 },
              { title: "Total LSP", value: 180 },
            ].map((item, index) => (
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
                    bgcolor: "rgba(237, 235, 235, 1)",
                    boxShadow: "0 1px 3px hsl(var(--dashboard-card-shadow))",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    borderRadius: "16px",
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 3 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                      sx={{ fontSize: "16px", fontWeight: "400" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: "hsl(var(--foreground))",
                        fontSize: "40px",
                        fontStyle: "Bold",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Line Chart */}
            <Grid item sx={{ml:1}}>
              <Box
                sx={{
                  display: "grid",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  pl: 0,
                }}
              >
                <Typography
                  color="rgb(0,0,0)"
                  sx={{
                    fontSize: { xs: "20px", md: "24px" },
                    pt: 2,
                    pb: 2,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Total Enquiry
                </Typography>
              </Box>
              <Card
                sx={{
                  p: 2,
                  height: 255,
                  width: 430,
                  bgcolor: "rgba(237, 235, 235, 1)",
                  borderRadius:"16px"
                }}
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Line data={lineData} options={lineOptions} />
                </Box>
              </Card>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={3} sx={{ml:"12px",mr:"14px"}}>
               <Box
                sx={{
                  display: "grid",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  pl: 0,
                }}
              >
                <Typography
                  color="rgb(0,0,0)"
                  sx={{
                    fontSize: { xs: "20px", md: "24px" },
                    pt: 2,
                    pb: 2,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Enquiry Status
                </Typography>
              </Box>
              <Card
                sx={{
                  // bgcolor: "hsl(var(--dashboard-card))",
                  boxShadow: "0 1px 3px hsl(var(--dashboard-card-shadow))",
                  height: "290px",
                  width: "200px",
                  bgcolor:"rgba(237, 235, 235, 1)",
                  borderRadius:"16px"
                }}
              >
                <CardContent>
                 
                  <Box sx={{ height: "150px", }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          // innerRadius={40}
                          outerRadius={75}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  {/* ✅ Legend with color + name + value */}
                  <Box sx={{ mt:"12px" }}>
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
                            ml:3,
                            borderRadius: "3px",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "#000", fontWeight: 400 }}
                        >
                          {item.name}: {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>


             <Grid item xs={12} md={3}>
                <Box
                sx={{
                  display: "grid",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  pl: 0,
                }}
              >
                <Typography
                  color="rgb(0,0,0)"
                  sx={{
                    fontSize: { xs: "20px", md: "24px" },
                    pt: 2,
                    pb: 2,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Recent Activity
                </Typography>
              </Box>
            <Card
  sx={{
    borderRadius: "16px",
    bgcolor: "rgba(237, 235, 235, 1)",
    boxShadow: "0 1px 3px hsl(var(--dashboard-card-shadow))",
    height: "290px",
    width:"460px",
    display: "flex",
    flexDirection: "column",
  }}
>
  <CardContent  sx={{
      flex: 1,
      overflowY: "auto",
      p: 2,

      // ✅ Scrollbar Styling
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }}>
    <List>
      {recentActivities.map((activity) => (
        <ListItem key={activity.id} sx={{ px: 0, py: 1.5 }}>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: "rgba(0, 0, 0, 1)",
                width: 42,
                height: 42,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {activity.manager}
              </Typography>
            }
            secondary={
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: "0.75rem" }}
              >
                {activity.task}
              </Typography>
            }
          />
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ ml: 1 }}
          >
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
