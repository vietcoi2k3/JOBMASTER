import React, { useEffect, useState } from 'react';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
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
    Avatar, Pagination, MenuItem, Select, InputLabel, FormControl, Tooltip
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
    const statusMap = new Map([
        ["RECEIVED", "Tiếp nhận"],
        ["MATCHED", "Phù hợp"],
        ["INTERVIEW_SCHEDULED", "Hẹn phỏng vấn"],
        ["OFFERED", "Gửi đề nghị"],
        ["HIRED", "Nhận việc"],
        ["REJECTED", "Từ chối"]
    ]);

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

                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Đăng bởi HR*/}
                    {/*</Typography>*/}
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

                    {Array.from(statusMap.entries()).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                            {value}

                        </MenuItem>
                    ))}
                </Select>

            </FormControl>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="candidates table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:'bold'}}>Ứng viên</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Thông tin liên hệ</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Trạng thái</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Thông tin ứng viên</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cv.map((cv, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {/*<PersonSharpIcon fontSize = "small" sx={{ mr: 1 }}/>*/}
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
<<<<<<< HEAD
                                    <Chip label={statusMap.get(cv.status) || cv.status} color="default" />
=======
                                    <Chip
                                        label={
                                            cv.status === 'RECEIVED' ? 'Tiếp nhận CV' :
                                                cv.status === 'MATCHED' ? 'Phù hợp' :
                                                    cv.status === 'INTERVIEW_SCHEDULED' ? 'Hẹn phỏng vấn' :
                                                        cv.status === 'OFFERED' ? 'Qua phỏng vấn' :
                                                            cv.status === 'HIRED' ? 'Nhận việc' :
                                                                cv.status === 'REJECTED' ? 'Từ chối' :
                                                                    cv.status
                                        }
                                        color={
                                            cv.status === 'RECEIVED' ? 'default' :
                                                cv.status === 'MATCHED' ? 'warning' :
                                                    cv.status === 'INTERVIEW_SCHEDULED' ? 'primary' :
                                                        cv.status === 'OFFERED' ? 'primary' :
                                                            cv.status === 'HIRED' ? 'success' :
                                                                cv.status === 'REJECTED' ? 'error' :
                                                                    'default'
                                        }
                                        sx={{
                                            width: 150, // Cố định chiều rộng
                                            fontWeight: 'bold', // Để chữ đậm
                                            backgroundColor:
                                                cv.status === 'RECEIVED' ? '#D9D9D9' : // Nền xám nhạt cho RECEIVED
                                                    cv.status === 'MATCHED' ? '#F5BA1333' : // Nền vàng nhạt cho MATCHED
                                                        cv.status === 'INTERVIEW_SCHEDULED' ? '#6098F642' : // Nền xanh dương nhạt cho INTERVIEW_SCHEDULED
                                                            cv.status === 'OFFERED' ? '#6098F64A' : // Nền xanh dương nhạt cho OFFERED
                                                                cv.status === 'HIRED' ? '#25B37333' : // Nền xanh lá nhạt cho HIRED
                                                                    cv.status === 'REJECTED' ? '#FF000033' : // Nền đỏ nhạt cho REJECTED
                                                                        '#e0e0e0', // Nền xám nhạt mặc định
                                            color:
                                                cv.status === 'RECEIVED' ? '#616161' : // Chữ xám đậm cho RECEIVED
                                                    cv.status === 'MATCHED' ? '#F5BA13' : // Chữ cam đậm cho MATCHED
                                                        cv.status === 'INTERVIEW_SCHEDULED' ? '#6098F6' : // Chữ xanh dương đậm cho INTERVIEW_SCHEDULED
                                                            cv.status === 'OFFERED' ? '#3758F9' : // Chữ xanh dương đậm cho OFFERED
                                                                cv.status === 'HIRED' ? '#25B373' : // Chữ xanh lá đậm cho HIRED
                                                                    cv.status === 'REJECTED' ? '#FF0000A8' : // Chữ đỏ đậm cho REJECTED
                                                                        '#616161', // Chữ xám đậm mặc định
                                            borderRadius: 4, // Góc bo tròn cho Chip
                                            opacity: 1 // Đảm bảo độ đậm của chữ và nền không bị mờ
                                        }}
                                    />


>>>>>>> ffeb8be80b476c45452a8722708a81a977de76e1
                                </TableCell>
                                <TableCell>
                                    <Chip onClick={() => { navigate("/dashboard/detail-cv/" + cv.id); return null }} label="Xem CV" color="primary" variant="outlined" clickable />
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={'Tải CV'}>
                                        <IconButton>
                                            <DownloadIcon
                                                onClick={() => handleDownload(cv.id)}
                                            ></DownloadIcon>
                                        </IconButton>
                                    </Tooltip>

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