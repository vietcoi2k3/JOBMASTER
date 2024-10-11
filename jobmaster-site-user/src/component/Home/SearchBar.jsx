import React, {useState} from 'react';
import { Box, TextField, Button, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
    // Sample data for dropdowns
    const locations = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'];
    const categories = ['Công nghệ thông tin', 'Kinh doanh', 'Nhân sự'];
    const [search,setSearch] = useState(null)
    const  navigate =useNavigate()
    const handleSearch = () => {
        // Điều hướng sang trang list-job với các tham số
        navigate(`/list-job?search=${search}&address=${""}&field=${""}`);
    };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bgcolor="#f0f2f5"

        >
            {/* Search Input */}
            <TextField
                variant="outlined"
                placeholder="Nhập từ khóa theo tên việc làm, tên công ty"
                size="small"
                fullWidth
                onChange={handleSearchChange} // gọi hàm khi giá trị thay đổi
                InputProps={{
                    startAdornment: (
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
                sx={{ flexGrow: 1, marginRight: 2 ,backgroundColor:"#ffffff"}}
            />

            {/* Search Button */}
            <Button
                onClick = {()=>handleSearch()}
                variant="outlined"
                sx={{ whiteSpace: 'nowrap', marginRight: 2, color: "#3f51b5", borderColor: "#3f51b5" ,backgroundColor:"#ffffff" }}
            >
                Tìm kiếm
            </Button>

            {/* Location Dropdown */}
            <TextField
                select
                size="small"
                value="Địa điểm"
                sx={{ marginRight: 2, minWidth: 150 ,backgroundColor:"#ffffff"}}

                InputProps={{
                    startAdornment: <LocationOnIcon sx={{ marginRight: 1 }} />,
                }}
            >
                {locations.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>

            {/* Category Dropdown */}
            <TextField
                select
                size="small"
                value="Ngành nghề"
                sx={{ minWidth: 150,backgroundColor:"#ffffff" }}
                InputProps={{
                    startAdornment: <WorkOutlineIcon sx={{ marginRight: 1 }} />,
                }}
            >
                {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default SearchBar;
