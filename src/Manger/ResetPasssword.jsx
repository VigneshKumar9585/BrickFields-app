import React, { useState } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "../utils/axios";
import logo from "../assets/logo/logo.webp";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const token = location.state?.token;
  const email = location.state?.email;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post('/api/auth/reset-password', {
        // token,
        email,
        newPassword,
      });

      const data = response.data;

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >

      <Box
        sx={{
          flex: "0 0 60%",
          backgroundColor: "#F0F6F6",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 2,
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "500px", height: "auto", objectFit: "contain" }}
          />
        </Box>
      </Box>

      {/* Right Side - Gray Background */}
      <Box
        sx={{
          flex: "0 0 40%",
          backgroundColor: "#d9d9d9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          height: "100%",
        }}
      >
        {/* Reset Password Card */}
        <Paper
          sx={{
            width: { xs: "100%", sm: "380px" },
            maxWidth: "380px",
            padding: "32px",
            borderRadius: "24px",
            backgroundColor: "#ffffff",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                color: "#333333",
                fontSize: "24px",
              }}
            >
              Reset Password
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* New Password */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: "8px",
                    color: "#333333",
                    fontSize: "15px",
                  }}
                >
                  New password*
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
                      backgroundColor: "#ebebeb",
                      borderRadius: "4px",
                      height: "40px",
                    },
                  }}
                  inputProps={{
                    sx: {
                      padding: "12px 14px",
                      fontSize: "12px",
                    },
                  }}
                />
                <Typography
                  sx={{
                    marginTop: "8px",
                    marginBottom: "8px",
                    color: "#9b9b9bff",
                    fontSize: "12px",
                  }}
                >
                  Enter New Password
                </Typography>
              </Box>

              {/* Confirm Password */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: "8px",
                    color: "#333333",
                    fontSize: "15px",
                  }}
                >
                  Confirm Password*
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
                      backgroundColor: "#ebebeb",
                      borderRadius: "4px",
                      height: "40px",
                    },
                  }}
                  inputProps={{
                    sx: {
                      padding: "12px 14px",
                      fontSize: "14px",
                    },
                  }}
                />
                <Typography
                  sx={{
                    marginTop: "8px",
                    color: "#9b9b9bff",
                    fontSize: "12px",
                    marginBottom: "20px"
                  }}
                >
                  Confirm Your New Password
                </Typography>
              </Box>



              {/* Change Password button */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#029898",
                    color: "#ffffff",
                    height: "48px",
                    borderRadius: "4px",
                    textTransform: "none",
                    fontSize: "16px",
                    width: "300px",
                    fontWeight: "normal",
                    "&:hover": {
                      backgroundColor: "#038080ff",
                    },
                    "&:disabled": {
                      backgroundColor: "#cccccc",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ResetPassword;
