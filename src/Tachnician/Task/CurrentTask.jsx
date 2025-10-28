import { useState } from "react";
import Navbar from "../../componts/TachnicanNavbar.jsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


// Sample data

export default function ManageEnquiry() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");



  return (
    <>
      <Navbar />
      <Box minHeight="100vh" bgcolor="#fff" display="flex" gap={3}>
        <Box sx={{ width: "250px", height: "100px" }} />

        <Box sx={{ m: 0, p: 0 }}>
          <Typography
            color="rgb(0,0,0)"
            sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "500" }}
          >
            Current Tasks
          </Typography>

          {/* --- Filter Card --- */}
          <Card
            elevation={0}
            sx={{ display: "flex", height: "60px", mt: 0, boxShadow: "none" }}
          >
            <CardContent
              sx={{
                width: "1195px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: 0,
                "&:last-child": { pb: 0 },
              }}
            >
              <Box display="flex" gap={2} alignItems="center">
                

                {/* City */}
                <FormControl sx={{ width: "100px" }} size="small">
                  <InputLabel>City</InputLabel>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    label="City"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Brooklyn">Brooklyn</MenuItem>
                    <MenuItem value="Queens">Queens</MenuItem>
                    <MenuItem value="Manhattan">Manhattan</MenuItem>
                    <MenuItem value="Bronx">Bronx</MenuItem>
                  </Select>
                </FormControl>

                {/* Date */}
                <FormControl
                  sx={{ width: "100px", borderRadius: "10px" }}
                  size="small"
                >
                  <InputLabel>Date</InputLabel>
                  <Select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    label="Date"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="last-7-days">Last 7 Days</MenuItem>
                    <MenuItem value="last-30-days">Last 30 Days</MenuItem>
                  </Select>
                </FormControl>

                {/* Search */}
                <TextField
                  sx={{ width: "200px" }}
                  size="small"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search style={{ marginRight: 8 }} />,
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          <Box display='flex' gap="40px" sx={{m:2,ml:5}}>
          {/* card 1 */}

          <Grid sx={{ width: "350px" }} item xs={12} md={6}>
                       
          
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
                            <Box >
                            <Typography sx={{fontSize:"18px",fontWeight:600}}>Task Id</Typography>
                            <Typography sx={{fontSize:"14px"}}>Assign Date</Typography>
                            </Box>

                              <Box sx={{ borderRadius:"18px",p:2,mt:1,bgcolor:"white",color:"#029898",display:"flex",alignItems:"center",justifyContent:"center",width:"150px",height:"20px"  }}>
                                                <Typography sx={{fontSize:"12px"}}>10 Hr 30 mints left</Typography>
                                              </Box>
                            </Box>
          
                          <Box sx={{ p: 2, pb: 0 }}>
                            
          
                            <Box sx={{ height: "100px" ,mb:1}}>
                              {/* Row 1 */}
                              <Box sx={{ display: "flex", pb: 1,justifyContent:"space-between" }}>
                                <Typography fontSize="14px">Name</Typography>
                               
                               <IconButton size="small" >
                            <Eye size={22} />
                          </IconButton>
                                
                              </Box>
          
                              {/* Row 2 */}
                              <Box sx={{ display: "flex", pb: 2 }}>
                                <Typography fontSize="14px">Address</Typography>
                              
                                
                              </Box>
          
                              {/* Row 3 */}
                              <Box sx={{ display: "flex" }}>
                                <Typography fontSize="14px">Ctiy</Typography>
                               
                              </Box>
                            </Box>
                          </Box>
                          <Divider />
          
                          {/* Contact Details */}
                          <Box >
                          
                            <Box sx={{ display: "flex", pl: 2, py: 1.5, gap:18 }}>
                              <Typography fontSize="14px">Email</Typography>
                              <Typography fontSize="14px">Mobile</Typography>
                            
                           
                            </Box>
                          </Box>
          
                          {/* Service Details */}
                          <Divider />
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize:"14px", pl: 2, py: 1.5, borderRadius: 1 }}
                          >
                           Total Square Feet
                          </Typography>
          
                          
                          <Divider />
          
                          <Box display="flex" sx={{ p: 2, pt: 1, pb: 0 }}>
                            <Typography sx={{ fontWeight: 600, pr: 11.5 ,fontSize:"13px"}}>Prefer Date</Typography>
                            <Typography sx={{ fontWeight: 600, pr: 2,fontSize:"13px" }}>Prefer Time</Typography>
                          </Box>
          
                         
          
          
                          {/* Action Buttons */}
                         
                        </CardContent>
                      </Grid>

                      {/* card 2 */}

