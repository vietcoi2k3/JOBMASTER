import React, {useEffect, useState} from 'react';
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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import EnterpriseApi from "../../api/EnterpriseApi";
import Notification from "../notification/Notification";

const RecruitmentPopup = ({onSuccess}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listPosition,setListPosition] = useState([])
    const [notification, setNotification] = useState({ open: false, message: '',type:'' });
    const [data,setData]=useState({
        name:"",
        field:"",
        position:"",
        quantity:"",
        startDate:null,
        endDate:null
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange =(e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit=()=>{
        setLoading(true)
        EnterpriseApi.addCampaign(data)
            .then((err)=>{
                onSuccess();
                setNotification({open: true,message: "thêm thành công",type: "success"})

            })
            .catch((err)=>{
                setNotification({open: true,message: "thêm thất bại",type: "error"})
            })
            .finally((e)=>{
                handleClose()
                setLoading(false)
            })
    }

    return (
        <div>
            <div>
                <Notification
                    open={notification.open}
                    onClose={()=>setNotification({open: false})}
                    message={notification.message}
                    type={notification.type}
                />
            </div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                + Thêm chiến dịch mới
            </Button>
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
                                    name ="name"
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <DatePicker
                                    label="Thời gian bắt đầu"
                                    value={data.startDate}
                                    name ="startDate"
                                    onChange={(newValue) => setData({...data,startDate:newValue})}
                                    renderInput={(params) => <TextField {...params} fullWidth required />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="Thời gian kết thúc"
                                    value={data.endDate}
                                    name ="endDate"
                                    onChange={(newValue) => setData({...data,endDate:newValue})}
                                    renderInput={(params) => <TextField {...params} fullWidth required />}
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Tạo mới'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RecruitmentPopup;
