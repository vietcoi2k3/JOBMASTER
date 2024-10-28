import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./component/header/header";

import { Box } from "@mui/material";
import AccountTable from "./component/Account/AccountTable";

import TabSetting from "./component/Setting/Tab";
import ManageCertificate from "./component/MangeCertificate/ManageCertificate";

import Campaign from "./component/post/Post";
import Post from "./component/post/Post";
import ServiceList from "./component/Service/ServiceList";
import JobInfoView from "./component/post/DetailPost";
import LoginComponent from './component/sign-in/SignIn';
import { UserProvider } from './context/UserProvider';
function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginComponent />} />
                    <Route
                        path="*"
                        element={
                            <>
                                <Header />
                                <Box
                                    sx={{
                                        bgcolor: '#E5E5E5',
                                        minHeight: '100vh',
                                        padding: 2,
                                    }}
                                >
                                    <Routes>
                                        <Route path="account/*" element={<AccountTable />} />
                                        <Route path="setting/*" element={<TabSetting />} />
                                        <Route path="manage-certificate" element={<ManageCertificate />} />
                                        <Route path="manage-campaign" element={<Campaign />} />
                                        <Route path="post" element={<Post />} />
                                        <Route path="detail-post/:id" element={<JobInfoView />} />
                                        <Route path="service" element={<ServiceList />} />
                                    </Routes>
                                </Box>
                            </>
                        }
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
}


export default App;
