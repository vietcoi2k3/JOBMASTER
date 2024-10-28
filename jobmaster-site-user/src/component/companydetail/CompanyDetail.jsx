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
import sliderimg from '../../assets/companyLogo.png'
import {useNavigate, useParams} from "react-router-dom";
import authApi from "../../api/AuthApi";
import ApplyJobPopup from "../ListJob/ApplyJobPopup";

const CompanyProfile = () => {
    const { id } = useParams();
    const [company,setCompany] = useState([])
    const [listJob,setListJob] = useState([])
    const [open, setOpen] = useState(false);
    const [jobSelect ,setJobSelect] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        authApi.getDetailCompany(id).then((e)=>{
            setCompany(e)
        })
        authApi.getPostByCompany(id).then((e)=>{
            setListJob(e)
        })

    }, [id]);

     const handleSelect =(job)=>{

             if (localStorage.getItem("access_token") === null) {
                 // Nếu chưa đăng nhập, điều hướng đến /login
                 navigate('/login');
                 return
             }
             setOpen(true)

         setJobSelect(job)
         setOpen(true)
     }
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
                            {/*<Typography variant="h5"></Typography>*/}
                            <Button variant="contained" color="primary" sx={{ mt: 3,fontSize:20 }}>
                                {company.companyName}
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
                    <ApplyJobPopup open={open} onClose={() => setOpen(false) } postId ={jobSelect?.id}/>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Việc làm đang tuyển dụng</Typography>
                            <List>
                                {listJob.map((job, index) => (
                                    <React.Fragment key={job}>
                                        <ListItem>
                                            <ListItemText
                                                primary={job.title}
                                                secondary={job.salaryRange}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Button variant="outlined" color="primary" fullWidth onClick={() => handleSelect(job)}> Ứng tuyển</Button>
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