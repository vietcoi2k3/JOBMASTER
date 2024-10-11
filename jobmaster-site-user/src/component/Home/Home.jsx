import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, TextField, InputAdornment } from '@mui/material';
import { Search, LocationOn, Work } from '@mui/icons-material';
import SearchBar from "./SearchBar";
import Slider from "./Slider";
import SliderHome from "./Slider";
import CompanySlider from "./CompanySlider";

const Home = () => {
    const jobs = [
        { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hà Nội, Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
        { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
    ];

    return (
        <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', p: 3 }}>

            <SliderHome/>

            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                Việc làm tốt nhất
            </Typography>

            <Grid container spacing={2}>
                {jobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {job.title}
                                    {job.isHot && (
                                        <Typography component="span" sx={{ ml: 1, color: 'red', fontSize: '0.8rem' }}>
                                            Hot
                                        </Typography>
                                    )}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <Work fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    {job.company}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <LocationOn fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    {job.location}
                                </Typography>
                                <Typography variant="body2" color="primary" gutterBottom>
                                    {job.salary}
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                    Còn 29 ngày để ứng tuyển
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                Công ty hàng đầu
            </Typography>
            <CompanySlider/>
            <div>
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Việc hấp dẫn
                </Typography>
            </div>
            <Grid container spacing={2}>
                {jobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {job.title}
                                    {job.isHot && (
                                        <Typography component="span" sx={{ ml: 1, color: 'red', fontSize: '0.8rem' }}>
                                            Hot
                                        </Typography>
                                    )}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <Work fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    {job.company}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <LocationOn fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    {job.location}
                                </Typography>
                                <Typography variant="body2" color="primary" gutterBottom>
                                    {job.salary}
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                    Còn 29 ngày để ứng tuyển
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Box>
    );
};

export default Home;