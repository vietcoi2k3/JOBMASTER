import React from 'react'
import axiosClient from "./AxiosClient" 
import { data } from 'autoprefixer';

// Định nghĩa một object AuthApi chứa các phương thức gọi API liên quan đến xác thực
const AuthApi = {
   getTokenGoogle : async (authorizationCode)=>{
    const data = {
        code: authorizationCode,
        client_id: '421794227239-vvm5o77fkd4qsendqmr4movhv6kmqt3m.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://localhost:3000/callback',
        grant_type: 'authorization_code',
      };
    
        const response = await axiosClient.post('https://oauth2.googleapis.com/token', new URLSearchParams(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
    
        const accessToken = response.access_token; // Đã được xử lý bởi response interceptor

        return accessToken;
    },

    sendEmail:(email)=>{
      const url="auth/send-email"
      return axiosClient.get(url+"?email="+email)
    },

    loginByGoogle:(token)=>{
       const url = "auth/login-by-goolge"
       return axiosClient.post(url+"?token="+token)
    },

    registerEnterprise:(data)=>{
      const url = "auth/register-enterprise"
      return axiosClient.post(url,data)
    },

    confirmToken:(token)=>{
      const url ="auth/confirm"
      return axiosClient.get(url+"?token="+token)
    },
    login:(formData)=>{
      const url ="auth/login"
      return axiosClient.post(url,formData)
    },

    getFile:(id)=>{
        const url ="auth/get-file"
        return axiosClient.get(url+"?fileId="+id,{ responseType: 'blob' })
    },

    payment:(amount)=>{
        const url ="auth/payment/vn-pay?amount="
        return axiosClient.get(url+amount)
    }

};

export default AuthApi; 