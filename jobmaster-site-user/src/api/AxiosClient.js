import axios from "axios";
import {STATIC_HOST_LOCAL, STATIC_HOST_PRODUCT} from "../enviroment";
import { useNavigate } from 'react-router-dom'; // Nếu bạn dùng React Router
// Tạo một instance của axios với baseURL
const axiosClient = axios.create({
    baseURL: `${STATIC_HOST_LOCAL}`,
})
// Thêm một interceptor cho request
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token")
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }

        return config
    },

    (error) => {
        return Promise.reject(error)
    },
)

// Thêm một interceptor cho response
axiosClient.interceptors.response.use(
    function (response) {
        return response?.data;
    },
    function (error) {
        if (error.response && error.response.status === 403) {
            // Thực hiện logout (ví dụ: xóa token)
            localStorage.removeItem('access_token'); // Hoặc token bạn đang sử dụng

            window.location.href = '/login'; // Điều hướng về trang đăng nhập

            // Trả về thông báo lỗi
            return Promise.reject({
                status: 'invalid_account',
                message: 'Tài khoản không hợp lệ. Vui lòng đăng nhập lại.',
            });
        }
        // Trả về các lỗi khác
        return Promise.reject(error);
    },
);

export default axiosClient;