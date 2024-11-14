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
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AdminApi from "../../api/AdminApi";

function Account1() {
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [candidate, setCandidate] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCandidates = async () => {
        const response = await AdminApi.getListAccountCandidate(pageNumber);
        setCandidate(response.data);
        setTotalPages(response.totalPage);
    };

    useEffect(() => {
        fetchCandidates();
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        setPageNumber(value);
    };

    const handleChangeStatus = (username, newStatus) => {
        AdminApi.updateStatusCandidate(username, newStatus).then(() => {
            fetchCandidates();
        });
    };

    return (
        <Box sx={{ width: '100%', padding: 3, bgcolor: '#f9f9f9' }}>
            <Box sx={{ bgcolor: '#ffffff', p: 3, borderRadius: 3, boxShadow: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField label="Tên tài khoản" variant="outlined" size="small" />
                        <TextField label="Tên ứng viên" variant="outlined" size="small" />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchCandidates}
                            startIcon={<SearchIcon />}
                        >
                            Tìm kiếm
                        </Button>
                    </Box>
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: 2  }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>Tài khoản</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tên</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidate.map((item, index) => (
                            <TableRow
                                key={item.id}
                                sx={{
                                    '&:hover': { backgroundColor: '#f0f0f0' },
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                <TableCell>{((pageNumber - 1) * 10) + index + 1}</TableCell>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.fullName}</TableCell>
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
}

export default Account1;
