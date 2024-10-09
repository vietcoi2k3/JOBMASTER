import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    MenuItem,
    Select,
    Typography,
    Checkbox,
    ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdminApi from "../../api/AdminApi";
import Notification from "../../notification/Notification";

function CreatePositionPopup({ open, onClose }) {
    const [status, setStatus] = useState('ACTIVE'); // Trạng thái ban đầu
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [selectedFields, setSelectedFields] = useState([]); // State cho danh sách lĩnh vực đã chọn
    const [fields, setFields] = useState([]); // State để lưu danh sách lĩnh vực từ API
    const [notification, setNotification] = useState({ open: false, message: '', type: '' });
    const [idField,setIdField] = useState(null)

    // Gọi API để lấy danh sách lĩnh vực khi component được render
    useEffect(() => {
        if (open) {
            AdminApi.getListField(null,null) // Giả sử API là `getFields`
                .then((response) => {
                    setFields(response);
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy danh sách lĩnh vực:", error);
                });
        }
    }, [open]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleFieldChange = (event) => {
        setIdField(event.target.value); // Cập nhật danh sách các lĩnh vực đã chọn
    };

    const handleSubmit = () => {
        const data = {
            code: code,
            name: name,
            status: status,
            fieldId: idField, // Thêm danh sách lĩnh vực đã chọn vào dữ liệu submit
        };
        AdminApi.addPosition(data)
            .then((e) => {
                onClose();
            })
            .catch(() => {
                setNotification({
                    open: true,
                    message: "Code đã tồn tại",
                    type: "error"
                });
            });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {/* Header Popup */}
            <Notification
                open={notification.open}
                onClose={() => setNotification({ open: false })}
                message={notification.message}
                type={notification.type}
            />
            <DialogTitle>
                <Typography variant="h6">Tạo mới lĩnh vực</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Nội dung Popup */}
            <DialogContent dividers>
                {/* Trường Code */}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Code"
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={(event) => { setCode(event.target.value); }}
                />
                {/* Trường Tên lĩnh vực */}
                <TextField
                    margin="dense"
                    label="Tên lĩnh vực"
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={(event) => { setName(event.target.value); }}
                />
                {/* Trường Lĩnh vực */}
                <Select
                    value={idField}
                    onChange={handleFieldChange}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                    sx={{ marginTop: 2 }}
                >
                    <MenuItem value="" disabled>Chọn lĩnh vực</MenuItem>
                    {fields.map((field) => (
                        <MenuItem key={field.id} value={field.id}>
                            {field.name} {/* Hiển thị tên lĩnh vực trực tiếp */}
                        </MenuItem>
                    ))}
                </Select>

                {/* Trường Trạng thái */}
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                    sx={{ marginTop: 2 }}
                >
                    <MenuItem value="ACTIVE">Hiệu lực</MenuItem>
                    <MenuItem value="INACTIVE">Không hiệu lực</MenuItem>
                </Select>

            </DialogContent>

            {/* Footer Popup */}
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="primary">
                    Hủy bỏ
                </Button>
                <Button onClick={() => { handleSubmit(); }} variant="contained" color="primary">
                    Tạo mới
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreatePositionPopup;
