import React, { useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SettingTable from "./Setting";
import SettingTable2 from "./Setting2";

const TabSetting = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Xác định tabIndex dựa trên đường dẫn hiện tại
    const tabIndex = location.pathname === '/setting/setting' ? 0 : location.pathname === '/setting/setting2' ? 1 : 0;

    // Xử lý sự kiện thay đổi tab
    const handleTabChange = (event, newValue) => {
        if (newValue === 0) {
            navigate('setting');
        } else {
            navigate('setting2');
        }
    };

    // Tự động điều hướng về "/setting" nếu không phải là "/setting" hoặc "/setting2"
    useEffect(() => {
        if (location.pathname !== '/setting/setting' && location.pathname !== '/setting/setting2') {
            navigate('setting');
        }
    }, [location, navigate]);

    return (
        <Box>
            {/* Tabs để chuyển đổi giữa các trang */}
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }} // Đặt màu nền trắng cho Tabs
            >
                <Tab
                    label="Lĩnh Vực"

                />
                <Tab
                    label="Vị trí"

                />
            </Tabs>

            {/* Routes để hiển thị component tương ứng */}
            <Box sx={{ marginTop: 2 }}>
                <Routes>
                    <Route path="/setting" element={<SettingTable />} />
                    <Route path="/setting2" element={<SettingTable2 />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default TabSetting;
