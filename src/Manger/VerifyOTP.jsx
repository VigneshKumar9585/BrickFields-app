import React, { useState, useRef } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
    Box,
    Paper,
    Button,
    Typography,
    Link,
    Alert,
    CircularProgress,
} from "@mui/material";
import axios from "../utils/axios";
import logo from "../assets/logo/logo.webp";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [resending, setResending] = useState(false);

    const inputRefs = useRef([]);

    // Redirect if no email in state
    React.useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);

        // Focus last filled input
        const lastIndex = Math.min(pastedData.length, 5);
        inputRefs.current[lastIndex]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            setError("Please enter complete 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post('/api/auth/verify-otp', {
                email,
                otp: otpValue,
            });

            const data = response.data;

            // Navigate to reset password with token
            setTimeout(() => {
                navigate('/reset-password', { state: { email } });
            }, 1000);

        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResending(true);
        setError("");
        setSuccess("");

        try {
            await axios.post('/api/auth/send-otp', {
                email,
            });

            setSuccess("OTP has been resent to your email");
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
        } finally {
            setResending(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                flexDirection: { xs: "column", md: "row" },
            }}
        >
            {/* Left Side */}
            <Box
                sx={{
                    flex: "0 0 60%",
                    backgroundColor: "#F0F6F6",
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 2,
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "500px", height: "auto", objectFit: "contain" }}
                    />
                </Box>
            </Box>

            {/* Right Side */}
            <Box
                sx={{
                    flex: "0 0 40%",
                    backgroundColor: "#d9d9d9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                    height: "100%",
                }}
            >
                {/* OTP Verification Card */}
                <Paper
                    sx={{
                        width: "100%",
                        maxWidth: "420px",
                        padding: "32px",
                        borderRadius: "30px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: "center",
                                fontWeight: "normal",
                                color: "#333333",
                                fontSize: "24px",
                            }}
                        >
                            Verify OTP
                        </Typography>

                        <Typography
                            sx={{
                                textAlign: "center",
                                color: "#666666",
                                fontSize: "14px",
                            }}
                        >
                            We've sent a 6-digit code to
                            <br />
                            <strong>{email}</strong>
                        </Typography>

                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}

                        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            {/* OTP Input */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "12px",
                                }}
                            >
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            fontSize: "24px",
                                            fontWeight: "600",
                                            textAlign: "center",
                                            border: "2px solid #ebebeb",
                                            borderRadius: "8px",
                                            backgroundColor: "#ebebeb",
                                            outline: "none",
                                            transition: "all 0.2s",
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = "#029898";
                                            e.target.style.backgroundColor = "#ffffff";
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = "#ebebeb";
                                            e.target.style.backgroundColor = "#ebebeb";
                                        }}
                                    />
                                ))}
                            </Box>

                            <Typography
                                sx={{
                                    textAlign: "center",
                                    marginTop: "-8px",
                                    color: "#9b9b9bff",
                                    fontSize: "12px",
                                }}
                            >
                                Enter the 6-digit code sent to your email
                            </Typography>

                            {/* Verify button */}
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading || otp.join("").length !== 6}
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#029898",
                                        color: "#ffffff",
                                        height: "48px",
                                        borderRadius: "4px",
                                        textTransform: "none",
                                        fontSize: "16px",
                                        fontWeight: "normal",
                                        "&:hover": {
                                            backgroundColor: "#038080ff",
                                        },
                                        "&:disabled": {
                                            backgroundColor: "#cccccc",
                                        },
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
                                </Button>
                            </Box>

                            {/* Resend OTP */}
                            {/* <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                <Typography sx={{ fontSize: "14px", color: "#666" }}>
                                    Didn't receive the code?
                                </Typography>
                                <Button
                                    onClick={handleResendOTP}
                                    disabled={resending || loading}
                                    sx={{
                                        color: "#029898",
                                        fontSize: "14px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        padding: 0,
                                        minWidth: "auto",
                                        "&:hover": {
                                            backgroundColor: "transparent",
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    {resending ? "Resending..." : "Resend OTP"}
                                </Button>
                            </Box> */}

                            {/* Back to Login */}
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                                <Link
                                    component={RouterLink}
                                    to="/"
                                    sx={{
                                        color: "#333",
                                        fontSize: "14px",
                                        textDecoration: "underline",
                                        "&:hover": { textDecoration: "none" },
                                    }}
                                >
                                    Back to Login
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default VerifyOTP;
