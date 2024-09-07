import React from 'react'
import axiosClient from './AxiosClient';

const Province =  {
    getProvince() {
        const url= `https://vapi.vnappmob.com/api/province`;
        return axiosClient.get(url);
      },
  // Lấy danh sách quận/huyện theo mã tỉnh/thành phố
  getDistrictByProvince(id) {
    const url= `https://vapi.vnappmob.com/api/province/district/${id}`;
    return axiosClient.get(url);
  },
  // Lấy danh sách phường/xã theo mã quận/huyện
  getWardByDistrict(id) {
    const url= `https://vapi.vnappmob.com/api/province/ward/${id}`;
    return axiosClient.get(url);
  },
}

export default Province