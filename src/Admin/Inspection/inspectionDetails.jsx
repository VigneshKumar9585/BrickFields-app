  // src/pages/Dashboard.jsx
  import React, { useState } from "react";
  import Navbar from "../../componts/AdminNavbar";
  import {
    Box,
    Typography,
    Grid,
    Divider,
    Avatar,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    IconButton,
    Chip,
    TextField,
    Stack,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";



  function Dashboard() {
    const [activeTab, setActiveTab] = useState("Task Details");
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Dummy selectedTask data for example
    const selectedTask = {
      id: "T12345",
      name: "John Doe",
      address: "123 Main Street",
      email: "john@example.com",
      mobile: "+1234567890",
      district: "Central",
      city: "Metropolis",
      assignDate: "2025-10-16",
      totalSqFeet: 1200,
    };

    // === New state & logic for Checklist section per your request ===
    // sections that appear on the right panel (kept as in your provided code)
    const sections = [
      "General",
      "Kitchen",
      "Bed Room",
      "Living Room",
      "Portico",
      "Master Bed 1 + Bathroom 1",
    ];

    // Keep track of exactly one selected section (only one open at a time)
    const [selectedSection, setSelectedSection] = useState("General");

    // Checklist rows per section (you can replace with API data later)
    const defaultRows = [
      {
        sl: 1,
        category: "Floor",
        issue: "Crack near corner",
        severity: "Red",
        reference: null,
        recommended: "Replace tiles",
      },
      {
        sl: 2,
        category: "Wall",
        issue: "Peeling paint",
        severity: "Yellow",
        reference: null,
        recommended: "Repaint",
      },
      {
        sl: 3,
        category: "Sink",
        issue: "Loose fitting",
        severity: "Green",
        reference: null,
        recommended: "Tighten screws",
      },
    ];

    // store rows keyed by section (so each section has its own rows)
    const [sectionRows, setSectionRows] = useState(() => {
      const map = {};
      sections.forEach((s) => {
        // clone default rows for each section
        map[s] = defaultRows.map((r) => ({ ...r }));
      });
      return map;
    });

    // remarks per section
    const [remarks, setRemarks] = useState(() => {
      const map = {};
      sections.forEach((s) => (map[s] = []));
      return map;
    });

    // remarks input value per section
    const [remarkInput, setRemarkInput] = useState(() => {
      const map = {};
      sections.forEach((s) => (map[s] = ""));
      return map;
    });

    // When a section is clicked: make it the single selected one and open Checklist tab
    const handleSectionClick = (name) => {
      setSelectedSection(name); // only one open at a time
      setActiveTab("Checklist"); // automatically open Checklist
    };

    const handleAddRemark = (section) => {
      const text = (remarkInput[section] || "").trim();
      if (!text) return;
      setRemarks((prev) => ({
        ...prev,
        [section]: [{ text, date: new Date().toLocaleString() }, ...prev[section]],
      }));
      setRemarkInput((prev) => ({ ...prev, [section]: "" }));
    };

    // helper to render severity chip
    const SeverityChip = ({ severity }) => {
      const color =
        severity === "Red" ? "#e57373" : severity === "Yellow" ? "#ffd54f" : "#81c784";
      const textColor = severity === "Yellow" ? "#000" : "#fff";
      return (
        <Chip
          label={severity}
          size="small"
          sx={{
            bgcolor: color,
            color: textColor,
            fontWeight: 600,
            height: 26,
            borderRadius: "6px",
          }}
        />
      );
    };

    // Section detail component (renders table + remarks for a section)
    const SectionDetail = ({ name }) => {
      const rows = sectionRows[name] || [];

      return (
        <Box
          sx={{
            mt: 2,
            mb: 2,
            borderRadius: "12px",
            border: "1px solid #d3d3d3",
            p: 2,
            bgcolor: "#fff",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            {name} - Checklist
          </Typography>

         <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: 2 }}>
  <Table size="small">
    <TableHead>
      <TableRow sx={{ bgcolor: "#029898" }}>
        {[
          "Sl No",
          "Category",
          "Issue",
          "Severity Color",
          "Reference Photo",
          "Recommend Action",
        ].map((h, idx) => (
          <TableCell
            key={idx}
            sx={{ fontWeight: 700, color: "white" }} // ✅ White font for header
          >
            {h}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((r) => (
        <TableRow key={r.sl}>
          <TableCell>{r.sl}</TableCell>
          <TableCell>{r.category}</TableCell>
          <TableCell>{r.issue}</TableCell>
          <TableCell>
            <SeverityChip severity={r.severity} />
          </TableCell>
          <TableCell>
            <Box
              sx={{
                width: 90,
                height: 50,
                border: "1px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
              }}
            >
              Photo
            </Box>
          </TableCell>
          <TableCell>{r.recommended}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


          {/* Remarks area */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Remarks</Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <TextField
                value={remarkInput[name] || ""}
                onChange={(e) => setRemarkInput((prev) => ({ ...prev, [name]: e.target.value }))}
                placeholder={`Add remark for ${name}`}
                size="small"
                fullWidth
              />
              <Button variant="contained" onClick={() => handleAddRemark(name)} sx={{bgcolor:"#029898"}}>
                Add
              </Button>
            </Stack>

            <Box>
              {(remarks[name] || []).length === 0 ? (
                <Typography color="text.secondary">No remarks yet.</Typography>
              ) : (
                <Stack spacing={1}>
                  {remarks[name].map((rmk, idx) => (
                    <Paper
                      key={idx}
                      elevation={0}
                      sx={{ p: 1.5, borderRadius: 1, border: "1px solid #e0e0e0" }}
                    >
                      <Typography sx={{ fontSize: 13 }}>{rmk.text}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {rmk.date}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
        </Box>
      );
    };

    // ==================================================================

    return (
      <>
        <Navbar />

        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
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
          <Box sx={{ flex: 1, p: 4, pt: 2, pb: 0 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
              Inspection Details
            </Typography>

            <Grid container spacing={3}>
              <Box
                sx={{
                  border: "3px solid #c8c4c4ff",
                  borderRadius: "14px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                  width: "100%",
                  m: 0,
                }}
              >
                {/* Button Tabs */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    px: 3,
                    bgcolor: "#029898",
                    borderRadius: "12px 12px 0 0",
                  }}
                >
                  {["Task Details", "Status Line", "Checklist"].map((tab) => (
                    <Button
                      key={tab}
                      variant={activeTab === tab ? "contained" : "outlined"}
                      onClick={() => setActiveTab(tab)}
                      sx={{
                        borderRadius: "25px",
                        textTransform: "none",
                        bgcolor: activeTab === tab ? "#ffffffff" : "#f3f5f4ff",
                        color: "#029898",
                        borderColor: "#e0dcdcff",
                        "&:hover": { bgcolor: "#ffffffff" },
                      }}
                    >
                      {tab}
                    </Button>
                  ))}
                </Box>

                <Divider />

                {/* Dynamic Content */}
                <Box sx={{ p: 3 }}>
                  {/* =================== TASK DETAILS SECTION =================== */}
                  {activeTab === "Task Details" && (
                    <Grid container spacing={2}>
                      {/* Visitor Details (Left Side) */}
                      <Grid item xs={12} md={7}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1,
                            pl: 0,
                            pr: 0,
                            pb: 2,
                            width: "500px",
                            bgcolor: "rgba(240, 238, 238, 1)",
                            borderRadius: 2.5,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            gutterBottom
                            sx={{ p: 0.5, pl: 2 }}
                          >
                            Visitor Details
                          </Typography>
                          <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />

                          <Box
                            component="dl"
                            sx={{
                              display: "grid",
                              gap: "8px",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: 16, fontWeight: 800, pl: 2, pt: 1 }}
                              component="dt"
                            >
                              Task ID
                            </Typography>

                            <Box display="flex" gap="130px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Name
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Enquiry Date
                              </Typography>
                            </Box>

                            <Box display="flex" gap="128px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Country
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 0.3 }}
                              >
                                State
                              </Typography>
                            </Box>

                            <Box display="flex" gap="124px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Region
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                District
                              </Typography>
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Ctiy
                              </Typography>
                            </Box>

                            <Box display="flex" gap="100px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Address
                              </Typography>
                            </Box>

                            <Box display="flex" gap="101px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Mobile No
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                E-mail
                              </Typography>
                            </Box>

                            <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />

                            <Box display="flex" gap="116px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Service
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Total sq.feet
                              </Typography>
                            </Box>
                            <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />

                            <Box display="flex" gap="90px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Prefer Date
                              </Typography>
                              <Typography
                                component="dd"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Prefer Time
                              </Typography>
                            </Box>

                            <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />
                            <Box display="flex" gap="100px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Bg Verified Date
                              </Typography>
                            </Box>

                            <Divider sx={{ color: "rgba(169, 163, 163, 1)" }} />
                            <Box display="flex" gap="100px">
                              <Typography
                                component="dt"
                                sx={{ fontSize: 14, fontWeight: 500, pl: 2 }}
                              >
                                Assigh To Manager Data
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>

                      {/* Right Side (Manager, LSP, Technician Details) */}
                      <Grid item xs={12} md={5}>
                        <Box display="flex" sx={{ gap: 2, mb: 2 }}>
                          {/* Manager Details */}
                          <Box
                            sx={{
                              p: 1,
                              pl: 0,
                              pr: 0,
                              pb: 2,
                              bgcolor: "rgba(240, 238, 238, 1)",
                              borderRadius: 2.5,
                              width: "295px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600, mb: 1, pl: 2, pt: 0.6 }}
                            >
                              Manager Details
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                pl: 2,
                                pb: 3,
                                pt: 2,
                              }}
                            >
                              <Avatar sx={{ width: 60, height: 60 }} />
                              <Box>
                                <Typography sx={{ fontWeight: 600 }}>
                                  Manager Name
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Mobile No.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Email
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          {/* LSP Details */}
                          <Box
                            sx={{
                              p: 1,
                              pl: 0,
                              pr: 0,
                              pb: 2,
                              bgcolor: "rgba(240, 238, 238, 1)",
                              borderRadius: 2.5,
                              width: "295px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600, mb: 1, pl: 2, pt: 0.6 }}
                            >
                              LSP Details
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                pl: 2,
                                pb: 3,
                                pt: 2,
                              }}
                            >
                              <Avatar sx={{ width: 60, height: 60 }} />
                              <Box>
                                <Typography sx={{ fontWeight: 600 }}>
                                  LSP Name
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Mobile No.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Email
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        {/* Technician Details */}
                        <Box
                          sx={{
                            p: 1,
                            pl: 0,
                            pr: 0,
                            pb: 2,
                            bgcolor: "rgba(240, 238, 238, 1)",
                            borderRadius: 2.5,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 1, pl: 2, pt: 0.6 }}
                          >
                            Technician Details
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          <Grid container spacing={2}>
                            {[1, 2].map((tech) => (
                              <Grid item xs={12} sm={6} key={tech}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    pr: 5,
                                    pl: 2,
                                    pb: 3,
                                    pt: 1,
                                  }}
                                >
                                  <Avatar sx={{ width: 60, height: 60 }} />
                                  <Box>
                                    <Typography sx={{ fontWeight: 600 }}>
                                      Technician Name
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Mobile No.
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Email
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  )}

                  {/* =================== STATUS LINE SECTION =================== */}
                  {activeTab === "Status Line" && (
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        onClick={handleOpenModal}
                        sx={{
                          my: 2,
                          fontWeight: 500,
                          textDecoration: "underline",
                          textAlign: "right",
                          mr: 3,
                          cursor: "pointer",
                          color: "#029898",
                        }}
                      >
                        Equipment Image
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "0px solid #ccc",
                          borderRadius: "12px",
                          p: 3,
                          mx: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 950,
                            height: 6,
                            bgcolor: "#029898",
                            ml: 6,
                            mb: 9,
                            position: "absolute",
                          }}
                        />
                        {[
                          "Manager To LSP",
                          "LSP Accept",
                          "LSP To Technician",
                          "Technician Accept",
                          "Tec. Departs",
                          "Reached Home",
                          "Work Starts",
                          "Complete Work",
                        ].map((label, index) => (
                          <Box key={index} sx={{ textAlign: "center" }}>
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                border: "5px solid #029898",
                                mx: "auto",
                                mb: 1,
                                bgcolor: "white",
                                position: "sticky",
                              }}
                            />
                            <Typography variant="body2">{label}</Typography>
                            <Typography variant="caption" color="gray">
                              Date :
                            </Typography>
                            <Typography
                              variant="caption"
                              color="gray"
                              display="block"
                            >
                              Time :
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* =================== CHECKLIST SECTION =================== */}
                  {activeTab === "Checklist" && (
                    <Grid spacing={2} sx={{ pt: 0, display: "flex" }}>
                      {/* Left Table */}
                      <Grid sx={{ width: "900px", borderRadius: "20px", pr: 5, pt: 0 }}>
                        <TableContainer
                          component={Paper}
                          sx={{
                            boxShadow: "none",
                            border: "1px solid #d3d3d3",
                            borderRadius: "13px",
                          }}
                        >
                          <Table sx={{}}>
                            <TableHead>
                              <TableRow sx={{ bgcolor: "#029898" }}>
                                {[
                                  "Sl No",
                                  "Floor",
                                  "Site Details",
                                  "Dimension In Sq Ft",
                                  "Total Dimension In Sq Ft",
                                ].map((header, idx) => (
                                  <TableCell
                                    key={idx}
                                    sx={{
                                      color: "white",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {header}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {[1, 2, 3, 4].map((row) => (
                                <TableRow key={row}>
                                  <TableCell>{row}.</TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        {/* Render only the selected section's detail (single open) */}
                        {/* If selectedSection is "General" we show the main first table only (already above).
                            For any other selectedSection, render its SectionDetail below.
                        */}
                        {selectedSection && selectedSection !== "General" && (
                          <SectionDetail name={selectedSection} />
                        )}
                      </Grid>

                      {/* Right Side Panel */}
                      <Box sx={{ borderLeft: "2px solid #000000ff",  height: "full" }}>
                      </Box>
                        <Grid item xs={12} md={3}>
                          <Paper
                            elevation={0}
                            sx={{
                              pl: 2 ,
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              {sections.map((item, index) => (
                                <Box
                                  key={index}
                                  onClick={() => handleSectionClick(item)}
                                  sx={{
                                    p: 1.5,
                                    fontWeight: index === 0 ? 600 : 500,
                                    bgcolor:
                                      selectedSection === item && index === 0
                                        ? "#e5e5e5"
                                        : selectedSection === item
                                        ? "#f1f7f6"
                                        : index === 0
                                        ? "#e5e5e5"
                                        : "transparent",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderRadius: 1,
                                  }}
                                >
                                  <Box>{item}</Box>
                                  <Box sx={{ fontSize: 12, color: "gray" }}>
                                    {selectedSection === item ? "Open" : "Open"}
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                            <Divider />

                            <Box sx={{ p: 2 }}>
                              <Button
                                variant="contained"
                                sx={{
                                  bgcolor: "#029898",
                                  color: "#fff",
                                  borderRadius: "8px",
                                  width: "100%",
                                  "&:hover": { bgcolor: "#078585ff" },
                                }}
                              >
                                Generate Report
                              </Button>
                            </Box>
                          </Paper>
                        </Grid>
                    </Grid>
                  )}
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>

        {/* ================= MODAL VIEW IMAGE ================= */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              maxWidth: 600,
              bgcolor: "white",
              borderRadius: "16px",
              boxShadow: 24,
              p: 3,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                View Image
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Before and After Sections */}
            <Grid container spacing={3}>
              {["Before", "After"].map((label) => (
                <Grid item xs={6} key={label}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "12px",
                      height: 250,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography color="gray">{label} Image</Typography>
                  </Box>

                  {/* Thumbnails */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      overflowX: "auto",
                      pt: 1,
                    }}
                  >
                    {[1, 2, 3, 4].map((thumb) => (
                      <Box
                        key={thumb}
                        sx={{
                          width: 60,
                          height: 60,
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexShrink: 0,
                          cursor: "pointer",
                        }}
                      >
                        <Typography color="gray">{thumb}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Modal>
      </>
    );
  }

  export default Dashboard;
