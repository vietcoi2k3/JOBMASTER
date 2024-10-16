import React from 'react'
import axiosClient from './AxiosClient';

const AdminApi =  {
    getProvince() {
        const url= `https://vapi.vnappmob.com/api/province`;
        return axiosClient.get(url, {

        });
    },

    getListField(code, name) {
        const url = "/admin/get-list-field";
        return axiosClient.get(url, {
            params: {
                code: code,
                name: name,
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

    getListCertificate(pageNumber) {
        const url = "/admin/get-list-certificate";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber,
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

    getListPost(pageNumber) {
        const url = "/admin/get-list-campaign";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber,
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

    getListPosition(code, name) {
        const url = "/admin/get-list-position";
        return axiosClient.get(url, {
            params: {
                code: code,
                name: name,
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
    }

}

export default AdminApi