import React, {useEffect, useState} from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
// import { Work } from 'lucide-react';
import sliderimg from '../../assets/sliderimg.png'
import {useParams} from "react-router-dom";
import authApi from "../../api/AuthApi";

const CompanyProfile = () => {
    const { id } = useParams();
    const [company,setCompany] = useState([])

    useEffect(() => {
        authApi.getDetailCompany(id).then((e)=>{
            setCompany(e)
        })

    }, [id]);
    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
            {/* Header */}
            <img src={sliderimg}
                />

            {/* Profile Section */}
            <Card sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    display: 'flex', // Sử dụng flex để căn giữa
                                    justifyContent: 'center', // Căn giữa theo chiều ngang
                                    alignItems: 'center' // Căn giữa theo chiều dọc
                                }}
                                src={company.logo} // Sử dụng thuộc tính src để chỉ định hình ảnh
                                alt="Description of the image" // Thuộc tính alt mô tả hình ảnh
                                imgProps={{
                                    style: {
                                        objectFit: 'cover', // Đảm bảo hình ảnh chiếm toàn bộ diện tích của Avatar
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">{company.companyName}</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                                Theo dõi công ty
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Main Content - 10:2 Ratio */}
            <Grid container spacing={2}>
                {/* Company Info and Introduction - 10 parts */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Thông tin chung</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">Mô hình công ty: Sản phẩm</Typography>
                                    <Typography variant="body2">Lĩnh vực công ty: {company.fieldOfActivity}</Typography>
                                    <Typography variant="body2">Quy mô công ty: 1000+ nhân viên: {company.scales}</Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">Email: {company.emailCompany}</Typography>
                                    <Typography variant="body2">Website: {company.linkWebSite}</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" gutterBottom>Giới thiệu công ty</Typography>
                            <Typography variant="body2" style={{ lineHeight: 1.5, marginTop: '5px' }}>
                                <span dangerouslySetInnerHTML={{ __html:   company.description }} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Job Listings - 2 parts */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Việc làm đang tuyển dụng</Typography>
                            <List>
                                {['IT Business Analyst', 'Tester', 'Developer Java'].map((job, index) => (
                                    <React.Fragment key={job}>
                                        <ListItem>
                                            <ListItemText
                                                primary={job}
                                                secondary="Viettel - Hồ Chí Minh"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Button variant="outlined" color="primary" fullWidth>Ứng tuyển</Button>
                                        </ListItem>
                                        {index < 2 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CompanyProfile;