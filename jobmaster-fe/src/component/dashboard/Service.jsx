import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const ServiceCard = ({ title, price, description }) => {
    return (
        <Card className="shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
                <Typography variant="h6" className="text-blue-700 font-bold">
                    {title}
                </Typography>
                <Typography variant="h5" className="text-blue-700 font-bold mb-4">
                    {price}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-4">
                    {description}
                </Typography>
                <Button variant="contained" color="primary" className="bg-blue-500 text-white">
                    Kích hoạt ngay
                </Button>
            </CardContent>
        </Card>
    );
};


export default ServiceCard;
