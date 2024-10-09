import React, {useEffect, useState} from 'react';
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
    Avatar
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useNavigate, useParams} from "react-router-dom";
import EnterpriseApi from "../../api/EnterpriseApi";

const ViewCV = () => {

    const navigate = useNavigate();
    const id = useParams().id
    const [jobInfo,setJobInfo] = useState({})
    const [cv,setCv] = useState([])
    const [totalPage ,setTotalPage]= useState(0)
    const [pageIndex,setPageIndex] = useState(1)

    useEffect(() => {
        EnterpriseApi.getListCv(pageIndex,id).then((e)=>{
            setCv(e.data)
            setTotalPage(e.totalPage)
        })
    }, [pageIndex]);

    useEffect(()=>{
        EnterpriseApi.getDetailPost(id).then((e)=>{
            setJobInfo(e)
        })
    },[])

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
                    <Typography><strong>Chiến dịch:</strong> {jobInfo.nameCam}</Typography>
                </Box>
            </Paper>

            <TableContainer component={Paper}>
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
                        {cv.map((cv,index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {cv.name}
                                    <Typography variant="body2" color="text.secondary">
                                        Chưa xem
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
                                    <Chip onClick={()=>{navigate("/dashboard/detail-cv/"+cv.id);return null}} label="Xem Profile" color="primary" variant="outlined" clickable />
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ViewCV;