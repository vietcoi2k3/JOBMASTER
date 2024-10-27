import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, Chip, Dialog, DialogContent } from '@mui/material';
import EnterpriseApi from "../../api/EnterpriseApi";

const CertificateBusiness = () => {
    const [open, setOpen] = useState(false);
    const [fileEntity, setFileEntity] = useState({ url: null });
    const [status, setStatus] = useState("");
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        console.log(fileInputRef.current); // Kiểm tra ref
        if (fileInputRef.current) {
            console.log("Nhấn vào button để mở input");
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        EnterpriseApi.getStatus().then((e) => setStatus(e));
    }, []);

    useEffect(() => {
        EnterpriseApi.getEnterprise().then((e) => setFileEntity({ ...fileEntity, url: e.businessCertificate }));
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setStatus("INACTIVE");
        try {
            const uploadResponse = await EnterpriseApi.uploadFile(file);
            setFileEntity(uploadResponse);
            // Có thể thêm logic để hiển thị ảnh ở đây
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    return (
        <div className="p-6 bg-white w-full">
            <Typography variant="h6" className="mb-2">
                Thông tin giấy đăng ký doanh nghiệp
            </Typography>
            <Chip
                label={
                    status === "WAITING_ACTIVE" ? "Chờ phê duyệt" :
                        status === "ACTIVE" ? "Đã phê duyệt" :
                            status === "INACTIVE" ? "Chưa cập nhật" : "Chưa cập nhật"
                }
                color={
                    status === "WAITING_ACTIVE" ? "warning" :
                        status === "ACTIVE" ? "success" :
                            status === "INACTIVE" ? "default" : "default"
                }
                className="mb-4"
            />
            <div className="flex justify-between">
                <Typography variant="body1" className="mb-4">
                    Giấy đăng ký doanh nghiệp
                </Typography>
                <Button
                    disabled={status === 'WAITING_ACTIVE' || status === 'ACTIVE'}
                    onClick={handleButtonClick}>
                    Chỉnh sửa
                </Button>
            </div>
            <div>
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }} // Ẩn input
                    onChange={handleFileChange}
                />
                {fileEntity.url ? (
                    <div>
                        <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg py-8 text-center cursor-pointer mb-4 hover:border-blue-500">
                            <img
                                src={fileEntity.url}
                                alt="File"
                                style={{ maxWidth: '100%', height: '250px', cursor: 'pointer' }}
                                onClick={() => setOpen(true)} // Mở modal
                            />
                        </label>
                        {/* Modal phóng to ảnh */}
                        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                            <DialogContent>
                                <img
                                    src={fileEntity.url}
                                    alt="File"
                                    style={{ width: '100%', height: 'auto' }} // Phóng to ảnh
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                ) : (
                    <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg py-8 text-center cursor-pointer mb-4 hover:border-blue-500">
                        <Typography variant="body2">Chọn hoặc kéo file vào đây</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Dung lượng tối đa 5MB, định dạng: jpeg, jpg, png, pdf
                        </Typography>
                    </label>
                )}
            </div>
            {(status !== 'ACTIVE') && (
                <Button
                    variant="contained"
                    color="primary"
                    className="w-full"
                    disabled={status === 'WAITING_ACTIVE'|| fileEntity.url===null}
                    onClick={() => {
                        console.log(fileEntity);
                        EnterpriseApi.sendCertificate(fileEntity);
                        setStatus("WAITING_ACTIVE");
                        console.log(status);
                    }}
                >
                    {status === "INACTIVE" ? "Gửi yêu cầu phê duyệt" : "Chờ phê duyệt"}
                </Button>
            )

            }
        </div>
    );
}

export default CertificateBusiness;
