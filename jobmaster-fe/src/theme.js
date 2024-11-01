// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3758F9', // Màu chính, có thể thay đổi màu ở đây
            light: '#63a4ff',
            dark: '#004ba0',
        },
        secondary: {
            main: '#f50057',
            light: '#ff5983',
            dark: '#bb002f',
        },
        success: {
            main: '#4caf50',
        },
        error: {
            main: '#E10E0E',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        // Tuỳ chỉnh màu nền, văn bản
        background: {
            default: '#f4f6f8',
            paper: '#fff',
        },
        text: {
            primary: '#333',
            secondary: '#555',
        },
    },
    typography: {
        // Có thể tùy chỉnh font, cỡ chữ tại đây
        fontFamily: 'Roboto, Arial',
    },
});

export default theme;
