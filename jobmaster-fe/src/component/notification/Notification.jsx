import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Notification = ({ open, onClose, message,type,key  }) => {
  return (
    <Snackbar
        key={key} // Thêm key tại đây
        open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Đặt thông báo ở góc dưới bên phải
      action={
        <button onClick={onClose} style={{ color: 'white' }}>
          Close
        </button>
      }
    >
      <Alert onClose={onClose} severity={type?type:"error"}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
