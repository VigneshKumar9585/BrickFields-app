// src/pages/Dashboard.js
import React from "react";
import Navbar from "../componts/Navbar.jsx";
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Divider,
  TextField,
  MenuItem,
  Avatar,
  IconButton,
  InputAdornment,
  Checkbox,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Dummy LSP Data
const partners = [
  { name: "LSP Name", tasks: "36 Profiled Task", technicians: 20, status: "Currently No Task" },
  { name: "LSP Name", tasks: "21 Profiled Task", technicians: 16, status: "Currently No Task" },
  { name: "LSP Name", tasks: "6 Profiled Task", technicians: 8, status: "Currently No Task" },
  { name: "LSP Name", tasks: "12 Profiled Task", technicians: 13, status: "Currently No Task" },
  { name: "LSP Name", tasks: "28 Profiled Task", technicians: 15, status: "On Processing" },
];

function Dashboard() {
  const [date, setDate] = React.useState(null);

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
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
            Edit Assign Local Service Partnar
          </Typography>

          <Grid container spacing={3}>
            <Box  sx={{
                border: "3px solid #c8c4c4ff",
                borderRadius: "14px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              }}>
            <Box
              display="flex"
              gap={3}
              sx={{p:2}}
            >
              {/* Left Section */}
              <Grid sx={{ width: "400px" }} item xs={12} md={6}>
                <CardContent
                  sx={{
                    border: "3px solid #c8c4c4ff",
                    borderRadius: "14px",
                    p: 0,
                    overflow: "hidden",
                  }}
                >
                  {/* Visitor Details */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      bgcolor: "#029898",
                      color: "#fff",
                      px: 2,
                      py: 1,
                      borderRadius: "8px 8px 0 0",
                      boxShadow: 3,
                    }}
                  >
                    <Typography>Task Id</Typography>
                    <Typography>Assigned Date</Typography>
                  </Box>

                  <Box sx={{ p: 2, pb: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      Visitor Details
                    </Typography>

                    <Box sx={{ height: "100px" }}>
                      {/* Row 1 */}
                      <Box sx={{ display: "flex", pb: 2 }}>
                        <Typography fontSize={"14px"}>Name:</Typography>
                        <TextField
                          variant="outlined"
                          sx={{
                            width: "140px",
                            pl: 2.5,
                            pr: 0.5,
                            "& .MuiInputBase-root": { height: 20 },
                            "& input": { p: 0.5, fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          }}
                        />
                        <Typography fontSize={"14px"}>Country:</Typography>
                        <TextField
                          variant="outlined"
                          sx={{
                            width: "140px",
                            pl: 1,
                            "& .MuiInputBase-root": { height: 20 },
                            "& input": { p: 0.5, fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          }}
                        />
                      </Box>

                      {/* Row 2 */}
                      <Box sx={{ display: "flex", pb: 2 }}>
                        <Typography fontSize={"14px"}>State:</Typography>
                        <TextField
                          variant="outlined"
                          sx={{
                            width: "140px",
                            pl: 3.2,
                            pr: 0.5,
                            "& .MuiInputBase-root": { height: 20 },
                            "& input": { p: 0.5, fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          }}
                        />

                        <Typography fontSize={"14px"}>Region:</Typography>
                        <TextField
                          variant="outlined"
                          sx={{
                            width: "140px",
                            pl: 1.8,
                            "& .MuiInputBase-root": { height: 20 },
                            "& input": { p: 0.5, fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          }}
                        />
                      </Box>

                      {/* Row 3 */}
                      <Box sx={{ display: "flex" }}>
                        <Typography fontSize={"14px"}>Address:</Typography>
                        <TextField
                          variant="outlined"
                          sx={{
                            width: "300px",
                            pl: 0.7,
                            "& .MuiInputBase-root": { height: 20 },
                            "& input": { p: 0.5, fontSize: "12px" },
                            "& fieldset": { border: "none" },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Contact Details */}
                  <Box sx={{ bgcolor: "#f5f5f5" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        bgcolor: "#f5f5f5",
                        pl: 2,
                        pt: 1,
                        borderRadius: 1,
                      }}
                    >
                      Contact Details
                    </Typography>
                    <Box sx={{ display: "flex", py: 1, px: 2 }}>
                      <Typography fontSize={"14px"}>Mobile:</Typography>
                      <TextField
                        variant="outlined"
                        sx={{
                          width: "140px",
                          pl: 3.2,
                          pr: 0.5,
                          "& .MuiInputBase-root": { height: 20 },
                          "& input": { p: 0.5, fontSize: "12px" },
                          "& fieldset": { border: "none" },
                        }}
                      />
                      <Typography fontSize={"14px"}>Email:</Typography>
                      <TextField
                        variant="outlined"
                        sx={{
                          width: "140px",
                          pl: 1.8,
                          "& .MuiInputBase-root": { height: 20 },
                          "& input": { p: 0.5, fontSize: "12px" },
                          "& fieldset": { border: "none" },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Service Details */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      pl: 2,
                      pt: 1,
                      borderRadius: 1,
                    }}
                  >
                    Service Details
                  </Typography>

                  <Box sx={{ display: "flex", py: 1, px: 2 }}>
                    <Typography fontSize={"14px"}>Service:</Typography>
                    <TextField
                      variant="outlined"
                      sx={{
                        width: "140px",
                        pl: 3.2,
                        pr: 0.5,
                        "& .MuiInputBase-root": { height: 20 },
                        "& input": { p: 0.5, fontSize: "12px" },
                        "& fieldset": { border: "none" },
                      }}
                    />
                    <Typography fontSize={"14px"}> Sq.Feet:</Typography>
                    <TextField
                      variant="outlined"
                      sx={{
                        width: "140px",
                        pl: 1.8,
                        "& .MuiInputBase-root": { height: 20 },
                        "& input": { p: 0.5, fontSize: "12px" },
                        "& fieldset": { border: "none" },
                      }}
                    />
                  </Box>

                  <Box display="flex" sx={{ p: 2, pt: 1, pb: 1 }}>
                    <Typography sx={{ fontWeight: 600, pr: 11.5 }}>Prefer Date:</Typography>
                    <Typography sx={{ fontWeight: 600, pr: 2 }}>Prefer Time: </Typography>
                  </Box>
                  <Box display="flex" sx={{ p: 2, pb: 0, pt: 0 }}>
                    <Typography fontSize="12px" sx={{ pr: 11.5 }}>
                      Morning (11 AM)
                    </Typography>
                    <Typography fontSize="12px"> Aug 25, Wed</Typography>
                  </Box>
                </CardContent>
              </Grid>

              {/* Right Section */}
              <Grid sx={{ width: "720px" }} item xs={12} md={6}>
                {/* Partner List */}
                <CardContent
                  sx={{
                    mb: 2,
                    border: "3px solid #c8c4c4ff",
                    borderRadius: "14px",
                    p: 0,
                    overflow: "hidden",
                  }}
                >
                  <Grid container spacing={2} sx={{ pl: 2, pt: 2 }}>
                    <Grid item xs={12} sm={4}>
                      <TextField select label="District" sx={{ width: "180px" }}>
                        <MenuItem value="District">District</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField label="City" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField label="Pincode" />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mx: 2, gap: 2 }}>
                    <TextField select label="Task Assign" sx={{ width: "200px" }}>
                      <MenuItem value="TaskAssign">Task Assign</MenuItem>
                    </TextField>

                    <TextField
                      placeholder="Search"
                      sx={{ width: "200px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {/* Partner List with Checkbox */}
                  {partners.map((p, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar />
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Region
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {p.status}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {p.tasks}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body2">Mobile No</Typography>
                        <Typography variant="body2">{p.technicians} Technicians</Typography>
                        {/* ✅ Checkbox instead of Assign Button */}
                        <Checkbox
                          color="primary"
                          sx={{
                            "& .MuiSvgIcon-root": { fontSize: 28 },
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </CardContent>
                   
              </Grid>
              </Box>
              <Divider></Divider>
               <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          p:3
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width:"200px",
            color: "#666",
            borderColor: "#a5a3a3ff",
            "&:hover": { borderColor: "#999", backgroundColor: "#f5f5f5" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            width:"200px",
            backgroundColor: "#029898",
            "&:hover": { backgroundColor: "#15c0c0ff" },
          }}
        >
          Update
        </Button>
      </Box>
              
            </Box>
           
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
