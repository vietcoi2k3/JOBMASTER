
import axiosClient from './AxiosClient';

const EnterpriseApi = {
    uploadFile(file) {
        const url = '/auth/upload'; // Thay thế bằng URL API thực tế của bạn
        const formData = new FormData();
        formData.append('file', file);

        return axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getCertificate() {
        const url = "/enterprise/get-certificate"
        return axiosClient.get(url, { responseType: 'blob' })
    },

    sendCertificate(fileEntity) {
        const url = "/enterprise/send-certificate"
        return axiosClient.post(url, fileEntity)
    },
    getStatus() {
        const url = "/enterprise/get-status"
        return axiosClient.get(url)
    },

    addCampaign(data) {
        const url = "/enterprise/add-campaign"
        return axiosClient.post(url, data)
    },
    updateCampaign(id,campaign){
        const url = "/enterprise/update-campaign/"+id;
        return axiosClient.put(url,campaign);
    }
    ,

    getListCampaign(search, pageNumber,pageSize) {
        const url = "/enterprise/get-list-campaign"
        const params = new URLSearchParams();
        if (search) {
            params.append('search', search);
        }
        if (pageNumber) {
            params.append('pageNumber', pageNumber);
        }
        if (pageSize) {
            params.append('pageSize', pageSize);
        }
        return axiosClient.get(url + "?" + params.toString());
    },

    getAllCampaign(){
        const url = "/enterprise/get-list-campaign-post"
        return axiosClient.get(url);
    },

    addPost(data) {
        const url = "/enterprise/add-new-post"
        return axiosClient.post(url, data)
    },

    getEnterprise() {
        const url = "/enterprise/get-info-enterprise"
        return axiosClient.get(url)
    },

    updateEnterprise(data) {
        const url = "/enterprise/update-info-enterprise"
        return axiosClient.put(url, data)
    },

    getListPost(pageNumber,search,status) {
        const url = "/enterprise/get-list-post"
        const params = new URLSearchParams();
        if (search) {
            params.append('search', search);
        }
        if (status) {
            params.append('status', status);
        }
        if (pageNumber) {
            params.append('pageNumber', pageNumber);
        }
        return axiosClient.get(url + "?" + params.toString())
    },

    getAllField() {
        const url = "/enterprise/get-all-field"
        return axiosClient.get(url)
    },

    getAllPosition() {
        const url = "/enterprise/get-all-position"
        return axiosClient.get(url)
    },

    getDetailPost(id) {
        const url = "/enterprise/get-post-detail/"
        return axiosClient.get(url + id)
    },
    updatePost(id,postDTO) {
        const url = "/enterprise/update-post/";
        return axiosClient.put(url+id,postDTO);
    },
    resetPostStatus(id) {
        const url = "/enterprise/reset-post-status/";
        return axiosClient.put(url+id);
    },

    getListCv(pageNumber, postId,status) {
        const url = "/enterprise/get-list-cv";
        return axiosClient.get(url + "?pageNumber=" + pageNumber + "&postId=" + postId+"&status="+status);

    },

    getDetailCv(id) {
        const url = "/enterprise/get-detail-cv/"
        return axiosClient.get(url + id)
    },


    updateStatus(data) {
        const url = "/enterprise/update-status-cv"
        return axiosClient.put(url, data)
    },

    getHistory(pageNumber) {
        const url = "/enterprise/get-money-history?pageNumber="+pageNumber;
        return axiosClient.get(url)
    },

    getListService(id) {
        const url = "/enterprise/get-package-by-campaign/"
        return axiosClient.get(url + id)
    },

    activateService(data) {
        const url = "/enterprise/activate-package"
        return axiosClient.post(url, data)
    },

    updateStatusCampaign(id){
        const url = "/enterprise/update-status-campaign"
        return axiosClient.put(url+"/"+id)
    },

    getAllPackage(){
        const url = "/enterprise/get-all-package";
        return axiosClient.get(url);
    },
    getNewsInfo(){
        const url = "/enterprise/get-news-info";
        return axiosClient.get(url);
    },
    getNewsChart(){
        const url = "enterprise/get-news-chart";
        return axiosClient.get(url);
    }


}

export default EnterpriseApi