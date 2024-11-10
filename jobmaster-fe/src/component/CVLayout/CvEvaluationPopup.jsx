import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Chip,
    Grid,
    Divider,
} from '@mui/material';
import EnterpriseApi from "../../api/EnterpriseApi";
const statusMap = new Map([
    ["RECEIVED", "Tiếp nhận"],
    ["MATCHED", "Phù hợp"],
    ["INTERVIEW_SCHEDULED", "Hẹn phỏng vấn"],
    ["OFFERED", "Gửi đề nghị"],
    ["HIRED", "Nhận việc"],
    ["REJECTED", "Từ chối"]
]);
function CvEvaluationPopup({ open, onClose, selectedStatus, onStatusChange,id,cvEntity  }) {
    // Danh sách các trạng thái có sẵn
    const statuses = ['RECEIVED', 'MATCHED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'HIRED', 'REJECTED'];
    const [statusSelect,setStatusSelect] = useState(selectedStatus)
    // Hàm xử lý khi người dùng chọn một trạng thái khác
    const handleStatusClick = (status) => {
        setStatusSelect(status)
    };
    useEffect(() => {
        setStatusSelect(cvEntity.status);
    }, [cvEntity]);
    const handleSubmit = (status)=>{
        onClose(setStatusSelect)
        onStatusChange(statusSelect)
        const data = {
            id:id,
            status : statusSelect
        }
        EnterpriseApi.updateStatus(data).then((e)=>{
            console.log(e)
        })
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Đánh giá CV ứng viên</DialogTitle>
            <DialogContent>
                {/* Các nút trạng thái */}
                <Grid container spacing={1} justifyContent="flex-start" marginBottom={2}>
                    {statuses.map((status) => (
                        <Grid item key={status}>
                            {/* Đổi màu trạng thái đã chọn */}
                            <Chip
                                label={statusMap.get(status)}
                                color={statusSelect === status ? 'primary' : 'default'}
                                variant={statusSelect === status ? 'filled' : 'outlined'}
                                onClick={() => handleStatusClick(status)}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Input cho ghi chú */}
                <Typography variant="body2" marginBottom={1}>
                    Ghi chú (nội dung này sẽ không hiển thị với ứng viên)
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Bạn có muốn thêm ghi chú cho sự thay đổi này không?"
                    variant="outlined"
                />

                {/* Divider */}
                <Divider sx={{ my: 2 }} />


            </DialogContent>

            {/* Các nút thao tác */}
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="outlined">
                    Hủy bỏ
                </Button>
                <Button onClick={()=>{handleSubmit(selectedStatus)}} color="primary" variant="contained">
                    Cập nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CvEvaluationPopup;
