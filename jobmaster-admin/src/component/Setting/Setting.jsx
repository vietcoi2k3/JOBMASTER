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
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";
import CreateFieldPopup from "./CreateFieldPopup";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

// Component for the table
function SettingTable() {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0); // State for active tab
    const [code, setCode] = useState(''); // Change initial state to empty string
    const [name, setName] = useState(''); // Change initial state to empty string
    const [field, setField] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const [totalCount, setTotalCount] = useState(0); // Total items count from backend

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = (id) => {
        AdminApi.deleteField(id).then(() => {
            fetchFields();
        });
    };

    const handleClose = () => {
        setOpen(false);
        fetchFields();
    };

    const fetchFields = () => {
        AdminApi.getListField(code, name, currentPage, 10).then((response) => {
            setField(response.data); // Assume response.data is the list of fields
            setTotalCount(response.totalPage); // Assume response.totalCount is the total number of fields
        });
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        fetchFields(); // Fetch fields for the new page
    };

    const handleSearchChange = (event) => {
        const { name, value } = event.target;
        if (name === 'code') {
            setCode(value); // Update code state
        } else if (name === 'name') {
            setName(value); // Update name state
        }
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchFields(); // Call fetchFields when Enter is pressed
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
                            name="name" // Set name for input
                            value={name} // Bind state to value
                            onChange={handleSearchChange} // Handle change
                            onKeyDown={handleSearchKeyDown} // Call fetch on Enter
                        />
                        <TextField
                            label="Mã lĩnh vực"
                            variant="outlined"
                            size="small"
                            name="code" // Set name for input
                            value={code} // Bind state to value
                            onChange={handleSearchChange} // Handle change
                            onKeyDown={handleSearchKeyDown} // Call fetch on Enter
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchFields} // Call fetch on button click
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
                                           <VisibilityIcon />
                                       </Tooltip>
                                    </IconButton>
                                    <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(field.id)}>

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
        </Box>
    );
}

export default SettingTable;
