import React, {useRef, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    Box,
    Avatar,
    IconButton,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloseIcon from '@mui/icons-material/Close';
import AuthApi from "../../api/AuthApi";
import authApi from "../../api/AuthApi";
import consumer from "../../api/Consumer";

const ApplyJobPopup = ({ open, onClose,postId }) => {
    const [selectedCV, setSelectedCV] = useState('cv1');
    const [email, setEmail] = useState('vn.phuong.22@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState('0333482009');
    const [introduction, setIntroduction] = useState('');

        const fileInputRef = useRef(null); // Tạo một ref để tham chiếu đến input file
        const [fileEntity,setFileEntity] = useState({})
        const [fileName, setFileName] = useState(''); // State để lưu tên file
        const handleFileChange = async (event) => {
            const file = event.target.files[0]; // Lấy tệp đã chọn
            if (file) {
                setFileName(file.name);
                const formData = new FormData();
                formData.append("file", file);
               AuthApi.updatePdf(formData).then((e)=>setFileEntity(e))
                   .catch((e)=>console.log(e))

            }
        };

    const handleSubmit =()=>{
        let data = {
            fileId:fileEntity.id,
          postId:postId,
          email:email,
          phoneNumber:phoneNumber
        }
        consumer.getListJob(data).then((e)=>{
            onClose()
        })
    }
    const handleButtonClick = () => {
        fileInputRef.current.click(); // Mở hộp thoại chọn tệp
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Ứng tuyển <strong>Nhân Viên Livestream Cho Joona Baby</strong>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {/* CV Selection */}
                <Typography variant="h6" color="primary" gutterBottom>
                    Chọn CV để ứng tuyển
                </Typography>
                <RadioGroup
                    value={selectedCV}
                    onChange={(e) => setSelectedCV(e.target.value)}
                >
                    <FormControlLabel
                        value="cv1"
                        control={<Radio color="primary" />}
                        label={
                            <Box display="flex" alignItems="center">
                                <Avatar
                                    src="/path-to-cv-icon.png"
                                    sx={{ width: 24, height: 24, mr: 1 }}
                                />
                                <Box>
                                    <Typography>CV ứng tuyển gần nhất: Tester-Intern-PhamThiPhuong.pdf</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Xem
                                    </Typography>
                                </Box>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value="cv2"
                        control={<Radio color="primary" />}
                        label="Chọn CV khác trong thư viện CV của tôi"
                    />
                </RadioGroup>

                {/* Upload CV */}
                <Box mt={2}>
                    <input
                        type="file"
                        accept=".pdf" // Chỉ định loại tệp được phép
                        style={{ display: 'none' }} // Ẩn input file
                        ref={fileInputRef} // Gán ref cho input
                        onChange={handleFileChange} // Xử lý sự kiện khi tệp được chọn
                    />
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={()=>handleButtonClick()}
                        startIcon={<UploadFileIcon />}
                        color="primary"
                    >
                        Tải lên CV từ máy tính, chọn hoặc kéo thả
                    </Button>
                    {fileName && ( // Hiển thị tên file nếu có
                        <Typography variant="body1" mt={2}>
                            Tên file: {fileName}
                        </Typography>
                    )}
                </Box>

                {/* Email và số điện thoại */}
                <Box mt={2}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Họ và tên: Phạm Thị Phượng
                    </Typography>
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        color="primary"
                    />
                    <TextField
                        label="Số điện thoại"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        color="primary"
                    />
                </Box>

                {/* Thư giới thiệu */}
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
    );
};

export default ApplyJobPopup;
