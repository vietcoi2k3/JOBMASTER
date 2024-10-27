import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Alert,
    IconButton,
    Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import authApi from "../../api/AuthApi";

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }

        try {
            if (!email || !email.trim()) {
                setError('Vui lòng nhập email.');
                return;
            }
            if (!validateEmail(email)) {
                setError('Email không hợp lệ.');
                return;
            }

            authApi.forgotPassword(email).then((e)=>{
                console.log("hihi")
            })
            setIsSubmitted(true);
            setError('');
        } catch (err) {
            console.error('Error:', err);
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    useEffect(() => {
        let timer;
        if (isSubmitted && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsSubmitted(false);
            setCountdown(60);
            setEmail('');
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isSubmitted, countdown]);

    return (
        <Dialog
            open={true}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }
            }}
        >
            <Paper elevation={0} sx={{ position: 'relative', p: 3 }}>
                {onClose && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'grey.500'
                        }}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                )}

                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <EmailIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom

                    >
                        Quên mật khẩu?
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Đừng lo lắng! Chỉ cần nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
                    </Typography>
                </Box>

                {!isSubmitted ? (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            mt: 2
                        }}
                    >
                        <TextField
                            type="email"
                            label="Địa chỉ email"
                            variant="outlined"
                            fullWidth
                            value={email || ''}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                            helperText={error}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                }
                            }}
                            InputProps={{
                                startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
                            }}
                        />
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                borderRadius: '12px',
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                '&:hover': {
                                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                }
                            }}
                        >
                            Gửi yêu cầu
                        </Button>

                        {onClose && (
                            <Button
                                variant="text"
                                onClick={onClose}
                                sx={{
                                    textTransform: 'none',
                                    color: 'text.secondary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                Quay lại đăng nhập
                            </Button>
                        )}
                    </Box>
                ) : (
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{
                            mt: 2,
                            borderRadius: '12px',
                            alignItems: 'center',
                            '& .MuiAlert-message': {
                                width: '100%',
                                textAlign: 'center'
                            }
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                            Email đã được gửi!
                        </Typography>
                        <Typography variant="body2">
                            Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn.<br />
                            Bạn có thể gửi lại sau <strong>{countdown}</strong> giây.
                        </Typography>
                    </Alert>
                )}
            </Paper>
        </Dialog>
    );
};

export default ForgotPassword;