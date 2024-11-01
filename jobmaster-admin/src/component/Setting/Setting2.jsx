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
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";
import CreatePositionPopup from "./CreatePositionPopup";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

// Component for the table
function SettingTable2() {
    const [tabIndex, setTabIndex] = useState(0);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(1);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [positionIdToDelete, setPositionIdToDelete] = useState(null);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchPositions();
    };

    const fetchPositions = () => {
        AdminApi.getListPosition(code, name, currentPage, itemsPerPage).then((response) => {
            setPosition(response.data);
            setTotalCount(response.totalPage);
        });
    };

    useEffect(() => {
        fetchPositions();
    }, [currentPage]);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // Handle delete confirmation
    const handleDeleteClick = (id) => {
        setPositionIdToDelete(id);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (positionIdToDelete) {
            AdminApi.deletePosition(positionIdToDelete).then(() => {
                fetchPositions();
                setDeleteOpen(false);
            });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteOpen(false);
        setPositionIdToDelete(null);
    };

    // Handle search input changes and enter key press
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
            fetchPositions(); // Call fetchPositions when Enter is pressed
        }
    };

    return (
        <Box sx={{ width: '100%', padding: 2, bgcolor: '#E8EDF2' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 2, borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Tên vị trí"
                            variant="outlined"
                            size="small"
                            name="name"
                            value={name}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown} // Call fetch on Enter
                        />
                        <TextField
                            label="Mã vị trí"
                            variant="outlined"
                            size="small"
                            name="code"
                            value={code}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown} // Call fetch on Enter
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchPositions} // Call fetch on button click
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
            <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: 2 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tên vị trí</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {position.map((field, index) => (
                            <TableRow key={field.id}>
                                <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                                <TableCell>{field.code}</TableCell>
                                <TableCell>{field.name}</TableCell>
                                <TableCell style={{ color: field.status === 'ACTIVE' ? 'green' : 'red' }}>
                                    {field.status}
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="view" color="primary">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="primary" onClick={() => handleDeleteClick(field.id)}>
                                        <DeleteIcon color="error" />
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

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Xóa vị trí</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa vị trí này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            <CreatePositionPopup open={open} onClose={handleClose} />
        </Box>
    );
}

export default SettingTable2;
