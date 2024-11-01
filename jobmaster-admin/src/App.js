import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import theme from './theme'; // Đường dẫn đến file theme.js đã tạo

import Header from "./component/header/header";
import AccountTable from "./component/Account/AccountTable";
import TabSetting from "./component/Setting/Tab";
import ManageCertificate from "./component/MangeCertificate/ManageCertificate";
import Campaign from "./component/campaign/Campaign";
import Post from "./component/post/Post";
import ServiceList from "./component/Service/ServiceList";
import JobInfoView from "./component/post/DetailPost";
import LoginComponent from './component/sign-in/SignIn';
import { UserProvider } from './context/UserProvider';

// Layout component chính
const MainLayout = ({ children }) => (
    <>
        <Header />
        <Box
            sx={{
                bgcolor: '#E8EDF2',
                minHeight: '100vh',
                padding: 2,
            }}
        >
            {children}
        </Box>
    </>
);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route
                            path="*"
                            element={
                                <MainLayout>
                                    <Routes>
                                        <Route path="account/*" element={<AccountTable />} />
                                        <Route path="setting/*" element={<TabSetting />} />
                                        <Route path="manage-certificate" element={<ManageCertificate />} />
                                        <Route path="manage-campaign" element={<Campaign />} />
                                        <Route path="post" element={<Post />} />
                                        <Route path="detail-post/:id" element={<JobInfoView />} />
                                        <Route path="service" element={<ServiceList />} />
                                    </Routes>
                                </MainLayout>
                            }
                        />
                    </Routes>
                </Router>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
