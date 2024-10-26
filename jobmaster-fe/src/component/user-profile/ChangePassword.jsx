import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BusinessIcon from "@mui/icons-material/Business";
import Notification from "../notification/Notification";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    TextField,
    Button,
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Grid,
    InputAdornment,IconButton
} from "@mui/material";
import userApi from "../../api/UserApi";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [logoutAll, setLogoutAll] = useState(false);
    const [notification, setNotification] = React.useState({
        open: false,
        message: '',
        type: 'success'
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setNotification({
                open: true,
                message: "Mật khẩu xác thực không đúng",
                type: 'error'
            });
            return;
        }
        userApi.updatePassword({
            oldPassword: currentPassword,
            newPassword: newPassword
        }).then((res) => {
            setNotification({
                open: true,
                message: "Cập nhật mật khẩu thành công",
                type: 'success'
            });
            setConfirmPassword('');
            setNewPassword('');
            setCurrentPassword('');
        }).catch(error => {
            setNotification({
                open: true,
                message: error,
                type: 'error'
            });
        })
        // Xử lý cập nhật mật khẩu
        console.log('Cập nhật mật khẩu:', { currentPassword, newPassword, confirmPassword, logoutAll });
    };
    const cancelChange = () => {
        setConfirmPassword('');
        setNewPassword('');
        setCurrentPassword('');
    }


    return (
        <div style={{ padding: '20px', width: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, textAlign: 'center' }}>
                Thay đổi mật khẩu
            </Typography>
            <Box sx={{ width: '100%', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={5}>
                                    <Typography>Mật khẩu hiện tại</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        fullWidth
                                        type={showCurrentPassword ? "text" : "password"}
                                        variant="outlined"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Nhập mật khẩu hiện tại"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        edge="end"
                                                    >
                                                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={5}>
                                    <Typography>Mật khẩu mới</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        fullWidth
                                        type={showNewPassword ? "text" : "password"}
                                        variant="outlined"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Nhập mật khẩu mới"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={5}>
                                    <Typography>Nhập lại mật khẩu</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        fullWidth
                                        type={showConfirmPassword ? "text" : "password"}
                                        variant="outlined"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Nhập lại mật khẩu"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={5} />
                                <Grid item xs={7}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 1 }}>
                                        <Button onClick={cancelChange} variant="outlined" color="secondary" sx={{ marginRight: 1 }}>
                                            Hủy
                                        </Button>
                                        <Button variant="contained" color="primary" type="submit">
                                            Cập nhật
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                type={notification.type}
            />
        </div>
    );
};
export default ChangePassword;
