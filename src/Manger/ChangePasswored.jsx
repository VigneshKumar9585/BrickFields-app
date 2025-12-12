// src/pages/ChangePassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../componts/Navbar.jsx";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "../utils/axios";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post('/api/auth/change-password', {
        currentPassword,
        newPassword,
      });

      const data = response.data;

      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Optionally redirect after success
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <>
      <Navbar />

      {/* Page Layout */}
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "260px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >

        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, p: 4, pt: 0, }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
            Change Password
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          {/* Form Card */}

          <Paper
            sx={{
              width: { xs: "100%", sm: "380px" },

              borderRadius: "8px",
              boxShadow: 8
            }}
          > <Box padding={3}>
              {/* Current Password */}
              <Typography sx={{ fontSize: "14px", mb: 1, color: "#333" }}>
                Current Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="filled"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    bgcolor: "#e0e0e0",
                    borderRadius: "4px",
                    height: "40px",
                    pb: 1.5
                  },
                }}
                sx={{ mb: 3 }}
              />

              {/* New Password */}
              <Typography sx={{ fontSize: "14px", mb: 1, color: "#333" }}>
                New Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="filled"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    bgcolor: "#e0e0e0",
                    borderRadius: "4px",
                    height: "40px",
                    pb: 1.5
                  },
                }}
                sx={{ mb: 3 }}
              />

              {/* Confirm Password */}
              <Typography sx={{ fontSize: "14px", mb: 1, color: "#333" }}>
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="filled"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    bgcolor: "#e0e0e0",
                    borderRadius: "4px",
                    height: "40px",
                    pb: 1.5
                  },
                }}
              />
            </Box>

            {/* Divider between password fields and buttons */}
            <Divider sx={{ my: 0, width: "100%", bgcolor: "grey.400" }} />


            {/* Buttons */}
            <Box sx={{ p: 2, px: 3 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleChangePassword}
                disabled={loading}
                sx={{
                  bgcolor: "#029898",
                  color: "#fff",
                  height: "44px",
                  borderRadius: "4px",
                  textTransform: "none",
                  mb: 2,
                  "&:hover": { bgcolor: "#038080ff" },
                  "&:disabled": { bgcolor: "#cccccc" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
                sx={{
                  color: "#555",
                  borderColor: "#ccc",
                  height: "44px",
                  borderRadius: "4px",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
