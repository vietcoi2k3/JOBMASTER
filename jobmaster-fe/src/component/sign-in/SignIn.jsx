import React, {useState} from 'react';
import { Button, TextField, Typography, Box, IconButton, Divider,CircularProgress  } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../assets/logo.png'
import logo2 from '../../assets/logo2.png'
import AuthApi from '../../api/AuthApi';
import { Link } from 'react-router-dom';
import SignUp from '../sign-up/SignUp';
import { useNavigate } from 'react-router-dom';
import Notification from "../notification/Notification";
const LoginComponent = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData,setFormData] = React.useState({
    email:"",
    password:""
  })

    const [errors, setErrors] = React.useState({});
    const [notification, setNotification] = useState({ open: false, message: '' });

    const handleCloseNotification = () => {
        setNotification({
            open: false,
            message: '',
        });
    };
  const validate = ()=>{
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(formData)
    tempErrors.email =  emailPattern.test(formData.email) ? "" : "Email không hợp lệ!";
    tempErrors.password = formData.password
      ? ""
      : "Mật khẩu không được để trống!";
      setErrors(tempErrors);
      return Object.values(tempErrors).every((x) => x === "");
  }

  const handleLoginGoogle = () => {
        const clientId =
            "421794227239-vvm5o77fkd4qsendqmr4movhv6kmqt3m.apps.googleusercontent.com";
        const redirectUri = "http://localhost:3000/callback";
        const scope =
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
        const responseType = "code";
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

        window.location.href = authUrl;
    };
  const handleLogin = () => {
    if(validate()){
      setLoading(true)
      AuthApi.login(formData).then((e)=>{
          localStorage.setItem("access_token",e.token)
          window.location.href= "http://localhost:3000/dashboard"
      })
      .catch((e)=>{
        if (e.response.data==="Tài khoản không tồn tại"){
            setNotification({
                open: true,
                message: "Tài khoản không tồn tại",
            });
        }
        if (e.response.data==="Tài khoản chưa xác thực"){
            let email = formData.email
            navigate('/verify-email',{ state: { email } });
        }
        if (e.response.data==="Mật khẩu không khớp"){
            setNotification({
                open: true,
                message: "Mật khẩu không khớp",
            });
        }
      })
      .finally(()=>{
        setLoading(false)
      })
    }

  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  }

  return (
   <div className='flex flex-row-reverse'>
       <div>
           <Notification
               open={notification.open}
               onClose={handleCloseNotification}
               message={notification.message}
           />
       </div>
    <img src={logo2} alt="" className='w-1/3 h-screen' />
     <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '60px', 
        width: '66.666666666%', 
        border: '1px solid #ddd', 
        borderRadius: '8px' 
      }}
    >
     <Box sx={{display:'flex'}}>
        <Typography variant="h5" sx={{marginRight:2}} gutterBottom>
            Chào mừng bạn đến với 
        </Typography>
        <img src={logo} width={200}/>
     </Box>

      <Button 
        startIcon={<GoogleIcon />} 
        variant="contained" 
        color="primary" 
        fullWidth
        onClick={handleLoginGoogle}
        sx={{ marginBottom: '20px' }}
      >
        Đăng nhập bằng Google
      </Button>

      <Divider sx={{ width: '100%', marginBottom: '20px' }}>hoặc</Divider>

      <TextField
        fullWidth
        label="Email"
        type="email"
        name="email"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email}
        required
        onChange={handleChange}
        sx={{ marginBottom: '20px' }}
      />

      <Box sx={{ position: 'relative', marginBottom: '20px', width: '100%' }}>
        <TextField
          fullWidth
          name="password"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password}
          onChange={handleChange}
          required
        />
        <IconButton
          sx={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          onClick={handleClickShowPassword}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Box>

 
      <Typography variant="body2" color="primary" align="right" sx={{ marginBottom: '20px' }}>
        Quên mật khẩu?
      </Typography>


      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin}
        disabled={loading}
        fullWidth>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập bằng Email'}
      </Button>
   
      <Typography variant="body2" sx={{ marginTop: '20px' }}>
        Bạn chưa có tài khoản? 
        <Link to="/sign-up">
        <Typography component="span" color="primary" >Đăng ký ngay</Typography>      
        </Link>
      </Typography>

    </Box>
   </div>
  );
};

export default LoginComponent;
