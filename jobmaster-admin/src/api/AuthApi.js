import axiosClient from "./AxiosClient"

const AuthApi = {
  getUserByToken: () => {
    const url = 'user/get-user-by-token';
    return axiosClient.get(url);
  },
  login: (formData) => {
    const url = "auth/login"
    return axiosClient.post(url, formData)
  },
  getRole: (access_token) => {
    const url = 'auth/get-role';
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
};

export default AuthApi; 