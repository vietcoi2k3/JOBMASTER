import React from 'react';
import { Typography } from '@mui/material';
import ServiceCard from "./Service";
const ServiceList = () => {
    return (
        <div className="p-8">
            <Typography variant="h4" className="mb-4 text-black font-bold">
                Danh sách dịch vụ
            </Typography>

            <div className="mb-8">
                <Typography variant="h5" className="text-blue-700 font-bold">
                    Master Job | Đăng tin tuyển dụng hiệu suất cao
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Công hưởng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp
                </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ServiceCard
                    title="MASTER MAX"
                    price="2.000.000 VND"
                    description="Đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong việc làm tốt nhất kèm theo gói dịch STAND PLUS"
                />
                <ServiceCard
                    title="MASTER MAX"
                    price="2.000.000 VND"
                    description="Đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong việc làm tốt nhất kèm theo gói dịch STAND PLUS"
                />
            </div>

            <div className="mt-8">
                <Typography variant="h5" className="text-blue-700 font-bold">
                    STANDARD PLUS | Đăng tin tuyển dụng tiết kiệm
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <ServiceCard
                        title="MASTER MAX"
                        price="2.000.000 VND"
                        description="Đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong việc làm tốt nhất kèm theo gói dịch STAND PLUS"
                    />
                </div>
            </div>
        </div>
    );
};

export default ServiceList;