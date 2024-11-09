import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField,
    IconButton, Switch, Pagination, Dialog, DialogTitle,
    DialogContent, DialogActions, Button, Checkbox,
    FormControlLabel, Box, InputAdornment, Typography, CircularProgress, Tooltip
} from '@mui/material';
import RecruitmentPopup from "../share/RecruitmentPopup ";
import EnterpriseApi from "../../api/EnterpriseApi";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate } from "react-router-dom";
import EuroIcon from '@mui/icons-material/Euro';
import SearchIcon from '@mui/icons-material/Search';
import Notification from "../notification/Notification";
import ConfirmDialog from '../share/ConfirmDialog';

const Job = () => {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openServicePopup, setOpenServicePopup] = useState(false);
    const [mgsConfirm, setMgsConfirm] = useState('');
    const [services, setServices] = useState([]);
    const [campaignDownId, setCampaignDownId] = useState();
    const [selectedServices, setSelectedServices] = useState([]);
    const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [camId, setCamId] = useState(null);
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        type: 'success'
    });

    const handleReload = () => {
        getList();
        setReload(!reload);
    };

    useEffect(() => {
        getList();
    }, [pageNumber]);

    const getList = () => {
        setLoading(true);
        EnterpriseApi.getListCampaign(search, pageNumber)
            .then((e) => {
                setData(e.content);
                setTotalPage(e.totalPages);
            })
            .catch((error) => {
                setNotification({
                    open: true,
                    message: error,
                    type: 'error'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchServices = (id) => {
        EnterpriseApi.getListService(id)
            .then((e) => setServices(e))
            .catch(console.error);
        setCamId(id);
    };

    const handleToggleService = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    const handleServiceSubmit = () => {
        const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
        setTotalAmount(total);
        setOpenServicePopup(false);
        setOpenPaymentPopup(true);
    };

    const handlePaymentConfirm = () => {
        const packageIds = selectedServices.map(service => service.id);
        const data = {
            price: totalAmount,
            campaignId: camId,
            packageId: packageIds
        };
        EnterpriseApi.activateService(data)
            .then(() => {
                setNotification({
                    open: true,
                    message: 'Thanh toán thành công',
                    type: 'success'
                });
            })
            .catch(() => {
                setNotification({
                    open: true,
                    message: 'Số dư không đủ',
                    type: 'error'
                });
            });
        setOpenPaymentPopup(false);
        setSelectedServices([]);
    };

    const handleSearch = () => {
        getList();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleToggle = () => {
        EnterpriseApi.updateStatusCampaign(campaignDownId)
            .then(() => {
                getList();
                setNotification({
                    open: true,
                    message: 'Cập nhật trạng thái thành công',
                    type: 'success'
                });
            })
            .catch((error) => {
                setNotification({
                    open: true,
                    message: error,
                    type: 'error'
                });
            });
    };

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleConfirm = () => {
        handleToggle();
        setOpenConfirm(false);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#F5F7FA', borderRadius: 2,width:'100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} color = 'primary'>
                    Chiến dịch tuyển dụng
                </Typography>
                <RecruitmentPopup onSuccess={handleReload} createStep={true} />
            </Box>
            <TextField
                label="Nhập tên chiến dịch"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon
                                onClick={handleSearch}
                                style={{ cursor: 'pointer' }}
                            />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Chiến dịch tuyển dụng</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Số lượng CV</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((campaign, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{campaign.name}</TableCell>
                                    <TableCell align="center">{campaign.cvQuantity || 0}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Dịch vụ">
                                            <IconButton onClick={() => { fetchServices(campaign.id); setOpenServicePopup(true); }}>
                                                <EuroIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Chỉnh sửa">
                                            <IconButton>
                                                <RecruitmentPopup onSuccess={handleReload} createStep={false} campaign={campaign} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Kích hoạt">
                                            <Switch
                                                checked={campaign.isActive}
                                                onClick={() => {
                                                    setCampaignDownId(campaign.id);
                                                    setMgsConfirm(campaign.isActive ?
                                                        'Xác nhận tắt chiến dịch, tin đăng của chiến dịch cũng sẽ bị tắt?' :
                                                        'Kích hoạt chiến dịch');
                                                    handleClickOpenConfirm();
                                                }}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Chỉnh sửa tin đăng">
                                            <IconButton disabled={!campaign.postId}>
                                                <EventNoteIcon onClick={() => navigate(`/dashboard/job-form/detail/${campaign.postId}`)} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                onChange={(event, page) => setPageNumber(page)}
                page={pageNumber}
                count={totalPage}
                color="primary"
                sx={{
                    width: '100%',
                    backgroundColor: '#ffffff',
                    marginTop: 1,
                    '& .MuiPagination-ul': {
                        justifyContent: 'center'
                    }
                }}
            />

            {/* Popup chọn dịch vụ */}
            <Dialog open={openServicePopup} onClose={() => setOpenServicePopup(false)}>
                <DialogTitle>Chọn dịch vụ</DialogTitle>
                <DialogContent>
                    {services.length === 0 ? (
                        <Box textAlign="center" mt={2}>
                            <Typography>Bạn đã mua hết dịch vụ cho chiến dịch này rồi</Typography>
                        </Box>
                    ) : (
                        services.map((service) => (
                            <Box key={service.id} mb={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedServices.includes(service)}
                                            onChange={() => handleToggleService(service)}
                                        />
                                    }
                                    label={`${service.name} - ${service.price} VNĐ - Hiệu lực: ${service.days} ngày`}
                                />
                            </Box>
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenServicePopup(false)}>Hủy</Button>
                    <Button
                        onClick={handleServiceSubmit}
                        disabled={services.length === 0 || selectedServices.length === 0}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Popup xác nhận thanh toán */}
            <Dialog open={openPaymentPopup} onClose={() => setOpenPaymentPopup(false)}>
                <DialogTitle>Xác nhận thanh toán</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        Bạn có chắc chắn thanh toán dịch vụ với tổng số tiền là {totalAmount} VNĐ không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPaymentPopup(false)}>Hủy</Button>
                    <Button onClick={handlePaymentConfirm}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

            {/* Xác nhận toggle chiến dịch */}
            <ConfirmDialog
                open={openConfirm}
                title="Xác nhận hành động"
                message={mgsConfirm}
                onConfirm={handleConfirm}
                onClose={() => setOpenConfirm(false)}
            />

            {/* Notification */}
            <Notification

                open={notification.open}
                onClose={() => setNotification({ open: false })}
                message={notification.message}
                type={notification.type}
            />
        </Box>
    );
};

export default Job;
