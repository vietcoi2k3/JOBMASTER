import React from 'react';
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

const ViewCV = () => {
    const jobInfo = {
        id: '#1693750',
        title: 'Nhân viên kiểm thử',
        position: 'Tester',
        quantity: 1,
        campaign: 'Tuyển dụng nhân viên tháng 5'
    };

    const candidates = [
        {
            name: 'Phạm Thị A',
            email: 'A@gmail.com',
            phone: '0333482008',
            status: 'CV tiếp nhận'
        }
    ];

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Thông tin bài đăng
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">#{jobInfo.id}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Đăng bởi HR
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography><strong>Tiêu đề tin đăng:</strong> {jobInfo.title}</Typography>
                    <Typography><strong>Vị trí:</strong> {jobInfo.position}</Typography>
                    <Typography><strong>Số lượng:</strong> {jobInfo.quantity}</Typography>
                    <Typography><strong>Chiến dịch:</strong> {jobInfo.campaign}</Typography>
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
                        {candidates.map((candidate) => (
                            <TableRow key={candidate.name}>
                                <TableCell component="th" scope="row">
                                    {candidate.name}
                                    <Typography variant="body2" color="text.secondary">
                                        Chưa xem
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{candidate.email}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{candidate.phone}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip label={candidate.status} color="default" />
                                </TableCell>
                                <TableCell>
                                    <Chip label="Xem Profile" color="primary" variant="outlined" clickable />
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