import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import AuthApi from "../../api/AuthApi";

function PaymentSuccess() {
    const { search } = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        AuthApi.saveMoney(search).then(()=>{
            navigate("/dashboard/profile/history")
        })
    }, []);
    return (
        <div></div>  // Trang rỗng
    );
}

export default PaymentSuccess;