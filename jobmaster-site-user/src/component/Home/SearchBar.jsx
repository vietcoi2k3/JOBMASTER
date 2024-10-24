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
                label="Chọn địa điểm"
                size="small"
                variant="outlined"
                sx={{ marginRight: 2, minWidth: 150 ,backgroundColor:"#ffffff"}}
                onChange={setPositionSelect}
                InputProps={{
                    startAdornment: <LocationOnIcon sx={{ marginRight: 1 }} />,
                }}
            >
                {locations.map((option) => (
                    <MenuItem key={option.id} value={option.province_name}>
                        {option.province_name}
                    </MenuItem>
                ))}
            </TextField>

            {/*<TextField*/}
            {/*    select*/}
            {/*    label="Chọn địa điểm"*/}
            {/*    variant="outlined"*/}
            {/*    onChange={(e)=>setPositionSelect(e.target.value)}*/}
            {/*>*/}
            {/*    {city.map((item) => (*/}
            {/*        <MenuItem key={item.id} value={item.province_name}>*/}
            {/*            {item.province_name}*/}
            {/*        </MenuItem>*/}
            {/*    ))}*/}
            {/*</TextField>*/}

            {/* Category Dropdown */}
            <TextField
                select
                size="small"
                label="Chọn lĩnh vực"
                variant="outlined"
                sx={{ minWidth: 150,backgroundColor:"#ffffff" }}
                InputProps={{
                    startAdornment: <WorkOutlineIcon sx={{ marginRight: 1 }} />,
                }}
                onChange={setFieldSelect}
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
