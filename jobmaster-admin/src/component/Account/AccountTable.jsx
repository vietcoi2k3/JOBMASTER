import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tabs, Tab, Box, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';

// Mock data
const accounts = [
    { id: 1, code: 1234, email: 'phuong@gmail.com', password: '123456Aa@', status: 'Đang hoạt động' },
    { id: 2, code: 1235, email: 'viet@gmail.com', password: '123456Aa@', status: 'Đang hoạt động' },
    { id: 3, code: 1236, email: 'phuong@gmail.com', password: '123456Aa@', status: 'Ngừng hoạt động' },
    { id: 4, code: 1237, email: 'viet@gmail.com', password: '123456Aa@', status: 'Đang hoạt động' },
    { id: 5, code: 1238, email: 'phuong@gmail.com', password: '123456Aa@', status: 'Ngừng hoạt động' },
    { id: 6, code: 1239, email: 'viet@gmail.com', password: '123456Aa@', status: 'Đang hoạt động' },
];

// Component for the table
function AccountTable() {
    const [tabIndex, setTabIndex] = useState(0); // State for active tab
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{bgcolor:'#ffffff',padding:1}}>
                <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                    <Tab label="Ứng viên" />
                    <Tab label="Nhà tuyển dụng" />
                </Tabs>
                {/* Search fields */}
                <Box sx={{ display: 'flex', marginTop: 2, gap: 2 }}>
                    <TextField label="Mã ứng viên" variant="outlined" size="small" />
                    <TextField label="Tài khoản" variant="outlined" size="small" />
                </Box>
            </Box>

            {/* Table section */}
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Mã ứng viên</TableCell>
                            <TableCell>Tài khoản</TableCell>
                            <TableCell>Mật khẩu</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account, index) => (
                            <TableRow key={account.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{account.code}</TableCell>
                                <TableCell>{account.email}</TableCell>
                                <TableCell>{account.password}</TableCell>
                                <TableCell style={{ color: account.status === 'Đang hoạt động' ? 'green' : 'red' }}>
                                    {account.status}
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="view" color="primary">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="primary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination count={10} color="primary" style={{ margin: '16px' }} />
            </TableContainer>
        </Box>
    );
}

export default AccountTable;
