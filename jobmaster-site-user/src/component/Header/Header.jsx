import React, { useEffect, useState } from 'react';
import {AppBar, Toolbar, Button, Typography, Box, Avatar, MenuItem,Menu} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import SearchBar from "../Home/SearchBar";

const Header = () => {
    const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại
    const [token, setToken] = useState(localStorage.getItem("access_token")); // Lưu token vào state
    const [anchorEl, setAnchorEl] = useState(null); // Để xác định vị trí hiển thị popup
    const open = Boolean(anchorEl); // Kiểm tra xem popup có mở không
    const navigate = useNavigate(); // Điều hướng người dùng

    // Xử lý mở popup
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Xử lý đóng popup
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        setToken(localStorage.getItem("access_token"));
    }, [location]);

    // Hàm điều hướng đến /criteria, kiểm tra token trước
    const handleCriteriaClick = () => {
        if (token === null) {
            navigate('/login'); // Chưa đăng nhập -> Điều hướng về /login
        } else {
            // console.log("hihi")
            navigate('/criteria'); // Đã đăng nhập -> Điều hướng về /criteria
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Xóa token trong localStorage
        navigate('/login'); // Điều hướng về trang đăng nhập
    };

    // Kiểm tra xem có phải trang /criteria không (để ẩn SearchBar)
    const isLoginPage = location.pathname === '/criteria';

    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1,cursor: 'pointer' }}>
                    <div>
                        <img src={logo} width={160} alt="Logo" onClick={()=> navigate("/")} />
                    </div>
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">Việc làm</Button>
                    <Button color="inherit" onClick={handleCriteriaClick}>Tiêu chí</Button>
                    <Button color="inherit"  onClick={() => window.location.href = "http://localhost:3000"}>Đăng tuyển</Button>
                </Box>
                {token === null ? (
                    <>
                        <Button color="primary" variant="outlined" component={Link} to="/login" sx={{ mx: 1 }}>
                            Đăng nhập
                        </Button>
                        <Button color="primary" variant="contained" component={Link} to="/sign-up">
                            Đăng ký
                        </Button>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            alt="User Avatar"
                            sx={{ mx: 1, cursor: 'pointer' }}
                            onClick={handleOpen}
                        />

                        {/* Popup menu */}
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                            <MenuItem onClick={()=>navigate("/")}>Thông tin cá nhân</MenuItem>
                            <MenuItem onClick={()=>navigate("/")}>Đổi mật khẩu</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
            {!isLoginPage && <SearchBar />}
        </AppBar>
    );
};

export default Header;
