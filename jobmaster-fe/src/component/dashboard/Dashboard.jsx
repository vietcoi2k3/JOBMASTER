import * as React from "react";
import { useState } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../assets/logo.png";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const drawerWidth = 240;
const icons = [
  SettingsIcon,
  WorkOutlinedIcon,
  DynamicFeedIcon,
  LocalAtmIcon
];
// Sử dụng state để lưu trữ chỉ số được chọn




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
  // backgroundColor:'#fff',
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  position: 'fixed',
  left: 0,
  top: '64px',  // Chiều cao của header (AppBar)
  height: `calc(100vh - 64px)`,  // Đặt chiều cao trừ đi chiều cao của AppBar
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiDrawer-paper': {
    position: 'fixed',
    width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
    top: '64px',  // Chiều cao của header
    height: `calc(100vh - 64px)`,  // Đặt chiều cao trừ đi chiều cao của AppBar
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));


export default function MiniDrawer() {
  const navigate = useNavigate();
  const CustomIcon = ({ index }) => {
    const IconComponent = icons[index % icons.length];
    let isHighlighted = index === highlightedIndex
    return (
      <IconComponent
        sx={{
          color: isHighlighted ? '#2D7CF1' : 'gray', // Màu xanh cho icon được chọn, màu xám cho icon không được chọn
        }}
      />
    );
  };
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleIndex = (index) => {
    if (index === 0) {
      navigate("/dashboard")
    }
    if (index === 1) {
      navigate("/dashboard/job")
    }
    if (index === 2) {
      navigate("/dashboard/manage-post")
    }
    if (index === 3) {
      navigate("/dashboard/service")
    }

    setHighlightedIndex(index)
  }
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: '#E5E5E5', padding: '100px' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-accent" >
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              // open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center justify-between w-full">
            <img src={logo} alt="" width={210} />
            <div className="flex items-center">
              <Button
                onClick={() => { window.location.href = "/dashboard/job-form/create" }}
                size="small"
                className="h-1/2"
                variant="contained"
                color="primary"
              >
                Đăng tuyển
              </Button>

              <NotificationsIcon
                className="cursor-pointer ml-5"
                color="primary"
              />


              <Avatar
                aria-label="recipe"
                className="ml-5 cursor-pointer"
                onClick={handleClick}
                style={{ backgroundColor: '#f50057', cursor: 'pointer' }}
              >
                R
              </Avatar>

              {/* Menu Popup */}
              <Menu
                anchorEl={anchorEl}
                open={open2}
                onClose={handleClose}
                onClick={handleClose}
              >
                {/* Menu item 1 */}
                <MenuItem>
                  <ListItemIcon>
                    <HomeIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Trang tin tuyển dụng</Typography>
                </MenuItem>

                {/* Menu item 2 */}
                <MenuItem onClick={() => {
                  localStorage.clear()
                  navigate("/")
                }}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Đăng xuất</Typography>
                </MenuItem>
              </Menu>


            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <Divider />
        <List>
          {["Cài đặt tài khoản ", "Chiến dịch tuyển dụng", "Quản lí tin đăng", "Dịch vụ"].map((text, index) => (
            <ListItem
              key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  handleIndex(index)
                }}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                      justifyContent: "initial",
                    }
                    : {
                      justifyContent: "center",
                    },
                ]}
              >
                <ListItemIcon

                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: "auto",
                      },
                  ]}
                >
                  <CustomIcon index={index} />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Outlet />
      
    </Box>
  );
}