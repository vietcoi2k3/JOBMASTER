import axios from "axios";
import { STATIC_HOST } from "../enviroment";
// Tạo một instance của axios với baseURL
const axiosClient = axios.create({
  baseURL: `${STATIC_HOST}`,
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
    return response?.data
  },
  function (error) {
    // Xử lý lỗi từ response
    return Promise.reject(error)
  },
)

export default axiosClient