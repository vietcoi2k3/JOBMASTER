import React, {useEffect, useState} from 'react'
import axiosClient from '../../api/AxiosClient';
import AuthApi from '../../api/AuthApi';
import Notification from "../notification/Notification";
import {useNavigate} from "react-router-dom";

const CallBack = () => {
    const [errors, setErrors] = React.useState({});
    const [notification, setNotification] = useState({ open: false, message: '' });

    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const handleCloseNotification = () => {
        setNotification({
            open: false,
            message: '',
        });
    };
    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const authorizationCode = urlParams.get('code');
            if (authorizationCode) {
              const token = await AuthApi.getTokenGoogle(authorizationCode).catch((e)=>{
                  console.log(e)
              });
              AuthApi.loginByGoogle(token).then((e)=>{
                  localStorage.setItem("access_token",e.token)
                  window.location.href= "http://localhost:3001/"
              }) .catch((e)=>{
                  if (e.response.data==="Tài khoản không tồn tại"){
                      setNotification({
                          open: true,
                          message: "Tài khoản không tồn tại",
                      });
                  }
                  if (e.response.data==="Mật khẩu không khớp"){
                      setNotification({
                          open: true,
                          message: "Mật khẩu không khớp",
                      });
                  }
                  if (e.response.data==="Tài khoản không hợp lệ"){
                      setNotification({
                          open: true,
                          message: "Tài khoản không hợp lệ",
                      });
                  }

                  navigate("/login")
              })
                  .finally(()=>{
                      setLoading(false)
                  })


            }}

            fetchToken()
      }, []);
  return (
    <div>
        <div>
        <Notification
            open={notification.open}
            onClose={handleCloseNotification}
            message={notification.message}
        />
    </div></div>
  )
}

export default CallBack