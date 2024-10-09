import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Header from "./component/header/header";
import {Home} from "@mui/icons-material";
import {Box} from "@mui/material";
import AccountTable from "./component/Account/AccountTable";
import SettingTable from "./component/Setting/Setting";
import SettingTable2 from "./component/Setting/Setting2";
import TabSetting from "./component/Setting/Tab";

function App() {
  return (
      // <Router>

      <Router>
           <Header/>
            <Box
                sx={{
                bgcolor: '#E5E5E5',
                minHeight: '100vh',
                padding: 2,
            }}>
                    <Routes>
                        <Route path="/account" element={<AccountTable />} />
                        <Route path="/setting/*" element={<TabSetting />} />
                        <Route path="/setting2/*" element={<TabSetting />} />
                    </Routes>
            </Box>

      </Router>

  );
}

export default App;
