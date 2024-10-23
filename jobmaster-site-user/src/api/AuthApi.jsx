import axiosClient from "./AxiosClient";

const AuthApi = {
    getListJob:(pageNumber)=>{
        const url="auth/get-list-post"
        return axiosClient.get(url+"?pageNumber="+pageNumber)
    },
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
        data = {
            ...data,
            isConsumer : true
        }
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

    updatePdf:(formData)=>{
        const url ="auth/upload-pdf"
        return axiosClient.post(url,formData)
    },

    getDetailCompany:(id)=>{
        const url = "auth/get-detail-company"
        return axiosClient.get(url+"?campaignId="+id)
    },

    getFile:(id)=>{
        const url ="auth/get-file"
        return axiosClient.get(url+"?fileId="+id,{ responseType: 'blob' })
    },

    getListCompany:()=>{
        const url = "auth/get-list-company"
        return axiosClient.get(url)
    },

    getAllField:()=>{
        const url = "auth/get-all-field"
        return axiosClient.get(url)
    },

    getAllPosition:()=>{
        const url = "auth/get-all-field"
        return axiosClient.get(url)
    }
}

export default AuthApi;