<Grid sx={{ width: "350px" }} item xs={12} md={6}>
                       
          
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
                            <Box >
                            <Typography sx={{fontSize:"18px",fontWeight:600}}>Task Id</Typography>
                            <Typography sx={{fontSize:"14px"}}>Assign Date</Typography>
                            </Box>

                              <Box sx={{ borderRadius:"18px",p:2,mt:1,bgcolor:"white",color:"#029898",display:"flex",alignItems:"center",justifyContent:"center",width:"150px",height:"20px"  }}>
                                                <Typography sx={{fontSize:"12px"}}>1 Hr 44 mints left</Typography>
                                              </Box>
                            </Box>
          
                          <Box sx={{ p: 2, pb: 0 }}>
                            
          
                            <Box sx={{ height: "100px",mb:1 }}>
                              {/* Row 1 */}
                              <Box sx={{ display: "flex", pb: 1,justifyContent:"space-between" }}>
                                <Typography fontSize="14px">Name</Typography>
                               
                               <IconButton size="small" >
                            <Eye size={22} />
                          </IconButton>
                                
                              </Box>
          
                              {/* Row 2 */}
                              <Box sx={{ display: "flex", pb: 2 }}>
                                <Typography fontSize="14px">Address</Typography>
                              
                                
                              </Box>
          
                              {/* Row 3 */}
                              <Box sx={{ display: "flex" }}>
                                <Typography fontSize="14px">Ctiy</Typography>
                               
                              </Box>
                            </Box>
                          </Box>
                          <Divider />
          
                          {/* Contact Details */}
                          <Box >
                          
                            <Box sx={{ display: "flex", pl: 2, py: 1.5, gap:18 }}>
                              <Typography fontSize="14px">Email</Typography>
                              <Typography fontSize="14px">Mobile</Typography>
                            
                           
                            </Box>
                          </Box>
          
                          {/* Service Details */}
                          <Divider />
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize:"14px", pl: 2, py: 1.5, borderRadius: 1 }}
                          >
                           Total Square Feet
                          </Typography>
          
                          
                          <Divider />
          
                          <Box display="flex" sx={{ p: 2, pt: 1, pb: 0 }}>
                            <Typography sx={{ fontWeight: 600, pr: 11.5 ,fontSize:"13px"}}>Prefer Date</Typography>
                            <Typography sx={{ fontWeight: 600, pr: 2,fontSize:"13px" }}>Prefer Time</Typography>
                          </Box>
          
                         
          
          
                          {/* Action Buttons */}
                         
                        </CardContent>
                      </Grid>

                       {/* card 3 */}

          <Grid sx={{ width: "350px" }} item xs={12} md={6}>
                       
          
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
                            <Box >
                            <Typography sx={{fontSize:"18px",fontWeight:600}}>Task Id</Typography>
                            <Typography sx={{fontSize:"14px"}}>Assign Date</Typography>
                            </Box>

                               <Box sx={{ borderRadius:"18px",p:2,mt:1,bgcolor:"white",color:"#029898",display:"flex",alignItems:"center",justifyContent:"center",width:"150px",height:"20px"  }}>
                                                <Typography sx={{fontSize:"12px"}}>2 Days left</Typography>
                                              </Box>
                            </Box>
          
                          <Box sx={{ p: 2, pb: 0 }}>
                            
          
                            <Box sx={{ height: "100px",mb:1 }}>
                              {/* Row 1 */}
                              <Box sx={{ display: "flex", pb: 1,justifyContent:"space-between" }}>
                                <Typography fontSize="14px">Name</Typography>
                               
                               <IconButton size="small"color="#883f3fff" >
                            <Eye size={22}  />
                          </IconButton>
                                
                              </Box>
          
                              {/* Row 2 */}
                              <Box sx={{ display: "flex", pb: 2 }}>
                                <Typography fontSize="14px">Address</Typography>
                              
                                
                              </Box>
          
                              {/* Row 3 */}
                              <Box sx={{ display: "flex" }}>
                                <Typography fontSize="14px">Ctiy</Typography>
                               
                              </Box>
                            </Box>
                          </Box>
                          <Divider />
          
                          {/* Contact Details */}
                          <Box >
                          
                            <Box sx={{ display: "flex", pl: 2, py: 1.5, gap:18 }}>
                              <Typography fontSize="14px">Email</Typography>
                              <Typography fontSize="14px">Mobile</Typography>
                            
                           
                            </Box>
                          </Box>
          
                          {/* Service Details */}
                          <Divider />
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize:"14px", pl: 2, py: 1.5, borderRadius: 1 }}
                          >
                           Total Square Feet
                          </Typography>
          
                          
                          <Divider />
          
                          <Box display="flex" sx={{ p: 2, pt: 1, pb: 0 }}>
                            <Typography sx={{ fontWeight: 600, pr: 11.5 ,fontSize:"13px"}}>Prefer Date</Typography>
                            <Typography sx={{ fontWeight: 600, pr: 2,fontSize:"13px" }}>Prefer Time</Typography>
                          </Box>
          
                         
          
          
                          {/* Action Buttons */}
                         
                        </CardContent>
                      </Grid>
                       {/* card 1 */}

          



                      </Box>
         
        </Box>
      </Box>
    </>
  );
}
