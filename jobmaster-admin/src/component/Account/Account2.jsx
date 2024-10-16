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
    Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";
import CreateFieldPopup from "./CreateFieldPopup";
import { useNavigate } from "react-router-dom";

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
            case 'WATTING_ACTIVE':
                return { color: 'goldenrod', text: 'Chờ kích hoạt' };
            case 'INACTIVE':
                return { color: 'red', text: 'Không hoạt động' };
            default:
                return { color: 'black', text: 'Không xác định' };
        }
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
            setTotalPages(response.totalPages); // Update total pages
        });
    };

    useEffect(() => {
        fetchAccounts(pageNumber);
    }, [pageNumber]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 1 }}>
                {/* Search fields */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField label="Tên lĩnh vực" variant="outlined" size="small" />
                        <TextField label="Mã lĩnh vực" variant="outlined" size="small" />
                    </Box>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Thêm mới
                    </Button>
                </Box>
            </Box>

            {/* Table section */}
            <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tài khoản</TableCell>
                            <TableCell>Tên công ty</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {account.map((account, index) => {
                            const { color, text } = getStatusInfo(account.status);
                            return (
                                <TableRow key={account.id}>
                                    <TableCell>{((pageNumber - 1) * 10) + index + 1}</TableCell>
                                    <TableCell>{account.username}</TableCell>
                                    <TableCell>{account.companyName}</TableCell>
                                    <TableCell style={{ color }}>{text}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="view" color="primary">
                                            <VisibilityIcon />
                                        </IconButton>
                                        {/* Uncomment to enable delete */}
                                        {/*
                                        <IconButton
                                            aria-label="delete"
                                            color="primary"
                                            onClick={() => handleDelete(account.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        */}
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
