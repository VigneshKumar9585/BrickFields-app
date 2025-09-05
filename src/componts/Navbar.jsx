import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Notifications from "../assets/icons/Group 139.png";
import { TbLockPassword } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleOpen = (key) => {
    setOpenKeys((prev) => {
      let newKeys = { Enquiry: false, "Add User": false, Master: false };

      if (!prev[key]) {
        newKeys[key] = true;

        if (key === "Enquiry") navigate("/enquiry/new");
        if (key === "Add User") navigate("/user/manager");
        if (key === "Master") navigate("/master/setting");
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
        backgroundColor: "rgba(120, 120, 120, 1)",
        color: "rgba(255, 255, 255, 1)",
      }}
    >
      <Toolbar />
      <List>
        {/* Dashboard */}
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          onClick={handleDrawerToggle}
          sx={{ color: "white" }}
        >
          <DashboardIcon sx={{ mr: 2, color: "white" }} />
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>

        {/* Enquiry */}
        <ListItemButton onClick={() => toggleOpen("Enquiry")} sx={{ color: "white" }}>
          <AssignmentIcon sx={{ mr: 2, color: "white" }} />
          <ListItemText
            primary="Enquiry"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Collapse in={openKeys.Enquiry} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, color: "white" }}
              component={NavLink}
              to="/enquiry/new"
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary="New Enquiry"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, color: "white" }}
              component={NavLink}
              to="/enquiry/manage"
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary="Manage Enquiry"
                primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Add User */}
        <ListItemButton onClick={() => toggleOpen("Add User")} sx={{ color: "white" }}>
          <GroupIcon sx={{ mr: 2, color: "white" }} />
          <ListItemText
            primary="Add User"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Collapse in={openKeys["Add User"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Add Manager", "Add Staff", "Manage User"].map((item, idx) => (
              <ListItemButton
                key={item}
                sx={{ pl: 4, color: "white" }}
                component={NavLink}
                to={
                  idx === 0
                    ? "/user/manager"
                    : idx === 1
                    ? "/user/staff"
                    : "/user/manage"
                }
                onClick={handleDrawerToggle}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Report */}
        <ListItemButton
          component={NavLink}
          to="/report"
          onClick={handleDrawerToggle}
          sx={{ color: "white" }}
        >
          <ReportIcon sx={{ mr: 2, color: "white" }} />
          <ListItemText
            primary="Report"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>

        {/* Master */}
        <ListItemButton onClick={() => toggleOpen("Master")} sx={{ color: "white" }}>
          <SettingsIcon sx={{ mr: 2, color: "white" }} />
          <ListItemText
            primary="Master"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>
        <Collapse in={openKeys.Master} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              "Setting",
              "Country",
              "State",
              "Region",
              "District",
              "Checklist",
              "Category",
            ].map((item) => (
              <ListItemButton
                key={item}
                sx={{ pl: 4, color: "white" }}
                component={NavLink}
                to={`/master/${item.toLowerCase()}`}
                onClick={handleDrawerToggle}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Inspection */}
        <ListItemButton
          component={NavLink}
          to="/inspection"
          onClick={handleDrawerToggle}
          sx={{ color: "white" }}
        >
          <AssignmentIcon sx={{ mr: 2, color: "white" }} />
          <ListItemText
            primary="Inspection"
            primaryTypographyProps={{ fontSize: "16px", fontWeight: 400 }}
          />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    
    <div style={{ display: "flex", width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start", }}>
      {/* Mobile toggle button */}
      <Box>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ m: 2,mt:3, display: { sm: "none" }, color: "rgb(0,0,0)" }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
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
            backgroundColor: "#2f2f52ff",
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
            backgroundColor: "#1e1e2f",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      </Box>

      {/* Main Content with Top Header */}
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, pb: 0,pt:"9px" }}>
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
              <AccountCircle sx={{ width: "55px", height: "55px", color: "black" }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { width: 210, borderRadius: 2, },
              }}
            >
                <Box sx={{display:"flex", justifyContent:"flex-start",alignItems:"center", pl:2}}>
                    <Box>
              <img
              src=""
                style={{ width: 45, height: 45 ,borderRadius:"100%" ,color:"rgb(0,0,0)"}}
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
              {/* <Divider /> */}
            <MenuItem onClick={handleMenuClose} 
              component={NavLink}
              to="/profile">
             <IconButton>
              <AccountCircle sx={{ width: "20px", height: "20px", color: "black" }} />
             </IconButton>
              Profile
            </MenuItem>

              <MenuItem onClick={handleMenuClose}>
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
