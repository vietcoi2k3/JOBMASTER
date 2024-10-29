import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Divider,
    Pagination,
    Box,
    Avatar,
    Link,
    IconButton,
    CircularProgress
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AuthApi from "../../api/AuthApi";
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ApplyJobPopup from "./ApplyJobPopup";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPopup from "../loading/LoadingPopup";

const JobList = ({ jobs, onSelectJob }) => (
    <Grid container spacing={1} direction="column">
        {jobs.map((job) => (
            <Grid item key={job.index}>
                <Card
                    variant="outlined"
                    sx={{ padding: 2, cursor: 'pointer', minHeight: 100, boxShadow: 2 }}
                >
                    <CardContent
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }}
                    >
                        <Box display="flex" alignItems="center">
                            <img
                                src={job.logoCompany}
                                alt={`${job.nameCompany} logo`}
                                style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 12, borderRadius: 8 }}
                            />
                            <Box>
                                {job.label && (
                                    <Chip
                                        label="Hot"
                                        color="error"
                                        size="small"
                                        sx={{ mb: 0.5, fontSize: 12, height: 20 }}
                                    />
                                )}
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {job.title}
                                </Typography>
                                <Typography variant="body2">
                                    {job.nameCompany} - {job.address}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Mức lương: {job.salaryRange}
                                </Typography>
                            </Box>
                        </Box>
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
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleNavigate = () => {
        navigate(`/detail-company/${job.enterpriseId}`);
    };

    return (
        <Card variant="outlined" sx={{ padding: 2, minHeight: 200 }}>
            <ApplyJobPopup open={open} onClose={() => setOpen(false)} postId={job.id} />
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Box>
                    <Typography variant="h6" fontSize={18}>{job.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.companyName}</Typography>
                    <Typography variant="body2">{job.address}</Typography>
                    <Typography variant="body2" fontWeight="bold">{job.salaryRange}/tháng</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        if (!localStorage.getItem("access_token")) {
                            navigate('/login');
                            return;
                        }
                        setOpen(true);
                    }}
                >
                    Ứng tuyển
                </Button>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="subtitle1" fontWeight="bold">Mô tả công việc</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5, mt: 0.5 }}>
                <span dangerouslySetInnerHTML={{ __html: job.description }} />
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">Yêu cầu công việc</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5, mt: 0.5 }}>
                <span dangerouslySetInnerHTML={{ __html: job.required }} />
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">Quyền lợi</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5, mt: 0.5 }}>
                <span dangerouslySetInnerHTML={{ __html: job.interest }} />
            </Typography>
            <Card sx={{ maxWidth: 600, m: 2 }}>
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Avatar src={job.logoCompany} alt={job.nameCompany} sx={{ width: 56, height: 56, mr: 2 }} />
                        <Box flexGrow={1}>
                            <Typography variant="h6">{job.nameCompany}</Typography>
                            <Box display="flex" alignItems="center" mt={1}>
                                <PeopleIcon fontSize="small" />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                    {job.scales}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mt={0.5}>
                                <LocationOnIcon fontSize="small" />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                    Địa điểm: Lot 2C1, KĐT Nam Trung Yên, Trung Hòa, Cầu Giấy
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton aria-label="Xem công ty" onClick={handleNavigate}>
                            <OpenInNewIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </Card>
    );
};

const JobBoard = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobList, setJobList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search') || '';
    const address = queryParams.get('address') || '';
    const field = queryParams.get('field') || '';

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await AuthApi.getListJob(pageNumber, search, address, field);
                setJobList(response.data);
                setTotalPage(response.totalPage);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [pageNumber, search, address, field]);

    const handlePageChange = (event, value) => {
        setPageNumber(value);
    };

    return (
        <Grid container spacing={3} sx={{ p: 1, justifyContent: 'center' }}>
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
            <Pagination count={totalPage} color="primary" sx={{ mt: 5 }} onChange={handlePageChange} />
            <LoadingPopup open={loading} />
        </Grid>
    );
};

export default JobBoard;
