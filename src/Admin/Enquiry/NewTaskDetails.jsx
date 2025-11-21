import React, { useState } from "react";
import Navbar from "../../componts/AdminNavbar";
import {
    Avatar,
    Box,
    Button,
    CardContent,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIconcon from "@mui/icons-material/Edit";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

// Dummy LSP Data
const partners = [
    { name: "Manager Name", tasks: "36 Profiled Task", technicians: 20, status: "Currently No Task" },
    { name: "Manager Name", tasks: "21 Profiled Task", technicians: 16, status: "Currently No Task" },
    { name: "Manager Name", tasks: "6 Profiled Task", technicians: 8, status: "Currently No Task" },
    { name: "Manager Name", tasks: "12 Profiled Task", technicians: 13, status: "Currently No Task" },
    { name: "Manager Name", tasks: "28 Profiled Task", technicians: 15, status: "On Processing" },
];

function Dashboard() {
    const navigate = useNavigate();

    // States
    const [date, setDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openEstimatePopup, setOpenEstimatePopup] = useState(false);
    const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

    const [enquiryData, setEnquiryData] = useState({
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

    const [estimateData, setEstimateData] = useState({
        totalSqFeet: "",
        amountPerSqFeet: "",
        totalAmount: "",
        discount: "",
        grandAmount: "",
    });

    const [paymentData, setPaymentData] = useState({
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

    const [detailsMatched, setDetailsMatched] = useState(false);
    const [siteEstimated, setSiteEstimated] = useState(false);
    const [paymentAdded, setPaymentAdded] = useState(false);
    const [paymentRows, setPaymentRows] = useState([]);

    // Local fields used in Add Payment form
    const [date2, setDate2] = useState(null);
    const [totalSqft, setTotalSqft] = useState("");
    const [amountPerSqft, setAmountPerSqft] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [discount, setDiscount] = useState("");
    const [grandAmount, setGrandAmount] = useState("");
    const [paymentSteps, setPaymentSteps] = useState("");
    const [toPay, setToPay] = useState("");
    const [paidAmount, setPaidAmount] = useState("");
    const [pendingAmount, setPendingAmount] = useState("");
    const [modeOfTransaction, setModeOfTransaction] = useState("");
    const [paymentEvidence, setPaymentEvidence] = useState("");

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

    const services = ["Service A", "Service B", "Service C"];

    // Handlers
    const handleOpenPopup = () => setOpenPopup(true);
    const handleClose = () => setOpenPopup(false);
    const handleEnquiryDataChange = (field) => (event) =>
        setEnquiryData({ ...enquiryData, [field]: event.target.value });

    const handleAddPayment = () => {
        const newRow = {
            date,
            totalSqft,
            amountPerSqft,
            totalAmount,
            discount,
            grandAmount,
            paymentSteps,
            toPay,
            paidAmount,
            pendingAmount,
            modeOfTransaction,
            paymentEvidence,
        };

        setPaymentRows((prev) => [...prev, newRow]);
        setOpenPaymentPopup(false);
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
                />

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
                                <Box sx={{ py: 1, bgcolor: "#ebe8e8ff" }}>
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
                                                    sx={{ color: "#029898", "&.Mui-checked": { color: "#029898" } }}
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
                                                    sx={{ color: "#029898", "&.Mui-checked": { color: "#029898" } }}
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
                                                    sx={{ color: "#029898", "&.Mui-checked": { color: "#029898" } }}
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
                            <Grid sx={{ width: "750px" }} item xs={12} md={6}>
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
                                            sx={{ color: "#029898", bgcolor: "white", borderRadius: "12px", width: "80px" }}
                                        >
                                            Add
                                        </Button>
                                    </Box>

                                    <Box display={"flex"} mt={1}>
                                        <Box display="grid" sx={{ px: 2, py: 1 }}>
                                            <Typography fontWeight="600" fontSize="13px" ml={1}>
                                                Date
                                            </Typography>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    value={date}
                                                    onChange={(newValue) => setDate(newValue)}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            sx: { width: 210, mt: 1 },
                                                            InputProps: {
                                                                sx: {
                                                                    height: 35,
                                                                    borderRadius: "10px",
                                                                    backgroundColor: "#dddddd",
                                                                    "& fieldset": { border: "none !important" },
                                                                    "&:hover fieldset": { border: "none !important" },
                                                                    "&.Mui-focused fieldset": { border: "none !important" },
                                                                },
                                                            },
                                                            inputProps: { style: { fontWeight: 400, paddingLeft: 12 } },
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Box>

                                        <Box sx={{ px: 2, py: 1 }}>
                                            <Typography fontWeight="600" fontSize="13px" ml={1}>
                                                Session
                                            </Typography>

                                            <TextField
                                                select
                                                fullWidth
                                                sx={{
                                                    width: 210,
                                                    mt: 1,
                                                    backgroundColor: "#dddddd",
                                                    borderRadius: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        paddingRight: 0,
                                                        height: 35,
                                                        "& fieldset": { border: "none" },
                                                        "&:hover fieldset": { border: "none" },
                                                        "&.Mui-focused fieldset": { border: "none" },
                                                    },
                                                }}
                                                SelectProps={{
                                                    MenuProps: {
                                                        PaperProps: { sx: { width: 120, borderRadius: "13px" } },
                                                    },
                                                }}
                                            >
                                                <MenuItem sx={{ bgcolor: "#ffffffff", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Morning">
                                                    Morning
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Afternoon">
                                                    Afternoon
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Evening">
                                                    Evening
                                                </MenuItem>
                                            </TextField>
                                        </Box>
                                    </Box>

                                    <Box sx={{ px: 2, py: 1 }}>
                                        <Typography fontWeight="600" fontSize="13px" ml={1}>
                                            Remark
                                        </Typography>
                                        <TextField
                                            multiline
                                            rows={3}
                                            sx={{
                                                mb: 2,
                                                width: 710,
                                                borderRadius: "10px",
                                                backgroundColor: "#dddddd",
                                                "& .MuiOutlinedInput-root": {
                                                    padding: 0,
                                                    "& fieldset": { border: "none" },
                                                    "&:hover fieldset": { border: "none" },
                                                    "&.Mui-focused fieldset": { border: "none" },
                                                    "& textarea": {
                                                        height: 100,
                                                        padding: "8px",
                                                        scrollbarWidth: "thin",
                                                        scrollbarColor: "#888 #ccc",
                                                        "&::-webkit-scrollbar": { width: "8px" },
                                                        "&::-webkit-scrollbar-track": { background: "#ccc", borderRadius: "10px" },
                                                        "&::-webkit-scrollbar-thumb": { background: "#888", borderRadius: "10px" },
                                                        "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
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
                                    <Box display={"flex"} mt={1} ml={1}>
                                        <Box sx={{ px: 1, py: 1 }}>
                                            <Typography fontWeight="600" fontSize="13px" ml={1}>
                                                Country
                                            </Typography>

                                            <TextField
                                                select
                                                fullWidth
                                                sx={{
                                                    width: 165,
                                                    mt: 1,
                                                    backgroundColor: "#dddddd",
                                                    borderRadius: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        paddingRight: 0,
                                                        height: 35,
                                                        "& fieldset": { border: "none" },
                                                        "&:hover fieldset": { border: "none" },
                                                        "&.Mui-focused fieldset": { border: "none" },
                                                    },
                                                }}
                                                SelectProps={{
                                                    MenuProps: {
                                                        PaperProps: {
                                                            sx: {
                                                                width: 40,
                                                                borderRadius: "20px",
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Morning">
                                                    Morning
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Afternoon">
                                                    Afternoon
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Evening">
                                                    Evening
                                                </MenuItem>
                                            </TextField>
                                        </Box>

                                        <Box sx={{ px: 1, py: 1 }}>
                                            <Typography fontWeight="600" fontSize="13px" ml={1}>
                                                State
                                            </Typography>

                                            <TextField
                                                select
                                                fullWidth
                                                sx={{
                                                    width: 165,
                                                    mt: 1,
                                                    backgroundColor: "#dddddd",
                                                    borderRadius: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        paddingRight: 0,
                                                        height: 35,
                                                        "& fieldset": { border: "none" },
                                                        "&:hover fieldset": { border: "none" },
                                                        "&.Mui-focused fieldset": { border: "none" },
                                                    },
                                                }}
                                                SelectProps={{
                                                    MenuProps: {
                                                        PaperProps: {
                                                            sx: {
                                                                width: 40,
                                                                borderRadius: "20px",
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Morning">
                                                    Morning
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Afternoon">
                                                    Afternoon
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Evening">
                                                    Evening
                                                </MenuItem>
                                            </TextField>
                                        </Box>

                                        <Box sx={{ px: 1, py: 1 }}>
                                            <Typography fontWeight="600" fontSize="13px" ml={1}>
                                                Region
                                            </Typography>

                                            <TextField
                                                select
                                                fullWidth
                                                sx={{
                                                    width: 165,
                                                    mt: 1,
                                                    backgroundColor: "#dddddd",
                                                    borderRadius: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        paddingRight: 0,
                                                        height: 35,
                                                        "& fieldset": { border: "none" },
                                                        "&:hover fieldset": { border: "none" },
                                                        "&.Mui-focused fieldset": { border: "none" },
                                                    },
                                                }}
                                                SelectProps={{
                                                    MenuProps: {
                                                        PaperProps: {
                                                            sx: {
                                                                width: 40,
                                                                borderRadius: "20px",
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Morning">
                                                    Morning
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Afternoon">
                                                    Afternoon
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Evening">
                                                    Evening
                                                </MenuItem>
                                            </TextField>
                                        </Box>

                                        <Box sx={{ px: 1, py: 1 }}>
                                            <Typography fontWeight="600" fontSize="13px" ml={1}>
                                                District
                                            </Typography>

                                            <TextField
                                                select
                                                fullWidth
                                                sx={{
                                                    width: 165,
                                                    mt: 1,
                                                    backgroundColor: "#dddddd",
                                                    borderRadius: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        paddingRight: 0,
                                                        height: 35,
                                                        "& fieldset": { border: "none" },
                                                        "&:hover fieldset": { border: "none" },
                                                        "&.Mui-focused fieldset": { border: "none" },
                                                    },
                                                }}
                                                SelectProps={{
                                                    MenuProps: {
                                                        PaperProps: {
                                                            sx: {
                                                                width: 40,
                                                                borderRadius: "20px",
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Morning">
                                                    Morning
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Afternoon">
                                                    Afternoon
                                                </MenuItem>
                                                <MenuItem sx={{ bgcolor: "#ffffffff", fontSize: "14px", color: "#000", fontWeight: 600, borderRadius: "8px", my: 0.5 }} value="Evening">
                                                    Evening
                                                </MenuItem>
                                            </TextField>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ display: "flex", justifyContent: "flex-end", mx: 3, gap: 2 }}>
                                        <TextField
                                            placeholder="Search"
                                            sx={{
                                                width: "200px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "16px",
                                                    height: "38px",
                                                    paddingRight: 0,
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "8px 12px",
                                                },
                                            }}
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
                                        <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, borderBottom: "1px solid #ddd" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "180px" }}>
                                                <Avatar />
                                                <Box>
                                                    <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>{p.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {p.status}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>Region</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <Box display={"flex"} gap={1}>
                                                        <Box sx={{ border: "2px solid #000", p: 0.5, px: 0.5, fontSize: "10px", bgcolor: "#e4e2e2ff", color: "#000", borderRadius: "20px" }}>
                                                            Country
                                                        </Box>
                                                        <Box sx={{ border: "2px solid #000", p: 0.5, px: 0.5, fontSize: "10px", bgcolor: "#e4e2e2ff", color: "#000", borderRadius: "20px" }}>
                                                            State
                                                        </Box>
                                                        <Box sx={{ border: "2px solid #000", p: 0.5, px: 0.5, fontSize: "10px", bgcolor: "#e4e2e2ff", color: "#000", borderRadius: "20px" }}>
                                                            District
                                                        </Box>
                                                    </Box>
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Typography variant="body2">Mobile No</Typography>
                                                <Typography variant="body2">{p.technicians} LSP</Typography>
                                                <Button variant="contained" sx={{ bgcolor: "#029898", borderRadius: "8px" }}>
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
                    <IconButton onClick={handleClose} sx={{ color: "#000", "&:hover": { backgroundColor: "#f2f2f2" } }}>
                        <CloseIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={1.5} mb={3} gap={3} ml={3}>
                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Enquiry ID
                            </Typography>
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
                            <Typography fontWeight="600" fontSize="13px">
                                Name
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Country
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                State
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                District
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Region
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Address
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Mobile No.
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                E-Mail
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Service
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Total Sq. Feet
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Enquiry Date
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>
                    </Grid>

                    <Divider sx={{ my: 1.5 }} />
                </DialogContent>

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
                <DialogTitle
                    sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        px: 2.5,
                        pt: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "890px",
                    }}
                >
                    Estimation Details
                    <IconButton onClick={() => setOpenEstimatePopup(false)} sx={{ color: "#000", "&:hover": { backgroundColor: "#f2f2f2" } }}>
                        <CloseIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ px: 2.5, pt: 1.9, pb: 0.9 }}>
                    <Grid display={"flex"} spacing={1.5} mt={1} gap={3}>
                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Total Square Feet
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Amount Per Sq.Feet
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Total Amount
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Discount
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>

                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Grand Amount
                            </Typography>
                            <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                        </Box>
                    </Grid>

                    <Divider sx={{ my: 1.5 }} />
                </DialogContent>

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

            {/* Add Payment Details Popup */}
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
                <DialogTitle
                    sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        px: 3,
                        py: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Add Payment Details
                    <DialogActions sx={{ px: 2.5, pb: 1.5, gap: 4 }}>
                        <Button
                            variant="contained"
                            onClick={handleAddPayment}
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

                        <IconButton onClick={() => setOpenPaymentPopup(false)} sx={{ color: "#000", "&:hover": { backgroundColor: "#f2f2f2" } }}>
                            <CloseIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                    </DialogActions>
                </DialogTitle>

                <DialogContent sx={{ px: 2.5, pb: 0.5 }}>
                    <Grid spacing={1.5} mt={1}>
                        <Box>
                            <Box display="grid" sx={{ px: 2, py: 1 }}>
                                <Typography fontWeight="600" fontSize="13px" ml={1}>
                                    Date
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={date}
                                        onChange={(newValue) => setDate(newValue)}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                sx: { width: 200, mt: 1.4 },
                                                InputProps: {
                                                    sx: {
                                                        height: 35,
                                                        borderRadius: "8px",
                                                        backgroundColor: "#e0e0e0",
                                                        "& fieldset": { border: "none !important" },
                                                        "&:hover fieldset": { border: "none !important" },
                                                        "&.Mui-focused fieldset": { border: "none !important" },
                                                    },
                                                },
                                                inputProps: { style: { fontWeight: 400, paddingLeft: 12 } },
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>

                        <Box display={"flex"} gap={3} ml={2}>
                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Total Square Feet
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Amount Per Sq.Feet
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Total Amount
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Discount
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Grand Amount
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>
                        </Box>

                        <Box display={"flex"} gap={3} ml={2} mb={3}>
                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Payment Steps
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    To Pay
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Paid Amount
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Pending Amount
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Mode Of Transaction
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>

                            <Box mt={2}>
                                <Typography fontWeight="600" fontSize="13px">
                                    Payment Evidence
                                </Typography>
                                <TextField size="small" sx={{ mt: 1, "& .MuiOutlinedInput-root": { height: "30px", bgcolor: "#e0e0e0", borderRadius: "4px", "& input": { padding: "4px 8px", fontSize: "12px" }, "& fieldset": { border: "none" } } }} />
                            </Box>
                        </Box>
                    </Grid>
                </DialogContent>

                {paymentRows.length > 0 && (
                    <Box mt={3} px={3} mb={5}>
                        <Typography fontSize="18px" fontWeight={600} mb={2}>
                            Managing Table
                        </Typography>

                        <TableContainer component={Paper} sx={{ maxHeight: 300, overflowX: "auto", whiteSpace: "nowrap" }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#029898" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "#fff" }}>Payment %</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Task Id</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Total Sq.Ft</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Grand Amount</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Paid Amount</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Pending Amount</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Mode Of Transaction</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Evidence</TableCell>
                                        <TableCell sx={{ color: "#fff" }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paymentRows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.paymentSteps}</TableCell>
                                            <TableCell>{row.paymentSteps}</TableCell>
                                            <TableCell>{row.paymentSteps}</TableCell>
                                            <TableCell>{row.date?.toLocaleDateString?.()}</TableCell>
                                            <TableCell>{row.totalSqft}</TableCell>
                                            <TableCell>{row.grandAmount}</TableCell>
                                            <TableCell>{row.paidAmount}</TableCell>
                                            <TableCell>{row.pendingAmount}</TableCell>
                                            <TableCell>{row.modeOfTransaction}</TableCell>
                                            <TableCell>{row.paymentEvidence}</TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <EditIconcon />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Dialog>
        </>
    );
}

export default Dashboard;