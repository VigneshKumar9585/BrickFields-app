import React from "react";
import Navbar from "../../componts/TachnicanNavbar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ✅ Pie Chart Data
const pieChartData = [
  { name: "Closed", value: 60, color: "#b2acacff" },
  { name: "Pending", value: 90, color: "#797775ff" },
  { name: "Denied", value: 20, color: "#545151ff" },
  { name: "Steve", value: 40, color: "#191919ff" },
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
  { id: "Task ID", date:"Assgin Date",name: "Name", address: "Address", mobile: "Mobile No" },
   { id: "Task ID", date:"Assgin Date",name: "Name", address: "Address", mobile: "Mobile No" },
    { id: "Task ID", date:"Assgin Date",name: "Name", address: "Address", mobile: "Mobile No" },
   { id: "Task ID", date:"Assgin Date",name: "Name", address: "Address", mobile: "Mobile No" },
    { id: "Task ID", date:"Assgin Date",name: "Name", address: "Address", mobile: "Mobile No" },
   { id: "Task ID", date:"Assgin Date",name: "Name", address: "Address", mobile: "Mobile No" },    
]

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
        <Box sx={{ width: "400px" }} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
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

            {/* ✅ Replace Line Chart with Un Accept Task */}
            <Grid item sx={{ ml: 1 }}>
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
                  Un Accept Task
                </Typography>
              </Box>
              <Card
                sx={{
                  p: 2,
                  height: 285,
                  width: 430,
                  bgcolor: "rgba(237, 235, 235, 1)",
                  borderRadius: "16px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555",
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
                      borderBottom: "1px solid #ccc",
                      py: 1.2,
                    }}
                  >
                    <Box>
                        <Box sx={{display:"flex", gap:4}}>
                            <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                        {task.id}
                      </Typography>
                       <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                        {task.date}
                      </Typography>
                        </Box>
                        <Box sx={{display:"flex", gap:5}}>
                             <Typography sx={{ fontSize: "12px" }}>
                        {task.name}
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        {task.address}
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        {task.mobile}
                      </Typography>

                        </Box>
                      
                     
                    </Box>
                    <Box>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "#000",
                          borderColor: "#ccc",
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
                          bgcolor: "#000",
                          borderRadius: "30px",
                          textTransform: "none",
                          fontSize: "12px",
                          width: "70px",
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
              <Box
                sx={{
                  display: "grid",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  ml: 0,
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
                  boxShadow: "0 1px 3px hsl(var(--dashboard-card-shadow))",
                  height: "290px",
                  width: "200px",
                  bgcolor: "rgba(237, 235, 235, 1)",
                  borderRadius: "16px",
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
                            <Cell key={`cell-${index}`} fill={entry.color} />
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

            {/* Recent Activity */}
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
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#888",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#555",
                    },
                  }}
                >
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
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
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
