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

const LoginCard = () => {
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
            height: "270px",
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
                  Email*
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
                    
                    marginTop: "8px",
                    marginBottom: "50px",
                    color: "#9b9b9bff",
                    fontSize: "12px",
                  }}
                >
                  Please Enter A Email
                </Typography>
              </Box>


              {/* Login button */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  component={RouterLink}
                   to="/reset-password"
                
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
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginCard;
