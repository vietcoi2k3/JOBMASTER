import React, { useState } from "react";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import {Snackbar, Alert, Checkbox} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Notification from "../notification/Notification";
import { CircularProgress } from '@mui/material'; // Import CircularProgress
import {
  TextField
} from "@mui/material";
import AuthApi from "../../api/AuthApi";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const handleCloseNotification = () => {
    setNotification({
      open: false,
      message: '',
    });
  };
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isConsumer:true
  });
  const [isAgree, setIsAgree] = useState(false);
  const [open, setOpen] = useState(false);



  const handleChange = (e) => {
    console.log("")
    console.log(e)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    const clientId =
      "421794227239-vvm5o77fkd4qsendqmr4movhv6kmqt3m.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/callback";
    const scope =
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const responseType = "code";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = authUrl;
  };
  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    tempErrors.email =    emailPattern.test(formData.email) ? "" : "Email không hợp lệ!";
    tempErrors.password = formData.password
      ? ""
      : "Mật khẩu không được để trống!";
    return Object.values(tempErrors).every((x) => x === "");
  };
  const handleSubmit = async (e) => {
    if (validate()) {
      if (!isAgree) {
        setOpen(true);
        return;
      }

      setLoading(true)
     AuthApi.registerEnterprise(formData).then(()=>{
      let email = formData.email
      navigate('/login', { state: { email } });
     })
     .catch((error)=>{
        if(error.response.data==="Tài khoản đã tồn tại"){
          setNotification({
            open: true,
            message: "Tài khoản đã tồn tại!",
          });
        }
     }
    ).
    finally(() => {
        setLoading(false)
    });
    }
  }

  return (
    <div className="overflow-hidden">
            {loading ? (
        <CircularProgress className="flex justify-center items-center" />
      ) : (
    <div className="flex flex-row-reverse">
      <img src={logo2} alt="" className="h-screen w-1/3" />

      <div className="overflow-auto scrollable-content p-12 h-screen">
          <div> 
            <Notification
              open={notification.open}
              onClose={handleCloseNotification}
              message={notification.message}
            />
          </div>
          <img src={logo} alt="" width={200} />
          <h2 className="text-primary font-black text-2xl">
            Đăng kí tài khoản nhà tuyển dụng
          </h2>
          <div className="p-4">
            <div className="w-full rounded border border-primary p-4">
              <h3 className="text-primary font-bold">Quy định</h3>
              <br />
              <p>
                để đảm bảo chất lượng dịch vụ,{" "}
                <span className="text-error">
                  Jobmaster không cho phép tạo nhiều tài khoản khác nhau
                </span>
              </p>
              <br />
              <p>
                Nếu phát hiện vi phạm, JobMaster sẽ ngừng cung cấp dịch vụ tới tất
                cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống
                website của JobMaster. Đối với trường hợp khách hàng đã sử dụng hết
                3 tin tuyển dụng miễn phí, JobMaster hỗ trợ kích hoạt đăng tin tuyển
                dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy
                phép kinh doanh.
              </p>
            </div>

            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={() => setOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={() => setOpen(false)} severity="warning">
                Bạn phải đồng ý với điều khoản sử dụng trước khi đăng nhập!
              </Alert>
            </Snackbar>
            <Button
              onClick={handleLogin}
              className="w-full text-accent"
              variant="contained"
              sx={{marginTop:4}}
              startIcon={<GoogleIcon />}
            >
              Đăng kí bằng Google
            </Button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">
                Hoặc bằng email
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <TextField
              fullWidth
              label="Email đăng nhập"
              variant="outlined"
              sx={{
                marginBottom: 4,
                "& .MuiInputLabel-asterisk": {
                  color: "red",
                },
              }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              required
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              variant="outlined"
              sx={{
                marginBottom: 4,
                "& .MuiInputLabel-asterisk": {
                  color: "red",
                },
              }}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
            />


            <div>
              <Checkbox
                  checked={isAgree}
                  onClick={() => setIsAgree(!isAgree)}
              />
              <p className="inline">
                Tôi đã đọc và đồng ý với{" "}
                <span className="text-primary">Điều khoản dịch vụ </span>và{" "}
                <span className="text-primary">Điều khoản dịch </span> của
                JobMaster.
              </p>
            </div>
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
            <Link to="/login">
              <a className="text-primary">
                Đăng nhập ngay
              </a>
            </Link>
            </p>
          </div>
        </div>
  
    </div>    )}
  </div>
  );
};

export default SignUp;
