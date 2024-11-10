import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box, Grid, Snackbar } from '@mui/material';
import ServiceCard from './Service';
import EnterpriseApi from '../../api/EnterpriseApi';

const ServiceList = () => {
    const [serviceList, setServiceList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        EnterpriseApi.getAllPackage()
            .then((res) => {
                setServiceList(res);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError('Có lỗi xảy ra khi tải dữ liệu dịch vụ.');
                setLoading(false);
            });
    }, []);

    return (
        <Box sx={{ padding: '32px', backgroundColor: '#F7F9FC',width:'100%' }}>
            <Typography variant="h4" sx={{ marginBottom: '16px', fontWeight: 'bold' }} color = 'primary'>
                Danh sách dịch vụ
            </Typography>

            <Box sx={{ marginBottom: '32px', padding: '16px', backgroundColor: '#E3F2FD', borderRadius: '8px' }}>
                <Typography variant="h5" sx={{ color: '#3758F9', fontWeight: 'bold' }}>
                    Master Job | Đăng tin tuyển dụng hiệu suất cao
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Công hưởng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp
                </Typography>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error" align="center">
                    {error}
                </Typography>
            ) : (
                <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
                    {serviceList.map((e) =>
                            (e.typeService === 'MASTER_JOBS') && (
                                <Grid item xs={12} md={4} key={e.id}>
                                    <ServiceCard
                                        title={e.name}
                                        price={e.price}
                                        description={e.description}
                                        effectiveTime={e.days}
                                    />
                                </Grid>
                            )
                    )}
                </Grid>
            )}

            <Box sx={{ marginTop: '32px', padding: '16px', backgroundColor: '#E3F2FD', borderRadius: '8px' }}>
                <Typography variant="h5" sx={{ color: '#3758F9', fontWeight: 'bold' }}>
                    STANDARD PLUS | Đăng tin tuyển dụng tiết kiệm
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Tối ưu chi phí - Tiếp lợi thế cho Nhà tuyển dụng
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: '16px' }}>
                {serviceList.map((e) =>
                        (e.typeService === 'STAND_PLUS') && (
                            <Grid item xs={12} md={4} key={e.id}>
                                <ServiceCard
                                    title={e.name}
                                    price={e.price}
                                    description={e.description}
                                    effectiveTime={e.days}
                                />
                            </Grid>
                        )
                )}
            </Grid>

            <Box sx={{ marginTop: '32px', padding: '16px', backgroundColor: '#E3F2FD', borderRadius: '8px' }}>
                <Typography variant="h5" sx={{ color: '#3758F9', fontWeight: 'bold' }}>
                    TOP ADD | Thêm nhãn cho tin đăng
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Tối ưu chi phí - Tiếp lợi thế cho Nhà tuyển dụng
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: '16px' }}>
                {serviceList.map((e) =>
                        (e.typeService === 'TOP_ADD') && (
                            <Grid item xs={12} md={4} key={e.id}>
                                <ServiceCard
                                    title={e.name}
                                    price={e.price}
                                    description={e.description}
                                    effectiveTime={e.days}
                                />
                            </Grid>
                        )
                )}
            </Grid>

            <Snackbar
                open={Boolean(error)}
                autoHideDuration={6000}
                message={error}
                onClose={() => setError(null)}
            />
        </Box>
    );
};

export default ServiceList;
