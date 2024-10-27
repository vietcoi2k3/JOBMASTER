import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import { Card, CardContent, Typography, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthApi from "../../api/AuthApi";
import {useNavigate} from "react-router-dom";

const CompanySlider = () => {
    const [companies,setCompanies] = useState([])
    useEffect(() => {
        AuthApi.getListCompany().then((e)=>{
            setCompanies(e)
        })
    }, []);
    const settings = {
        dots: true, // Hiển thị các dấu chấm phân trang
        infinite: true, // Vòng lặp vô tận
        speed: 500, // Tốc độ chuyển trang (ms)
        slidesToShow: 5, // Số lượng slide hiển thị cùng lúc
        slidesToScroll: 4, // Số lượng slide cuộn mỗi lần
        responsive: [
            {
                breakpoint: 960, // Dưới kích thước này, hiển thị 2 slide
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, // Dưới kích thước này, hiển thị 1 slide
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const navigate = useNavigate()
    const handleNavigateToCompany = (company) => {
        navigate(`/detail-company/${company.id}`);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Slider {...settings}>
                {companies.map((company, index) => (
                    <Card onClick = {()=>handleNavigateToCompany(company)}
                        key={index} sx={{ padding: 2,height : '110%',borderRadius :"30px" ,cursor :'pointer'}}>
                        <CardContent>
                            <img
                                src={company.logo}
                                alt={company.name}
                                style={{ width: '100%', height: '100px', objectFit: 'contain' }}
                            />
                            <Typography variant="h6">{company.name}</Typography>
                            <Typography color="text.secondary">{company.location}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Slider>
        </Box>
    );
};

export default CompanySlider;
