import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import AuthApi from "../../api/AuthApi";

function PaymentSuccess() {
    const { search } = useLocation();
    useEffect(() => {
        AuthApi.saveMoney(search).then(()=>{
            window.location.href = "http://localhost:3000/dashboard/profile/history"
        })
    }, []);
    return (
        <div></div>  // Trang rỗng
    );
}

export default PaymentSuccess;