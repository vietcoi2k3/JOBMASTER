import React from 'react';
import { Box, CircularProgress, Dialog, DialogContent, Typography, Fade } from '@mui/material';

const LoadingPopup = ({ open }) => {
    return (
        <Dialog open={open} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 2 } }}>
            <DialogContent>
                <Fade in={open} timeout={500}>
                    <Box display="flex" flexDirection="column" alignItems="center" py={3}>
                        <CircularProgress color="primary" size={50} thickness={4.5} />
                        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                            Đang tải, vui lòng chờ một chút...
                        </Typography>
                    </Box>
                </Fade>
            </DialogContent>
        </Dialog>
    );
};

export default LoadingPopup;
