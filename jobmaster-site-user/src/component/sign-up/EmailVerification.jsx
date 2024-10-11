import React ,{useState}from 'react';
import { Button, Typography, Box } from '@mui/material';
import verifyemail from "../../assets/verifyemail.png";
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import AuthApi from '../../api/AuthApi';
const EmailVerification = () => {
  const location = useLocation();
  const { email } = location.state || {}; // Lấy email từ state
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const handleClick = () => {
    AuthApi.sendEmail(email)
    setDisabled(true);
    setTimer(60); // Khóa nút trong 60 giây

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setDisabled(false); // Mở khóa nút sau 60 giây
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sub p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full bg-accent">
        
        <img src={verifyemail} alt="" />
        <Typography className="text-center mb-6"sx={{marginTop:0.5,marginBottom:0.5}}>
            Email xác thực tài khoản đã  được gửi đến email <b className='text-primary'>{"  "+email+"  "}</b> của bạn
        </Typography>
        
        <Typography className="text-center mb-6" sx={{marginTop:0.5,marginBottom:0.5}}>
        Vui lòng kiểm tra hộp thư, bao gồm cả Promotions (Quảng cáo), Spam (Thư rác) và Update (Cập nhật)
        </Typography>

        <Typography className="text-center" sx={{marginTop:3,marginBottom:3}}>
        Bạn cũng có thể yêu cầu hệ thống gửi lại email xác thực 
 
        </Typography>
        
        <div className="flex justify-center ">
        <Button 
      startIcon={<SendIcon />} 
      variant="contained" 
      color="primary" 
      className="normal-case" 
      onClick={handleClick}
      disabled={disabled}
    >
      {disabled ? `Chờ ${timer}s` : 'Gửi lại'}
    </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;