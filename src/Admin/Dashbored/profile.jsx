import React, { useState } from "react";
import Navbar from "../../componts/AdminNavbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function Profile() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    role: "",
  });

  // ✅ Upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  // ✅ Handle input change
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Handle clear
  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      role: "",
    });
    setImage(null);
  };

  // ✅ Submit form
  const handleSubmit = () => {
    console.log("Profile data submitted:", formData);
  };

  const fields = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email ID", key: "email" },
    { label: "Mobile Number", key: "mobile" },
    { label: "Role", key: "role" },
  ];

  const getTextFieldSx = {
    "& .MuiOutlinedInput-root": {
      height: "30px",
      width:"200px",
      bgcolor: "#e0e0e0",
      borderRadius: "4px",
      "& input": {
        padding: "4px 8px",
        fontSize: "12px",
      },
      "& fieldset": { border: "none" },
    },
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#fff", minHeight: "100vh", p: 4,width:"800px",ml:"280px" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "left",
            mb: 2,
          }}
        >
          Profile
        </Typography>

        <Card sx={{ bgcolor: "#f5f5f5", boxShadow: "none", p: 3, maxWidth: 1100, mx: "auto" }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#000",
                mb: 2,
              }}
            >
              Personal Data
            </Typography>

            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
              {/* Form Fields */}
              <Grid container spacing={2} sx={{ flex: 1 }}>
                {fields.map((field, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: "#000",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {field.label}
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      sx={getTextFieldSx}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Profile Image */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
                sx={{ pr: "100px" }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "2px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    bgcolor: "#e0e0e0",
                  }}
                >
                  {image ? (
                    <Avatar
                      src={image}
                      alt="Profile"
                      sx={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id="upload-input"
                      />
                      <label htmlFor="upload-input">
                        <IconButton component="span" sx={{ color: "#029898" }}>
                          <AddPhotoAlternateIcon />
                        </IconButton>
                      </label>
                    </>
                  )}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 14,
                    color: "#029898",
                    cursor: "pointer",
                    mt: 0.5,
                    fontWeight: 500,
                  }}
                  onClick={() => setImage(null)}
                >
                  {image ? "Edit" : "Add"}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Bottom Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            p: 2,
            bgcolor: "#f5f5f5",
            maxWidth: 1100,
            mx: "auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClear}
            sx={{
              textTransform: "none",
              fontSize: "14px",
              borderColor: "#bdbdbd",
              color: "#424242",
              bgcolor: "#f5f5f5",
              "&:hover": { bgcolor: "#e0e0e0" },
              width: "170px",
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              fontSize: "14px",
              bgcolor: "#029898",
              color: "white",
              "&:hover": { bgcolor: "#017f7f" },
              width: "170px",
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
}
