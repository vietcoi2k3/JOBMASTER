import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderimg from "../../assets/sliderimg.png"

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
        src: 'https://example.com/image1.jpg',
        alt: 'Ảnh 1',
    },
    {
        src: 'https://example.com/image2.jpg',
        alt: 'Ảnh 2',
    },
    {
        src: 'https://example.com/image3.jpg',
        alt: 'Ảnh 3',
    },
];

const SliderHome = () => {
    return (
        <Box mt={5} textAlign="center">
            <Slider {...settings}>
                {defaultImages.map((image, index) => (
                    <Box key={index}>
                        <img
                            src={sliderimg}
                            alt={image.alt}
                            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default SliderHome;
