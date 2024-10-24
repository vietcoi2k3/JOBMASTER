import axiosClient from "./AxiosClient";

const consumer = {
    getListJob: (data) => {
        const url = "consumer/send-cv"
        return axiosClient.post(url, data)
    },

    addCriteria:(data)=>{
        const url = "consumer/add-criteria"
        return axiosClient.post(url, data)
    },

    getCriteria:(data)=>{
        const url = "consumer/get-criteria"
        return axiosClient.get(url)
    },

    getListCriteria:(data)=>{
        const url = "consumer/get-list-post"
        return axiosClient.get(url)
    }


}

export default consumer