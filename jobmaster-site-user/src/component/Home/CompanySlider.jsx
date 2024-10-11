import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import './CompanySlider.css'; // Tạo file CSS cho phần trượt
import companyDefault from '../../assets/companyDefautl.png'

// Dữ liệu công ty mẫu
const companies = [
    { id: 1, name: 'Công ty cổ phần CMC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/CMC_Corporation_logo.png/768px-CMC_Corporation_logo.png' },
    { id: 2, name: 'Công ty cổ phần FIT', logo: 'https://fitgroup.com.vn/wp-content/uploads/2019/09/logo-fit-1.png' },
    { id: 3, name: 'Công ty cổ phần hợp nhất quốc tế', logo: 'https://example.com/logo2.png' },
    { id: 4, name: 'Công ty cổ phần FIT', logo: 'https://fitgroup.com.vn/wp-content/uploads/2019/09/logo-fit-1.png' },
    { id: 5, name: 'Công ty cổ phần CMC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/CMC_Corporation_logo.png/768px-CMC_Corporation_logo.png' }
];

const CompanySlider = () => {
    return (
        <Box sx={{ width: '100%', overflowX: 'scroll', whiteSpace: 'nowrap', padding: '0' }}>
            <Box className="slider-container">
                {companies.map((company) => (
                    <Card key={company.id} className="company-card">
                        <CardContent sx={{ textAlign: 'center',padding:0 }}>
                            <img src={companyDefault} alt={company.name}  />
                            <Typography variant="h6">{company.name}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default CompanySlider;
