// src/pages/KitchenChecklist.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Checkbox,
  Button,
  IconButton,
  Paper,
  CardContent,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Navbar from "../../componts/TachnicanNavbar";

const KitchenChecklist = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleSaveClick = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex", minHeight: "100vh", p: 4 }}>
        {/* Sidebar space */}
        <Box
          sx={{
            width: "260px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            p: 3,
            mb: 0,
          }}
        ></Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Checklist{" "}
            <Typography component="span" color="grey">
              | Kitchen
            </Typography>
          </Typography>

          {/* Card Container */}
          <Box
            sx={{
              border: "3px solid #c8c4c4ff",
              borderRadius: "14px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              width: "full",
              height: "885px",
            }}
          >
            <CardContent sx={{ p: 0, m: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  bgcolor: "#ffffffff",
                  fontFamily: "Arial, sans-serif",
                  borderRadius: 2,
                }}
              >
                {/* Sidebar */}
                <Box
                  sx={{
                    width: "260px",
                    bgcolor: "#029898",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRight: "1px solid #ccc",
                    borderRadius: "11px 0 0 14px",
                  }}
                >
                  <Box sx={{ pl: 3, pt: 2, height: "700px" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#b0b0b0",
                        mb: 1,
                        fontWeight: "bold",
                      }}
                    >
                      General
                    </Typography>

                    <List sx={{ pl: 1 }}>
                      <ListItemButton sx={{ pl: 0 }}>
                        <ListItemText
                          primary="Kitchen"
                          primaryTypographyProps={{ color: "#fff" }}
                        />
                        <AddIcon sx={{ color: "#fff", fontSize: 18 }} />
                      </ListItemButton>

                      {[
                        "Platform",
                        "Sink",
                        "Cabinets",
                        "Electrical Points",
                        "Chimney",
                        "Ventilation",
                      ].map((item) => (
                        <ListItemText
                          key={item}
                          primary={item}
                          primaryTypographyProps={{
                            color: "#b0b0b0",
                            pl: 3,
                          }}
                        />
                      ))}

                      {["Bed Room", "Living Room", "Portico", "Master Bed .."].map(
                        (room) => (
                          <ListItemButton key={room} sx={{ pl: 0 }}>
                            <ListItemText
                              primary={room}
                              primaryTypographyProps={{ color: "#fff" }}
                            />
                            <AddIcon sx={{ color: "#fff", fontSize: 18 }} />
                          </ListItemButton>
                        )
                      )}
                    </List>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#029898",
                      borderRadius: "0 0 0 12px",
                      mt: 5,
                    }}
                  >
                    <Box sx={{ bgcolor: "#fff", borderRadius: "14px" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "center",
                          color: "#0e0a0aff",
                          p: 1,
                        }}
                      >
                        Total Completion
                      </Typography>
                      <Divider />
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          color: "#160909ff",
                          fontWeight: "bold",
                          fontSize: 45,
                        }}
                      >
                        0%
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Right Section */}
                <Box sx={{ flex: 1, p: 3 }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {/* Left Panels */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {/* Pipeline Condition */}
                      <Paper
                        variant="outlined"
                        sx={{ borderRadius: "8px", bgcolor: "#fff" }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            borderRadius: "8px 8px 0 0 ",
                            color: "#fff",
                            fontWeight: "bold",
                            mb: 1,
                            bgcolor: "#029898",
                            py: 1,
                            px: 2,
                          }}
                        >
                          Pipeline Condition
                        </Typography>
                        <Box display="flex" gap="125px" px={2} mb={2}>
                          <Typography variant="body2">Area</Typography>
                          <Typography variant="body2">At Main</Typography>
                        </Box>
                        <Box display="flex" gap="50px" px={2} mb={2}>
                          <Typography variant="body2">What To Check</Typography>
                          <Typography variant="body2">
                            Compare With Reference Value
                          </Typography>
                        </Box>
                        <Box display="flex" gap="100px" px={2} mb={2}>
                          <Typography variant="body2">Method</Typography>
                          <Typography variant="body2">
                            Check During High Usage Period
                          </Typography>
                        </Box>
                      </Paper>

                      {/* Severity */}
                      <Paper
                        variant="outlined"
                        sx={{ borderRadius: "8px", bgcolor: "#fff" }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            borderRadius: "8px 8px 0 0 ",
                            color: "#fff",
                            fontWeight: "bold",
                            mb: 1,
                            bgcolor: "#029898",
                            py: 1,
                            px: 2,
                          }}
                        >
                          Severity
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={1}>
                          {["Green", "Yellow", "Red"].map((color) => (
                            <Box
                              key={color}
                              display="flex"
                              justifyContent={"space-between"}
                              gap={1}
                              px={3}
                            >
                              <Typography variant="body2">{color}</Typography>
                              <Checkbox size="small" />
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    </Box>

                    {/* Right Panels */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {/* Add Image */}
                      <Paper
                        variant="outlined"
                        sx={{ borderRadius: "8px", bgcolor: "#fff" }}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                          sx={{
                            borderRadius: "8px 8px 0 0 ",
                            color: "#fff",
                            fontWeight: "bold",
                            bgcolor: "#029898",
                            py: 1,
                            px: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Add Image
                          </Typography>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{
                              backgroundColor: "#ffffffff",
                              color: "#000000ff",
                              textTransform: "none",
                              "&:hover": { backgroundColor: "#42c0c0ff" },
                            }}
                            startIcon={<AddIcon />}
                          >
                            Add
                          </Button>
                        </Box>

                        <Box display="flex" gap={2} p={3}>
                          {[1, 2, 3, 4].map((i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 60,
                                height: 60,
                                bgcolor: "#eee",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: "-8px",
                                  right: "-8px",
                                  bgcolor: "#000",
                                  color: "#fff",
                                  p: "2px",
                                  "&:hover": { bgcolor: "#444" },
                                }}
                              >
                                <CloseIcon sx={{ fontSize: 12 }} />
                              </IconButton>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "100%",
                                }}
                              >
                                <ImageIcon
                                  sx={{ color: "#9e9e9e", fontSize: 28 }}
                                />
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Paper>

                      {/* Add Notes */}
                      <Paper
                        variant="outlined"
                        sx={{
                          borderRadius: "8px",
                          bgcolor: "#fff",
                          flexGrow: 1,
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          mb={1}
                          sx={{
                            borderRadius: "8px 8px 0 0 ",
                            color: "#fff",
                            fontWeight: "bold",
                            bgcolor: "#029898",
                            py: 1,
                            px: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", flexGrow: 1 }}
                          >
                            Add Notes
                          </Typography>
                          <Checkbox color="#fff" size="small" />
                          <Typography variant="body2">
                            Equipment Needs
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            height: "60%",
                            m: 1,
                          }}
                        />
                      </Paper>
                    </Box>
                  </Box>

                  {/* Buttons */}
                  <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                    <Button
                      variant="outlined"
                      sx={{
                        width: 120,
                        borderColor: "#999",
                        color: "#333",
                        textTransform: "none",
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: 120,
                        bgcolor: "#029898",
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": { bgcolor: "#028888ff" },
                      }}
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Box>
      </Box>

      {/* ✅ Popup Modal */}
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            width: "820px",
            textAlign: "center",
            p: 3,
          },
        }}
      >
        <DialogContent>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 70,
              color: "#000000ff",
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: 500, color: "#000000" }}
          >
            All The Category Below The Checklist Are Scanned
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#029898",
              color: "#fff",
              width: "50%",
              textTransform: "none",
              "&:hover": { bgcolor: "#038383ff" },
            }}
            onClick={handleClosePopup}
          >
            Complete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KitchenChecklist;
