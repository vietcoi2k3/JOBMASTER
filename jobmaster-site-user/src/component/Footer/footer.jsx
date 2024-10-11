import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#f9fafb', p: 4, mt: 5 }}>
            <Grid container spacing={2}>
                {/* Phần logo và mạng xã hội */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight="bold">
                        JobMaster
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Kết nối cơ hội - Chắp cánh thành công
                    </Typography>
                    <Box mt={2}>
                        <IconButton href="https://facebook.com" target="_blank" color="primary">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="https://twitter.com" target="_blank" color="primary">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton href="https://youtube.com" target="_blank" color="primary">
                            <YouTubeIcon />
                        </IconButton>
                        <IconButton href="https://linkedin.com" target="_blank" color="primary">
                            <LinkedInIcon />
                        </IconButton>
                    </Box>
                </Grid>

                {/* Phần liên kết */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight="bold">
                        Về JOBMASTER
                    </Typography>
                    <Link href="#" color="inherit" underline="none">
                        <Typography variant="body2">Trang chủ</Typography>
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        <Typography variant="body2">Giới thiệu</Typography>
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        <Typography variant="body2">Liên hệ</Typography>
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        <Typography variant="body2">Câu hỏi thường gặp</Typography>
                    </Link>
                </Grid>

                {/* Điều khoản và chính sách */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight="bold">
                        Điều khoản chung
                    </Typography>
                    <Link href="#" color="inherit" underline="none">
                        <Typography variant="body2">Chính sách bảo mật</Typography>
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        <Typography variant="body2">Điều khoản dịch vụ</Typography>
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        <Typography variant="body2">Quy chế hoạt động</Typography>
                    </Link>
                </Grid>

                {/* Phần liên hệ */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight="bold">
                        Liên hệ đăng tin tuyển dụng tại:
                    </Typography>
                    <Typography variant="body2">Hồ Chí Minh: (+84) 333 482 009</Typography>
                    <Typography variant="body2">Hà Nội: (+84) 333 482 009</Typography>
                    <Typography variant="body2">Email: contact@jobmaster.vn</Typography>
                    <Link href="#" color="inherit" underline="none">
                        <Typography variant="body2">Gửi thông tin liên hệ</Typography>
                    </Link>
                </Grid>
            </Grid>
            <Box textAlign="center" mt={5}>
                <Typography variant="body2" color="textSecondary">
                    © 2024 JobMaster
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
