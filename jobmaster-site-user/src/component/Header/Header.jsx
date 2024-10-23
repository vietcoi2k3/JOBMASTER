import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Avatar } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import SearchBar from "../Home/SearchBar";

const Header = () => {
    const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại
    const navigate = useNavigate(); // Điều hướng trang
    const [token, setToken] = useState(localStorage.getItem("access_token")); // Lưu token vào state

    // Cập nhật token mỗi khi URL thay đổi
    useEffect(() => {
        setToken(localStorage.getItem("access_token"));
    }, [location]);

    // Hàm điều hướng đến /criteria, kiểm tra token trước
    const handleCriteriaClick = () => {
        if (token === null) {
            navigate('/login'); // Chưa đăng nhập -> Điều hướng về /login
        } else {
            navigate('/criteria'); // Đã đăng nhập -> Điều hướng về /criteria
        }
    };

    // Kiểm tra xem có phải trang /criteria không (để ẩn SearchBar)
    const isLoginPage = location.pathname === '/criteria';

    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <div>
                        <img src={logo} width={160} alt="Logo" />
                    </div>
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">Việc làm</Button>
                    <Button color="inherit" onClick={handleCriteriaClick}>Tiêu chí</Button>
                    <Button color="inherit" component={Link} to="/blog">Blog</Button>
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
                    <Avatar alt="User Avatar" sx={{ mx: 1 }} />
                )}
            </Toolbar>
            {!isLoginPage && <SearchBar />}
        </AppBar>
    );
};

export default Header;
