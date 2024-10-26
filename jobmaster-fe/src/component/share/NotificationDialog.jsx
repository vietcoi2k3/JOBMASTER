import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function NotificationDialog({ open, onClose, message }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    minWidth: '300px',
                    maxWidth: '400px',
                    padding: '10px',
                },
            }}
        >
            <DialogTitle>
                <Typography variant="h6">Thông báo</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'gray',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography>{message}</Typography>
            </DialogContent>
        </Dialog>
    );
}

export default NotificationDialog;
