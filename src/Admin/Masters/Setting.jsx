import React from "react";
import Navbar from "../../componts/AdminNavbar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  Grid,
} from "@mui/material";

const getTextFieldSx = () => ({
  "& .MuiOutlinedInput-root": {
    height: "34px",
    bgcolor: "#e0e0e0",
    borderRadius: "4px",
    "& input": {
      padding: "6px 8px",
      fontSize: "12px",
      color: "#000",
    },
    "& fieldset": { border: "none" },
  },
});

const SectionCard = ({ title, fields }) => {
  return (
    <Card
      sx={{
        mb: 2,
        bgcolor: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#029898",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            textTransform: "none",
            fontSize: "12px",
            "&:hover": { bgcolor: "#f1f1f1" },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  mb: 0.5,
                  color: "#000",
                }}
              >
                {field.label}
              </Typography>
              <TextField fullWidth variant="outlined" sx={getTextFieldSx()} />
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Link
            href="#"
            underline="hover"
            sx={{ fontSize: 13, color: "#000", fontWeight: 500 }}
          >
            Note
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function MasterSettings() {
  return (
    <>
      <Navbar />

      <Box minHeight="100vh" bgcolor="#fff" display="flex" gap={3}>
        <Box sx={{ width: "250px", height: "100px" }} />

        <Box sx={{ m: 0, p: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
            Master{" "}
            <Typography component="span" sx={{ color: "gray" }}>
              | Settings
            </Typography>
          </Typography>

          <Box maxWidth="1150px">
            <SectionCard
              title="Email Configuration"
              fields={[
                { label: "Email ID" },
                { label: "App Password" },
              ]}
            />

            <SectionCard
              title="Mobile SMS"
              fields={[
                { label: "API Site Key" },
                { label: "Secret Key" },
              ]}
            />

            {/* <SectionCard
              title="Google Map API Key"
              fields={[{ label: "API Key" }]}
            /> */}

            <SectionCard
              title="Payment (Razor)"
              fields={[
                { label: "API Site Key" },
                { label: "API Secret Key" },
              ]}
            />

            <SectionCard
              title="Amount Calculation"
              fields={[{ label: "Square Feet Per Value" }]}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
