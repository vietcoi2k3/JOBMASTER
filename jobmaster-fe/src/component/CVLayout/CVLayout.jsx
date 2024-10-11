import React, {useEffect, useState} from 'react';
import { Box, Typography, Divider, Button, IconButton, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import pdf from "../../assets/uploads4cf7da69-ef39-43c6-89b7-34f26935000a_A43669_DoQuocViet (4).pdf"
import {useParams} from "react-router-dom";
import EnterpriseApi from "../../api/EnterpriseApi";
import CvEvaluationPopup from "./CvEvaluationPopup";

const CVLayout = () => {
    const [open, setOpen] = useState(false);
    // State lưu trạng thái đang chọn
    const [selectedStatus, setSelectedStatus] = useState('CV tiếp nhận');
    const handleOpenPopup = (status) => {
        setSelectedStatus(selectedStatus); // Thiết lập trạng thái
        setOpen(true); // Mở popup
    };
    const handleStatusChange = (newStatus) => {
        // console.log(`Trạng thái đã thay đổi: ${newStatus}`);
        setCVEntity({
            ...cvEntity,
            status: newStatus
        });
        setSelectedStatus(newStatus)
    };
    const handleClosePopup = () => {
        setOpen(false);
    };
    const id = useParams().id
    const [cvEntity,setCVEntity] = useState({})
    const [isLoading,setIsLoading] =useState(true)
    useEffect(() => {
        EnterpriseApi.getDetailCv(id).then((e)=>{
            setCVEntity(e)
            setIsLoading(false)
            setSelectedStatus(cvEntity.status)
        })
    }, []);
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Left side: PDF display - Full width */}
            <Box sx={{ flex: 3, borderRight: '1px solid #ccc', overflow: 'hidden' }}>
                <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js">
                    <div style={{ width: '100%', height: '100%' }}>
                        {
                            isLoading||<Viewer
                                fileUrl={"http://159.223.69.16:8080/auth/download?url="+cvEntity.url}
                                defaultScale={1.5}
                                plugins={[]}
                            />
                        }
                    </div>
                </Worker>
            </Box>

            {/* Right side: Detailed information */}
            <Box
                sx={{
                    flex: 1,
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: 'white',
                    overflowY: 'auto',
                }}
            >
                {/* Header: Name and contact information */}
                <Box display="flex" alignItems="center" mb={2}>
                    <Box
                        component="img"
                        src="https://via.placeholder.com/50"
                        alt="Profile Avatar"
                        sx={{ borderRadius: '50%', width: 50, height: 50, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6">{cvEntity.name}</Typography>
                        <Typography variant="body2">{cvEntity.email} | {cvEntity.phoneNumber}</Typography>
                    </Box>
                </Box>

                {/* Icons for Contact Methods */}
                <Box display="flex" justifyContent="flex-start" gap={1} mb={2}>
                    <IconButton size="small" color="primary">
                        <EmailIcon />
                    </IconButton>
                    <IconButton size="small" color="success">
                        <WhatsAppIcon />
                    </IconButton>
                    <IconButton size="small" color="default">
                        <PhoneIcon />
                    </IconButton>
                </Box>

                {/* Section: CV Evaluation */}
                <Typography variant="subtitle1" mb={1}>
                    Đánh giá CV
                </Typography>
                <Typography variant="body2" mb={2}>
                    Thực hiện đánh giá sẽ giúp hệ thống tối ưu tốt hơn cho chiến dịch tuyển dụng của bạn.
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                    <Button variant="contained" color="success" fullWidth>
                        Phù hợp
                    </Button>
                    <Button variant="outlined" color="error" fullWidth>
                        Không phù hợp
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Section: CV Status */}
                <Typography variant="subtitle1" mb={1}>
                    Trạng thái CV
                </Typography>
                <Box display="flex" flexDirection="column" gap={1} mb={2}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Trạng thái"
                        value={isLoading ? "" :cvEntity.status}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Nguồn"
                        value="Ứng tuyển"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Button variant="outlined" color="primary" fullWidth sx={{ mb: 2 }} onClick={()=>handleOpenPopup(cvEntity.status)}>
                    Đổi trạng thái CV
                </Button>

                <Divider sx={{ my: 2 }} />

                {/* Section: Candidate Code */}
                <Typography variant="subtitle1" mb={1}>
                    Mã ứng viên
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={cvEntity.id}
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <CvEvaluationPopup
                    open={open}
                    onClose={handleClosePopup}
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                    id = {id}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="outlined" size="small">
                        Sao chép mã
                    </Button>
                    <Button variant="outlined" size="small">
                        Báo cáo CV
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CVLayout;