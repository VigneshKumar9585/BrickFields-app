import React, { useState, useEffect, useRef } from "react"; // Import useRef
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import Notifications from "../assets/icons/Group 139.png";
import logo from "../assets/logo/logo.webp";
import { TbLockPassword, TbLogout } from "react-icons/tb";
import LaunchIcon from "@mui/icons-material/Launch";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SidebarLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState({
    Enquiry: false,
    "Add User": false,
    Master: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const location = useLocation();

  // Use a ref to track if it's the initial render, to avoid closing on first mount
  const isInitialMount = useRef(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const activeLinkStyles = ({ isActive }) => ({
    backgroundColor: isActive ? "#e0f7fa" : "transparent",
    color: isActive ? "#00796b" : "rgba(0, 0, 0, 1)",
    fontWeight: isActive ? 600 : 400,
    borderRadius: "8px",
    margin: "0 8px",
    width: "calc(100% - 16px)",
    "& .MuiListItemIcon-root": {
      color: isActive ? "#00796b" : "black",
    },
    "& .MuiListItemText-primary": {
      color: isActive ? "#00796b" : "rgba(0, 0, 0, 1)",
    },
  });

  const isSubmenuActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };



  // Strictly toggles the state when parent is clicked
// ✅ Keep parent menu open when any of its subroutes are active
const toggleOpen = (key) => {
  setOpenKeys((prev) => ({
    ...prev,
    [key]: !prev[key], // Toggle only when clicking parent
  }));
};

// ✅ Keep submenu open if route matches any of its children
useEffect(() => {
  if (location.pathname.startsWith("/enquiry/")) {
    setOpenKeys((prev) => ({ ...prev, Enquiry: true }));
  }
  if (location.pathname.startsWith("/user/")) {
    setOpenKeys((prev) => ({ ...prev, "Add User": true }));
  }
}, [location.pathname]);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div
      style={{
        height: "100%",
        backgroundColor: "#F0F6F6",
        color: "rgba(0, 0, 0, 1)",
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
          style={{ width: "140px", height: "auto", objectFit: "contain" }}
        />
      </Box>

      <List>
        {/* Dashboard */}
        <ListItemButton
          component={NavLink}
          to="/lsp-dashboard"
          onClick={handleDrawerToggle}
          style={activeLinkStyles}
          sx={{ color: "rgba(0, 0, 0, 1)" }}
        >
          <DashboardIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} />

        {/* Enquiry */}
        <ListItemButton
          onClick={() => toggleOpen("Enquiry")}
          sx={{
            color: "black",
            margin: "0 8px",
            width: "calc(100% - 16px)",
            backgroundColor: (openKeys.Enquiry || isSubmenuActive(["/lsp-new-enquiry", "/lsp-manage-enquiry"])) ? "#e0f7fa" : "transparent",
            fontWeight: (openKeys.Enquiry || isSubmenuActive(["/lsp-new-enquiry", "/lsp-manage-enquiry"])) ? 600 : 400,
            "& .MuiListItemIcon-root": {
              color: (openKeys.Enquiry || isSubmenuActive(["/lsp-new-enquiry", "/lsp-manage-enquiry"])) ? "#00796b" : "black",
            },
            "& .MuiListItemText-primary": {
              color: (openKeys.Enquiry || isSubmenuActive(["/lsp-new-enquiry", "/lsp-manage-enquiry"])) ? "#00796b" : "rgba(0, 0, 0, 1)",
            },
          }}
        >
          <LaunchIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Enquiry"
            primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
          />
          {openKeys.Enquiry ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={openKeys.Enquiry} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, color: "black" }}
              component={NavLink}
              to="/lsp-new-enquiry"
              onClick={handleDrawerToggle}
              style={activeLinkStyles}
            >
              <NewReleasesIcon sx={{ mr: 2, color: "black" }} />
              <ListItemText
                primary="New Enquiry"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, color: "black" }}
              component={NavLink}
              to="/lsp-manage-enquiry"
              onClick={handleDrawerToggle}
              style={activeLinkStyles}
            >
              <ManageHistoryIcon sx={{ mr: 2, color: "black" }} />
              <ListItemText
                primary="Manage Enquiry"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} />

        {/* Add User */}
        <ListItemButton
          onClick={() => toggleOpen("Add User")}
          sx={{
            color: "black",
            margin: "0 8px",
            width: "calc(100% - 16px)",
            backgroundColor: (openKeys["Add User"] || isSubmenuActive(["/lsp-addLSP", "/lsp-manageLSP"])) ? "#e0f7fa" : "transparent",
            fontWeight: (openKeys["Add User"] || isSubmenuActive(["/lsp-addLSP", "/lsp-manageLSP"])) ? 600 : 400,
            "& .MuiListItemIcon-root": {
              color: (openKeys["Add User"] || isSubmenuActive(["/lsp-addLSP", "/lspmanageLSP"])) ? "#00796b" : "black",
            },
            "& .MuiListItemText-primary": {
              color: (openKeys["Add User"] || isSubmenuActive(["/lsp-addLSP", "/lsp-manageLSP"])) ? "#00796b" : "rgba(0, 0, 0, 1)",
            },
          }}
        >
          <GroupIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Add User"
            primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
          />
          {openKeys["Add User"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={openKeys["Add User"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Add LSP", "Manage LSP"].map((item, idx) => (
              <ListItemButton
                key={item}
                sx={{ pl: 4, color: "black" }}
                component={NavLink}
                to={
                  idx === 0
                    ? "/lsp-addLSP"
                    : idx === 1
                    ? "/lsp-manageLSP"
                    : "/lsp-manageLSP"
                }
                onClick={handleDrawerToggle}
                style={activeLinkStyles}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} />

        {/* Report */}
        <ListItemButton
          component={NavLink}
          to="/lsp-report"
          onClick={handleDrawerToggle}
          style={activeLinkStyles}
          sx={{ color: "black" }}
        >
          <ReportIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Report"
            primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} />

        {/* Inspection */}
        {/* <ListItemButton
          component={NavLink}
          to="/inspection"
          onClick={handleDrawerToggle}
          style={activeLinkStyles}
          sx={{ color: "black" }}
        >
          <AssignmentIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Inspection"
            primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} /> */}
      </List>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ m: 2, mt: 3, display: { sm: "none" }, color: "rgb(0,0,0)" }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              backgroundColor: "#029898",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 260,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, pb: 0, pt: "9px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}></Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <img
                src={Notifications}
                alt="Notifications"
                style={{ width: 30, height: 35 }}
              />
            </IconButton>

            <IconButton onClick={handleMenuOpen}>
              <AccountCircle
                sx={{ width: "55px", height: "55px", color: "black" }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { width: 210, borderRadius: 2 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  pl: 2,
                }}
              >
                <Box>
                  <img
                    src=""
                    alt="profile"
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: "100%",
                      color: "rgb(0,0,0)",
                    }}
                  />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Username
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email Id
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1, borderColor: "#e0e0e0" }} />

              <MenuItem
                onClick={handleMenuClose}
                component={NavLink}
                to="/profile"
              >
                <IconButton size="small" sx={{ mr: 1 }}>
                  <AccountCircle
                    sx={{ width: "20px", height: "20px", color: "black" }}
                  />
                </IconButton>
                Profile
              </MenuItem>
              <Divider sx={{ my: 1, borderColor: "#e0e0e0" }} />

              <MenuItem
                onClick={handleMenuClose}
                component={NavLink}
                to="/change/passwored"
              >
                <IconButton size="small" sx={{ mr: 1 }}>
                  <TbLockPassword />
                </IconButton>
                Change Password
              </MenuItem>
              <Divider sx={{ my: 1, borderColor: "#e0e0e0" }} />

              <MenuItem onClick={handleMenuClose}>
                <IconButton size="small" sx={{ mr: 1 }}>
                  <TbLogout />
                </IconButton>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SidebarLayout;