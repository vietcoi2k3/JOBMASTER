import React, { useRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    TextField,
    Box,
    IconButton,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import AuthApi from "../../api/AuthApi";
import consumer from "../../api/Consumer";
import { useNavigate } from "react-router-dom";
import Notification from "../notification/Notification";

const ApplyJobPopup = ({ open, onClose, postId }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const [selectedCV, setSelectedCV] = useState('cv1');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [errors, setErrors] = useState({}); // State to hold error messages

    const fileInputRef = useRef(null);
    const [fileEntity, setFileEntity] = useState(null);
    const [fileName, setFileName] = useState('');
    const [notification, setNotification] = useState({ open: false, message: '' });
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const formData = new FormData();
            formData.append("file", file);
            AuthApi.updatePdf(formData).then((e) => setFileEntity(e))
                .catch((e) => console.log(e));
        }
    };
    const handleCloseNotification = () => {
        setNotification({
            open: false,
            message: '',
        });
    };
    const handleSubmit = () => {
        let validationErrors = {};
        if (!fileEntity||fileEntity ===null) {
            validationErrors.file = "hãy chọn CV của bạn";
        }
        if (!fullName) {
            validationErrors.fullName = "Họ tên là bắt buộc.";
        }
        if (!email) {
            validationErrors.email = "Email là bắt buộc.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = "Email không hợp lệ.";
        }
        if (!phoneNumber) {
            validationErrors.phoneNumber = "Số điện thoại là bắt buộc.";
        } else if (!/^\d{10,11}$/.test(phoneNumber)) {
            validationErrors.phoneNumber = "Số điện thoại không hợp lệ.";
        }
        setErrors(validationErrors); // Update errors state

        if (Object.keys(validationErrors).length === 0) {
            if (token === null) {
                navigate('/login');
                return;
            }
            let data = {
                fileId: fileEntity.id,
                postId: postId,
                email: email,
                phoneNumber: phoneNumber,
                name: fullName
            }
            consumer.getListJob(data).then((e) => {
                setNotification({
                    open: true,
                    message: "nộp cv thành công",
                    type:"success"
                });
                onClose();
            });
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter
            handleSubmit(); // Gọi hàm gửi
        }
    };

    return (
        <div>
            <Notification
                open={notification.open}
                onClose={handleCloseNotification}
                message={notification.message}
                type={notification.type}
            />
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>

                    <Typography variant="h6" color="primary" gutterBottom>
                        Chọn CV để ứng tuyển
                    </Typography>

                    <Box mt={2}>
                        <TextField
                            label="Họ và tên *"
                            fullWidth
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onKeyPress={handleKeyPress} // Bắt sự kiện phím
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName}
                        />
                        <TextField
                            label="Email *"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress} // Bắt sự kiện phím
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                        <TextField
                            label="Số điện thoại *"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onKeyPress={handleKeyPress} // Bắt sự kiện phím
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            error={Boolean(errors.phoneNumber)}
                            helperText={errors.phoneNumber}
                        />
                    </Box>

                    <Box mt={2}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Thư giới thiệu:
                        </Typography>
                        <TextField
                            placeholder="Viết thư giới thiệu..."
                            fullWidth
                            multiline
                            rows={4}
                            value={introduction}
                            onChange={(e) => setIntroduction(e.target.value)}
                            variant="outlined"
                            color="primary"
                        />
                    </Box>

                    <Box mt={2}>
                        <input
                            type="file"
                            accept=".pdf"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleButtonClick}
                            startIcon={<UploadFileIcon />}
                            color="primary"
                        >
                            Tải lên CV từ máy tính, chọn hoặc kéo thả
                        </Button>
                        {fileName && (
                            <Typography variant="body1" mt={2}>
                                Tên file: {fileName}
                            </Typography>
                        )}
                        { errors.file  && (
                            <Typography variant="body2" color="error" mt={2}>
                                { errors.file }
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Nộp hồ sơ ứng tuyển
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default ApplyJobPopup;
