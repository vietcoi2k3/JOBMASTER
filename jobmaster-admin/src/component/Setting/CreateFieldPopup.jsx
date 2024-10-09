import React, { useState } from 'react';
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
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdminApi from "../../api/AdminApi";
import Notification from "../../notification/Notification";

function CreateFieldPopup({ open, onClose }) {
    const [status, setStatus] = useState('Hiệu lực'); // Trạng thái ban đầu
    const [code,setCode] = useState(null)
    const [name,setName] = useState(null)
    const [notification, setNotification] = useState({ open: false, message: '',type:'' });
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit=()=>{
         const data = {
            code : code,
             name :name,
             status:status
        }
        AdminApi.addField(data).then((e)=>{
            onClose()
        }).catch(()=>{
            setNotification({
                open: true,
                message: "code đã tồn",
                type: "error"
            })
        })
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {/* Header Popup */}
            <Notification
                open={notification.open}
                onClose={()=>setNotification({open: false})}
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
                    onChange={(event)=>{setCode(event.target.value);}}
                />
                {/* Trường Tên lĩnh vực */}
                <TextField
                    margin="dense"
                    label="Tên lĩnh vực"
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={(event)=>{setName(event.target.value);}}
                />
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
                <Button onClick={() => {handleSubmit()}} variant="contained" color="primary">
                    Tạo mới
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateFieldPopup