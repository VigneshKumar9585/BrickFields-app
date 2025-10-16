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
} from "@mui/material";
import logo from "../assets/logo/logo.webp";

// Add Poppins font in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin") {
      setError("");
      navigate("/dashboard"); // ✅ go to dashboard if correct
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: "0 0 60%",
          backgroundColor: "#F0F6F6",
          display: { xs: "none", md: "flex" }, // hide on mobile
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

      {/* Right Side */}
      <Box
        sx={{
          flex: { xs: "100%", md: "0 0 40%" },
          backgroundColor: "#d9d9d9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        {/* Login Card */}
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
                fontWeight: 500,
                color: "#333333",
                fontSize: "24px",
              }}
            >
              Log In
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Email */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: "#333", fontSize: "15px" }}
                >
                  Email*
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
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
                  inputProps={{ sx: { padding: "12px 14px", fontSize: "14px" } }}
                />
              </Box>

              {/* Password */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: "#333", fontSize: "15px" }}
                >
                  Password*
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      backgroundColor: "#ebebeb",
                      borderRadius: "4px",
                      height: "40px",
                    },
                  }}
                  inputProps={{ sx: { padding: "12px 14px", fontSize: "14px" } }}
                />
              </Box>

              {/* Forgot password */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    color: "#333",
                    fontSize: "14px",
                    textDecoration: "underline",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Forgot Password
                </Link>
              </Box>

              {/* Login button */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "#484848",
                    color: "#fff",
                    height: "48px",
                    borderRadius: "4px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: "#3a3a3a" },
                  }}
                >
                  Log In
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
