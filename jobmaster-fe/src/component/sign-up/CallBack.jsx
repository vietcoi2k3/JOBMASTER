import React, { useEffect } from 'react'
import axiosClient from '../../api/AxiosClient';
import AuthApi from '../../api/AuthApi';

const CallBack = () => {
    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const authorizationCode = urlParams.get('code');
            if (authorizationCode) {
              const token = await AuthApi.getTokenGoogle(authorizationCode);
              const data  = await AuthApi.loginByGoogle(token)  
              localStorage.setItem("access_token",data.token)
              window.location.href= "http://localhost:3000/dashboard"
            }}

            fetchToken()
      }, []);
  return (
    <div></div>
  )
}

export default CallBack