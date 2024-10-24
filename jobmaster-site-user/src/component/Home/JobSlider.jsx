import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {Box, Card, CardContent, Typography, Grid, Chip} from '@mui/material';
import {Work, LocationOn, AttachMoney} from '@mui/icons-material';
import Consumer from "../../api/Consumer";

const jobs = [
    { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hà Nội, Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
    { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
    { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
    { title: 'IT Business Analyst', company: 'Lac Viet Company Corporation', location: 'Hà Nội', salary: '2-3 triệu', isHot: true },
    { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
    { title: 'IT Business Analyst', company: 'BSS Group', location: 'Hồ Chí Minh', salary: '3-4 triệu', isHot: true },
];
const JobSlider = () => {
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        // Thay thế AuthApi.getListJobs() bằng API thực tế của bạn
        Consumer.getListCriteria().then((data) => setJobs(data));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Box sx={{ mt: 2, px: 2 }}>
            <Slider {...settings}>
                {jobs.map((job, index) => (
                    <Card key={index} sx={{ mx: 2, borderRadius: '20px', height: '100%' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <img
                                    src={job.logoCompany}
                                    alt={job.title}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', marginRight: '10px' }}
                                />
                                <Typography variant="h6" component="div">
                                    {job.title+"  "}
                                    {job.label&& <Chip
                                        label={"Hot"}
                                        color={'error'}
                                        size="small"
                                        sx={{ marginBottom: '4px', fontSize: '12px', height: '20px' }}
                                    />}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                                sx={{
                                    display: 'inline-block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '350px',
                                    verticalAlign: 'middle'
                                }}
                            >
                                <Work fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                {job.nameCompany}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <LocationOn fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                {job.city}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="primary"
                                gutterBottom
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                {job.salaryRange ? (
                                    <>
                                        <AttachMoney fontSize="small" sx={{ mr: 1 }} />
                                        {job.salaryRange}
                                    </>
                                ) : (
                                    <>
                                    <AttachMoney fontSize="small" sx={{ mr: 1 }} />
                                    Thỏa thuận
                                    </>
                                )}
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                Còn {job.deadLine} ngày để ứng tuyển
                            </Typography>
                        </CardContent>
                    </Card>

                ))}
            </Slider>
        </Box>
    );
};

export default JobSlider;
