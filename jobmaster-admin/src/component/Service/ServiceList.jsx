// ServiceList.js
import React, {useEffect, useState} from 'react';
import {
    Card, CardContent, Typography, Button,
    MenuItem, Select, Box, Grid
} from '@mui/material';
import AdminApi from "../../api/AdminApi";



const ServiceList = () => {
    // State dùng chung cho tất cả các card
    const [selectedDate, setSelectedDate] = useState('DAY');
    const [services,setServices] = useState([])

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    useEffect(() => {
        AdminApi.getListPackage(selectedDate).then((e)=>{
            setServices(e)
        })
    }, [selectedDate]);

    return (
        <Box padding={3}>
            <Typography variant="h5" gutterBottom>
                Danh sách dịch vụ
            </Typography>

            {/* Dropdown dùng chung cho tất cả các card */}
            <Box mb={2} display="flex" justifyContent="flex-end">
                <Select
                    value={selectedDate}
                    size="small"
                    onChange={handleDateChange}
                >
                    <MenuItem value="DAY">Hôm nay</MenuItem>
                    <MenuItem value="MONTH">Tháng này</MenuItem>
                </Select>
            </Box>

            <Grid container spacing={2}>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                width: '100%',
                                padding: '10px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                marginRight:'5px'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    {service.namePackage}
                                </Typography>

                                <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                                    <Typography variant="h4" fontWeight="bold">
                                        {service.price} VND
                                    </Typography>

                                </Box>

                                <Button variant="text" color="primary">
                                    Xem chi tiết
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ServiceList;
