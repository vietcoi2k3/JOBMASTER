import React, { useEffect } from 'react'
import AuthApi from '../../api/AuthApi'

const VerifyEmail = () => {
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    AuthApi.confirmToken(token).then(res => {
        if(res==="Email verified successfully!"){
            window.location.href= "http://localhost:3000/dashboard"
        }
    })

  },[])
  return (
    <div>VerifyEmail</div>
  )
}

export default VerifyEmail