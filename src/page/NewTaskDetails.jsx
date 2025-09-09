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


import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";



function Dashboard() {
  return (
    <>
      <Navbar />
     
    </>
  );
}

export default Dashboard;
