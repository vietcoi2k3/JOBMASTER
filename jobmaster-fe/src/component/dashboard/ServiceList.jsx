import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ServiceCard from "./Service";
import EnterpriseApi from '../../api/EnterpriseApi';
const ServiceList = () => {
    const [serviceList, setServiceList] = useState([]);

    useEffect(() => {
        EnterpriseApi.getAllPackage()
            .then((res) => {
                setServiceList(res);
            }).catch((e) => console.log(e))
    }, []);

    return (
        <div className="p-8">
            <Typography variant="h4" className="mb-4 text-black font-bold">
                Danh sách dịch vụ
            </Typography>

            <div className="mb-8">
                <Typography variant="h5" className="text-blue-700 font-bold">
                    <span style={{ color: '#3758F9' }}>Master Job</span> | Đăng tin tuyển dụng hiệu suất cao
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Công hưởng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp
                </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceList.map((e) =>
                    (e.typeService === 'MASTER_JOBS' || e.typeService === 'TOP_ADD') && (
                        <ServiceCard
                            title={e.name}
                            price={e.price}
                            description={e.description} />
                    )

                )}
            </div>

            <div className="mt-8">
                <Typography variant="h5" className="text-blue-700 font-bold">
                    <span style={{ color: '#3758F9' }}>STANDARD PLUS</span> | Đăng tin tuyển dụng tiết kiệm
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Tối ưu chi phí - Tiếp lợi thế cho Nhà tuyển dụng
                </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {serviceList.map((e) =>
                    (e.typeService === 'STAND_PLUS') && (
                        <ServiceCard
                            title={e.name}
                            price={e.price}
                            description={e.description} />
                    )

                )}

            </div>
        </div>
    );
};

export default ServiceList;