import axiosClient from "./AxiosClient" 

const UserApi = {
    
    getUserByToken:()=>{
        const url = 'user/get-user-by-token';
        return axiosClient.get(url);
    },

    updateUser:(id,userInfo)=>{
        const url = 'user/update-user/'+id;
        return axiosClient.put(url,userInfo);
    },
    updatePassword:(passwordRequest)=>{
        const url ='user/update-password';
        return axiosClient.put(url,passwordRequest);
    }
}

export default UserApi;