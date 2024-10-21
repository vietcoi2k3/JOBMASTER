import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField,
    IconButton, Switch, Pagination, Dialog, DialogTitle,
    DialogContent, DialogActions, Button, Checkbox,
    FormControlLabel, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RecruitmentPopup from "../share/RecruitmentPopup ";
import EnterpriseApi from "../../api/EnterpriseApi";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate } from "react-router-dom";
import EuroIcon from '@mui/icons-material/Euro';

const Job = () => {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [openServicePopup, setOpenServicePopup] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [openPaymentPopup, setOpenPaymentPopup] = useState(false); // Popup xác nhận thanh toán
    const [totalAmount, setTotalAmount] = useState(0); // Tổng số tiền
    const [camId, setCamId] = useState(null); // Tổng số tiền
    const navigate = useNavigate();

    const handleReload = () => {
        getList();
        setReload(!reload);
    };

    useEffect(() => {
        getList();
    }, [pageNumber]);

    const getList = () => {
        EnterpriseApi.getListCampaign(pageNumber)
            .then((e) => {
                setData(e.content);
                setTotalPage(e.totalPages);
            })
            .catch(console.error);
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
            price:totalAmount,
            campaignId:camId,
            packageId:packageIds
        }
        EnterpriseApi.activateService(data).then((e)=>{
            console.log(e)
        })
        setOpenPaymentPopup(false); // Đóng popup thanh toán
        setSelectedServices([]); // Reset dịch vụ đã chọn
    };

    return (
        <div className="w-full">
            <TextField
                label="Nhập tên chiến dịch"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: '#ffffff' }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Chiến dịch tuyển dụng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Vị trí</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tin tuyển dụng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Số lượng CV</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((campaign, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ fontWeight: 'bold' }}>{campaign.name}</TableCell>
                                <TableCell>{campaign.position}</TableCell>
                                <TableCell>{campaign.field}<br /></TableCell>
                                <TableCell>{campaign.quantity}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <EuroIcon onClick={() => { fetchServices(campaign.id); setOpenServicePopup(true); }} />
                                    </IconButton>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                    <Switch checked={true} />
                                    <IconButton>
                                        <EventNoteIcon onClick = {
                                            ()=>{
                                            navigate("/dashboard/job-form")
                                        }
                                        } />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <RecruitmentPopup onSuccess={handleReload} />
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
        </div>
    );
};

export default Job;
