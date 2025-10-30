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
} from "@mui/material";

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
          <Grid container spacing={3}>
            {/* Left Section */}
                       <Grid sx={{ width: "400px" }} item xs={12} md={6}>
                         <Typography variant="h6" sx={{ mb: 6.3, fontWeight: "600" }}>
                           Current Task Details
                         </Typography>
           
                         <CardContent
                           sx={{
                             border: "1px solid #abababff",
                             borderRadius: "14px",
                             p: 0,
                             boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
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
                                 <Typography fontSize="14px">Name:</Typography>
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
                                 <Typography fontSize="14px">Country:</Typography>
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
                                 <Typography fontSize="14px">State:</Typography>
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
                                 <Typography fontSize="14px">Region:</Typography>
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
                                 <Typography fontSize="14px">Address:</Typography>
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
                               <Typography fontSize="14px">Mobile:</Typography>
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
                               <Typography fontSize="14px">Email:</Typography>
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
                             sx={{ fontWeight: 600, pl: 2, pt: 1, borderRadius: 1 }}
                           >
                             Service Details
                           </Typography>
           
                           <Box sx={{ display: "flex", py: 1, px: 2 }}>
                             <Typography fontSize="14px">Service:</Typography>
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
                             <Typography fontSize="14px">Sq.Feet:</Typography>
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
                             <Typography sx={{ fontWeight: 600, pr: 2 }}>Prefer Time:</Typography>
                           </Box>
           
                           <Box display="flex" sx={{ p: 2, pt: 0 }}>
                             <Typography fontSize="12px" sx={{ pr: 11.5 }}>
                               Morning (11 AM)
                             </Typography>
                             <Typography fontSize="12px">Aug 25, Wed</Typography>
                           </Box>
           
                         </CardContent>
                       </Grid>
            {/* Right Section */}
            <Grid sx={{ width: "750px" }} item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    bgcolor: "#029898",
                    color: "#ffffffff",
                    width: "180px",
                    height: "42px",
                  }}
                >
                  Start Work
                </Button>
              </Box>

              {/* Add Images Section */}
              <CardContent
                sx={{
                  my: 2,
                  border: "1px solid #abababff",
                  borderRadius: "14px",
                  p: 0,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                  overflow: "hidden",
                  height: "435px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    bgcolor: "#029898",
                    color: "#fff",
                    px: 2,
                    py: 1.1,
                    borderRadius: "8px 8px 0 0",
                    boxShadow: 3,
                  }}
                >
                  <Typography>Add Images</Typography>
                </Box>

                {/* BEFORE IMAGES */}
                <Box sx={{ display: "grid", gap: 2, my: 2, mx: 1, bgcolor: "#f0ededff", borderRadius: "14px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1.5, px: 2 }}>
                    <Typography>Add Equipment Images ( Before State )</Typography>
                    <Typography
                      onClick={() => document.getElementById("before-upload").click()}
                      sx={{
                        fontWeight: 500,
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#000000ff",
                      }}
                    >
                      + Add
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
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2 }}>
                    {beforeImages.map((src, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 60,
                          height: 60,
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <img src={src} alt={`before-${i}`} width="60" height="60" />
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* AFTER IMAGES */}
                <Box sx={{ display: "grid", gap: 2, my: 2, mx: 1, bgcolor: "#dfddddff", borderRadius: "14px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1.5, px: 2 }}>
                    <Typography>Add Equipment Images ( After State )</Typography>
                    <Typography
                      onClick={() => document.getElementById("after-upload").click()}
                      sx={{
                        fontWeight: 500,
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#000000ff",
                      }}
                    >
                      + Add
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
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2 }}>
                    {afterImages.map((src, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 60,
                          height: 60,
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <img src={src} alt={`after-${i}`} width="60" height="60" />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
