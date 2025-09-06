// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";   // ✅ import router

// ✅ Create custom theme with Poppins
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>   {/* ✅ wrap App in router */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
