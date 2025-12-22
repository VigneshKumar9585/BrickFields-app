import React, { useState, useEffect } from "react";
import Navbar from "../../componts/AdminNavbar";
import toast from "react-hot-toast";
import axios from "axios";
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
    InputLabel,
    Select,
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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Dummy LSP Data
const partners = [
    { name: "Manager Name", tasks: "36 Profiled Task", technicians: 20, status: "Currently No Task" },
    { name: "Manager Name", tasks: "21 Profiled Task", technicians: 16, status: "Currently No Task" },
    { name: "Manager Name", tasks: "6 Profiled Task", technicians: 8, status: "Currently No Task" },
    { name: "Manager Name", tasks: "12 Profiled Task", technicians: 13, status: "Currently No Task" },
    { name: "Manager Name", tasks: "28 Profiled Task", technicians: 15, status: "On Processing" },
];
const StyledInput = styled("input")(() => ({
    width: "100%",
    height: "36px",
    backgroundColor: "#f1f1f1",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    padding: "8px",
    fontSize: "13px",
    boxSizing: "border-box",
    color: "#000",

    "&:focus": {
        outline: "2px solid #029898",
    }
}));


function NewEnquiryDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(sessionStorage.getItem("user"));
    // States
    const [date, setDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openEstimatePopup, setOpenEstimatePopup] = useState(false);
    const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
    const [openRejectPopup, setOpenRejectPopup] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [editSlotDate, setEditSlotDate] = useState(null);
    const [editSlotTime, setEditSlotTime] = useState("");
    // Estimation states
    const [sqFeetEst, setSqFeetEst] = useState("");
    const [amountPerSqFeetEst, setAmountPerSqFeetEst] = useState(5); // fixed
    const [totalAmountEst, setTotalAmountEst] = useState("");
    const [discountEst, setDiscountEst] = useState("");
    const [grandAmountEst, setGrandAmountEst] = useState("");


    const [enquiryData, setEnquiryData] = useState([]);

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

    const timeSlots = [
        "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    const formatTimeDisplay = (time24) => {
        if (!time24) return "";
        const [hours, minutes] = time24.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";

        const [hours, minutes] = timeString.split(":");
        let h = parseInt(hours);
        const ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;          // convert 0 → 12
        h = h || 12;         // handle midnight (0 becomes 12)

        return `${h}:${minutes} ${ampm}`;
    };

    const [managers, setManagers] = useState([]);
    const fetchManagers = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/get-managers`);
            setManagers(res.data);
        } catch (err) {
            console.error("Error fetching managers:", err);
        }
    };


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/get-enquiry-id/${id}`)
            .then((res) => {
                console.log("Enquiry Data:", res.data);
                setEnquiryData(res.data);
                setSqFeetEst(res.data.sqFeet || ""); // AUTO FILL ESTIMATION FIELD
                
            })
            .catch((err) => console.log(err));
        fetchManagers();
            
        }, [id]);

            const assignManager = async (managerId) => {
                try {
                    console.log("Assigning Manager:", managerId, "to Enquiry ID:", id);
                    console.log(id)
                    const response = await axios.put(`${BACKEND_URL}/api/assign-manager`, { enquiryId: id, managerId: managerId });
                    console.log("Manager assigned successfully:", response.data);
                    toast.success("Manager assigned successfully");
                    setEnquiryData(prev => ({ ...prev, assignedManager: managerId }));
                    navigate(`/admin-manage-enquiry`);
                } catch (error) {
                    console.error("Error assigning Manager:", error);
                    toast.error(error.response.data.message);
                }
            };
    useEffect(() => {
        const total = Number(sqFeetEst) * Number(amountPerSqFeetEst);
        setTotalAmountEst(total || "");

        // If discount > total → show "Invalid"
        if (Number(discountEst) > total) {
            setGrandAmountEst("Invalid");
        } else {
            const grand = total - Number(discountEst);
            setGrandAmountEst(grand || "");
        }
    }, [sqFeetEst, amountPerSqFeetEst, discountEst]);


    const sendPaymentEmail = async () => {
        try {
            const email = enquiryData.email;
            const amount = Math.round(grandAmountEst * 0.10);
            const name = enquiryData.name;
            const totalAmount = grandAmountEst;
            const period = "10%"
            console.log("toot", totalAmount)


            if (!email || !amount) {
                toast.error("Email or amount missing!");
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/api/send-payment-link`, {
                email,
                amount,
                name,
                totalAmount,
                period,
                enquiryId: enquiryData.enquiryId
            });
            toast.success("Payment link sent successfully!");

            setOpenEstimatePopup(false);

        } catch (error) {
            console.error("Error sending payment link:", error);
            toast.error("Failed to send payment link.");
        }
    };

    const rejectEnquiry = async () => {
        try {
            const requiredData = {
                enquiryId: id,
                reason: rejectionReason,
                managerId: user.id
            }
            const res = await axios.put(
                `${BACKEND_URL}/api/manager-enquiry/${id}`,
                requiredData
            );
            toast.success("Enquiry rejected successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject enquiry.");
        }
    };

    const handleUpdateEnquiry = async () => {
        try {
            const updateData = { ...enquiryData };
            
            // If slot date/time was edited, include them in the update
            if (editSlotDate && editSlotTime) {
                updateData.preferDate = editSlotDate;
                updateData.preferTime = editSlotTime;
            }

            const res = await axios.put(
                `${BACKEND_URL}/api/update-enquiry/${id}`,
                updateData
            );

            toast.success("Enquiry updated successfully!");
            setOpenPopup(false);
            setEditSlotDate(null);
            setEditSlotTime("");
        } catch (err) {
            console.error(err);
            toast.error("Update failed. Check console.");
        }
    };
    const formatToDDMMYYYY = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        if (isNaN(date)) return "";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const formatDateForInput = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formatTimeString = (timeString) => {
        if (!timeString) return "";

        // CASE 1 → already correct (HH:MM)
        if (/^\d{2}:\d{2}$/.test(timeString)) {
            return timeString;
        }

        // CASE 2 → "10:30 AM" format
        const date = new Date(`1970-01-01 ${timeString}`);
        if (!isNaN(date)) {
            const hrs = String(date.getHours()).padStart(2, "0");
            const mins = String(date.getMinutes()).padStart(2, "0");
            return `${hrs}:${mins}`;
        }

        // CASE 3 → "10:30:00" format
        if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
            return timeString.substring(0, 5);
        }

        return ""; // fallback
    };









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


                            <CardContent
                                sx={{
                                    border: "1px solid #d0d0d0",
                                    borderRadius: "10px",
                                    p: 0,
                                    bgcolor: "#fff",
                                    overflow: "hidden",
                                    boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                                    fontSize: "13px",
                                }}
                            >
                                {/* HEADER */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        px: 2,
                                        py: 1,
                                        bgcolor: "#029898",
                                        color: "#fff",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                                        Task ID: {enquiryData.enquiryId}
                                    </Typography>

                                    <Typography sx={{ fontSize: "12px" }}>
                                        Enquired At: {formatToDDMMYYYY(enquiryData.enquiryDate)}
                                    </Typography>
                                </Box>

                                {/* VISITOR DETAILS */}
                                <Box sx={{ px: 2, pt: 1.5 }}>

                                    {/* SECTION TITLE */}
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            color: "#029898",
                                            mb: 1.5
                                        }}
                                    >
                                        Visitor Details
                                    </Typography>

                                    {/* FIELD BLOCK */}
                                    {[
                                        { label: "Name", value: enquiryData.name },
                                        // { label: "Country", value: enquiryData.country },
                                        { label: "State", value: enquiryData.state },
                                        { label: "City", value: enquiryData.city },
                                        { label: "Street", value: enquiryData.street },
                                        { label: "Landmark", value: enquiryData.landmark },
                                        { label: "Phone", value: enquiryData.phoneNumber },
                                        { label: "Email", value: enquiryData.email },
                                        { label: "Sq-Feet", value: enquiryData.sqFeet },



                                    ].map((item, index) => (
                                        <Box key={index}>

                                            {/* Row */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    mb: 1,
                                                }}
                                            >
                                                {/* LABEL */}
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "13px",
                                                        width: "120px"
                                                    }}
                                                >
                                                    {item.label}
                                                </Typography>

                                                {/* VALUE */}
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                        fontWeight: 500,
                                                        color: "#333",
                                                        flex: 1,
                                                        textAlign: "right"
                                                    }}
                                                >
                                                    {item.value}
                                                </Typography>
                                            </Box>

                                            {/* Divider */}
                                            <Box
                                                sx={{
                                                    height: "1px",
                                                    bgcolor: "#e5e5e5",
                                                    mb: 1.2
                                                }}
                                            />
                                        </Box>
                                    ))}

                                    {/* SLOT BOOKING SECTION */}
                                    {enquiryData.preferDate && (
                                        <>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: "#029898",
                                                    mb: 2
                                                }}
                                            >
                                                Preferred Inspection Slot
                                            </Typography>
                                            
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    bgcolor: "#e0f9f9",
                                                    borderRadius: "12px",
                                                    border: "1px solid #b2eaea",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                    mb: 1
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: "10px",
                                                        bgcolor: "#029898",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: "#fff"
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                                                        <CalendarTodayIcon sx={{ fontSize: 18 }} />
                                                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <Typography fontSize="12px" color="#666">Booked Appointment Slot</Typography>
                                                    <Typography fontSize="14px" fontWeight={700} color="#029898">
                                                        {formatToDDMMYYYY(enquiryData.preferDate)} at {formatTime(enquiryData.preferTime)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    )}

                                </Box>

                                {/* CHECKBOX SECTION */}
                                {enquiryData.initialAmount == null ? (
                                    <Box
                                        sx={{
                                            borderTop: "1px solid #e5e5e5",
                                            borderBottom: "1px solid #e5e5e5",
                                        px: 2,
                                        py: 1.5,
                                        bgcolor: "#fafafa",
                                        mt: 0.5,
                                    }}
                                >
                                    <FormGroup sx={{ gap: 0.5 }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            {/* FIRST CHECKBOX */}
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={detailsMatched}
                                                        onChange={(e) => {
                                                            setDetailsMatched(e.target.checked);
                                                        }}
                                                        sx={{
                                                            color: "#029898",
                                                            "&.Mui-checked": { color: "#029898" },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={{ fontSize: "12px" }}>
                                                        Given Details Are Matched
                                                    </Typography>
                                                }
                                            />

                                            {/* VIEW TEXT */}
                                            <Typography
                                                onClick={() => setOpenPopup(true)}
                                                sx={{
                                                    fontSize: "12px",
                                                    color: "#029898",
                                                    textAlign: "right",
                                                    fontWeight: 600,
                                                    cursor: "pointer",
                                                    ml: "auto",
                                                    textDecoration: "underline",
                                                    "&:hover": { color: "#027c7c" },
                                                }}
                                            >
                                                View
                                            </Typography>
                                        </Box>

                                        {/* SECOND CHECKBOX only when first is checked */}
                                        {detailsMatched && (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={siteEstimated}
                                                        onChange={(e) => {
                                                            setSiteEstimated(e.target.checked);
                                                            if (e.target.checked) setOpenEstimatePopup(true);
                                                        }}
                                                        sx={{
                                                            color: "#029898",
                                                            "&.Mui-checked": { color: "#029898" },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={{ fontSize: "12px" }}>
                                                        Site Estimation Provided
                                                    </Typography>
                                                }
                                            />
                                        )}
                                    </FormGroup>
                                </Box> ) : null
                                }   



                                {/* BUTTONS */}
                                <Box sx={{ display: "flex", gap: 1, px: 2, py: 2 }}>
                                    {!enquiryData.initialAmount == null ? (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                fullWidth
                                                onClick={() => setOpenRejectPopup(true)}
                                                sx={{
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                    textTransform: "none",
                                                    py: 0.6
                                                }}
                                            >
                                                Deny
                                            </Button>

                                            <Button
                                                variant="contained"
                                                fullWidth
                                                sx={{
                                                    bgcolor: "#029898",
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                    textTransform: "none",
                                                    py: 0.6,
                                                    "&:hover": { bgcolor: "#027c7c" },
                                                }}
                                            >
                                                Accept
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => setOpenPopup(true)}
                                            sx={{
                                                bgcolor: "#029898",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                textTransform: "none",
                                                py: 0.6,
                                                "&:hover": { bgcolor: "#027c7c" },
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>







                        </Grid>

                        {/* Right Section - Assign Partner */}
                        {enquiryData.initialAmount != null && (
                       <Grid item xs={12} md={8} lg={8} xl={8} sx={{ width: { xs: "100%", md: "60%" } }}>
                                                        <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                                                            Assign To Manager
                                                        </Typography>
                    
                                                        {/* Partner List */}
                                                        <CardContent
                                                            sx={{
                                                                mb: 2,
                                                                border: "1px solid #abababff",
                                                                borderRadius: "14px",
                                                                p: 0,
                                                                // boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                                                                overflow: "hidden",
                                                            }}
                                                        >
                                                            {/* Filter & Search Bar Section */}
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: 2,
                                                                    p: 2,
                                                                    flexWrap: "wrap",
                                                                    borderBottom: "1px solid #eee",
                                                                    bgcolor: "#fff"
                                                                }}
                                                            >
                                                                {/* Filter Styles reused from NewEnquiry.jsx */}
                                                                {[
                                                                    { label: "Country", options: ["India", "USA"] },
                                                                    { label: "State", options: ["California", "Texas"] },
                                                                    { label: "Region", options: ["North", "South"] },
                                                                    { label: "District", options: ["District 1", "District 2"] }
                                                                ].map((filter, idx) => (
                                                                    <FormControl
                                                                        key={idx}
                                                                        size="small"
                                                                        sx={{
                                                                            width: "150px",
                                                                            backgroundColor: "#f9f9f9",
                                                                            borderRadius: "6px",
                                                                            "& .MuiOutlinedInput-root": {
                                                                                height: "34px",
                                                                                fontSize: "12px",
                                                                                borderRadius: "6px",
                                                                                "& fieldset": { borderColor: "#d0d0d0" },
                                                                                "&:hover fieldset": { borderColor: "#a1a1a1" },
                                                                                "&.Mui-focused fieldset": { borderColor: "#029898" },
                                                                            },
                                                                            "& .MuiInputLabel-root": { fontSize: "12px", color: "#666" },
                                                                            "& .MuiSelect-select": { fontSize: "12px", padding: "6px 10px" },
                                                                        }}
                                                                    >
                                                                        <InputLabel>{filter.label}</InputLabel>
                                                                        <Select
                                                                            label={filter.label}
                                                                            defaultValue=""
                                                                            sx={{ height: "34px" }}
                                                                        >
                                                                            <MenuItem value="" sx={{ fontSize: "12px" }}>All</MenuItem>
                                                                            {filter.options.map((opt) => (
                                                                                <MenuItem key={opt} value={opt} sx={{ fontSize: "12px" }}>{opt}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                ))}
                    
                    
                                                            </Box>
                    
                                                            {managers.map((p, index) => (
                                                                <Box
                                                                    key={index}
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "space-between",
                                                                        p: 2,
                                                                        borderBottom: "1px solid #eee",
                                                                        transition: "background-color 0.2s",
                                                                        "&:hover": { bgcolor: "#f9fafb" }, // Subtle hover effect
                                                                    }}
                                                                >
                                                                    {/* Avatar & Name */}
                                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "30%" }}>
                                                                        <Avatar sx={{ width: 40, height: 40, bgcolor: "#029898" }}>
                                                                            {p.name ? p.name.charAt(0).toUpperCase() : "M"}
                                                                        </Avatar>
                                                                        <Box>
                                                                            <Typography sx={{ fontWeight: 600, fontSize: "14px", color: "#333" }}>
                                                                                {p.name || "Manager Name"}
                                                                            </Typography>
                                                                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                                                                                {/* {p.status || "Active"} | Tasks: {p.taskCount || 0} */}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                    
                                                                    {/* Location / Details */}
                                                                    <Box sx={{ width: "40%" }}>
                                                                        {/* Tags - Now including City and Region */}
                                                                        <Box display={"flex"} gap={1} flexWrap="wrap">
                                                                            {[p.city, p.region, p.state, p.district].filter(Boolean).map((tag, i) => (
                                                                                <Box
                                                                                    key={i}
                                                                                    sx={{
                                                                                        border: "1px solid #e0e0e0",
                                                                                        px: 1,
                                                                                        py: 0.25,
                                                                                        fontSize: "11px",
                                                                                        bgcolor: "#f5f5f5",
                                                                                        color: "#666",
                                                                                        borderRadius: "4px",
                                                                                        fontWeight: 500
                                                                                    }}
                                                                                >
                                                                                    {tag}
                                                                                </Box>
                                                                            ))}
                                                                        </Box>
                                                                    </Box>
                    
                                                                    {/* Actions & Contact */}
                                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 3, width: "30%", justifyContent: "flex-end" }}>
                                                                        <Box sx={{ textAlign: "right" }}>
                                                                            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#333" }}>
                                                                                {p.companyPhoneNumber || "Mobile No"}
                                                                            </Typography>
                                                                            <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                                                                                {p.technicians || 0} LSP
                    
                                                                            </Typography>
                                                                        </Box>
                    
                                                                        <Button
                                                                            variant="contained"
                                                                            size="small"
                                                                            sx={{
                                                                                bgcolor: (enquiryData.assignedManager?._id === p._id || enquiryData.assignedManager === p._id) ? "#017575" : "#029898",
                                                                                borderRadius: "6px",
                                                                                textTransform: "none",
                                                                                boxShadow: "none",
                                                                                px: 3,
                                                                                "&:hover": { bgcolor: (enquiryData.assignedManager?._id === p._id || enquiryData.assignedManager === p._id) ? "#017575" : "#027c7c", boxShadow: "none" },
                                                                            }}
                                                                            onClick={() => {
                                                                                const isAssigned = (enquiryData.assignedManager?._id === p._id || enquiryData.assignedManager === p._id);
                                                                                if (!isAssigned) assignManager(p._id);
                                                                            }}
                                                                            disabled={enquiryData.assignedManager?._id === p._id || enquiryData.assignedManager === p._id}
                                                                        >
                                                                            {(enquiryData.assignedManager?._id === p._id || enquiryData.assignedManager === p._id) ? "Assigned" : "Assign"}
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
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
                    },
                }}
            >
                {/* HEADER */}
                <DialogTitle
                    sx={{
                        backgroundColor: "#029898",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1rem",
                        px: 3,
                        py: 1.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Enquiry Details

                    {/* CLOSE BUTTON */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                            },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                </DialogTitle>

                {/* CONTENT */}
                <DialogContent sx={{ px: 3, py: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {/* SLOT BOOKING SECTION */}
                        <Box sx={{ mb: 3, pb: 2, borderBottom: "1px solid #e5e5e5" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#029898", mb: 2 }}>
                                Edit Inspection Slot
                            </Typography>

                            <Grid container spacing={2}>
                                {/* Date Picker */}
                                <Grid item xs={12} md={editSlotDate ? 6 : 12}>
                                    <Box>
                                        <Typography fontWeight="600" fontSize="13px" mb={1}>
                                            Select Date
                                        </Typography>
                                        <DatePicker
                                            value={editSlotDate || enquiryData.preferDate}
                                            onChange={(newValue) => setEditSlotDate(newValue)}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    InputProps: {
                                                        sx: {
                                                            height: 36,
                                                            borderRadius: "6px",
                                                            backgroundColor: "#f1f1f1",
                                                            "& fieldset": { border: "none !important" },
                                                            "&:hover fieldset": { border: "none !important" },
                                                            "&.Mui-focused fieldset": { border: "none !important" },
                                                        },
                                                    },
                                                    inputProps: { style: { fontWeight: 400, paddingLeft: 12, fontSize: "13px" } },
                                                },
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                {/* Time Slots - Show only when date is selected */}
                                {(editSlotDate || enquiryData.preferDate) && (
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography fontWeight="600" fontSize="13px" mb={1}>
                                                Select Time
                                            </Typography>
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                {timeSlots.map((slot) => (
                                                    <Button
                                                        key={slot}
                                                        onClick={() => setEditSlotTime(slot)}
                                                        variant={(editSlotTime || enquiryData.preferTime) === slot ? "contained" : "outlined"}
                                                        sx={{
                                                            fontSize: "12px",
                                                            padding: "6px 12px",
                                                            borderRadius: "6px",
                                                            textTransform: "none",
                                                            bgcolor: (editSlotTime || enquiryData.preferTime) === slot ? "#029898" : "#fff",
                                                            color: (editSlotTime || enquiryData.preferTime) === slot ? "#fff" : "#029898",
                                                            border: (editSlotTime || enquiryData.preferTime) === slot ? "none" : "1px solid #029898",
                                                            "&:hover": {
                                                                bgcolor: (editSlotTime || enquiryData.preferTime) === slot ? "#027c7c" : "#f0f0f0",
                                                            },
                                                        }}
                                                    >
                                                        {formatTimeDisplay(slot)}
                                                    </Button>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}

                                {/* Selected Slot Confirmation */}
                                {(editSlotDate || enquiryData.preferDate) && (editSlotTime || enquiryData.preferTime) && (
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                bgcolor: "#e0f9f9",
                                                borderRadius: "8px",
                                                border: "1px solid #b2eaea",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: "8px",
                                                    bgcolor: "#029898",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#fff"
                                                }}
                                            >
                                                <Box sx={{ display: "flex", gap: 0.3, fontSize: "14px" }}>
                                                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                                                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography fontSize="12px" color="#666">Updated Appointment Slot</Typography>
                                                <Typography fontSize="13px" fontWeight={700} color="#029898">
                                                    {(editSlotDate || enquiryData.preferDate)?.toLocaleDateString?.("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric" })} at {formatTimeDisplay(editSlotTime || enquiryData.preferTime)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 2,
                                mt: 1,
                            }}
                        >
                            {[
                                { label: "Name", field: "name" },
                                { label: "State", field: "state" },
                                { label: "Mobile No.", field: "phoneNumber" },
                                { label: "E-Mail", field: "email" },
                                { label: "Total Sq. Feet", field: "sqFeet" },
                                { label: "District", field: "district" },
                                { label: "City", field: "city" },
                                { label: "Landmark", field: "landmark" },
                            ].map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "48%",
                                            md: "23%",
                                        },
                                    }}
                                >
                                    <Typography fontWeight={600} fontSize="13px" mb={0.5}>
                                        {item.label}
                                    </Typography>

                                    {/* ------------ DATE FIELD ------------ */}
                                    {
                                        item.type === "date" ? (
                                            <StyledInput
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}    // ⬅️ Prevent past dates
                                                value={formatDateForInput(enquiryData[item.field])}
                                                onChange={(e) =>
                                                    setEnquiryData({
                                                        ...enquiryData,
                                                        [item.field]: e.target.value
                                                    })
                                                }
                                            />

                                        ) : item.type === "time" ? (
                                            <StyledInput
                                                type="time"
                                                value={formatTimeString(enquiryData[item.field])}
                                                onChange={(e) =>
                                                    setEnquiryData({ ...enquiryData, [item.field]: e.target.value })
                                                }
                                                min={item.min}
                                            />

                                        ) : (
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={enquiryData[item.field] || ""}
                                                onChange={(e) =>
                                                    setEnquiryData({ ...enquiryData, [item.field]: e.target.value })
                                                }
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        height: "36px",
                                                        bgcolor: "#f1f1f1",
                                                        borderRadius: "6px",
                                                        "& input": { padding: "8px", fontSize: "13px" },
                                                        "& fieldset": { border: "none" },
                                                    }
                                                }}
                                            />
                                        )
                                    }

                                </Box>
                            ))}


                        </Box>
                    </LocalizationProvider>

                    <Divider sx={{ my: 2 }} />
                </DialogContent>



                {/* FOOTER */}
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleUpdateEnquiry}
                        sx={{
                            bgcolor: "#029898",
                            color: "#fff",
                            px: 4,
                            py: 0.8,
                            borderRadius: "6px",
                            textTransform: "none",
                            fontSize: "13px",
                            "&:hover": { bgcolor: "#027c7c" },
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
                {/* HEADER */}
                <DialogTitle
                    sx={{
                        backgroundColor: "#029898",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1rem",
                        px: 2.5,
                        py: 1.3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Estimation Details

                    <IconButton
                        onClick={() => setOpenEstimatePopup(false)}
                        sx={{
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.15)",
                            },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                </DialogTitle>


                <DialogContent sx={{ px: 2.5, pt: 1.9, pb: 0.9 }}>
                    <Grid display={"flex"} spacing={1.5} mt={1} gap={3}>

                        {/* SQ FEET */}
                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Total Square Feet
                            </Typography>
                            <TextField
                                size="small"
                                value={sqFeetEst}
                                onChange={(e) => setSqFeetEst(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: "36px",
                                        bgcolor: "#f1f1f1",
                                        borderRadius: "6px",
                                        "& input": { padding: "8px", fontSize: "13px" },
                                        "& fieldset": { border: "none" },
                                    }
                                }}
                            />
                        </Box>

                        {/* AMOUNT PER SQ FEET */}
                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Amount Per Sq.Feet
                            </Typography>
                            <TextField
                                size="small"
                                value={amountPerSqFeetEst}
                                disabled
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: "36px",
                                        bgcolor: "#f1f1f1",
                                        borderRadius: "6px",
                                        "& input": {
                                            padding: "8px",
                                            fontSize: "13px",
                                            color: "#000",           // 🔥 TEXT COLOR BLACK
                                            fontWeight: 600          // 🔥 TEXT BOLD
                                        },
                                        "& fieldset": { border: "none" },
                                    }
                                }}
                            />
                        </Box>

                        {/* TOTAL AMOUNT */}
                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Total Amount
                            </Typography>
                            <TextField
                                size="small"
                                value={totalAmountEst}
                                disabled
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: "36px",
                                        bgcolor: "#f1f1f1",
                                        borderRadius: "6px",
                                        "& input": {
                                            padding: "8px",
                                            fontSize: "13px",
                                            color: "#000",           // 🔥 TEXT COLOR BLACK
                                            fontWeight: 600          // 🔥 TEXT BOLD
                                        },
                                        "& fieldset": { border: "none" },
                                    }
                                }}
                            />
                        </Box>

                        {/* DISCOUNT */}
                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Discount
                            </Typography>
                            <TextField
                                size="small"
                                type="number"
                                value={discountEst}
                                onChange={(e) => setDiscountEst(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: "36px",
                                        bgcolor: "#f1f1f1",
                                        borderRadius: "6px",
                                        "& input": { padding: "8px", fontSize: "13px" },
                                        "& fieldset": { border: "none" },
                                    }
                                }}
                            />
                        </Box>

                        {/* GRAND AMOUNT */}
                        <Box mt={2}>
                            <Typography fontWeight="600" fontSize="13px">
                                Grand Amount
                            </Typography>
                            <TextField
                                size="small"
                                value={grandAmountEst}
                                disabled
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: "36px",
                                        bgcolor: "#f1f1f1",
                                        borderRadius: "6px",
                                        "& input": {
                                            padding: "8px",
                                            fontSize: "13px",
                                            color: "#000",           // 🔥 TEXT COLOR BLACK
                                            fontWeight: 600          // 🔥 TEXT BOLD
                                        },
                                        "& fieldset": { border: "none" },
                                    }
                                }}
                            />
                        </Box>

                    </Grid>


                    <Divider sx={{ my: 1.5 }} />
                </DialogContent>


                {/* FOOTER */}
                <DialogActions sx={{ px: 2.5, pb: 1.5 }}>
                    <Button
                        variant="contained"
                        onClick={() => sendPaymentEmail()}
                        disabled={grandAmountEst === "Invalid"}   // ⬅️ Disable when invalid
                        sx={{
                            bgcolor: grandAmountEst === "Invalid" ? "#cccccc" : "#029898",
                            color: "#fff",
                            px: 3,
                            py: 0.6,
                            textTransform: "none",
                            borderRadius: "4px",
                            fontSize: "13px",
                            "&:hover": {
                                bgcolor: grandAmountEst === "Invalid" ? "#cccccc" : "#036d6dff",
                            },
                        }}
                    >
                        Send Payment Link
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

            {/* Rejection Reason Popup */}
            <Dialog
                open={openRejectPopup}
                onClose={() => {
                    setOpenRejectPopup(false);
                    setRejectionReason("");
                }}
                maxWidth="sm"
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
                {/* HEADER */}
                <DialogTitle
                    sx={{
                        backgroundColor: "#029898",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1rem",
                        px: 2.5,
                        py: 1.3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Rejection Reason

                    <IconButton
                        onClick={() => {
                            setOpenRejectPopup(false);
                            setRejectionReason("");
                        }}
                        sx={{
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.15)",
                            },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                </DialogTitle>

                {/* CONTENT */}
                <DialogContent sx={{ px: 2.5, py: 2 }}>
                    <Box>
                        <Typography fontWeight="600" fontSize="13px" mb={1}>
                            Please provide reason for rejection
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Enter rejection reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#f1f1f1",
                                    borderRadius: "6px",
                                    "& fieldset": { border: "none" },
                                    "&:hover fieldset": { border: "none" },
                                    "&.Mui-focused fieldset": { 
                                        border: "2px solid #029898 !important" 
                                    },
                                    "& textarea": {
                                        padding: "8px",
                                        fontSize: "13px",
                                        color: "#000",
                                    }
                                }
                            }}
                        />
                    </Box>
                </DialogContent>

                {/* FOOTER */}
                <DialogActions sx={{ px: 2.5, pb: 2, pt: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setOpenRejectPopup(false);
                            setRejectionReason("");
                        }}
                        sx={{
                            color: "#029898",
                            borderColor: "#029898",
                            textTransform: "none",
                            fontSize: "13px",
                            fontWeight: 600,
                            "&:hover": { 
                                borderColor: "#027c7c",
                                color: "#027c7c"
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={rejectEnquiry}
                        sx={{
                            bgcolor: "#029898",
                            color: "#fff",
                            textTransform: "none",
                            fontSize: "13px",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#027c7c" },
                        }}
                    >
                        Reject
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default NewEnquiryDetails;