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
// import CreateFieldPopup from "./CreateFieldPopup";
import { useNavigate } from "react-router-dom";

function Post() {
    // const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0); // State for active tab
    const [pageNumber, setPageNumber] = useState(1); // Current page number
    const [candidate, setCandidate] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const [open, setOpen] = useState(false);
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetch(); // Refresh data after closing popup
    };

    const fetch = async () => {
        const response = await AdminApi.getListPost(pageNumber,postName,tax);
        setCandidate(response.data); // Update the candidate list
        setTotalPages(response.totalPage); // Update total pages for pagination
    };

    useEffect(() => {
        fetch(); // Fetch candidates when page number changes
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        setPageNumber(value); // Update page number when user interacts with pagination
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetch();
        }
    };

    const navigate = useNavigate()
    
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField label="Tên bài đăng"  variant="outlined" size="small" 
                        value={postName}
                        onChange={(e)=>setPostName(e.target.value)}
                        onKeyDown={handleKeyPress}/>
                        <TextField label="Mã số thuế" variant="outlined" size="small" 
                        value={tax}
                        onChange={(e)=>setTax(e.target.value)}
                        onKeyDown={handleKeyPress}/>
                    </Box>
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                                <TableRow key={item.id}>
                                    <TableCell>{((pageNumber - 1) * 10) + index + 1}</TableCell>
                                    <TableCell>{item.postName}</TableCell>
                                    <TableCell>{item.campaignName}</TableCell>
                                    <TableCell>{item.tax}</TableCell>
                                    <TableCell style={{ color }}>{text}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="view" color="primary" onClick={() => navigate("/detail-post/" + item.id)}>
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

            {/*<CreateFieldPopup open={open} onClose={handleClose} />*/}
        </Box>
    );
}

export default Post;
