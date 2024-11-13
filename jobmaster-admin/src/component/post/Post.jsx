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
    Pagination, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import AdminApi from "../../api/AdminApi";
import { useNavigate } from "react-router-dom";

function Post() {
    const [pageNumber, setPageNumber] = useState(1);
    const [candidate, setCandidate] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [postName, setPostName] = useState('');
    const [tax, setTax] = useState('');

    const getStatusInfo = (status) => {
        switch (status) {
            case 'APPROVED':
                return { color: 'green', text: 'Đang hiển thị' };
            case 'AWAITING_APPROVAL':
                return { color: 'goldenrod', text: 'Đang xét duyệt' };
            case 'NOT_APPROVED':
                return { color: 'red', text: 'Dừng hiển thị' };
            default:
                return { color: 'black', text: 'Không xác định' };
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetch();
        }
    };

    const fetch = async () => {
        const response = await AdminApi.getListPost(pageNumber, postName, tax);
        setCandidate(response.data);
        setTotalPages(response.totalPage);
    };

    useEffect(() => {
        fetch();
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        setPageNumber(value);
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', padding: 2, bgcolor: '#E8EDF2' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 2, borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Tên bài đăng"
                            variant="outlined"
                            size="small"
                            value={postName}
                            onChange={(e) => setPostName(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <TextField
                            label="Mã số thuế"
                            variant="outlined"
                            size="small"
                            value={tax}
                            onChange={(e) => setTax(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
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

            <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: 2 }}>
                <Table stickyHeader>
                    <TableHead >
                        <TableRow sx = {{bgcolor:'#3758F9'}}>
                            <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tiêu đề bài đăng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tên chiến dịch</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Mã số thuế</TableCell>
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
                                    <TableCell>{item.postName}</TableCell>
                                    <TableCell>{item.campaignName}</TableCell>
                                    <TableCell>{item.tax}</TableCell>
                                    <TableCell style={{ color }}>{text}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="view"
                                            color="primary"
                                            onClick={() => navigate("/detail-post/" + item.id)}
                                        >
                                            <Tooltip title={"Xem chi tiết"}>
                                                <VisibilityIcon />
                                            </Tooltip>

                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
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

export default Post;
