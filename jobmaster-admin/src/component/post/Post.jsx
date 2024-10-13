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

function Campaign() {
    // const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0); // State for active tab
    const [pageNumber, setPageNumber] = useState(1); // Current page number
    const [candidate, setCandidate] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const [open, setOpen] = useState(false);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetch(); // Refresh data after closing popup
    };

    const fetch = async () => {
        const response = await AdminApi.getListCampaign(pageNumber);
        setCandidate(response.data); // Update the candidate list
        setTotalPages(response.totalPages); // Update total pages for pagination
    };

    useEffect(() => {
        fetch(); // Fetch candidates when page number changes
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        setPageNumber(value); // Update page number when user interacts with pagination
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField label="Tên lĩnh vực" variant="outlined" size="small" />
                        <TextField label="Mã lĩnh vực" variant="outlined" size="small" />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleClickOpen}
                    >
                        Thêm mới
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên Công Ty</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidate.map((item, index) => {
                            const { color, text } = getStatusInfo(item.isActive);
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{((pageNumber - 1) * 10) + index + 1}</TableCell>
                                    <TableCell>{item.companyName}</TableCell>
                                    <TableCell>{item.city}</TableCell>
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

            {/*<CreateFieldPopup open={open} onClose={handleClose} />*/}
        </Box>
    );
}

export default Campaign;
