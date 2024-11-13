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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, MenuItem, FormControl, InputLabel, Select, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";
import SearchIcon from "@mui/icons-material/Search";
import Notification from "../../notification/Notification";
const statusOptions = {
    ACTIVE: 'Đã xác thực',
    WAITING_ACTIVE: 'Đang xét duyệt',
    INACTIVE: 'Đã từ chối'
};
function ManageCertificate() {
    const [pageNumber, setPageNumber] = useState(1);
    const [candidate, setCandidate] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Lưu thông tin giấy phép được chọn
    const [status, setStatus] = useState('');
    const [username, setUsername] = useState('');
    const getStatusInfo = (status) => {
        switch (status) {
            case 'ACTIVE':
                return { color: 'green', text: 'Đã xác thực' };
            case 'WAITING_ACTIVE':
                return { color: 'goldenrod', text: 'Đang xét duyệt' };
            case 'INACTIVE':
                return { color: 'red', text: 'Đã từ chối' };
            default:
                return { color: 'black', text: 'Chưa cập nhật' };
        }
    };

    const handleClickOpen = (item) => {
        setSelectedItem(item);
        console.log(selectedItem) // Lưu thông tin của item được bấm
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const fetch = async () => {
        const response = await AdminApi.getListCertificate(pageNumber, status, username);
        setCandidate(response.data);
        setTotalPages(response.totalPage);
    };

    useEffect(() => {
        fetch();
    }, [pageNumber, status]);

    const handlePageChange = (event, value) => {
        setPageNumber(value);
    };
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetch();
        }
    };

    const [notification, setNotification] = useState({ open: false, message: '', type: '' });

    return (
        <Box sx={{ width: '100%', padding: 2, bgcolor: '#E8EDF2' }}>
            <Notification
                open={notification.open}
                onClose={()=>setNotification({open: false})}
                message={notification.message}
                type={notification.type}
            />
            <Box sx={{ bgcolor: '#ffffff', padding: 2, borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl variant="outlined" size="small" sx={{ minWidth: 200, marginLeft: 2 }}>
                            <InputLabel>Trạng thái</InputLabel>
                            <Select
                                value={status}
                                onChange={handleChange}
                                label="Trạng thái"
                            >
                                <MenuItem value="">
                                    Tất cả
                                </MenuItem>
                                {Object.entries(statusOptions).map(([key, value]) => (
                                    <MenuItem key={key} value={key}>
                                        {value} {/* Hiển thị tên tiếng Việt */}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <TextField
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyPress}
                            label="Tài khoản" variant="outlined" size="small" />
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
                    <TableHead>
                        <TableRow sx = {{bgcolor:'#3758F9'}}>
                            <TableCell sx={{ fontWeight: 'bold', width: '6.6%' }}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '26.6%' }}>Tên Công Ty</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '16.6%' }}>Tài khoản</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '16.6%' }}>Địa chỉ</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '16.6%' }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '16.6%' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidate.map((item, index) => {
                            const { color, text } = getStatusInfo(item.status);
                            return (
                                <TableRow key={item.id}
                                          sx={{
                                              '&:hover': {
                                                  backgroundColor: '#f5f5f5',
                                              },
                                          }}>
                                    <TableCell>{((pageNumber - 1) * 10) + index + 1}</TableCell>
                                    <TableCell>{item.enterpriseName}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.address}</TableCell>
                                    <TableCell style={{ color }}>{text}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="view"
                                            color="primary"
                                            onClick={() => handleClickOpen(item)}
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

            {/* Popup hiển thị thông tin giấy phép */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thông tin giấy phép</DialogTitle>
                <DialogContent>
                    {selectedItem && (
                        <Box>
                            <img
                                src={selectedItem.businessCertificate}
                                alt="Giấy phép"
                                style={{ width: '100%', height: 'auto', marginBottom: 10 }}
                            />
                            <p><strong>Tên công ty:</strong> {selectedItem.enterpriseName}</p>
                            <p><strong>Địa chỉ:</strong> {selectedItem.address}</p>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={() => AdminApi.updateStatusEnterprise("ACTIVE", selectedItem.id).then((e) => {
                        fetch();
                        setNotification({ open: true, message: 'Phê duyệt giấy phép thành công', type: 'success' })
                        setOpen(false)
                    })}>
                        Phê duyệt
                    </Button>
                    <Button color="error" onClick={() => AdminApi.updateStatusEnterprise("INACTIVE", selectedItem.id).then((e) => {
                        fetch();
                        setOpen(false)
                    })}>
                        Không phê duyệt
                    </Button>
                    <Button onClick={handleClose}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ManageCertificate;
