// src/pages/Dashboard.js
import React, { useState } from "react";
import Navbar from "../../componts/TachnicanNavbar";
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Button,
  TextField,
  Avatar,
  Divider,
} from "@mui/material";

const DetailsCard = ({ title, data, headerColor = "#029898", image }) => {
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
        minHeight: "250px",
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
      <Box sx={{ px: 2, pt: 2, flex: 1 }}>
        {image && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar
              src={image}
              sx={{
                width: 80,
                height: 80,
                border: `2px solid ${headerColor}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </Box>
        )}
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

function Dashboard() {
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);

  // ✅ Handle Before Images Upload
  const handleBeforeUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setBeforeImages((prev) => [...prev, ...newImages]);
  };

  // ✅ Handle After Images Upload
  const handleAfterUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setAfterImages((prev) => [...prev, ...newImages]);
  };

  // Sample task details data
  const taskDetails = [
    { label: "Task ID", value: "TSK001" },
    { label: "Assigned Date", value: "2024-01-15" },
    { label: "Name", value: "John Doe" },
    { label: "Country", value: "India" },
    { label: "State", value: "Maharashtra" },
    { label: "District", value: "Mumbai" },
    { label: "City", value: "Mumbai City" },
    { label: "Address", value: "123 Main Street" },
    { label: "Mobile", value: "+91 9876543210" },
    { label: "Email", value: "john@example.com" },
    { label: "Service", value: "Service A" },
    { label: "Sq. Feet", value: "1500" },
    { label: "Prefer Date", value: "2024-01-20" },
    { label: "Prefer Time", value: "10:00 AM" },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#ffffffff" }}>
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
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
            Current Task Details
          </Typography>

          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr 1fr 1fr 1fr 1fr" },
            gap: 3
          }}>
            {/* Task Details Card - Left, spans 2 rows */}
            <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "1 / 3" }, gridRow: "1 / 3" }}>
              <DetailsCard title="Task Details" data={taskDetails} headerColor="#029898" />
            </Box>

            {/* Add Images Section - Top Right */}
            <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "3 / 7" }, gridRow: "1" }}>
              <CardContent
                sx={{
                  border: "1px solid #d0d0d0",
                  borderRadius: "10px",
                  p: 0,
                  bgcolor: "#fff",
                  overflow: "hidden",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "#029898",
                    color: "#fff",
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    Add Equipment Images (Before)
                  </Typography>
                </Box>

                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography fontSize="12px">Upload before state images</Typography>
                    <Typography
                      onClick={() => document.getElementById("before-upload").click()}
                      sx={{
                        fontWeight: 600,
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#029898",
                        fontSize: "12px",
                      }}
                    >
                      + Add Images
                    </Typography>
                    <input
                      id="before-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleBeforeUpload}
                    />
                  </Box>

                  {/* Show uploaded before images */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {beforeImages.length > 0 ? (
                      beforeImages.map((src, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 70,
                            height: 70,
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                        >
                          <img src={src} alt={`before-${i}`} width="70" height="70" />
                        </Box>
                      ))
                    ) : (
                      <Typography fontSize="12px" color="#999">No images uploaded</Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Box>

            {/* Start Work Button - Bottom Right (Top) */}
            <Box sx={{ gridColumn: { xs: "1", sm: "1", md: "3 / 7" }, gridRow: "2", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
              <CardContent
                sx={{
                  border: "1px solid #d0d0d0",
                  borderRadius: "10px",
                  p: 0,
                  bgcolor: "#fff",
                  overflow: "hidden",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "#029898",
                    color: "#fff",
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    Add Equipment Images (After)
                  </Typography>
                </Box>

                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography fontSize="12px">Upload after state images</Typography>
                    <Typography
                      onClick={() => document.getElementById("after-upload").click()}
                      sx={{
                        fontWeight: 600,
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#029898",
                        fontSize: "12px",
                      }}
                    >
                      + Add Images
                    </Typography>
                    <input
                      id="after-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleAfterUpload}
                    />
                  </Box>

                  {/* Show uploaded after images */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {afterImages.length > 0 ? (
                      afterImages.map((src, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 70,
                            height: 70,
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                        >
                          <img src={src} alt={`after-${i}`} width="70" height="70" />
                        </Box>
                      ))
                    ) : (
                      <Typography fontSize="12px" color="#999">No images uploaded</Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Box>

          {/* Start Work Button - Full Width Bottom */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 600,
                bgcolor: "#029898",
                color: "#fff",
                width: "200px",
                height: "42px",
                "&:hover": { bgcolor: "#027c7c" },
              }}
            >
              Start Work
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
