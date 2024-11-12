import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const PersonalInfo = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "user@example.com", // Email mặc định, có thể thay đổi theo dữ liệu người dùng
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý cập nhật thông tin người dùng
        console.log("User information updated:", formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <TextField
                fullWidth
                label="Họ tên"
                variant="outlined"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
            />

            <TextField
                fullWidth
                label="Số điện thoại"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
            />

            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                InputProps={{
                    readOnly: true,
                }}
                sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Cập nhật thông tin
            </Button>
        </Box>
    );
};

export default PersonalInfo;
