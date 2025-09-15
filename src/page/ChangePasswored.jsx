// src/pages/ChangePassword.js
import React from "react";
import Navbar from "../componts/Navbar.jsx";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const ChangePassword = () => {
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
        <Box sx={{ flex: 1, p: 4 ,pt: 0,}}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
            Change Password
          </Typography>

          {/* Form Card */}
         
          <Paper
            sx={{
              width: { xs: "100%", sm: "380px" },
            
              borderRadius: "8px",
              boxShadow:8
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
              InputProps={{
                disableUnderline: true,
                sx: {
                  bgcolor: "#e0e0e0",
                  borderRadius: "4px",
                  height: "40px",
                  pb:1.5
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
              InputProps={{
                disableUnderline: true,
                sx: {
                  bgcolor: "#e0e0e0",
                  borderRadius: "4px",
                  height: "40px",
                  pb:1.5
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
              InputProps={{
                disableUnderline: true,
                sx: {
                  bgcolor: "#e0e0e0",
                  borderRadius: "4px",
                  height: "40px",
                  pb:1.5
                },
              }}
            />
            </Box>

           {/* Divider between password fields and buttons */}
<Divider sx={{ my: 0, width: "100%", bgcolor: "grey.400" }} />


            {/* Buttons */}
                <Box  sx={{p:2,px:3}}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#029898",
                color: "#fff",
                height: "44px",
                borderRadius: "4px",
                textTransform: "none",
                mb: 2,
                "&:hover": { bgcolor: "#09d1d1ff" },
              }}
            >
              Change Password
            </Button>

            <Button
              fullWidth
              variant="outlined"
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
