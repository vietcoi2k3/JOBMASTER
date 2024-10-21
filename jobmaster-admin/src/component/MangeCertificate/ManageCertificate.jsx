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
    DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";

function ManageCertificate() {
    const [pageNumber, setPageNumber] = useState(1);
    const [candidate, setCandidate] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Lưu thông tin giấy phép được chọn

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

    const handleClickOpen = (item) => {
        setSelectedItem(item); // Lưu thông tin của item được bấm
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const fetch = async () => {
        const response = await AdminApi.getListCertificate(pageNumber);
        setCandidate(response.data);
        setTotalPages(response.totalPages);
    };

    useEffect(() => {
        fetch();
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        setPageNumber(value);
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
                                        <IconButton
                                            aria-label="view"
                                            color="primary"
                                            onClick={() => handleClickOpen(item)}
                                        >
                                            <VisibilityIcon />
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
                            <p><strong>Tên công ty:</strong> {selectedItem.companyName}</p>
                            <p><strong>Địa chỉ:</strong> {selectedItem.city}</p>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={() => AdminApi.updateStatusEnterprise("ACTIVE",selectedItem.id).then((e)=>{
                        fetch();
                        setOpen(false)
                    })}>
                        Phê duyệt
                    </Button>
                    <Button color="error" onClick={() => AdminApi.updateStatusEnterprise("INACTIVE",selectedItem.id).then((e)=>{
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
