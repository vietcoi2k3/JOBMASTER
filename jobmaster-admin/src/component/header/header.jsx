// src/components/Header.js
import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import imgLogo from '../../assets/img.png'
import {useNavigate} from "react-router-dom";
import { useUser  } from '../../context/UserProvider';
const Header = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    // Trạng thái để kiểm tra tab đang được chọn
    const [value, setValue] = React.useState(0);

    // Trạng thái điều khiển Menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Xử lý sự kiện chọn Tab
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    // Xử lý sự kiện mở Menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Xử lý sự kiện đóng Menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const logOut =()=>{
        localStorage.removeItem('access_token');
        navigate('/')
    }
    return (
        <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar>
                {/* Logo */}
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    <img src={imgLogo} alt="JobMaster Logo" style={{ height: '40px' }} />
                </Typography>

                {/* Tabs */}
                <Tabs value={value} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                    <Tab label="Tin đăng" onClick={()=>{
                        navigate("/post")
                    }}  />
                    <Tab label="Chiến dịch" onClick={()=>{
                        navigate("/manage-campaign")
                    }}  />
                    <Tab label="Dịch vụ" />
                    <Tab label="Phê duyệt" onClick={()=>{
                        navigate("/manage-certificate")
                    }} />
                    <Tab label="Thiết lập" onClick={()=>{
                        navigate("/setting")
                    }} />
                    <Tab label="Tài khoản" onClick={()=>{
                        navigate("/account")
                    }} />
                </Tabs>

                {/* Notification Icon */}
                <IconButton color="default" sx={{ ml: 2 }}>
                    <NotificationsIcon />
                </IconButton>

                {/* User Profile Avatar */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        alt="User Avatar"
                        src="https://mui.com/static/images/avatar/1.jpg" // Bạn có thể thay bằng URL ảnh của bạn
                        sx={{ cursor: 'pointer' }}
                        onClick={handleMenuOpen}
                    />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                        {user.username}
                    </Typography>
                </Box>

                {/* Dropdown Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={()=>{logOut(); handleMenuClose()}}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
