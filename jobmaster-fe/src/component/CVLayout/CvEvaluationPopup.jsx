import React, { useState } from 'react';
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

function CvEvaluationPopup({ open, onClose, selectedStatus, onStatusChange,id  }) {
    // Danh sách các trạng thái có sẵn
    const statuses = ['RECEIVED', 'MATCHED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'HIRED', 'REJECTED'];

    // Hàm xử lý khi người dùng chọn một trạng thái khác
    const handleStatusClick = (status) => {
        onStatusChange(status); //
    };

    const handleSubmit = (status)=>{
        onClose()
        const data = {
            id:id,
            status : status
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
                                label={status}
                                color={selectedStatus === status ? 'primary' : 'default'}
                                variant={selectedStatus === status ? 'filled' : 'outlined'}
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
