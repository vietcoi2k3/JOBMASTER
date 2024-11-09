import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const ServiceCard = ({ title, price, description,effectiveTime }) => {
    return (
        <Card
            className="shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
            style={{ borderTop: '5px solid #3758F9' }}>
            <CardContent className="p-6">
                <Typography variant="h6" className="text-blue-700 font-bold">
                    <span style={{ color: '#3758F9' }}>{title}</span>
                </Typography>
                <Typography variant="h5" className="text-blue-700 font-bold mb-4">
                    <span style={{ color: '#3758F9' }}>{price.toLocaleString('vi-VN')} VND</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-4">
                    {description}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="italic">
                    Thời gian hiệu lực: {effectiveTime}
                </Typography>
            </CardContent>
        </Card>
    );
};


export default ServiceCard;
