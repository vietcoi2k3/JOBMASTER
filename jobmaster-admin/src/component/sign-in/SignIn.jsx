import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Container,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../assets/logo.png';
import AuthApi from '../../api/AuthApi';
import { useUser } from '../../context/UserProvider';

const LoginComponent = () => {
  const { setUser } = useUser();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('access_token');
    if (isLoggedIn) {
      navigate('/post');
    }
  }, [navigate]);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setErrorMessage('');

    AuthApi.login(data)
      .then((res) => {
        AuthApi.getRole(res.token)
          .then(response => {
            if (!(response.find(e => e.name === 'ADMIN'))) {
              setErrorMessage('Tài khoản hoặc mật khẩu không chính xác');
            } else {
              localStorage.setItem('access_token', res.token);
              navigate('/post');
              AuthApi.getUserByToken()
              .then((user)=>setUser(user));
            }
          })
          .catch((e) => { setErrorMessage('Tài khoản hoặc mật khẩu không chính xác') })

      })
      .catch((error) => {
        setErrorMessage('Tài khoản hoặc mật khẩu không chính xác');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#3758F9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <img src={logo} alt="Logo" width={200} />
        </Box>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="h1" textAlign="center" mb={3}>
          Đăng Nhập
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <TextField
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          name="password"
          value={data.password}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errorMessage && (
          <Typography color="error" variant="body2" textAlign="center" mt={2}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </Container>
    </Box>
  );
};

export default LoginComponent;
