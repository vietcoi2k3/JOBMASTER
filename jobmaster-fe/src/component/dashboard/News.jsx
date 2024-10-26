import { useState, useEffect } from "react";
import { Typography, Box, Grid ,CircularProgress} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EnterpriseApi from "../../api/EnterpriseApi";
export default function News() {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        campaignOpening: 0,
        postDisplaying: 0,
        newCv: 0,
        workCv: 0
    });
    const [uData, setUData] = useState([]);
    const [pData, setPData] = useState([]);
    const [xLabels, setXLabels] = useState([]);
    useEffect(() => {
        getInfo();
        getChart();
    }, []);
    const getInfo = () => {
        EnterpriseApi.getNewsInfo()
            .then((res) => setInfo(res))
            .catch((error) => console.log(error));
    }
    const getChart = () => {
        setLoading(true);
        EnterpriseApi.getNewsChart()
            .then((res) => {
                setDataChart(res);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }
    const setDataChart = (chart) => {
        setUData(chart.map(e => e.offeredCv));
        setPData(chart.map(e => e.totalCandidate));
        setXLabels(chart.map(e => { return e.month + '/' + e.year }));
    }

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <Typography variant="h5" align="left" gutterBottom>
                Bảng tin
            </Typography>
            <Box sx={{ backgroundColor: '#ffffff', padding: '20px', height: '100%' }}>
                <Box >
                    <Grid container spacing={3} sx={{ marginTop: '10px' }}>
                        <Grid item xs={3}>
                            <Box sx={{ padding: '10px', backgroundColor: '#ebf3ff', textAlign: 'center', borderRadius: '4px', }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {/* Phần tử bên trái */}
                                    <Typography sx={{ color: '#2D7CF1' }} variant="h6">{info.campaignOpening}</Typography>

                                    {/* Phần tử bên phải */}
                                    <OnlinePredictionIcon sx={{ color: '#2D7CF1' }} />
                                </Box>
                                <Typography sx={{ textAlign: 'left', color: '#2D7CF1' }} variant="h6">Chiến dịch đang mở</Typography>

                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ padding: '10px', backgroundColor: '#fffae9', textAlign: 'center', borderRadius: '4px', }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {/* Phần tử bên trái */}
                                    <Typography sx={{ color: '#E5B500' }} variant="h6">{info.postDisplaying}</Typography>

                                    {/* Phần tử bên phải */}
                                    <InsertDriveFileIcon sx={{ color: '#E5B500' }} />
                                </Box>
                                <Typography sx={{ textAlign: 'left', color: '#E5B500' }} variant="h6">Tin tuyển dụng hiển thị</Typography>

                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ padding: '10px', backgroundColor: '#fff3f2', textAlign: 'center', borderRadius: '4px', }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {/* Phần tử bên trái */}
                                    <Typography sx={{ color: '#DA4538' }} variant="h6">{info.newCv}</Typography>

                                    {/* Phần tử bên phải */}
                                    <FileOpenIcon sx={{ color: '#DA4538' }} />
                                </Box>
                                <Typography sx={{ textAlign: 'left', color: '#DA4538' }} variant="h6">CV ứng tuyển mới</Typography>

                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ padding: '10px', backgroundColor: '#f5fff9', textAlign: 'center', borderRadius: '4px', }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {/* Phần tử bên trái */}
                                    <Typography sx={{ color: '#00B14F' }} variant="h6">{info.workCv}</Typography>

                                    {/* Phần tử bên phải */}
                                    <ContactPageIcon sx={{ color: '#00B14F' }} />
                                </Box>
                                <Typography sx={{ textAlign: 'left', color: '#00B14F' }} variant="h6">Cv nhận việc</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Typography marginTop={10} variant="h6" align="left" gutterBottom>
                    Thống kê hiệu quả tuyển dụng theo tháng
                </Typography>
                {loading ? (
                    <CircularProgress />
                    
                ) : (
                    <BarChart
                        width={1000} // Chiều rộng biểu đồ bằng 100%
                        height={300}  // Chiều cao biểu đồ
                        series={[
                            { data: pData, label: 'Tổng số ứng viên', id: 'pvId', color: '#28aee8' },  // Màu xanh cho cột pv
                            { data: uData, label: 'Số lượng trúng tuyển', id: 'uvId', color: '#f9922f' },  // Màu cam cho cột uv
                        ]}
                        xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    />
                )}

            </Box>
        </div>
    );
}