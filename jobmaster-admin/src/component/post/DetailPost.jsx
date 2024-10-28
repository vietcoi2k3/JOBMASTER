import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Paper, Typography, Grid, TextField, MenuItem, CircularProgress, Stack, Button
} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import AdminApi from "../../api/AdminApi";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
const JobInfoView = () => {
    const [data, setData] = useState({}); // Lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const id = useParams().id
    // Gọi API để lấy dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            AdminApi.getDetailPost(id).then((e)=>{
                setData(e)
            })
        };

        fetchData();
    }, []);

    const navigate = useNavigate()

    const handleApprove = () => {
        AdminApi.updateStatusPost("APPROVED",id).then((e)=>{
            navigate("/post")
        })
    };

    const handleReject = () => {
        AdminApi.updateStatusPost("NOT_APPROVED",id).then((e)=>{
            navigate("/post")
        })
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Thông tin chung
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tiêu đề tin"
                            value={data.title || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Chiến dịch tuyển dụng"
                            value={data.campaign?.name || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Vị trí"
                            value={data.position || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Lĩnh vực"
                            value={data.field || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Hạn nộp hồ sơ"
                            type="date"
                            value={data.deadline || ''}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Số lượng"
                            type="number"
                            value={data.quantity || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Chọn tỉnh/Thành phố"
                            value={data.city || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
                        Yêu cầu chung
                    </Typography>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Loại công việc"
                            value={data.typeWorking || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Cấp bậc"
                            value={data.level || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Kinh nghiệm"
                            value={data.experience || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Khoảng lương"
                            value={data.salaryRange || 'Không có dữ liệu'}
                            placeholder="Ví dụ: 10 - 20 triệu"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Giới tính"
                            value={data.gender || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Thời gian làm việc"
                            value={data.timeWorking || 'Không có dữ liệu'}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Typography variant="h6" gutterBottom>
                        Thông tin chi tiết
                    </Typography>

                    <ReactQuill
                        theme="snow"
                        value={data.description || ''}
                        readOnly
                        style={{ width: '100%', marginTop: '15px' }}
                    />

                    <ReactQuill
                        theme="snow"
                        value={data.required || ''}
                        readOnly
                        style={{ width: '100%', marginTop: '70px' }}
                    />

                    <ReactQuill
                        theme="snow"
                        value={data.interest || ''}
                        readOnly
                        style={{ width: '100%', marginTop: '70px' }}
                    />
                </Grid>
                <Stack direction="row" spacing={2} justifyContent="center" mt={8}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApprove}
                    >
                        Phê duyệt
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleReject}
                    >
                        Không phê duyệt
                    </Button>
                </Stack>
            </Paper>
            {/* 2 Nút Phê Duyệt và Không Phê Duyệt */}

        </Box>
    );
};

export default JobInfoView;
