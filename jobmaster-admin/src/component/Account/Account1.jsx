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
import SearchIcon from "@mui/icons-material/Search";

function Account1() {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0); // State for active tab
    const [pageNumber, setPageNumber] = useState(1); // Current page number
    const [candidate, setCandidate] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const [open, setOpen] = useState(false);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchCandidates(); // Refresh data after closing popup
    };

    const fetchCandidates = async () => {
        const response = await AdminApi.getListAccountCandidate(pageNumber);
        setCandidate(response.data); // Update the candidate list
        setTotalPages(response.totalPage); // Update total pages for pagination
    };

    useEffect(() => {
        fetchCandidates(); // Fetch candidates when page number changes
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        setPageNumber(value); // Update page number when user interacts with pagination
    };

    return (
        <Box sx={{ width: '100%', padding: 2, bgcolor: '#E8EDF2' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 2, borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField label="Tên tài khoản" variant="outlined" size="small" />
                        <TextField label="Tên ứng viên" variant="outlined" size="small" />
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

            <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 500 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx = {{bgcolor:'#3758F9'}}>
                            <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} >Tài khoản</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tên</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidate.map((item, index) => {
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
                                    <TableCell>{item.fullname}</TableCell>
                                    <TableCell style={{ color }}>{text}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="view" color="primary">
                                            <VisibilityIcon />
                                        </IconButton>
                                        {/* Uncomment if delete functionality is needed */}
                                        {/* <IconButton
                                            aria-label="delete"
                                            color="primary"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton> */}
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

export default Account1;
