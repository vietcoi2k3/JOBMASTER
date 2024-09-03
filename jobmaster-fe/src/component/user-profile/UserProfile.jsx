import * as React from "react";

import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BusinessIcon from "@mui/icons-material/Business";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function UserProfile() {
  const [gender, setGender] = React.useState("Nữ");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  
  return (
    <div className="flex bg-accent w-full">
      <div className="bg-subback w-1/4 px-4 py-4 min-h-full">
        <div className="flex ">
          <LockIcon />
          <p className="leading-4 translate-x-1  py-1.5"> Đổi mật khẩu</p>
        </div>
        <div className="flex">
          <PersonIcon />
          <p className="leading-4 translate-x-1 py-1.5"> Thông tin cá nhân</p>
        </div>
        <div className="flex">
          <ReceiptIcon />
          <p className="leading-4 translate-x-1  py-1.5">
            {" "}
            Giấy đăng kí doanh nghiệp
          </p>
        </div>
        <div className="flex">
          <BusinessIcon />
          <p className="leading-4 translate-x-1  py-1.5">
            {" "}
            Thông tin doanh nghiệp
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg w-full mx-auto p-4 ">
        <h1>Cập nhật thông tin cá nhân</h1>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p>Email: phuong@gmail.com</p>
          </div>
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            label="Họ và tên"
            variant="outlined"
            value="Phạm Phương"
            className="bg-white"
          />
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            label="Số điện thoại"
            variant="outlined"
            value="0333482008"
            className="bg-white"
          />
        </div>

        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="gender-label">Giới tính</InputLabel>
            <Select
              labelId="gender-label"
              value={gender}
              label="Giới tính"
              onChange={handleGenderChange}
              className="bg-white"
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button variant="contained" color="primary" sx={{marginLeft:'80%',marginBottom:20}}>
          Cập nhật
        </Button>
      </div>
    </div>
  );
}

export default UserProfile;
