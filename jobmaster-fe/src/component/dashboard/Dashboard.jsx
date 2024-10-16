import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box, AppBar as MuiAppBar, CssBaseline, Toolbar, Avatar, Button,
  IconButton, List, Divider, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Menu, MenuItem, Typography, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import logo from "../../assets/logo.png";
import { useNavigate, Outlet } from "react-router-dom";
import AuthApi from "../../api/AuthApi";

const drawerWidth = 240;
const icons = [SettingsIcon, WorkOutlinedIcon, LocalAtmIcon, DynamicFeedIcon];

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

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const icons = [SettingsIcon, WorkOutlinedIcon, LocalAtmIcon, DynamicFeedIcon];

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmitPrice = () => {
    // Xóa dấu chấm và chữ 'VND', sau đó chuyển về kiểu number
    const numericAmount = Number(amount.replace(/\./g, '').replace(' VND', ''));

    if (isNaN(numericAmount)) {
      console.error("Số tiền không hợp lệ");
      return;
    }

    AuthApi.payment(numericAmount).then((e) => {
      console.log(e);
    }).catch((error) => {
      console.error("Lỗi khi thanh toán:", error);
    });
  };

  const handleAmountChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Chỉ cho phép số
    setAmount(new Intl.NumberFormat("vi-VN").format(value)); // Định dạng VND
  };

  return (
      <Box sx={{ display: "flex", backgroundColor: "#E5E5E5", padding: "100px" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className="bg-accent">
            <IconButton
                color="default"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ marginRight: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex items-center justify-between w-full">
              <img src={logo} alt="Logo" width={210} />
              <div className="flex items-center">
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={handleDialogOpen} // Mở popup khi nhấn "Nạp tiền"
                >
                  Nạp tiền
                </Button>
                <NotificationsIcon className="cursor-pointer ml-5" color="primary" />
                <Avatar
                    className="ml-5 cursor-pointer"
                    onClick={handleMenuClick}
                    style={{ backgroundColor: "#f50057", cursor: "pointer" }}
                >
                  R
                </Avatar>
                <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Trang tin tuyển dụng</Typography>
                  </MenuItem>
                  <MenuItem
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                  >
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

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Cài đặt tài khoản", "Chiến dịch tuyển dụng", "Dịch vụ", "Quản lý tin đăng"].map(
                (text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: "block" }}>
                      <ListItemButton
                          sx={{ minHeight: 48, px: 2.5 }}
                          onClick={() => navigate(`/dashboard/${text.toLowerCase().replace(" ", "-")}`)}
                      >
                        <ListItemIcon>
                          {React.createElement(icons[index % icons.length])}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                )
            )}
          </List>
        </Drawer>

        {/* Popup Dialog Nhập Tiền */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Nạp tiền</DialogTitle>
          <DialogContent>
            <TextField
                label="Số tiền"
                value={amount}
                onChange={handleAmountChange}
                fullWidth
                margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Hủy
            </Button>
            <Button onClick={handleSubmitPrice} color="primary">
              Nạp
            </Button>
          </DialogActions>
        </Dialog>

        <Outlet />
      </Box>
  );
}
