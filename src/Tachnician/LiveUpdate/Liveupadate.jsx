import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Checkbox,
  TextField,
  Grid,
  Divider,
  Modal,
  Fade,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../../componts/TachnicanNavbar";

const steps = [
  "Technician Departs",
  "Technician Arrives",
  "Work in Progress",
  "Task Completed",
];

function LiveUpdate() {
  const [activeStep, setActiveStep] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [openOTP, setOpenOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [completedTime, setCompletedTime] = useState(null);

 const handleUpdate = () => {
  // Step 1 → Step 2 triggers OTP popup
  if (activeStep === 1) {
    setOpenOTP(true);
  } else if (activeStep < steps.length - 1) {
    setActiveStep((prev) => prev + 1);
    setRemarks("");
  } else {
    // Final step (Completed)
    setCompletedTime({
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }
};


  const handleClose = () => setOpenOTP(false);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(-1);
    setOtp(newOtp);

    if (e.target.value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

const handleSubmitOTP = () => {
  console.log("Entered OTP:", otp.join(""));

  // ✅ Move to next step automatically after OTP submission
  setActiveStep((prev) => prev + 1);

  // Reset remarks & OTP inputs
  setRemarks("");
  setOtp(["", "", "", ""]);

  // Close OTP popup
  setOpenOTP(false);

  // Optionally record timestamp (optional)
  setCompletedTime({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  });
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
        <Box
          sx={{
            width: "260px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        ></Box>

        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Live Update
          </Typography>

          {/* Stepper */}
          <Box sx={{ width: "80%", mb: 4, ml: 20 }}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#029898 !important",
                },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#029898 !important",
                },
                "& .MuiStepConnector-line": {
                  borderColor: "#029898",
                },
                "& .MuiStepIcon-root.Mui-active": {
                  color: "#029898 !important",
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: "#029898 !important",
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Card */}
          <Card
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: 3,
              border: completedTime ? "2px solid #007BFF" : "none",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#029898", mb: 1 }}
                >
                  <Checkbox />
                  {steps[activeStep]}
                </Typography>

                <Grid display="flex" alignItems="center" sx={{ mt: 1, mr: 5, gap: 1 }}>
                  {completedTime ? (
                    <>
                      <Typography sx={{mb:1}}>Date  |  Time</Typography >
                     <Chip
  icon={
    <CheckCircleIcon
      sx={{
        color: "#029898",
        bgcolor: "white",
        borderRadius: "50%",
        p: "2px",
        fontSize: "18px",
      }}
    />
  }
  label="Completed"
  sx={{
    ml: 40,
     mb:1,
    bgcolor: "#029898",
    color: "white",
    fontWeight: 600,
    borderRadius: "16px",
    height: "28px",
    "& .MuiChip-icon": {
      marginLeft: "4px",
    },
  }}
/>

                    </>
                  ) : (
                    <>
                      <Typography>Date </Typography>|<Typography>Time</Typography>
                    </>
                  )}
                </Grid>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography sx={{ mb: 1 }}>Remark</Typography>
                  <TextField
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      width: "1100px",
                      mr: 1,
                      bgcolor: "#f0eeeeff",
                      "& .MuiInputBase-root": {
                        height: "120px",
                        alignItems: "flex-start",
                        padding: "10px",
                      },
                      "& .MuiOutlinedInput-input": {
                        fontSize: "1rem",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid item xs={12} marginLeft="1000px">
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "150px",
                mt: 5,
                bgcolor: "#029898",
                "&:hover": { bgcolor: "#027c7c" },
              }}
            >
              {activeStep === steps.length - 1 ? "Completed" : "Update"}
            </Button>
          </Grid>
        </Box>
      </Box>

      {/* OTP Modal */}
      <Modal open={openOTP} onClose={handleClose} closeAfterTransition>
        <Fade in={openOTP}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Enter An OTP
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mb: 3,
              }}
            >
              {otp.map((value, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  value={value}
                  onChange={(e) => handleOtpChange(e, index)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "20px" },
                  }}
                  sx={{
                    width: "50px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              ))}
            </Box>

           <Button
  variant="contained"
  fullWidth
  sx={{
    bgcolor: "#029898",
    "&:hover": { bgcolor: "#038585ff" },
    borderRadius: "8px",
  }}
  onClick={handleSubmitOTP} // ✅ Enable this
>
  Submit
</Button>

          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default LiveUpdate;
