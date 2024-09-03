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

    loginByGoogle:(token)=>{
       const url = "auth/login-by-goolge"
       return axiosClient.post(url+"?token="+token)
    },

    registerEnterprise:(data)=>{
      const url = "auth/register-enterprise"
      return axiosClient.post(url,data)
    }
};

export default AuthApi; 