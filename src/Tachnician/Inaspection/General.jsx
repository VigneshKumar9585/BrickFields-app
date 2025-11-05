import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Navbar from "../../componts/TachnicanNavbar";

function ChecklistGeneral() {
  const [floor, setFloor] = useState("");
  const [siteArea, setSiteArea] = useState("");
  const [additional, setAdditional] = useState("");
  const [editName, setEditName] = useState(false);
  const [renamedArea, setRenamedArea] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [tableData, setTableData] = useState([]);

  const totalSqFt =
    width && height ? (parseFloat(width) * parseFloat(height)).toFixed(2) : "";

  const handleAdd = () => {
    if (!floor || !siteArea || !width || !height) return;
    const newRow = {
      id: Date.now(),
      floor,
      siteArea,
      additional,
      renamedArea,
      width,
      height,
      totalSqFt,
      date: new Date().toLocaleDateString(), // ✅ Add current date
    };
    setTableData([...tableData, newRow]);
    handleClear();
  };

  const handleClear = () => { 
    setFloor("");
    setSiteArea("");
    setAdditional("");
    setRenamedArea("");
    setWidth("");
    setHeight("");
    setEditName(false);
  };

  const handleDelete = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  // Common input style
  const inputSx = {
    mt:2,
    "& .MuiOutlinedInput-root": {
      height: "30px",
      bgcolor: "#e0e0e0",
      borderRadius: "4px",
      "& input": {
        padding: "4px 8px",
        fontSize: "12px",
      },
      "& fieldset": { border: "none" },
    },
  };

  // Common select style
  const selectSx = {
    mt:2,
    height: "30px",
    width: "180px",
    bgcolor: "#e0e0e0",
    borderRadius: "4px",
    "& .MuiSelect-select": {
      padding: "4px 8px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
    },
    "& fieldset": { border: "none" },
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          p: 4,
        }}
      >
        {/* Sidebar space */}
        <Box
          sx={{
            width: "260px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        ></Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Checklist{" "}
            <Typography component="span" color="grey">
              | General
            </Typography>
          </Typography>

          {/* Card Container */}
          <Box
            sx={{
              border: "3px solid #fff",
              borderRadius: "14px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <Box
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: "#e0e0e0",
                boxShadow: "0px 0px 6px rgba(0,0,0,0.08)",
                mb: 3,
                m:4,
                width: "1100px",
              }}
            >
              <CardContent sx={{p:0,bgcolor:"#f5f2f2ff"}}>
                <Grid container spacing={2} alignItems="center" display="grid">
                  <Box sx={{p:3}}>
                  <Box sx={{ display: "flex", gap: 5 ,mb:3}}>
                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight={500}>Floor</Typography>
                      <Select
                        fullWidth
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        size="small"
                        sx={selectSx}
                      >
                        <MenuItem value="">Select Floor</MenuItem>
                        <MenuItem value="Ground">Ground</MenuItem>
                        <MenuItem value="1st Floor">1st Floor</MenuItem>
                        <MenuItem value="2nd Floor">2nd Floor</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight={500}>Site Area</Typography>
                      <Select
                        fullWidth
                        value={siteArea}
                        onChange={(e) => setSiteArea(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        size="small"
                        sx={selectSx}
                      >
                        <MenuItem value="">Select Site</MenuItem>
                        <MenuItem value="Living Room">Living Room</MenuItem>
                        <MenuItem value="Kitchen">Kitchen</MenuItem>
                        <MenuItem value="Bedroom">Bedroom</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight={500}>Additional</Typography>
                      <Select
                        fullWidth
                        value={additional}
                        onChange={(e) => setAdditional(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        size="small"
                        sx={selectSx}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Balcony">Balcony</MenuItem>
                        <MenuItem value="Store">Store</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={16} sm={3} display="flex" alignItems="center">
                      <FormControlLabel
                      sx={{width:70}}
                        control={
                          <Checkbox
                            checked={editName}
                            onChange={(e) => setEditName(e.target.checked)}
                          />
                        }
                        // label="Edit Name"
                      />
                       <Typography fontWeight={500}>EditName</Typography>
                      <TextField
                        disabled={!editName}
                        value={renamedArea}
                        onChange={(e) => setRenamedArea(e.target.value)}
                        placeholder="Renamed Area"
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ ml: 6, ...inputSx }}
                      />
                    </Grid>
                  </Box>

                  {/* Dimension Inputs */}
                  <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight={500}>Width (ft)</Typography>
                      <TextField
                        type="number"
                        fullWidth
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={inputSx}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight={500}>Height (ft)</Typography>
                      <TextField
                        type="number"
                        fullWidth
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={inputSx}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Typography fontWeight={500}>Total Sq Ft</Typography>
                      <TextField
                        fullWidth
                        value={totalSqFt}
                        disabled
                        variant="outlined"
                        size="small"
                        sx={inputSx}
                      />
                    </Grid>
                  </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Buttons */}
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    paddingRight="20px"
                    gap={2}
                  >
                    <Button variant="outlined" color="inherit" onClick={handleClear}>
                      Clear
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAdd}
                      sx={{
                        bgcolor: "#029898",
                        "&:hover": { bgcolor: "#029898" },
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>

            {/* Table */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 ,ml:3}}>
              Table
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                width: "1100px",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                ml:3,
                mb:4
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#029898" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Sl No</TableCell>
                    <TableCell sx={{ color: "white" }}>Floor</TableCell>
                    <TableCell sx={{ color: "white" }}>Site Details</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Dimension (Sq Ft)
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>Total Dimension</TableCell>
                    <TableCell sx={{ color: "white" }}>Date</TableCell>
                    <TableCell sx={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No data added yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    tableData.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.floor}</TableCell>
                        <TableCell>
                          {row.siteArea}
                          {row.additional && ` - ${row.additional}`}
                        </TableCell>
                        <TableCell>{`${row.width} x ${row.height}`}</TableCell>
                        <TableCell>{row.totalSqFt}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(row.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChecklistGeneral;
