import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function BannedNotification() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#FFE6E6',
                color: '#FF3B3B',
                padding: 3,
                textAlign: 'center'
            }}
        >
            <WarningIcon sx={{ fontSize: 80, marginBottom: 2 }} />
            <Typography variant="h4" gutterBottom>
                Tài khoản của bạn đã bị cấm hoạt động
            </Typography>
            <Typography variant="body1" gutterBottom>
                Xin vui lòng liên hệ với quản trị viên để biết thêm thông tin.
            </Typography>
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    color="error"*/}
            {/*    onClick={() => window.location.href = '/contact'}*/}
            {/*    sx={{ marginTop: 3 }}*/}
            {/*>*/}
            {/*    Liên hệ hỗ trợ*/}
            {/*</Button>*/}
        </Box>
    );
}

export default BannedNotification;
