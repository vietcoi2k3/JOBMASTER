import React from 'react'
import axiosClient from './AxiosClient';

const AdminApi =  {
    getProvince() {
        const url= `https://vapi.vnappmob.com/api/province`;
        return axiosClient.get(url, {

        });
    },

    getListField(code, name,pageNumber,pageSize) {
        const url = "/admin/get-list-field";
        return axiosClient.get(url, {
            params: {
                code: code,
                name: name,
                pageNumber:pageNumber,
                pageSize:pageSize
            },
        });
    },

    getListAccountCandidate(pageNumber) {
        const url = "/admin/get-list-account-candidate";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber
            },
        });
    },

    getListAccountAdmin(pageNumber) {
        const url = "/admin/get-list-account-admin";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber,
            },
        });
    },

    getListCertificate(pageNumber,status,username) {
        const url = "/admin/get-list-certificate";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber,
                status:status,
                username:username
            },
        });
    },

    getListCampaign(pageNumber) {
        const url = "/admin/get-list-campaign";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber,
            },
        });
    },

    getListPost(pageNumber,postName,tax) {
        const url = "/admin/get-list-post";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber,
                postName:postName,
                tax:tax
            },
        });
    },
    getListCampaign(pageNumber,campaignName,tax) {
        const url = "/admin/get-list-campaign";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber,
                campaignName:campaignName,
                tax:tax
            },
        });
    },
    getListPackage(time){
        const url = "/admin/get-list-package-admin"
        return axiosClient.get(url, {
            params: {
                time: time,
            },
        });
    },

    addField(data){
        const url = "/admin/add-field"
        return axiosClient.post(url,data)
    },

    addPosition(data){
        const url = "/admin/add-position"
        return axiosClient.post(url,data)
    },

    getListPosition(code, name,pageNumber,pageSize) {
        const url = "/admin/get-list-position";
        return axiosClient.get(url, {
            params: {
                code: code,
                name: name,
                pageNumber:pageNumber,
                pageSize:10
            },
        });
    },

    deleteField(id){
        const url = "/admin/delete-field/";
        return axiosClient.delete(url+id)
    },

    deletePosition(id){
        const url = "/admin/delete-position/";
        return axiosClient.delete(url+id)
    },

    getDetailPost(id){
        const url = "/admin/get-detail-post/";
        return axiosClient.get(url+id)
    },

    updateStatusPost(status,id){
        const url = "/admin/update-status";
        return axiosClient.get(url, {
            params: {
                status: status,
                id: id,
            },
        });
    },

    updateStatusEnterprise(status,id){
        const url = "/admin/update-status-enterprise";
        return axiosClient.get(url, {
            params: {
                status: status,
                id: id,
            },
        });
    }

}

export default AdminApi