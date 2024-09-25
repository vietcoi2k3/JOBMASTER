import axios from "axios";
import { STATIC_HOST_LOCAL } from "../enviroment";
import { STATIC_HOST_PRODUCT } from "../enviroment";

// Tạo một instance của axios với baseURL
const axiosClient = axios.create({
  baseURL: `${STATIC_HOST_PRODUCT}`,
})
// Thêm một interceptor cho request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
      console.log("bbbbbb: "+config.url)
    if (token && !config.url.includes("https")) {
        console.log("aaaaaaa: "+config.url)
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