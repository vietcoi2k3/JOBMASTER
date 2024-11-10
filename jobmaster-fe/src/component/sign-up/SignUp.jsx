import React, { Component } from "react";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import Province from "../../api/Province";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
  Box,
  Link as MuiLink,
} from "@mui/material";
import AuthApi from "../../api/AuthApi";
import { Link } from 'react-router-dom';
import Notification from "../notification/Notification";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notification: { open: false, message: '' },
      formData: {
        email: "",
        password: "",
        fullName: "",
        gender: "",
        companyName: "",
        city: "",
        district: "",
      },
      isAgree: false,
      open: false,
      listCity: [],
      listDistrict: [],
      idCity: "01",
      errors: {},
    };
  }

  handleChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  getProvince = () => {
    Province.getProvince().then(response =>
        this.setState({ listCity: response })
    );
  };

  getDistrict = () => {
    const { idCity } = this.state;
    Province.getDistrictByProvince(idCity).then(response =>
        this.setState({ listDistrict: response.results })
    );
  };

  handleLogin = () => {
    const clientId = "421794227239-vvm5o77fkd4qsendqmr4movhv6kmqt3m.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/callback";
    const scope =
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const responseType = "code";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = authUrl;
  };

  validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    tempErrors.email = emailPattern.test(this.state.formData.email) ? "" : "Email không hợp lệ!";
    tempErrors.password = this.state.formData.password ? "" : "Mật khẩu không được để trống!";
    tempErrors.fullName = this.state.formData.fullName ? "" : "Họ và tên không được để trống!";
    tempErrors.companyName = this.state.formData.companyName ? "" : "Tên công ty không được để trống!";
    tempErrors.city = this.state.formData.city ? "" : "Vui lòng chọn tỉnh/thành phố!";
    tempErrors.district = this.state.formData.district ? "" : "Vui lòng chọn quận/huyện!";
    this.setState({ errors: tempErrors });
    return Object.values(tempErrors).every((x) => x === "");
  };

  handleSubmit = async (e) => {
    if (this.validate()) {
      if (!this.state.isAgree) {
        this.setState({ open: true });
        return;
      }

      this.setState({ loading: true });

      AuthApi.registerEnterprise(this.state.formData).then(() => {
        let email = this.state.formData.email;
        let password = this.state.formData.password;
        this.props.history.push("/verify-email", { state: { email, password } });
      }).catch((error) => {
        if (error.response.data === "Tài khoản đã tồn tại") {
          this.setState({
            notification: {
              open: true,
              message: "Tài khoản đã tồn tại!",
            },
          });
        }
      }).finally(() => {
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { loading, notification, formData, errors, isAgree, open, listCity, listDistrict } = this.state;

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
          {loading ? (
              <CircularProgress sx={{ margin: 'auto' }} />
          ) : (
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ padding: 4 }}>
                    <Notification
                        open={notification.open}
                        onClose={() => this.setState({ notification: { open: false, message: '' } })}
                        message={notification.message}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                      <img src={logo} alt="" width={200} />
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mt: 2 }}>
                        Đăng kí tài khoản nhà tuyển dụng
                      </Typography>
                    </Box>

                    <Box sx={{ my: 4 }}>
                      <Box sx={{ border: 1, borderColor: 'primary.main', borderRadius: 2, p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quy định</Typography>
                        <Typography sx={{ mt: 2 }}>
                          Để đảm bảo chất lượng dịch vụ,{" "}
                          <span style={{ color: 'red' }}>Jobmaster không cho phép tạo nhiều tài khoản khác nhau</span>
                          <p>
                            Nếu phát hiện vi phạm, JobMaster sẽ ngừng cung cấp dịch vụ tới tất
                            cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống
                            website của JobMaster. Đối với trường hợp khách hàng đã sử dụng hết
                            3 tin tuyển dụng miễn phí, JobMaster hỗ trợ kích hoạt đăng tin tuyển
                            dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy
                            phép kinh doanh.
                          </p>
                        </Typography>
                      </Box>
                    </Box>

                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => this.setState({ open: false })}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                      <Alert onClose={() => this.setState({ open: false })} severity="warning">
                        Bạn phải đồng ý với điều khoản sử dụng trước khi đăng nhập!
                      </Alert>
                    </Snackbar>

                    <Button
                        onClick={this.handleLogin}
                        fullWidth
                        sx={{ mt: 2 }}
                        variant="contained"
                        startIcon={<GoogleIcon />}
                    >
                      Đăng kí bằng Google
                    </Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
                      <Box sx={{ flexGrow: 1, borderTop: 1, borderColor: 'gray' }} />
                      <Typography sx={{ mx: 2, color: 'gray' }}>Hoặc bằng email</Typography>
                      <Box sx={{ flexGrow: 1, borderTop: 1, borderColor: 'gray' }} />
                    </Box>

                    <TextField
                        fullWidth
                        label="Email đăng nhập"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        name="email"
                        value={formData.email}
                        onChange={this.handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        type="password"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        name="password"
                        value={formData.password}
                        onChange={this.handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Thông tin nhà tuyển dụng
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            variant="outlined"
                            name="fullName"
                            value={formData.fullName}
                            onChange={this.handleChange}
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                            sx ={{marginBottom:2}}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <RadioGroup
                            row
                            name="gender"
                            value={formData.gender}
                            onChange={this.handleChange}
                        >
                          <FormControlLabel value="nam" control={<Radio />} label="Nam" />
                          <FormControlLabel value="nu" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                      </Grid>
                    </Grid>

                    <TextField
                        fullWidth
                        label="Công ty"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        name="companyName"
                        value={formData.companyName}
                        onChange={this.handleChange}
                        error={!!errors.companyName}
                        helperText={errors.companyName}
                    />

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Select
                            fullWidth
                            displayEmpty
                            name="city"
                            value={formData.city}
                            error={!!errors.city}
                            onChange={this.handleChange}
                        >
                          <MenuItem value="" disabled>
                            Tỉnh/Thành phố
                          </MenuItem>
                          {listCity.map((city, index) => (
                              <MenuItem key={index} value={city.id}>{city.name}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Select
                            fullWidth
                            displayEmpty
                            name="district"
                            value={formData.district}
                            error={!!errors.district}
                            onChange={this.handleChange}
                        >
                          <MenuItem value="" disabled>
                            Quận/Huyện
                          </MenuItem>
                          {listDistrict.map((district, index) => (
                              <MenuItem key={index} value={district.id}>{district.name}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                      <Checkbox checked={isAgree} onChange={() => this.setState({ isAgree: !isAgree })} />
                      <Typography sx={{ color: 'text.secondary' }}>
                        Tôi đồng ý với <MuiLink href="#" variant="body2">Điều khoản dịch vụ</MuiLink>
                      </Typography>
                    </Box>

                    <Button
                        fullWidth
                        sx={{ mt: 2 }}
                        variant="contained"
                        onClick={this.handleSubmit}
                        disabled={loading}
                    >
                      Đăng ký
                    </Button>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={logo2} alt="" style={{ width: '100%' }} />
                </Grid>
              </Grid>
          )}
        </Box>

    );
  }
}

export default SignUp;
