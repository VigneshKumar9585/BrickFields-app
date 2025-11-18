// src/pages/Dashboard.js
import React from "react";
import Navbar from "../../componts/AdminNavbar";
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Divider,
  Button,
  TextField,
  MenuItem,
  Avatar,
  IconButton,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Dummy LSP Data
const partners = [
  { name: "Manager Name", tasks: "36 Profiled Task", technicians: 20, status: "Currently No Task" },
  { name: "Manager Name", tasks: "21 Profiled Task", technicians: 16, status: "Currently No Task" },
  { name: "Manager Name", tasks: "6 Profiled Task", technicians: 8, status: "Currently No Task" },
  { name: "Manager Name", tasks: "12 Profiled Task", technicians: 13, status: "Currently No Task" },
  { name: "Manager Name", tasks: "28 Profiled Task", technicians: 15, status: "On Processing" },
];

function Dashboard() {
  const [date, setDate] = React.useState(null);
  const [openPopup, setOpenPopup] = React.useState(false);
  const navigate = useNavigate();

  const [enquiryData, setEnquiryData] = React.useState({
    enquiryId: "ENQ12345",
    name: "John Doe",
    country: "USA",
    state: "California",
    district: "Los Angeles",
    region: "West",
    address: "123 Main St, Anytown",
    mobileNo: "123-456-7890",
    email: "john.doe@example.com",
    service: "Service A",
    totalSqFeet: "1500",
    enquiredDate: "2023-10-27",
  });

  const [openEstimatePopup, setOpenEstimatePopup] = React.useState(false);
  const [estimateData, setEstimateData] = React.useState({
    totalSqFeet: "",
    amountPerSqFeet: "",
    totalAmount: "",
    discount: "",
    grandAmount: "",
  });

  const [openPaymentPopup, setOpenPaymentPopup] = React.useState(false);
  const [paymentData, setPaymentData] = React.useState({
    date: "",
    totalSqFeet: "",
    amountPerSqFeet: "",
    totalAmount: "",
    discount: "",
    grandAmount: "",
    paymentSteps: "",
    toPay: "",
    paidAmount: "",
    pendingAmount: "",
    modeOfTransaction: "",
    paymentEvidence: null,
  });
  const [detailsMatched, setDetailsMatched] = React.useState(false);
const [siteEstimated, setSiteEstimated] = React.useState(false);
const [paymentAdded, setPaymentAdded] = React.useState(false);


  const enquiryFields = [
    { label: "Enquiry ID", field: "enquiryId" },
    { label: "Name", field: "name" },
    { label: "Country", field: "country" },
    { label: "State", field: "state" },
    { label: "District", field: "district" },
    { label: "Region", field: "region" },
    { label: "Address", field: "address", full: true },
    { label: "Mobile No.", field: "mobileNo" },
    { label: "E-Mail", field: "email" },
  ];

  const handleOpenPopup = () => setOpenPopup(true);
  const handleClose = () => setOpenPopup(false);

  const handleEnquiryDataChange = (field) => (event) =>
    setEnquiryData({ ...enquiryData, [field]: event.target.value });

  const services = ["Service A", "Service B", "Service C"];

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
            {/* Left Section - New Task Details */}
            <Grid sx={{ width: "400px" }} item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                New Task Details
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Contact Details */}
                <Box sx={{ py: 1,  bgcolor:"#ebe8e8ff"}}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, pl: 2, pt: 1 }}>
                    Contact Details
                  </Typography>

                  <Box sx={{ display: "flex", py: 1, px: 2 }}>
                    <Typography fontSize="14px">Phone:</Typography>
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
                      disabled
                    />
                    <Typography fontSize="14px">Email:</Typography>
                    <TextField
                      variant="outlined"
                      sx={{
                        width: "200px",
                        pl: 1.8,
                        "& .MuiInputBase-root": { height: 20 },
                        "& input": { p: 0.5, fontSize: "12px" },
                        "& fieldset": { border: "none" },
                      }}
                      disabled
                    />
                  </Box>
                </Box>

                {/* Service Details */}
                <Typography variant="subtitle1" sx={{ fontWeight: 600, pl: 2, pt: 1 }}>
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
                    disabled
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
                    disabled
                  />
                </Box>

                
<Box
  sx={{
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#ffffffff",
    px: 2,
    py: 1,
  }}
