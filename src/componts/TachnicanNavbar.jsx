import React, { useState } from "react";
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
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import UpdateIcon from "@mui/icons-material/Update";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

// Assets
import Notifications from "../assets/icons/Group 139.png";
import logo from "../assets/logo/logo.webp";
import { TbLockPassword, TbLogout } from "react-icons/tb";

const SidebarLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState({
    Enquiry: false,
    Tasks: false,
    Inspection: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleOpen = (key) => {
    setOpenKeys((prev) => {
      let newKeys = { Enquiry: false, Tasks: false, Inspection: false };
      if (!prev[key]) {
        newKeys[key] = true;
      }
      return newKeys;
    });
  };

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
          sx={{ color: "rgba(0, 0, 0, 1)" }}
        >
          <DashboardIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>

        {/* Tasks */}
        <ListItemButton onClick={() => toggleOpen("Tasks")} sx={{ color: "black" }}>
          <AssignmentTurnedInIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Tasks"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Collapse in={openKeys.Tasks} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, color: "black" }}
              component={NavLink}
              to="/technician-new-task"
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary="New Task"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, color: "black" }}
              component={NavLink}
              to="/technician-current-task"
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary="Current Task"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Enquiry */}
        <ListItemButton onClick={() => toggleOpen("Enquiry")} sx={{ color: "black" }}>
          <QuestionAnswerIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Enquiry"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Collapse in={openKeys.Enquiry} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, color: "black" }}
              component={NavLink}
              to="/technician-new-enquiry"
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary="New Enquiry"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, color: "black" }}
              component={NavLink}
              to="/technician-current-enquiry"
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary="Current Enquiry"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Live Update */}
        <ListItemButton
          component={NavLink}
          to="/technician-live-update"
          onClick={handleDrawerToggle}
          sx={{ color: "black" }}
        >
          <UpdateIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Live Update"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>

        {/* Inspection */}
        <ListItemButton onClick={() => toggleOpen("Inspection")} sx={{ color: "black" }}>
          <SearchIcon sx={{ mr: 2, color: "black" }} />
          <ListItemText
            primary="Inspection"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Collapse in={openKeys.Inspection} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, color: "black" }}
              component={NavLink}
              to="/technician-inspection-general"
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary="General"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, color: "black" }}
              component={NavLink}
              to="/inspection-checklist"
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary="Checklist"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
          </List>
        </Collapse>
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
      {/* Mobile toggle button */}
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
              backgroundColor: "#1e1e2f",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content with Top Header */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, pb: 0, pt: "9px" }}>
        {/* Header Section */}
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

            {/* Profile Menu */}
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

              <MenuItem onClick={handleMenuClose} component={NavLink} to="/profile">
                <IconButton>
                  <AccountCircle
                    sx={{ width: "20px", height: "20px", color: "black" }}
                  />
                </IconButton>
                Profile
              </MenuItem>

              <MenuItem
                onClick={handleMenuClose}
                component={NavLink}
                to="/change/passwored"
              >
                <IconButton>
                  <TbLockPassword />
                </IconButton>
                Change Password
              </MenuItem>

              <MenuItem onClick={handleMenuClose}>
                <IconButton>
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
