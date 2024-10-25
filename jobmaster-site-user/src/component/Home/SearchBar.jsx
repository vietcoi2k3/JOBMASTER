import React, {useEffect, useState} from 'react';
import { Box, TextField, Button, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {useNavigate} from "react-router-dom";
import AuthApi from "../../api/AuthApi";

const SearchBar = () => {
    const [search,setSearch] = useState('')
    const [locations,setLocations] = useState([])
    const [categories,setCategories] = useState([])
    const [locationsSelect,setLocationsSelect] = useState('')
    const [categorySelect,setCategorySelect] = useState('')
    const  navigate =useNavigate()
    const handleSearch = () => {
        // Điều hướng sang trang list-job với các tham số
        navigate(`/list-job?search=${search}&address=${locationsSelect}&field=${categorySelect}`);
    };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const setPositionSelect = (event) => {
        setLocationsSelect(event.target.value);
    };

    const setFieldSelect = (event) => {
        setCategorySelect(event.target.value);
    };
    useEffect(() => {
        AuthApi.getAllCity().then(e=>setLocations(e))
        AuthApi.getAllField().then(e=>setCategories(e))
    }, []);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            sx={{
                background: 'linear-gradient(90deg, #3f51b5, #1a237e)', // Gradient từ xanh nhạt sang xanh đậm
            }}
            paddingX="20%"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" // Hiệu ứng đổ bóng
        >
            {/* Input tìm kiếm */}
            <TextField
                variant="outlined"
                placeholder="Nhập từ khóa theo tên việc làm, tên công ty"
                size="small"
                fullWidth
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <IconButton edge="start">
                            <SearchIcon sx={{ color: '#3f51b5' }} />
                        </IconButton>
                    ),
                }}
                sx={{
                    flexGrow: 1,
                    marginRight: 2,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    '& fieldset': {
                        border: '2px solid #3f51b5', // Border màu xanh đậm
                    },
                    '&:hover fieldset': {
                        borderColor: '#1a237e', // Hover đổi màu border
                    },
                }}
            />

            {/* Nút Tìm kiếm */}
            <Button
                onClick={handleSearch}
                variant="outlined"
                sx={{
                    whiteSpace: 'nowrap',
                    marginRight: 2,
                    color: '#ffffff', // Màu chữ xanh đậm
                    borderColor: '#1a237e', // Màu viền xanh đậm
                    backgroundColor: '#3758F9', // Nền xanh nhạt
                    padding: '8px 16px', // Thêm padding cho nút
                    borderRadius: 2,
                    '&:hover': {
                        backgroundColor: '#bbdefb', // Nền xanh nhạt hơn khi hover
                        borderColor: '#0d47a1', // Viền xanh đậm hơn khi hover
                    },
                }}
            >
                Tìm kiếm
            </Button>

            {/* Dropdown Địa điểm */}
            <TextField
                select
                size="small"
                variant="outlined"
                sx={{
                    marginRight: 2,
                    minWidth: 150,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    '& fieldset': {
                        border: '2px solid #3f51b5',
                    },
                    '&:hover fieldset': {
                        borderColor: '#1a237e',
                    },
                }}
                onChange={setPositionSelect}
                InputProps={{
                    startAdornment: <LocationOnIcon sx={{ marginRight: 1, color: '#3f51b5' }} />,
                }}
            >
                {locations.map((option) => (
                    <MenuItem key={option.id} value={option.province_name}>
                        {option.province_name}
                    </MenuItem>
                ))}
            </TextField>

            {/* Dropdown Lĩnh vực */}
            <TextField
                select
                size="small"
                variant="outlined"
                sx={{
                    minWidth: 150,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    '& fieldset': {
                        border: '2px solid #3f51b5',
                    },
                    '&:hover fieldset': {
                        borderColor: '#1a237e',
                    },
                }}
                onChange={setFieldSelect}
                InputProps={{
                    startAdornment: <WorkOutlineIcon sx={{ marginRight: 1, color: '#3f51b5' }} />,
                }}
            >
                {categories.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default SearchBar;
