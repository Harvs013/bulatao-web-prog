import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";

const drawerWidth = 240;

const dashboardNavItems = [
  { label: "Dashboard", title: "Dashboard", to: "/dashboard", icon: DashboardIcon },
  { label: "Reports", title: "Reports", to: "/dashboard/reports", icon: AssessmentIcon },
  { label: "Users", title: "Users", to: "/dashboard/users", icon: PeopleIcon },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#18181b",
  borderBottom: "2px solid #f472b6",
  boxShadow: "none",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: "#18181b",
    borderRight: "1px solid #3f3f46",
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#18181b",
      borderRight: "1px solid #3f3f46",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#18181b",
      borderRight: "1px solid #3f3f46",
    },
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "#27272a",
  border: "1px solid #3f3f46",
  "&:hover": {
    border: "1px solid #f472b6",
    backgroundColor: "#27272a",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#71717a",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#f4f4f5",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    "&::placeholder": {
      color: "#71717a",
      opacity: 1,
    },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find((item) => item.to === pathname)?.title ?? "Welcome";

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => navigate("/");

  return (
    <Box sx={{ display: "flex", bgcolor: "#18181b", minHeight: "100vh" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="toggle drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, color: "#f4f4f5" }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#f4f4f5",
              textShadow: "0 0 12px #f472b6",
            }}
          >
            {pageTitle}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: "#f472b6",
              borderColor: "#f472b6",
              borderRadius: "20px",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              "&:hover": {
                borderColor: "#f9a8d4",
                color: "#f9a8d4",
                backgroundColor: "rgba(244,114,182,0.08)",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ bgcolor: "#18181b" }}>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#71717a" }}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "#3f3f46" }} />

        <List>
          {dashboardNavItems.map(({ label, to, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <ListItem key={to} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to={to}
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                    borderRadius: "12px",
                    mx: 0.5,
                    mb: 0.5,
                    color: isActive ? "#f472b6" : "#a1a1aa",
                    backgroundColor: isActive ? "rgba(244,114,182,0.1)" : "transparent",
                    borderLeft: isActive ? "2px solid #f472b6" : "2px solid transparent",
                    "&:hover": {
                      backgroundColor: "rgba(244,114,182,0.08)",
                      color: "#f9a8d4",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(244,114,182,0.1)",
                      "&:hover": { backgroundColor: "rgba(244,114,182,0.15)" },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isActive ? "#f472b6" : "#71717a",
                    }}
                  >
                    <Icon />
                  </ListItemIcon>

                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.05em",
                    }}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#18181b" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;