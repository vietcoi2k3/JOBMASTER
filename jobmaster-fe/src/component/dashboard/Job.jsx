import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField,
    IconButton, Switch, Pagination, Dialog, DialogTitle,
    DialogContent, DialogActions, Button, Checkbox,
    FormControlLabel, Box, InputAdornment, Typography, CircularProgress
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
    const [campaignDownId,setCampaignDownId] = useState();
    const [selectedServices, setSelectedServices] = useState([]);
    const [openPaymentPopup, setOpenPaymentPopup] = useState(false); // Popup xác nhận thanh toán
    const [totalAmount, setTotalAmount] = useState(0); // Tổng số tiền
    const [camId, setCamId] = useState(null); // Tổng số tiền
    const navigate = useNavigate();
    const [notification, setNotification] = React.useState({
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
        setCamId(id)
    };

    const handleToggleService = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const handleServiceSubmit = () => {
        const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
        setTotalAmount(total); // Cập nhật số tiền
        setOpenServicePopup(false); // Đóng popup dịch vụ
        setOpenPaymentPopup(true); // Mở popup thanh toán
    };

    const handlePaymentConfirm = () => {
        const packageIds = selectedServices.map(service => service.id);
        const data = {
            price: totalAmount,
            campaignId: camId,
            packageId: packageIds
        }
        EnterpriseApi.activateService(data).then((e) => {
            console.log(e)
        })
        setOpenPaymentPopup(false); // Đóng popup thanh toán
        setSelectedServices([]); // Reset dịch vụ đã chọn
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
        console.log(campaignDownId+"----------------")
        EnterpriseApi.updateStatusCampaign(campaignDownId)
            .then((res) => {
                getList();
                setNotification({
                    open: true,
                    message: "Cập nhật trạng thái thành công",
                    type: 'success'
                });
            })
            .catch((error) => {
                setNotification({
                    open: true,
                    message: error,
                    type: 'erro'
                });
            })
    };
    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleConfirm = () => {
        handleToggle();
        setOpenConfirm(false);
    };
    return (

        <div className="w-full">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Chiến dịch tuyển dụng
                </Typography>
                <RecruitmentPopup onSuccess={handleReload} createStep={true} />
            </Box>
            <TextField
                label="Nhập tên chiến dịch"
                variant="outlined"
                fullWidth
                margin="normal"
                name="search"
                sx={{ backgroundColor: '#ffffff' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress} // Bắt sự kiện Enter
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon
                                onClick={handleSearch} // Bắt sự kiện click vào biểu tượng
                                style={{ cursor: 'pointer' }} // Thay đổi con trỏ khi hover
                            />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer component={Paper}>
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
                                    <TableCell align="center">{campaign.quantity ? campaign.quantity : 0}</TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            <EuroIcon onClick={() => { fetchServices(campaign.id); setOpenServicePopup(true); }} />
                                        </IconButton>
                                        <IconButton>
                                            <RecruitmentPopup onSuccess={handleReload} createStep={false} campaign={campaign} />
                                        </IconButton>
                                        <Switch
                                            checked={campaign.isActive}
                                            onClick={(event) => {
                                                setCampaignDownId(campaign.id);
                                                // Chỉ bật popup khi chuyển từ mở (true) sang tắt (false)
                                                if (campaign.isActive) {
                                                    setMgsConfirm('Xác nhận tắt chiến dịch, tin đăng của chiến dịch cũng sẽ bị tắt?');
                                                    handleClickOpenConfirm();
                                                } else {
                                                    setMgsConfirm('Kích hoạt chiến dịch');
                                                    handleClickOpenConfirm();
                                                }
                                            }}
                                        />
                                        <IconButton disabled={!campaign.postId}>
                                            <EventNoteIcon onClick={() => { navigate("/dashboard/job-form/detail/" + campaign.postId) }} />
                                        </IconButton>
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
                    backgroundColor: '#ffff',
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
                    {services.map((service) => (
                        <Box key={service.id} mb={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedServices.includes(service)}
                                        onChange={() => handleToggleService(service)}
                                    />
                                }
                                label={`${service.name} - ${service.price} VNĐ`}
                            />
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenServicePopup(false)}>Hủy</Button>
                    <Button onClick={handleServiceSubmit}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

            {/* Popup xác nhận thanh toán */}
            <Dialog open={openPaymentPopup} onClose={() => setOpenPaymentPopup(false)}>
                <DialogTitle>Xác nhận thanh toán</DialogTitle>
                <DialogContent>
                    <p>Bạn có muốn thanh toán với số tiền <strong>{totalAmount} VNĐ</strong> không?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPaymentPopup(false)}>Hủy</Button>
                    <Button onClick={handlePaymentConfirm}>Thanh toán</Button>
                </DialogActions>
            </Dialog>

            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                type={notification.type}
            />
            <ConfirmDialog
                open={openConfirm}
                onClose={setOpenConfirm}
                title="Xác nhận"
                message={mgsConfirm}
                onConfirm={()=>handleConfirm()}
            />
        </div>
    );
};

export default Job;
