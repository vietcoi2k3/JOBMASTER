import React from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import HistoryIcon from '@mui/icons-material/History';
const SideBarProfile = () => {
    const [selected, setSelected] =React.useState(null);
    const navigate = useNavigate();
    // Hàm để cập nhật mục được chọn
    const handleSelect = (index) => {
        if (index===1){
            navigate("/dashboard/profile/change-password")
        }
        if (index===2){
            navigate("/dashboard/profile/user-profile")
        }
        if (index===3){
            navigate("/dashboard/profile/certificate")
        }
        if (index===4){
            navigate("/dashboard/profile/info-company")
        }
        if (index===5){
            navigate("/dashboard/profile/history")
        }
        setSelected(index);
    };
    return (
        <div className="flex bg-accent min-h-[75vh] w-[75vw]">
            <div className="bg-sidebar  py-4 min-h-full w-[30%]">
                <div
                    className={`flex cursor-pointer ${
                        selected === 1 ? 'bg-accent' : ''
                    } p-2 rounded-md`}
                    onClick={() => handleSelect(1)}
                >
                    <WorkOutlinedIcon />
                    <p className="leading-4 translate-x-1 py-1.5">Đổi mật khẩu</p>
                </div>

                {/* Mục Thông tin cá nhân */}
                <div
                    className={`flex cursor-pointer ${
                        selected === 2 ? 'bg-accent' : ''
                    } p-2 rounded-md`}
                    onClick={() => handleSelect(2)}
                >
                    <PersonIcon />
                    <p className="leading-4 translate-x-1 py-1.5">Thông tin cá nhân</p>
                </div>

                {/* Mục Giấy đăng kí doanh nghiệp */}
                <div
                    className={`flex cursor-pointer ${
                        selected === 3 ? 'bg-accent' : ''
                    } p-2 rounded-md`}
                    onClick={() => handleSelect(3)}
                >
                    <ReceiptIcon />
                    <p className="leading-4 translate-x-1 py-1.5">Giấy đăng kí doanh nghiệp</p>
                </div>

                {/* Mục Thông tin doanh nghiệp */}
                <div
                    className={`flex cursor-pointer ${
                        selected === 4 ? 'bg-accent' : ''
                    } p-2 rounded-md`}
                    onClick={() => handleSelect(4)}
                >
                    <BusinessIcon />
                    <p className="leading-4 translate-x-1 py-1.5">Thông tin doanh nghiệp</p>
                </div>
                {/* Mục Thông tin doanh nghiệp */}
                <div
                    className={`flex cursor-pointer ${
                        selected === 5 ? 'bg-accent' : ''
                    } p-2 rounded-md`}
                    onClick={() => handleSelect(5)}
                >
                    <HistoryIcon />
                    <p className="leading-4 translate-x-1 py-1.5">Lịch sử giao dịch</p>
                </div>


            </div>
            <Outlet/>
        </div>
    )
}

export default SideBarProfile