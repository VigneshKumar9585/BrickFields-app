import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link
} from "@mui/material";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: { xs: "column", md: "row" }, // mobile = stacked, desktop = row
      }}
    >
      {/* Left Side - White Background (hidden on small screens) */}
      <Box
        sx={{
          flex: "0 0 62%",
          backgroundColor: "white",
          display: { xs: "none", md: "block" }, // ❌ hide on mobile, ✅ show on md+
        }}
      />

      {/* Right Side - Gray Background */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "0 0 38%" }, // full width on mobile, 38% on desktop
          backgroundColor: "#d9d9d9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
    height: "100%",  
        }}
      >
        {/* Login Card */}
        <Paper
          sx={{
            width: { xs: "100%", sm: "380px" },
            maxWidth: "380px",
            height: "400px",
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

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Username */}
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
                  variant="filled"
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
                    marginTop:"8px",
                    marginBottom: "8px",
                    color: "#9b9b9bff",
                    fontSize: "12px",
                  }}
                >
                    Enter New Password
                </Typography>
              </Box>

              {/* Password */}
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
                      marginBottom:"60px"
                  }}
                >
                  Confrim Your New Password
                </Typography>
              </Box>

             

              {/* Login button */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                
                                  component={RouterLink}
                                   to="/  "
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#484848",
                    color: "#ffffff",
                    height: "48px",
                    borderRadius: "4px",
                    textTransform: "none",
                    fontSize: "16px",
                    width: "300px",
                    fontWeight: "normal",
                    "&:hover": {
                      backgroundColor: "#3a3a3a",
                    },
                  }}
                >
                  Change Password
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
