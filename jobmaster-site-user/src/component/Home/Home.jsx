import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, TextField, InputAdornment } from '@mui/material';
import { Search, LocationOn, Work } from '@mui/icons-material';
import SearchBar from "./SearchBar";
import Slider from "./Slider";
import SliderHome from "./Slider";
import CompanySlider from "./CompanySlider";
import JobSlider from "./JobSlider";
import JobMoneySlider from "./JobMoneySlider";

const Home = () => {
    const jobs = [
        { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hà Nội, Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
    ];

    const token = localStorage.getItem("access_token")

    return (
        <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', p: 5 }}>

            <SliderHome/>

            <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' ,color:"#3758F9"}}>
                Việc làm tốt nhất
            </Typography>

            <JobMoneySlider/>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold',color:"#3758F9" }}>
                Công ty hàng đầu
            </Typography>
            <CompanySlider/>

            {token && <div><div>
                <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' ,color:"#3758F9"}}>
                    Việc phù hợp
                </Typography>
            </div>
                <JobSlider/></div>}
        </Box>
    );
};

export default Home;