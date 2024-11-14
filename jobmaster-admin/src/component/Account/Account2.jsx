import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    TextField,
    Button,
    Pagination, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";
import CreateFieldPopup from "./CreateFieldPopup";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function Account2() {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [account, setAccount] = useState([]);
    const [open, setOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total pages from the backend

    const handleClickOpen = () => setOpen(true);

    const getStatusInfo = (status) => {
        switch (status) {
            case 'ACTIVE':
                return { color: 'green', text: 'Đang hoạt động' };
            case 'WAITING_ACTIVE':
                return { color: 'goldenrod', text: 'Chờ kích hoạt' };
            case 'INACTIVE':
                return { color: 'red', text: 'Không hoạt động' };
            default:
                return { color: 'black', text: 'Không xác định' };
        }
    };

    const handleChangeStatus = (username, newStatus) => {
        AdminApi.updateStatusAccountEnterprise(username, newStatus).then(() => {
            fetchAccounts();
        });
    };

    const handleClose = () => {
        setOpen(false);
        fetchAccounts(pageNumber); // Reload accounts after closing popup
    };

    const handlePageChange = (event, value) => {
        setPageNumber(value); // Update the current page number
    };

    const fetchAccounts = (page) => {
        AdminApi.getListAccountAdmin(page).then((response) => {
            setAccount(response.data); // Update the account data
            setTotalPages(response.totalPage); // Update total pages
        });
    };

    useEffect(() => {
        fetchAccounts(pageNumber);
    }, [pageNumber]);

    return (
        <Box sx={{ width: '100%', padding: 2, bgcolor: '#E8EDF2' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 2, borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField label="Tên tài khoản" variant="outlined" size="small" />
                        <TextField label="Tên công ty" variant="outlined" size="small" />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetch}
                            startIcon={<SearchIcon />}
                        >
                            Tìm kiếm
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Table section */}
            <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: 2 }}>
                <Table stickyHeader>
                    <TableHead >
                        <TableRow>
                            <TableCell  sx={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell  sx={{ fontWeight: 'bold' }}>Tài khoản</TableCell>
                            <TableCell  sx={{ fontWeight: 'bold' }}>Tên công ty</TableCell>
                            <TableCell  sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {account.map((item, index) => {
                            const { color, text } = getStatusInfo(item.status);
                            return (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <TableCell>{((pageNumber - 1) * 10) + index + 1}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.companyName}</TableCell>
                                    <TableCell>
                                        <FormControl fullWidth size="small" variant="outlined">
                                            <InputLabel>Trạng thái</InputLabel>
                                            <Select
                                                label="Trạng thái"
                                                value={item.status}
                                                onChange={(e) => handleChangeStatus(item.username, e.target.value)}
                                                sx={{ color: item.status === 'ACTIVE' ? 'green' : item.status === 'INACTIVE' ? 'red' : 'goldenrod' }}
                                            >
                                                <MenuItem value="ACTIVE">Đang hoạt động</MenuItem>
                                                <MenuItem value="INACTIVE">Không hoạt động</MenuItem>
                                                <MenuItem value="WAITING_ACTIVE">Chờ kích hoạt</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPages}
                    page={pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            <CreateFieldPopup open={open} onClose={handleClose} />
        </Box>
    );
}

export default Account2;
