import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Avatar, Pagination, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useParams } from "react-router-dom";
import EnterpriseApi from "../../api/EnterpriseApi";
import DownloadIcon from '@mui/icons-material/Download';
import { STATIC_HOST } from '../../enviroment';
import AuthApi from '../../api/AuthApi';

const ViewCV = () => {

    const navigate = useNavigate();
    const id = useParams().id
    const [jobInfo, setJobInfo] = useState({})
    const [cv, setCv] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [pageIndex, setPageIndex] = useState(1)
    const [status, setStatus] = useState('')
    const statuses = ['RECEIVED', 'MATCHED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'HIRED', 'REJECTED'];

    useEffect(() => {
        EnterpriseApi.getListCv(pageIndex, id, status).then((e) => {
            setCv(e.data)
            setTotalPage(e.totalPage)
        })
    }, [pageIndex, status]);

    useEffect(() => {
        EnterpriseApi.getDetailPost(id).then((e) => {
            setJobInfo(e)
        })
    }, [])
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleDownload = async (id) => {
        try {
            const url = STATIC_HOST + "auth/download-cv?id=" + id;
            // Tạo một liên kết tải xuống tạm thời
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', ''); // Thay đổi tên file nếu cần
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };
    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Thông tin bài đăng
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Typography variant="body2" color="text.secondary">
                        Đăng bởi HR
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography><strong>Tiêu đề tin đăng:</strong> {jobInfo.title}</Typography>
                    <Typography><strong>Vị trí:</strong> {jobInfo.position}</Typography>
                    <Typography><strong>Số lượng:</strong> {jobInfo.quantity}</Typography>
                    <Typography><strong>Chiến dịch:</strong> {jobInfo.campaignName}</Typography>
                </Box>
            </Paper>

            <FormControl style={{ width: '20%', backgroundColor: 'white' }} sx={{ mb: 2 }}>
            <InputLabel id="status-select-label">Chọn trạng thái</InputLabel>
                <Select
                labelId="status-select-label"
                    id="status-select"
                    value={status}
                    onChange={handleStatusChange}
                    label="Chọn trạng thái"
                >
                    <MenuItem value="">
                        <em>Tất cả trạng thái</em>
                    </MenuItem>
                    {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </Select>

            </FormControl>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="candidates table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ứng viên</TableCell>
                            <TableCell>Thông tin liên hệ</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thông tin ứng viên</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cv.map((cv, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body2" color="text.secondary">
                                        {cv.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{cv.email}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{cv.phoneNumber}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip label={cv.status} color="default" />
                                </TableCell>
                                <TableCell>
                                    <Chip onClick={() => { navigate("/dashboard/detail-cv/" + cv.id); return null }} label="Xem CV" color="primary" variant="outlined" clickable />
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <DownloadIcon
                                            onClick={() => handleDownload(cv.id)}
                                        ></DownloadIcon>
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                onChange={(event, page) => setPageIndex(page)}
                page={pageIndex}
                count={totalPage}
                color="primary"
                sx={{
                    width: '100%',
                    backgroundColor: '#ffff',
                    marginTop: 1,
                    '& .MuiPagination-ul': {
                        justifyContent: 'center'
                    }
                }}
            />
        </Box>
    );
};

export default ViewCV;