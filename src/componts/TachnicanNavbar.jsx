import React, { useState, useEffect, useRef } from "react";
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

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import UpdateIcon from "@mui/icons-material/Update";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Assets
import Notifications from "../assets/icons/Group 139.png";
import logo from "../assets/logo/logo.webp";
import { TbLockPassword, TbLogout } from "react-icons/tb";

const SidebarLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState({
    Tasks: false,
    Enquiry: false,
    Inspection: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const location = useLocation();
  const isInitialMount = useRef(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleOpen = (key) => {
    setOpenKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Keep submenu open when route matches
  useEffect(() => {
    if (
      location.pathname.startsWith("/technician-new-task") ||
      location.pathname.startsWith("/technician-current-task")
    ) {
      setOpenKeys((prev) => ({ ...prev, Tasks: true }));
    }
    if (location.pathname.startsWith("/technician-inspection")) {
      setOpenKeys((prev) => ({ ...prev, Inspection: true }));
    }
  }, [location.pathname]);

  const isSubmenuActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  const activeLinkStyles = ({ isActive }) => ({
    backgroundColor: isActive ? "#e0f7fa" : "transparent",
    color: isActive ? "#00796b" : "rgba(0, 0, 0, 1)",
    fontWeight: isActive ? 600 : 400,
    borderRadius: "8px",
    margin: "0 8px",
    width: "calc(100% - 16px)",
  });

  const drawer = (
    <div
      style={{
        height: "100%",
        backgroundColor: "#F0F6F6",
        color: "rgba(0, 0, 0, 1)",
      }}
    >
      {/* ✅ Logo Section */}
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
          to="/technician-dashboard"
          onClick={handleDrawerToggle}
          style={activeLinkStyles}
        >
          <DashboardIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} />

        {/* Tasks */}
        <ListItemButton
          onClick={() => toggleOpen("Tasks")}
          sx={{
            color: "black",
            margin: "0 8px",
            width: "calc(100% - 16px)",
            backgroundColor:
              openKeys.Tasks ||
              isSubmenuActive([
                "/technician-new-task",
                "/technician-current-task",
              ])
                ? "#e0f7fa"
                : "transparent",
            fontWeight:
              openKeys.Tasks ||
              isSubmenuActive([
                "/technician-new-task",
                "/technician-current-task",
              ])
                ? 600
                : 400,
          }}
        >
          <AssignmentTurnedInIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText primary="Tasks" />
          {openKeys.Tasks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={openKeys.Tasks} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/technician-new-task"
              onClick={handleDrawerToggle}
              style={activeLinkStyles}
            >
              <ListItemText
                primary="New Task"
                primaryTypographyProps={{ fontSize: "14px" }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/technician-current-task"
              onClick={handleDrawerToggle}
              style={activeLinkStyles}
            >
              <ListItemText
                primary="Current Task"
                primaryTypographyProps={{ fontSize: "14px" }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} />

        {/* ✅ Enquiry (single link, no child menu) */}
        <ListItemButton
          component={NavLink}
          to="/technician-new-enquiry"
          onClick={handleDrawerToggle}
          style={activeLinkStyles}
        >
          <QuestionAnswerIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Enquiry"
            primaryTypographyProps={{ fontSize: "14px" }}
          />
        </ListItemButton>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} />

        {/* Live Update */}
        <ListItemButton
          component={NavLink}
          to="/technician-live-update"
          onClick={handleDrawerToggle}
          style={activeLinkStyles}
        >
          <UpdateIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Live Update"
            primaryTypographyProps={{ fontSize: "14px" }}
          />
        </ListItemButton>
        <Divider sx={{ my: 1, mx: 2, borderColor: "#e0e0e0" }} />

        {/* Inspection */}
        <ListItemButton
          component={NavLink}
          to="/technician-inspection-general"
          onClick={handleDrawerToggle}
          style={activeLinkStyles}
        >
          <SearchIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Inspection"
            primaryTypographyProps={{ fontSize: "14px" }}
          />
        </ListItemButton>
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

        {/* Mobile Drawer */}
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

        {/* Permanent Drawer */}
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

      {/* Header Section */}
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
                  <AccountCircle sx={{ width: 20, height: 20, color: "black" }} />
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
