import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmDialog = ({ open, onClose, title, message, onConfirm }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          Hủy
        </Button>
        <Button onClick={() => { onConfirm(); onClose(false); }} color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;