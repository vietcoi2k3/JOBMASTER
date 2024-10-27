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
    TableSortLabel,
    Checkbox,
    Paper,
    Typography, Table
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
    const [packages,setPackages]= useState([]);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState({
        name: "",
        packages: [],
    });

    const getAllPackages=()=>{
        EnterpriseApi.getAllPackage()
        .then((res) => {
            setPackages(res);
        }).catch((e) => console.log(e));
    }
    const getPackageOfCampaign=(id)=>{
        EnterpriseApi.getListService(id)
            .then((res) => setData({
                name: campaign.name,
                packages: res
            }))
            .catch(console.error);
    }
    const handleSelect = (packageC) => {
        setData((prevData) => {
            const isSelected = prevData.packages?.includes(packageC);
            const newPackages = isSelected
                ? prevData.packages?.filter((item) => item !== packageC) // Xóa ID nếu đã chọn
                : [...prevData.packages, packageC]; // Thêm ID nếu chưa chọn

            return {
                ...prevData,
                packages: newPackages
            };
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
        getAllPackages();
        if (createStep) {
            setData({ name: "",packages:[] });
        } else {
            getPackageOfCampaign(campaign.id);
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
                    <Paper sx={{ mt: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                        <TableCell align="left">Tên dịch vụ</TableCell>
                                        <TableCell align="right">Giá tiền</TableCell>
                                        <TableCell align="center">Chọn</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {packages.map((service, index) => (
                                        <TableRow key={service.id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{service.name}</TableCell>
                                            <TableCell align="right">{service.price.toLocaleString('vi-VN')} VND</TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={data.packages.includes(service)} // Sử dụng data.packageIds
                                                    onChange={() => handleSelect(service)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
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
