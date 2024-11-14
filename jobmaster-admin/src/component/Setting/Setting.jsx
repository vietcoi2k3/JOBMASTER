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
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";
import CreateFieldPopup from "./CreateFieldPopup";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

function SettingTable() {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [field, setField] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [fieldToDelete, setFieldToDelete] = useState(null); // Store the field to delete

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        if (fieldToDelete) {
            AdminApi.deleteField(fieldToDelete.id).then(() => {
                fetchFields();
                setDeleteDialogOpen(false); // Close dialog after deletion
            });
        }
    };

    const openDeleteDialog = (field) => {
        setFieldToDelete(field);
        setDeleteDialogOpen(true); // Open confirmation dialog
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setFieldToDelete(null); // Reset field to delete
    };

    const handleClose = () => {
        setOpen(false);
        fetchFields();
    };

    const fetchFields = () => {
        AdminApi.getListField(code, name, currentPage, 10).then((response) => {
            setField(response.data);
            setTotalCount(response.totalPage);
        });
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        fetchFields();
    };

    const handleSearchChange = (event) => {
        const { name, value } = event.target;
        if (name === 'code') {
            setCode(value);
        } else if (name === 'name') {
            setName(value);
        }
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchFields();
        }
    };

    useEffect(() => {
        fetchFields();
    }, [currentPage]);

    return (
        <Box sx={{ width: '100%', padding: 2, bgcolor: '#E8EDF2' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 2, borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Tên lĩnh vực"
                            variant="outlined"
                            size="small"
                            name="name"
                            value={name}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown}
                        />
                        <TextField
                            label="Mã lĩnh vực"
                            variant="outlined"
                            size="small"
                            name="code"
                            value={code}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchFields}
                            startIcon={<SearchIcon />}
                        >
                            Tìm kiếm
                        </Button>
                    </Box>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Thêm mới
                    </Button>
                </Box>
            </Box>

            {/* Table section */}
            <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Mã</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tên lĩnh vực</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {field.map((field, index) => (
                            <TableRow key={field.id}>
                                <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                                <TableCell>{field.code}</TableCell>
                                <TableCell>{field.name}</TableCell>
                                <TableCell style={{ color: field.status === 'ACTIVE' ? 'green' : 'red' }}>
                                    {field.status === 'ACTIVE' ? 'Hiệu lực' : 'Không hiệu lực'}
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="view" color="primary">
                                        <Tooltip title={"Xem chi tiết"}>
                                            <EditIcon />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        color="primary"
                                        onClick={() => openDeleteDialog(field)}
                                    >
                                        <Tooltip title={"Xóa"}>
                                            <DeleteIcon color="error"/>
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Pagination
                count={totalCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
            />

            <CreateFieldPopup open={open} onClose={handleClose} />

            {/* Delete confirmation dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa lĩnh vực này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default SettingTable;
