import React, { useState } from "react";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { Snackbar, Alert, Checkbox, IconButton, InputAdornment, Box, Typography, CircularProgress, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import Notification from "../notification/Notification";
import AuthApi from "../../api/AuthApi";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    fullName: "",
    isConsumer: true,
  });
  const [isAgree, setIsAgree] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const clientId = "421794227239-vvm5o77fkd4qsendqmr4movhv6kmqt3m.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3001/callback";
    const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
  };

  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    tempErrors.email = emailPattern.test(formData.email) ? "" : "Email không hợp lệ!";
    tempErrors.password = formData.password ? "" : "Mật khẩu không được để trống!";
    tempErrors.confirmPassword = formData.confirmPassword === formData.password ? "" : "Mật khẩu không khớp!";
    tempErrors.phoneNumber = formData.phoneNumber ? "" : "Số điện thoại không được để trống!";
    tempErrors.fullName = formData.fullName ? "" : "Họ tên không được để trống!";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    if (validate()) {
      if (!isAgree) {
        setOpen(true);
        return;
      }

      setLoading(true);
      AuthApi.registerEnterprise(formData)
          .then(() => {
            navigate('/verify-email', { state: { email: formData.email } });
          })
          .catch((error) => {
            if (error.response.data === "Tài khoản đã tồn tại") {
              setNotification({ open: true, message: "Tài khoản đã tồn tại!" });
            }
          })
          .finally(() => setLoading(false));
    }
  };

  return (
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <CircularProgress />
            </Box>
        ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
              <Box component="img" src={logo2} alt="" sx={{ height: '100vh', width: '33%' }} />
              <Box sx={{ p: 4, flex: 1, overflow: 'auto' }}>
                <Notification open={notification.open} onClose={() => setNotification({ open: false, message: '' })} message={notification.message} />
                <Box component="img" src={logo} alt="" sx={{ width: 200 }} />
                <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mt: 2, mb: 4 }}>Đăng kí để tìm việc</Typography>
                <Box>
                  <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert onClose={() => setOpen(false)} severity="warning">
                      Bạn phải đồng ý với điều khoản sử dụng trước khi đăng nhập!
                    </Alert>
                  </Snackbar>

                  <Button
                      onClick={handleLogin}
                      variant="contained"
                      fullWidth
                      startIcon={<GoogleIcon />}
                      sx={{ mt: 2, color: 'accent.main' }}
                  >
                    Đăng kí bằng Google
                  </Button>

                  <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
                    <Box sx={{ flexGrow: 1, borderTop: 1, borderColor: 'divider' }} />
                    <Typography variant="body2" color="textSecondary" sx={{ mx: 2 }}>Hoặc bằng email</Typography>
                    <Box sx={{ flexGrow: 1, borderTop: 1, borderColor: 'divider' }} />
                  </Box>

                  {["fullName", "phoneNumber", "email", "password", "confirmPassword"].map((field, index) => (
                      <TextField
                          key={field}
                          fullWidth
                          label={field === "fullName" ? "Họ tên" : field === "phoneNumber" ? "Số điện thoại" : field === "email" ? "Email đăng nhập" : field === "password" ? "Mật khẩu" : "Nhập lại mật khẩu"}
                          variant="outlined"
                          sx={{ mb: 3 }}
                          name={field}
                          type={(field === "password" && !showPassword) || (field === "confirmPassword" && !showConfirmPassword) ? "password" : "text"}
                          value={formData[field]}
                          onChange={handleChange}
                          error={!!errors[field]}
                          helperText={errors[field]}
                          InputProps={["password", "confirmPassword"].includes(field) ? {
                            endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => field === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}>
                                    {field === "password" ? (showPassword ? <VisibilityOff /> : <Visibility />) : (showConfirmPassword ? <VisibilityOff /> : <Visibility />)}
                                  </IconButton>
                                </InputAdornment>
                            ),
                          } : null}
                          required
                      />
                  ))}

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Checkbox checked={isAgree} onChange={() => setIsAgree(!isAgree)} />
                    <Typography variant="body2">
                      Tôi đã đọc và đồng ý với{" "}
                      <Box component="span" color="primary.main">Điều khoản dịch vụ</Box> và{" "}
                      <Box component="span" color="primary.main">Điều khoản bảo mật</Box> của JobMaster.
                    </Typography>
                  </Box>

                  <Button
                      variant="contained"
                      fullWidth
                      sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' }, mb: 2 }}
                      onClick={handleSubmit}
                  >
                    Đăng ký
                  </Button>

                  <Typography align="center">
                    Đã có tài khoản?{" "}
                    <Link to="/login" style={{ color: '#1976d2' }}>
                      Đăng nhập ngay
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
        )}
      </Box>
  );
};

export default SignUp;
