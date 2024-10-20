import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import AuthApi from "../../api/AuthApi";
import EnterpriseApi from "../../api/EnterpriseApi";

// Dữ liệu mẫu cho giao dịch
const transactions = [
    {
        amount: "+5,000,000 đ",
        balanceAfter: "7,500,000 đ",
        description: "Nạp tiền vào ví JobMaster",
        timestamp: "18:43 12/10/2024",
        color: "green",
    },
    {
        amount: "+2,500,000 đ",
        balanceAfter: "2,500,000 đ",
        description: "Nạp tiền vào ví JobMaster",
        timestamp: "18:43 12/10/2024",
        color: "green",
    },
    {
        amount: "-2,500,000 đ",
        balanceAfter: "0 đ",
        description: "Sử dụng dịch vụ Master Max",
        timestamp: "18:43 12/10/2024",
        color: "red",
    },
];

export default function TransactionHistory() {
    const [open, setOpen] = useState(false); // Trạng thái mở/đóng popup
    const [amount, setAmount] = useState(""); // Lưu số tiền nhập vào
    const [data,setData] = useState([])
    const [transaction,setTransaction] = useState([])
    // Xử lý đóng/mở popup
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formatVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const handleSubmit = () => {
        // Loại bỏ dấu phẩy và chuyển thành số nguyên
        const formattedAmount = parseInt(amount.replace(/,/g, ""));

        // Gọi API với số tiền đã format
        AuthApi.payment(formattedAmount).then((e) => {
            window.location.href = e.paymentUrl
        }).catch((err) => {
            console.error(err);
        });

    };
    useEffect(() => {

        EnterpriseApi.getHistory().then((e)=>{
            setData(e)
            setTransaction(e.historyMoneyList)
        })
    }, []);

    // Xử lý nhập số tiền
    const handleChange = (event) => {
        const value = event.target.value.replace(/\D/g, ""); // Chỉ cho phép số
        setAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // Format VND
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                padding: "20px",
                minWidth:"70%",
                margin: "auto",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Lịch sử giao dịch
            </Typography>

            <Box
                sx={{
                    backgroundColor: "#e0e0e0",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                }}
            >
                <Typography>Tài khoản của bạn</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {formatVND(data.totalMoney)} {/* Chuyển đổi và hiển thị tiền tệ VND */}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ marginTop: "10px" }}
                    onClick={handleOpen} // Mở popup khi bấm nút
                >
                    Nạp tiền
                </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
                Biến động số dư
            </Typography>

            <Box>
                {transaction.map((transaction, index) => (
                    <Card
                        key={index}
                        sx={{
                            marginBottom: "10px",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                    >
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <Typography
                                        sx={{
                                            color: transaction.addMoney ? "green" : "red", // Xanh nếu isAdd là true, đỏ nếu false
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {transaction.addMoney ? "+" : "-"}{formatVND(transaction.amount)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Số dư sau giao dịch: {formatVND(transaction.balanceAfter)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {transaction.descriptions}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} textAlign="right">
                                    <Typography variant="body2" color="textSecondary">

                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Modal Popup */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "8px",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Nạp tiền
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                            label="Số tiền"
                            value={amount}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                endAdornment: <Typography>VND</Typography>, // Chữ VND bên cạnh
                            }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ marginTop: "10px", width: "100%" }}
                        onClick={handleSubmit} // Đóng popup khi nạp tiền xong
                    >
                        Xác nhận
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
