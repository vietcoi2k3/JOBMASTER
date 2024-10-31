import React, { useState } from "react";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { Snackbar, Alert, Checkbox, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import Notification from "../notification/Notification";
import { CircularProgress, TextField } from '@mui/material';
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
    phone: "",
    name: "",
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
    tempErrors.phone = formData.phone ? "" : "Số điện thoại không được để trống!";
    tempErrors.name = formData.name ? "" : "Họ tên không được để trống!";

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
      <div className="overflow-hidden bg-white">
        {loading ? (
            <CircularProgress className="flex justify-center items-center" />
        ) : (
            <div className="flex flex-row-reverse bg-white">
              <img src={logo2} alt="" className="h-screen w-1/3" />
              <div className="overflow-auto scrollable-content p-12 h-screen">
                <Notification open={notification.open} onClose={() => setNotification({ open: false, message: '' })} message={notification.message} />
                <img src={logo} alt="" width={200} />
                <h2 className="text-primary font-black text-2xl">Đăng kí để tìm việc</h2>
                <div className="p-4">
                  <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert onClose={() => setOpen(false)} severity="warning">
                      Bạn phải đồng ý với điều khoản sử dụng trước khi đăng nhập!
                    </Alert>
                  </Snackbar>

                  <Button
                      onClick={handleLogin}
                      className="w-full text-accent"
                      variant="contained"
                      sx={{ marginTop: 4 }}
                      startIcon={<GoogleIcon />}
                  >
                    Đăng kí bằng Google
                  </Button>

                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">Hoặc bằng email</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <TextField
                      fullWidth
                      label="Họ tên"
                      variant="outlined"
                      sx={{ marginBottom: 4 }}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                  />

                  <TextField
                      fullWidth
                      label="Số điện thoại"
                      variant="outlined"
                      sx={{ marginBottom: 4 }}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      required
                  />

                  <TextField
                      fullWidth
                      label="Email đăng nhập"
                      variant="outlined"
                      sx={{ marginBottom: 4 }}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                  />

                  <TextField
                      fullWidth
                      label="Mật khẩu"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      sx={{ marginBottom: 4 }}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      required
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                        ),
                      }}
                  />

                  <TextField
                      fullWidth
                      label="Nhập lại mật khẩu"
                      type={showConfirmPassword ? "text" : "password"}
                      variant="outlined"
                      sx={{ marginBottom: 4 }}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      required
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                        ),
                      }}
                  />

                  <Checkbox checked={isAgree} onClick={() => setIsAgree(!isAgree)} />
                  <p className="inline">
                    Tôi đã đọc và đồng ý với{" "}
                    <span className="text-primary">Điều khoản dịch vụ</span> và{" "}
                    <span className="text-primary">Điều khoản bảo mật</span> của JobMaster.
                  </p>

                  <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      className="bg-blue-500 hover:bg-blue-600 mb-4"
                      onClick={handleSubmit}
                  >
                    Đăng ký
                  </Button>

                  <p className="text-center">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-primary">
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default SignUp;
