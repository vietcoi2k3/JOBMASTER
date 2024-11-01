import React, {useEffect, useState} from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tabs, Tab, Box, TextField
} from '@mui/material';

import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

import Account2 from "./Account2";
import Account1 from "./Account1";



// Component for the table
function AccountTable() {
    const navigate = useNavigate();
    const location = useLocation();

    // Xác định tabIndex dựa trên đường dẫn hiện tại
    const tabIndex = location.pathname === '/account/account1' ? 0 : location.pathname === '/account/account2' ? 1 : 0;

    // Xử lý sự kiện thay đổi tab
    const handleTabChange = (event, newValue) => {
        if (newValue === 0) {
            navigate('account1');
        } else {
            navigate('account2');
        }
    };

    // Tự động điều hướng về "/setting" nếu không phải là "/setting" hoặc "/setting2"
    useEffect(() => {
        if (location.pathname !== '/account/account1' && location.pathname !== '/account/account2') {
            navigate('account1');
        }
    }, [location, navigate]);

    return (
        <Box sx={{ bgcolor: '#ffffff', padding: 2, borderRadius: 2,paddingBottom:10}}>
            {/* Tabs để chuyển đổi giữa các trang */}
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider', borderRadius: 2  }} // Đặt màu nền trắng cho Tabs
            >
                <Tab
                    label="Ứng Viên"

                />
                <Tab
                    label="Nhà tuyển dụng"

                />
            </Tabs>

            {/* Routes để hiển thị component tương ứng */}
            <Box sx={{ marginTop: 2 }}>
                <Routes>
                    <Route path="/account1" element={<Account1 />} />
                    <Route path="/account2" element={<Account2 />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default AccountTable;
