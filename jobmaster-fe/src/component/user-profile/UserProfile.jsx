import * as React from "react";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BusinessIcon from "@mui/icons-material/Business";
import Notification from "../notification/Notification";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import userApi from "../../api/UserApi";

function UserProfile() {
  const [userInfo, setUserInfo] = React.useState({
    id:'',
    username: '',
    fullName: '',
    gender: '',
    phoneNumber:''
  });
  const [notification, setNotification] = React.useState({
    open: false,
    message: '',
    type: 'success'
  });
  React.useEffect(() => {
    userApi.getUserByToken()
      .then((res) => {
        setUserInfo(res)
      })
      .catch((error) => {
        setNotification({
          open: true,
          message: error,
          type: 'error'
        });
      })
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
        ...userInfo,
        [name]: value, // Cập nhật trường tương ứng trong userInfo
    });
};
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    userApi.updateUser(userInfo.id,userInfo)
    .then((res)=>{
      setUserInfo(res);
      setNotification({
        open: true,
        message: 'User information updated successfully!',
        type: 'success',
      });
    })
    .catch((error)=>{
      setNotification({
        open: false,
        message: error,
        type: 'error',
      });
    })
    
  };

  return (
    <div className="flex bg-accent w-full">

      <div className="bg-white rounded-lg shadow-lg w-full mx-auto p-4 ">
        <h1>Cập nhật thông tin cá nhân</h1>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p>Email: {userInfo.username}</p>
          </div>
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            label="Họ và tên"
            variant="outlined"
            value={userInfo.fullName}
            name="fullName"
            onChange={handleChange}
            className="bg-white"
          />
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            label="Số điện thoại"
            variant="outlined"
            value={userInfo.phoneNumber}
            className="bg-white"
            name = "phoneNumber"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="gender-label">Giới tính</InputLabel>
            <Select
              labelId="gender-label"
              value={userInfo.gender}
              label="Giới tính"
              onChange={handleChange}
              name = "gender"
              className="bg-white"
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginLeft: '80%', marginBottom: 20 }}>
          Cập nhật
        </Button>

        <Notification 
                open={notification.open} 
                onClose={() => setNotification({ ...notification, open: false })} 
                message={notification.message} 
                type={notification.type} 
            />
      </div>
    </div>
  );
}

export default UserProfile;