>
  <FormGroup>
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: "#029898",
            "&.Mui-checked": { color: "#029898" },
          }}
          checked={detailsMatched}
          onChange={(e) => {
            setDetailsMatched(e.target.checked);
            if (e.target.checked) setOpenPopup(true);
          }}
        />
      }
      label={<Typography sx={{ fontSize: "13px" }}>Given Details Are Matched</Typography>}
    />

    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: "#029898",
            "&.Mui-checked": { color: "#029898" },
          }}
          checked={siteEstimated}
          onChange={(e) => {
            setSiteEstimated(e.target.checked);
            if (e.target.checked) setOpenEstimatePopup(true);
          }}
        />
      }
      label={<Typography sx={{ fontSize: "13px" }}>Site Estimation Provided</Typography>}
    />

    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: "#029898",
            "&.Mui-checked": { color: "#029898" },
          }}
          checked={paymentAdded}
          onChange={(e) => {
            setPaymentAdded(e.target.checked);
            if (e.target.checked) setOpenPaymentPopup(true);
          }}
        />
      }
      label={<Typography sx={{ fontSize: "13px" }}>Add Payment Details</Typography>}
    />
  </FormGroup>
</Box>






                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 1.2, mt: 1, pt: 1.2, mx: 1.2 }}>
                  <Button variant="outlined" color="error" sx={{ flex: 1 }}>
                    Deny
                  </Button>
                  <Button variant="contained" sx={{ flex: 1, bgcolor: "#029898" }}>
                    Accept
                  </Button>
                </Box>
              </CardContent>
            </Grid>

            {/* Right Section - Assign Partner */}
            {detailsMatched && siteEstimated && paymentAdded && (
            <Grid sx={{ width: "700px" }} item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                Assign To Manager
              </Typography>

              {/* Book Prefer Date & Time */}
              <CardContent
                sx={{
                  mb: 2,
                  border: "1px solid #abababff",
                  borderRadius: "14px",
                  p: 0,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                  overflow: "hidden",
                }}
              >
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
                  <Typography>Book Prefer Date & Time</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      color: "#029898",
                      bgcolor: "white",
                      borderRadius: "12px",
                      width: "80px",
                    }}
                  >
                    Add
                  </Button>
                </Box>

                <Box sx={{ display: "flex", gap: 2, my: 2, mx: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker label="Date" value={date} onChange={(newValue) => setDate(newValue)} />
                  </LocalizationProvider>

                  <TextField select fullWidth label="Session">
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Afternoon">Afternoon</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                  </TextField>
                </Box>

                <TextField label="Remark" rows={3} multiline fullWidth sx={{ mx: 2, mb: 2 }} />
              </CardContent>

              {/* Partner List */}
              <CardContent
                sx={{
                  mb: 2,
                  border: "1px solid #abababff",
                  borderRadius: "14px",
                  p: 0,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
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
                      <Button variant="contained" sx={{ bgcolor: "#029898" }}>
                        Assign
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Grid>
            )}
          </Grid>
        </Box>
      </Box>

      {/* Enquiry Popup */}
      <Dialog
        open={openPopup}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "6px",
            border: "1px solid #ddd",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            padding: "2px",
          },
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            px: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          
          }}
        >
          Enquiry Details
          <IconButton
            onClick={handleClose}
            sx={{
              color: "#000",
              "&:hover": { backgroundColor: "#f2f2f2" },
            }}
          >
            <CloseIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        </DialogTitle>

        {/* Content */}
        <DialogContent  >
          {/* Grid Layout */}
          <Grid container spacing={1.5} mb={3} gap={3} ml={3}>
            {/* Row 1 */}
              
                               <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Enquiry ID</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>
 <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Name</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>
 <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Country</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>
 <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">State</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>
                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">District</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>
                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Region</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>


                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Address</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Mobile No.</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">E-Mail</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Service</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Totel Sq. Feet</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Enqiury Date</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                   





                
          </Grid>

          <Divider sx={{ my: 1.5 }} />
        </DialogContent>

        {/* Footer */}
        <DialogActions sx={{ px: 2.5, pb: 1.5 }}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              bgcolor: "#029898",
              color: "#fff",
              px: 3,
              py: 0.6,
              textTransform: "none",
              borderRadius: "4px",
              fontSize: "13px",
              "&:hover": { bgcolor: "#036d6dff" },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Estimation Popup */}
      <Dialog
        open={openEstimatePopup}
        onClose={() => setOpenEstimatePopup(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "6px",
            border: "1px solid #ddd",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            padding: "2px",
          },
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            px: 2.5,
            pt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width:"890px"
          }}
        >
          Estimation Details
          <IconButton
            onClick={() => setOpenEstimatePopup(false)}
            sx={{
              color: "#000",
              "&:hover": { backgroundColor: "#f2f2f2" },
            }}
          >
            <CloseIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        </DialogTitle>

        {/* Content */}
        <DialogContent sx={{ px: 2.5, pt: 1.9, pb: 0.9 }}>
          <Grid display={"flex"} spacing={1.5} mt={1} gap={3}>
           <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Total Square Feet</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                    <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Amount Per Sq.Feet</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                   <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Totel Amount</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                   <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Discount</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                   <Box mt={2}>
                                                     <Typography fontWeight="600" fontSize="13px">Grand Amount</Typography>
                                                     <TextField
                                                       size="small"
                                                       sx={{
                                                         mt: 1,
                                                         "& .MuiOutlinedInput-root": {
                                                           height: "30px",
                                                           bgcolor: "#e0e0e0",
                                                           borderRadius: "4px",
                                                           "& input": { padding: "4px 8px", fontSize: "12px" },
                                                           "& fieldset": { border: "none" },
                                                         },
                                                       }}
                                                     />
                                                   </Box>

                                                   
          </Grid>

          <Divider sx={{ my: 1.5 }} />
        </DialogContent>

        {/* Footer */}
        <DialogActions sx={{ px: 2.5, pb: 1.5 }}>
          <Button
            variant="contained"
            onClick={() => setOpenEstimatePopup(false)}
            sx={{
              bgcolor: "#029898",
              color: "#fff",
              px: 3,
              py: 0.6,
              textTransform: "none",
              borderRadius: "4px",
              fontSize: "13px",
              "&:hover": { bgcolor: "#036d6dff" },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔹 Add Payment Details Popup */}
<Dialog
  open={openPaymentPopup}
  onClose={() => setOpenPaymentPopup(false)}
  maxWidth="lg"
  fullWidth
  PaperProps={{
    style: {
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "8px",
      border: "1px solid #ddd",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      padding: "4px",
    },
  }}
>
  {/* Header */}
  <DialogTitle
    sx={{
      fontWeight: 600,
      fontSize: "1rem",
      borderBottom: "1px solid #ddd",
      px: 2.5,
      py: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    Add Payment Details
    <IconButton
      onClick={() => setOpenPaymentPopup(false)}
      sx={{
        color: "#000",
        "&:hover": { backgroundColor: "#f2f2f2" },
      }}
    >
      <CloseIcon sx={{ fontSize: "18px" }} />
    </IconButton>
  </DialogTitle>

  {/* Content */}
  {/* Content */}
        <DialogContent sx={{ px: 2.5, pt: 1.5, pb: 0.5 }}>
          <Grid container spacing={1.5} mt={1}>
            {[
              { label: "Total Square Feet", field: "totalSqFeet" },
              { label: "Amount Per Sq. Feet", field: "amountPerSqFeet" },
              { label: "Total Amount", field: "totalAmount" },
              { label: "Discount", field: "discount" },
              { label: "Grand Amount", field: "grandAmount" },
            ].map((item) => (
              <Grid item xs={12} sm={2.4} key={item.field}>
                <TextField
                  placeholder={item.label}
                  fullWidth
                  value={estimateData[item.field]}
                  onChange={(e) => setEstimateData({ ...estimateData, [item.field]: e.target.value })}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      fontSize: "12px",
                      color: "#666",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      bgcolor: "#f0f0f0",
                      borderRadius: "4px",
                      "& fieldset": { border: "none" },
                      "& input": { fontSize: "12px", padding: "6px 8px" },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 1.5 }} />
        </DialogContent>


  {/* Footer */}
  <DialogActions sx={{ px: 2.5, pb: 1.5 }}>
    <Button
      variant="contained"
      onClick={() => setOpenPaymentPopup(false)}
      sx={{
        bgcolor: "#029898",
        color: "#fff",
        px: 3,
        py: 0.7,
        textTransform: "none",
        borderRadius: "6px",
        fontSize: "13px",
        "&:hover": { bgcolor: "#036d6dff" },
      }}
    >
      Add
    </Button>
  </DialogActions>
</Dialog>





    </>
  );
}

export default Dashboard;
