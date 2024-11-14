// ServiceList.js
import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, Typography, Button,
    MenuItem, Select, Box, Grid
} from '@mui/material';
import AdminApi from "../../api/AdminApi";

const ServiceList = () => {
    const [selectedDate, setSelectedDate] = useState('DAY');
    const [services, setServices] = useState([]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    useEffect(() => {
        AdminApi.getListPackage(selectedDate).then((response) => {
            setServices(response);
        });
    }, [selectedDate]);

    return (
        <Box padding={4} bgcolor="#ffffff" minHeight="100vh" >
            <Typography variant="h4" gutterBottom color="textPrimary" sx={{ fontWeight: 'bold' }}>
                Danh sách dịch vụ
            </Typography>

            <Box mb={3} display="flex" justifyContent="flex-end">
                <Select
                    value={selectedDate}
                    size="small"
                    onChange={handleDateChange}
                    sx={{
                        minWidth: 120,
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <MenuItem value="DAY">Hôm nay</MenuItem>
                    <MenuItem value="MONTH">Tháng này</MenuItem>
                </Select>
            </Box>

            <Grid container spacing={3}>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                padding: '16px',
                                boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                backgroundColor: '#ffffff',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" color="primary" fontWeight="bold">
                                    {service.namePackage}
                                </Typography>

                                <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                                    <Typography variant="h5" fontWeight="bold" color="textSecondary">
                                        {service.price} VND
                                    </Typography>
                                </Box>

                                {/*<Button*/}
                                {/*    variant="contained"*/}
                                {/*    color="primary"*/}
                                {/*    fullWidth*/}
                                {/*    sx={{*/}
                                {/*        borderRadius: '20px',*/}
                                {/*        padding: '10px 0',*/}
                                {/*        fontWeight: 'bold',*/}
                                {/*        '&:hover': {*/}
                                {/*            backgroundColor: '#1565c0',*/}
                                {/*        },*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    Xem chi tiết*/}
                                {/*</Button>*/}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ServiceList;
