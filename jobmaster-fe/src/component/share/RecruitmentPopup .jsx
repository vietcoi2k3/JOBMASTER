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
    CircularProgress,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Paper,
    Typography, Table, Box
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
    const [services, setServices] = useState([]);
    const [notification, setNotification] = useState({ open: false, message: '', type: '' });
    const [data, setData] = useState({
        name: ""
    });
    const [nameError, setNameError] = useState(false); // Add error state

    const handleClickOpen = () => {
        setOpen(true);
        if (createStep) {
            setData({ name: "" });
        } else {
            fetchServices(campaign.id);
            setData({ name: campaign.name });
        }
    };

    const handleClose = () => {
        setOpen(false);
        setNameError(false); // Reset error state on close
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "name" && e.target.value.trim() !== "") {
            setNameError(false); // Clear error if name is filled
        }
    };

    const handleSubmitCreate = () => {
        if (!data.name.trim()) {
            setNameError(true); // Set error if name is empty
            return;
        }
        setLoading(true);
        EnterpriseApi.addCampaign(data)
            .then(() => {
                onSuccess();
                setNotification({ open: true, message: "Thêm thành công", type: "success" });
            })
            .catch(() => {
                setNotification({ open: true, message: "Thêm thất bại", type: "error" });
            })
            .finally(() => {
                handleClose();
                setLoading(false);
            });
    };

    const handleSubmitUpdate = () => {
        if (!data.name.trim()) {
            setNameError(true);
            return;
        }
        setLoading(true);

        EnterpriseApi.updateCampaign(campaign.id, data)
            .then(() => {
                onSuccess();
                setNotification({ open: true, message: "Cập nhật thành công", type: "success" });
            })
            .catch(() => {
                setNotification({ open: true, message: "Cập nhật thất bại", type: "error" });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchServices = (id) => {
        EnterpriseApi.getAllPackageOfCampaign(id)
            .then((e) => setServices(e))
            .catch(console.error);
    };

    return (
        <div>
                <Notification
                    key={notification.message}
                    open={notification.open}
                    onClose={() => setNotification({ open: false })}
                    message={notification.message}
                    type={notification.type}
                />

            {createStep ? (
                <Button variant="contained" color="primary" onClick={handleClickOpen}
                        sx={{ borderRadius: '8px', padding: '8px 16px', fontWeight: 'bold' }}>
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
                                    error={nameError} // Set error prop
                                    helperText={nameError ? "Vui lòng nhập tên chiến dịch" : ""} // Display error message
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                    {!createStep && (<Paper sx={{ mt: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                        <TableCell align="left">Tên dịch vụ</TableCell>
                                        <TableCell align="right">Giá tiền</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {services.map((service, index) => (
                                        <TableRow key={service.id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{service.name}</TableCell>
                                            <TableCell align="right">{service.price.toLocaleString('vi-VN')} VND</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Hủy bỏ
                    </Button>
                    {createStep ? (
                        <Button onClick={handleSubmitCreate} disabled={loading} variant="contained" color="primary">
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Tạo mới'}
                        </Button>
                    ) : (
                        <Button onClick={handleSubmitUpdate} disabled={loading} variant="contained" color="primary">
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Cập nhật'}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RecruitmentPopup;
