import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "../utils/axios";
import logo from "../assets/logo/logo.webp";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post('/api/auth/send-otp', {
        email,
      });

      const data = response.data;

      setSuccess("OTP has been sent to your email");

      // Navigate to OTP verification screen after 1 second
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
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
      {/* Left Side - White Background (hidden on small screens) */}
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
        {/* Forgot Password Card */}
        <Paper
          sx={{
            width: "100%",
            maxWidth: "380px",
            padding: "32px",
            borderRadius: "30px",
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
              Forgot Password
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Email */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: "8px",
                    color: "#333333",
                    fontSize: "15px",
                  }}
                >
                  Enter Registered Email*
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    color: "#9b9b9bff",
                    fontSize: "12px",
                  }}
                >
                  Please Enter Your Email Address
                </Typography>
              </Box>


              {/* Send button */}
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
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
                </Button>
              </Box>

              {/* Back to Login */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Link
                  component={RouterLink}
                  to="/"
                  sx={{
                    color: "#333",
                    fontSize: "14px",
                    textDecoration: "underline",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Back to Login
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
