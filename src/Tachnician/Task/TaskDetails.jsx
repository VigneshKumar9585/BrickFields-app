import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../componts/TachnicanNavbar.jsx";
import {
  Box,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
const DetailsCard = ({ title, data, headerColor = "#029898" }) => {
  if (!data) return null;
  return (
    <CardContent
      sx={{
        border: "1px solid #d0d0d0",
        borderRadius: "10px",
        p: 0,
        bgcolor: "#fff",
        overflow: "hidden",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        fontSize: "13px",
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: 2,
          py: 1,
          bgcolor: headerColor,
          color: "#fff",
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>

      {/* DETAILS */}
      <Box sx={{ px: 2, pt: 2, pb: 2, flex: 1 }}>
        {data.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "13px",
                  width: "120px",
                  color: "#555"
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#333",
                  flex: 1,
                  textAlign: "right"
                }}
              >
                {item.value || "-"}
              </Typography>
            </Box>
            {index !== data.length - 1 && (
              <Divider sx={{ mb: 1.5, borderColor: "#f0f0f0" }} />
            )}
          </Box>
        ))}
      </Box>
    </CardContent>
  );
};

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample task data - Replace with actual data from backend
  const taskData = {
    taskID: "TSK001",
    assignDate: "2024-01-15",
    name: "John Doe",
    country: "India",
    state: "Maharashtra",
    district: "Mumbai",
    city: "Mumbai City",
    address: "123 Main Street",
    mobile: "+91 9876543210",
    email: "john@example.com",
    service: "Service A",
    sqFeet: "1500",
    preferDate: "2024-01-20",
    preferTime: "10:00 AM",
    lspName: "LSP Partner Name",
    lspMobile: "+91 9876543210",
    lspEmail: "lsp@example.com",
    lspAssignDate: "2024-01-15",
    techName: "Technician Name",
    techMobile: "+91 9876543210",
    techEmail: "tech@example.com",
    techAssignDate: "2024-01-15",
  };

  const taskDetailsData = [
    { label: "Task ID", value: taskData.taskID },
    { label: "Assign Date", value: taskData.assignDate },
    { label: "Name", value: taskData.name },
    { label: "Country", value: taskData.country },
    { label: "State", value: taskData.state },
    { label: "District", value: taskData.district },
    { label: "City", value: taskData.city },
    { label: "Address", value: taskData.address },
    { label: "Mobile", value: taskData.mobile },
    { label: "Email", value: taskData.email },
    { label: "Service", value: taskData.service },
    { label: "Sq. Feet", value: taskData.sqFeet },
    { label: "Slot Date", value: taskData.preferDate },
    { label: "Slot Time", value: taskData.preferTime },
  ];

  const lspDetailsData = [
    { label: "Name", value: taskData.lspName },
    { label: "Mobile", value: taskData.lspMobile },
    { label: "Email", value: taskData.lspEmail },
    { label: "Assign Date", value: taskData.lspAssignDate },
  ];

  const techDetailsData = [
    { label: "Name", value: taskData.techName },
    { label: "Mobile", value: taskData.techMobile },
    { label: "Email", value: taskData.techEmail },
    { label: "Assign Date", value: taskData.techAssignDate },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#ffffff" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "250px",
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
        <Box sx={{ flex: 1, p: 4 }}>
          {/* Back Button */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Button
              onClick={() => navigate("/technician-new-task")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#029898",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 600,
                p: 0,
                mb: 2,
                "&:hover": { bgcolor: "transparent", opacity: 0.8 },
              }}
            >
              <ArrowLeft size={18} />
              Back to Tasks
            </Button>
          </Box>

          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 600, color: "#333" }}
          >
            Task Details
          </Typography>

          {/* Grid Layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr 1fr 1fr 1fr 1fr" },
              gap: 3
            }}
          >
            {/* Task Details Card - Left, spans 2 rows */}
            <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "1 / 3" }, gridRow: "1 / 3" }}>
              <DetailsCard
                title="Task Details"
                data={taskDetailsData}
                headerColor="#029898"
              />
            </Box>

            {/* LSP Details Card - Top Right */}
            <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "3 / 5" }, gridRow: "1" }}>
              <DetailsCard
                title="Local Service Partner"
                data={lspDetailsData}
                headerColor="#5e35b1"
              />
            </Box>

            {/* Technician Details Card - Top Right */}
            <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "5 / 7" }, gridRow: "1" }}>
              <DetailsCard
                title="Assigned Technician"
                data={techDetailsData}
                headerColor="#e65100"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
