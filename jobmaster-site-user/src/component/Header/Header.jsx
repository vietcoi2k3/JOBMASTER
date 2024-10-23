import React from 'react';
import {AppBar, Toolbar, Button, Typography, Box, Avatar} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import logo from "../../assets/logo.png";
import SearchBar from "../Home/SearchBar";
import Criteria from "../criteria/criteria";

const Header = () => {
    const location = useLocation();

    // Kiểm tra xem có phải trang /login hay không
    const isLoginPage = location.pathname === '/criteria';
    const token = localStorage.getItem("access_token")
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <div>
                        <img src={logo} width={160}/>
                    </div>
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">Việc làm</Button>
                    <Button color="inherit" component={Link} to="/criteria">Tiêu chí</Button>
                    <Button color="inherit" component={Link} to="/blog">Blog</Button>
                </Box>
                {token === null ? (
                    <>
                        <Button color="primary" variant="outlined" sx={{ mx: 1 }}>Đăng nhập</Button>
                        <Button color="primary" variant="contained">Đăng ký</Button>
                    </>
                ) : (
                    <Avatar alt="User Avatar"  sx={{ mx: 1 }} />
                )}
            </Toolbar>
            {!isLoginPage && <SearchBar/>}
        </AppBar>
    );
};

export default Header;
