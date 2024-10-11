import React, {useEffect, useState} from 'react';
import {Grid, Card, CardContent, Typography, Button, Chip, Divider, Pagination,Box, Avatar,Link, IconButton} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AuthApi from "../../api/AuthApi";
import PeopleIcon from '@mui/icons-material/People'; // Thay cho Users
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Thay cho MapPin
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ApplyJobPopup from "./ApplyJobPopup";
import {useNavigate} from "react-router-dom"; // Thay cho ExternalLink



const JobList = ({ jobs, onSelectJob }) => (
    <Grid container spacing={1} direction="column">
        {jobs.map((job) => (
            <Grid item key={job.index}>
                <Card variant="outlined" sx={{ padding: '8px 12px', cursor: 'pointer', minHeight: '100px' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px' }}>
                        <div>
                            <Chip
                                label={"Hot"}
                                color={job.urgency === 'Hot' ? 'error' : 'error'}
                                size="small"
                                sx={{ marginBottom: '4px', fontSize: '12px', height: '20px' }}
                            />
                            <Typography variant="subtitle2" fontWeight="bold">{job.title}</Typography>
                            <Typography variant="body2">{job.companyName} - {job.address}</Typography>
                            <Typography variant="caption" color="textSecondary">Mức lương: {job.salaryRange}</Typography>
                        </div>
                        <IconButton size="small" onClick={() => onSelectJob(job)}>
                            <ArrowForwardIosIcon fontSize="small" />
                        </IconButton>
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
);

const JobDetails = ({ job }) => {

    const navigate = useNavigate()
    const handleNavigate = () => {
        // Chuyển hướng đến trang /companydetail với id của công ty
        navigate(`/detail-company/${job.enterpriseId}`);
    };
    const [open, setOpen] = useState(false);
    return(
        <Card variant="outlined" sx={{padding: '16px', minHeight: '200px'}}>
            <ApplyJobPopup open={open} onClose={() => setOpen(false) } postId ={job.id}/>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                <div>
                    <Typography variant="h6" fontSize="18px">{job.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.companyName}</Typography>
                    <Typography variant="body2">{job.address}</Typography>
                    <Typography variant="body2" fontWeight="bold">{job.salaryRange}/tháng</Typography>
                </div>
                <Button variant="contained" color="primary" size="small" onClick={() => setOpen(true)}>Ứng tuyển</Button>
            </div>
            <Divider style={{margin: '12px 0'}}/>
            <Typography variant="subtitle1" fontWeight="bold">Mô tả công việc</Typography>
            <Typography variant="body2" style={{ lineHeight: 1.5, marginTop: '5px' }}>
                <span dangerouslySetInnerHTML={{ __html: job.description }} />
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">Yêu cầu công việc</Typography>
            <Typography variant="body2" style={{ lineHeight: 1.5, marginTop: '5px' }}>
                <span dangerouslySetInnerHTML={{ __html: job.required }} />
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">Quyền lợi</Typography>
            <Typography variant="body2" style={{ lineHeight: 1.5, marginTop: '5px' }}>
                <span dangerouslySetInnerHTML={{ __html: job.interest }} />
            </Typography>
            <Card sx={{maxWidth: 600, m: 2}}>
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Avatar
                            src={job.logoCompany}
                            alt="BSS Group"
                            sx={{width: 56, height: 56, mr: 2}}
                        />
                        <Box flexGrow={1}>
                            <Typography variant="h6" component="div">
                                {job.nameCompany}
                            </Typography>
                            <Box display="flex" alignItems="center" mt={1}>
                                <PeopleIcon fontSize="small"/> {/* Thay thế Users bằng PeopleIcon */}
                                <Typography variant="body2" color="text.secondary" sx={{ml: 1}}>
                                    {job.scales}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mt={0.5}>
                                <LocationOnIcon fontSize="small"/> {/* Thay thế MapPin bằng LocationOnIcon */}
                                <Typography variant="body2" color="text.secondary" sx={{ml: 1}}>
                                    Địa điểm: Lot 2C1, KĐT Nam Trung Yên, Trung Hòa, Cầu Giấy
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton aria-label="Xem công ty" sx={{ alignSelf: 'flex-start' }} onClick={handleNavigate}>
                            <OpenInNewIcon /> {/* Thay thế ExternalLink bằng OpenInNewIcon */}
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </Card>
    )
};

const JobBoard = () => {

    const [selectedJob, setSelectedJob] = useState(null);
    const [jobList,setJobList] = useState([])
    const [pageNumber,setPageNumber] = useState(1)
    const [totalPage,setTotalPage] = useState(0)

    useEffect(() => {
        AuthApi.getListJob(pageNumber)
            .then((e)=>{

                setJobList(e.data)
                setTotalPage(e.totalPage)
            })
    }, [pageNumber]);
    return (
        <Grid container spacing={3} style={{ padding: '10px',justifyContent:'center'}}>
            <Grid item xs={4}>
                <JobList jobs={jobList} onSelectJob={setSelectedJob} />
            </Grid>
            <Grid item xs={8}>
                {selectedJob ? (
                    <JobDetails job={selectedJob} />
                ) : (
                    <Typography variant="h6" color="textSecondary">Chọn một công việc để xem chi tiết</Typography>
                )}
            </Grid>
            <Pagination count={totalPage} color="primary" sx={{marginTop :'40px' }} />
        </Grid>
    );
};

export default JobBoard;
