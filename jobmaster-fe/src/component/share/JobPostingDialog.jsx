import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Paper,
} from '@mui/material';

const JobPostingDialog = ({ open, onClose, data }) => {
    return (
        <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '600px', maxHeight: '80vh' } }}>
            <DialogTitle>Thông tin tuyển dụng</DialogTitle>
            <DialogContent>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Tiêu đề: {data.title}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Chiến dịch: {data.campaignName || "Không có"}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Vị trí: {data.position}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Lĩnh vực: {data.field}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Hạn nộp hồ sơ: {data.deadline}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Số lượng: {data.quantity}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Tỉnh/Thành phố: {data.city}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Loại công việc: {data.typeWorking}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Cấp bậc: {data.level}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Kinh nghiệm: {data.experience}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Khoảng lương: {data.salaryRange}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Giới tính: {data.gender}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 2 }}>Thời gian làm việc: {data.timeWorking}</Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Mô tả công việc</Typography>
                    <Typography sx={{ ml: 2 }} dangerouslySetInnerHTML={{ __html: data.description }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Yêu cầu ứng viên</Typography>
                    <Typography sx={{ ml: 2 }} dangerouslySetInnerHTML={{ __html: data.required }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Quyền lợi ứng viên</Typography>
                    <Typography sx={{ ml: 2 }} dangerouslySetInnerHTML={{ __html: data.interest }} />
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Đóng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default JobPostingDialog;
