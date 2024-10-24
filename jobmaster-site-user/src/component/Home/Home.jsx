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
        <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', p: 3 }}>

            <SliderHome/>

            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                Việc làm tốt nhất
            </Typography>

            <JobMoneySlider/>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                Công ty hàng đầu
            </Typography>
            <CompanySlider/>

            {token &&
                <div>
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Việc phù hợp
                </Typography>
            </div>
                <JobSlider/>}
        </Box>
    );
};

export default Home;