import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderimg from "../../assets/sliderimg.png"
import sliderimg2 from "../../assets/ảnh Top CV.png"
import sliderimg3 from "../../assets/Concentrix_Banner.webp"

// Cấu hình cho slider
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

// Danh sách ảnh mặc định
const defaultImages = [
    {
        src: sliderimg
    },
    {
        src: sliderimg2
    },
    {
        src: sliderimg3
    },
];

const SliderHome = () => {
    return (
        <Box mt={5} textAlign="center">
            <Slider {...settings}>
                {defaultImages.map((image, index) => (
                    <Box key={index}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            style={{ width: '100%', height: '300px', objectFit: 'cover',margin:'auto' }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default SliderHome;
