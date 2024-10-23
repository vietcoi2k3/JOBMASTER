import axiosClient from "./AxiosClient";

const consumer = {
    getListJob: (data) => {
        const url = "consumer/send-cv"
        return axiosClient.post(url, data)
    },

    addCriteria:(data)=>{
        const url = "consumer/add-criteria"
        return axiosClient.post(url, data)
    }

}

export default consumer