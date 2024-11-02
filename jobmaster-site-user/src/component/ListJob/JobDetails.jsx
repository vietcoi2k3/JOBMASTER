import React, { useState } from 'react';
import {
    Avatar, Box, Button, Card, CardContent, Chip, Divider,
    IconButton, Typography, Stack, Grid
} from '@mui/material';
import {
    LocationOn, People, AttachMoney, OpenInNew, CalendarToday,
    WorkOutline, AccessTime, Person, Group, Wc
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import ApplyJobPopup from "./ApplyJobPopup";
import { EmojiEvents } from '@mui/icons-material';
const GeneralInfo = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Box sx={{ ml: 2 }}>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body1" fontWeight="medium">
                {value}
            </Typography>
        </Box>
    </Box>
);

const JobDetails = () => {
    const { state } = useLocation();
    const { job } = state || {};
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const handleNavigateToCompany = () => {
        navigate(`/detail-company/${job.enterpriseId}`);
    };
    const [open, setOpen] = useState(false);
    return (
        <Box sx={{ maxWidth: '1200px', margin: 'auto', px: 3, py: 6 }}>
            <ApplyJobPopup open={open} onClose={() => setOpen(false)} postId={job.id} />
            <Grid container spacing={3}>
                {/* Main Content */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: '16px', boxShadow: 4, p: 4 }}>
                        {/* Header: Main Info */}
                        <Box display="flex" alignItems="center" mb={3}>
                            <Avatar
                                src={job.logoCompany}
                                alt={job.companyName}
                                sx={{ width: 80, height: 80, mr: 3 }}
                            />
                            <Box flexGrow={1}>
                                <Typography variant="h4" fontWeight="bold">
                                    {job.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {job.nameCompany}
                                </Typography>
                                <Chip
                                    label={job.label ? "Hot Job" : "Cơ hội mới"}
                                    color={job.label ? "error" : "primary"}
                                    size="small"
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                            <IconButton
                                onClick={handleNavigateToCompany}
                                sx={{
                                    alignSelf: 'flex-start',
                                    '&:hover': {
                                        color: 'primary.main'
                                    }
                                }}
                            >
                                <OpenInNew fontSize="large" />
                            </IconButton>
                        </Box>

                        {/* Application Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{ mb: 3 }}
                            onClick={() => {
                                if (token === null) {
                                    // Nếu chưa đăng nhập, điều hướng đến /login
                                    navigate('/login');
                                    return
                                }
                                setOpen(true)
                            }}
                        >
                            Ứng tuyển ngay
                        </Button>

                        <Divider sx={{ mb: 3 }} />

                        {/* Basic Info */}
                        <Stack direction="row" spacing={3} mb={3}>
                            <Box>
                                <Typography variant="body1" color="text.secondary" display="flex" alignItems="center">
                                    <LocationOn sx={{ mr: 1 }} /> Địa điểm: {job.city}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" display="flex" alignItems="center" mt={1}>
                                    <People sx={{ mr: 1 }} /> Quy mô: {job.scales}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="primary" display="flex" alignItems="center">
                                    <AttachMoney sx={{ mr: 1 }} /> {job.salaryRange || "Thỏa thuận"}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" display="flex" alignItems="center" mt={1}>
                                    <CalendarToday sx={{ mr: 1 }} /> Còn {job.deadLine} ngày để ứng tuyển
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        {/* Job Description */}
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Mô tả công việc
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                            dangerouslySetInnerHTML={{ __html: job.description }}
                        />

                        {/* Job Requirements */}
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Yêu cầu công việc
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                            dangerouslySetInnerHTML={{ __html: job.required }}
                        />

                        {/* Benefits */}
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Quyền lợi
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                            dangerouslySetInnerHTML={{ __html: job.interest }}
                        />
                    </Card>
                </Grid>

                {/* General Information Sidebar */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: '16px', boxShadow: 4, p: 4 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Thông tin chung
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <GeneralInfo
                                icon={<WorkOutline color="primary" />}
                                label="Cấp bậc"
                                value={job.level}
                            />
                            <GeneralInfo
                                icon={<EmojiEvents color="primary" />}
                                label="Kinh nghiệm"
                                value={job.experience}
                            />
                            <GeneralInfo
                                icon={<Group color="primary" />}
                                label="Số lượng tuyển"
                                value={job.quantity}
                            />
                            <GeneralInfo
                                icon={<Person color="primary" />}
                                label="Hình thức làm việc"
                                value={job.typeWorking}
                            />
                            {/* Thêm thông tin timeWorking */}
                            <GeneralInfo
                                icon={<AccessTime color="primary" />}
                                label="Thời gian làm việc"
                                value={job.timeWorking}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JobDetails;
