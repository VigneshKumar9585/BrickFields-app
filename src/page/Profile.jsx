import React from "react";
import Navbar from "../componts/Navbar.jsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

function Dashboard() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100%",
        }}
      >
        {/* Sidebar */}
        <Box sx={{ width: "400px" }} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Page Title */}
          <Box
            sx={{
              display: "grid",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Typography
              color="rgb(0,0,0)"
              sx={{
                fontSize: { xs: "20px", md: "24px" },
                pl: 5,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Profile
            </Typography>
          </Box>

          {/* Personal Data Section */}
          <Card
            sx={{
              bgcolor: "hsl(var(--dashboard-card))",
              boxShadow: "0 1px 3px hsl(var(--dashboard-card-shadow))",
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "hsl(var(--muted-foreground))" }}
                >
                  Personal Data
                </Typography>
                <IconButton size="small">
                  <Edit sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                {[
                  "Name",
                  "Mobile No",
                  "Email ID",
                  "Address",
                  "Country",
                  "State",
                  "City",
                  "Role",
                ].map((field, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "hsl(var(--muted-foreground))" }}
                    >
                      {field}
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "hsl(var(--muted))",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Document Data Section */}
          <Card
            sx={{
              bgcolor: "hsl(var(--dashboard-card))",
              boxShadow: "0 1px 3px hsl(var(--dashboard-card-shadow))",
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "hsl(var(--muted-foreground))" }}
                >
                  Document Data
                </Typography>
                <IconButton size="small">
                  <Edit sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                {["Adhaar Card", "Degree Certificate", "Experience Certificate"].map(
                  (field, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, color: "hsl(var(--muted-foreground))" }}
                      >
                        {field}
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "hsl(var(--muted))",
                            "& fieldset": { border: "none" },
                          },
                        }}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Social Media Platforms Section */}
          <Card
            sx={{
              bgcolor: "hsl(var(--dashboard-card))",
              boxShadow: "0 1px 3px hsl(var(--dashboard-card-shadow))",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "hsl(var(--muted-foreground))",
                  mb: 3,
                }}
              >
                Social Media Platforms
              </Typography>
              <Grid container spacing={3}>
                {["Instagram", "Youtube", "Linkedin"].map((field, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "hsl(var(--muted-foreground))" }}
                    >
                      {field}
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "hsl(var(--muted))",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
