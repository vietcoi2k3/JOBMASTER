import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    MenuItem,
    Grid,
    IconButton,
    CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import EnterpriseApi from "../../api/EnterpriseApi";
import Notification from "../notification/Notification";

const RecruitmentPopup = ({ onSuccess, createStep, campaign }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', type: '' });
    const [data, setData] = useState({
        name: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
        if(createStep){
            setData({name:""});
        }else{
            setData({name:campaign.name});
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmitCreate = () => {
        setLoading(true)
        EnterpriseApi.addCampaign(data)
            .then((err) => {
                onSuccess();
                setNotification({ open: true, message: "thêm thành công", type: "success" })

            })
            .catch((err) => {
                setNotification({ open: true, message: "thêm thất bại", type: "error" })
            })
            .finally((e) => {
                handleClose()
                setLoading(false)
            })
    }
    const handleSubmitUpdate = () => {
        setLoading(true)
        EnterpriseApi.updateCampaign(campaign.id, data)
            .then((err) => {
                onSuccess();
                setNotification({ open: true, message: "Cập nhật thành công", type: "success" })

            })
            .catch((err) => {
                setNotification({ open: true, message: "Cập nhật thất bại", type: "error" })
            })
            .finally((e) => {
                handleClose()
                setLoading(false)
            })
    }

    return (
        <div>
            <div>
                <Notification
                    open={notification.open}
                    onClose={() => setNotification({ open: false })}
                    message={notification.message}
                    type={notification.type}
                />
            </div>

            {createStep ? (
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    + Thêm chiến dịch mới
                </Button>
            ) : (
                <IconButton onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            )}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Chiến dịch tuyển dụng
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField

                                    label="Tên chiến dịch tuyển dụng"
                                    placeholder="VD: Tuyển dụng nhân viên marketing"
                                    fullWidth
                                    required
                                    name="name"
                                    onChange={handleChange}
                                    value={data.name}
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Hủy bỏ
                    </Button>
                    {createStep ? (
                        <Button onClick={handleSubmitCreate} disabled={loading} variant="contained" color="primary">
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Tạo mới'}
                        </Button>
                    ) : (<Button onClick={handleSubmitUpdate} disabled={loading} variant="contained" color="primary">
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Cập nhật'}
                    </Button>)
                    }

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RecruitmentPopup;
