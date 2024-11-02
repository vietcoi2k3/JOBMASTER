import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button, IconButton, TextField, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import pdf from "../../assets/uploads4cf7da69-ef39-43c6-89b7-34f26935000a_A43669_DoQuocViet (4).pdf";
import { useParams } from "react-router-dom";
import EnterpriseApi from "../../api/EnterpriseApi";
import CvEvaluationPopup from "./CvEvaluationPopup";
import { STATIC_HOST } from '../../enviroment';

const statusMap = new Map([
    ["RECEIVED", "Tiếp nhận"],
    ["MATCHED", "Phù hợp"],
    ["INTERVIEW_SCHEDULED", "Hẹn phỏng vấn"],
    ["OFFERED", "Gửi đề nghị"],
    ["HIRED", "Nhận việc"],
    ["REJECTED", "Từ chối"]
]);

const CVLayout = () => {
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('CV tiếp nhận');
    const handleOpenPopup = () => setOpen(true);
    const handleClosePopup = () => setOpen(false);
    const id = useParams().id;
    const [cvEntity, setCVEntity] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        EnterpriseApi.getDetailCv(id).then((data) => {
            setCVEntity(data);
            setIsLoading(false);
            setSelectedStatus(data.status);
        });
    }, [id]);

    const handleStatusChange = (newStatus) => {
        setCVEntity({
            ...cvEntity,
            status: newStatus
        });
        setSelectedStatus(newStatus);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#F7F8FA',margin:'auto' }}>
            {/* Left side: PDF display */}
            <Box sx={{ flex: 3, borderRight: '1px solid #ccc', overflow: 'hidden' }}>
                <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js">
                    <div style={{ width: '100%', height: '100%' }}>
                        {
                            isLoading || <Viewer
                                fileUrl={STATIC_HOST + "auth/download?url=" + encodeURIComponent(cvEntity.url)}
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
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: 'white',
                    overflowY: 'auto',
                    boxShadow: 3,
                    maxWidth: 400,
                }}
            >
                {/* Header: Name and contact information */}
                <Box mb={3}>
                    <Typography variant="h5" fontWeight="bold">{cvEntity.name}</Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                        <PhoneIcon sx={{ mr: 1, color: 'grey.600' }} />
                        <Typography variant="body2">{cvEntity.phoneNumber}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                        <EmailIcon sx={{ mr: 1, color: 'grey.600' }} />
                        <Typography variant="body2">{cvEntity.email}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Section: CV Status */}
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Trạng thái CV
                </Typography>
                <Chip
                    label={isLoading ? "" : statusMap.get(cvEntity.status)}
                    color="primary"
                    sx={{ mb: 2, fontWeight: 'bold' }}
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={handleOpenPopup}>
                    Đổi trạng thái CV
                </Button>

                <Divider sx={{ my: 2 }} />

                {/* Popup for changing CV status */}
                <CvEvaluationPopup
                    open={open}
                    onClose={handleClosePopup}
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                    id={id}
                />
            </Box>
        </Box>
    );
};

export default CVLayout;
