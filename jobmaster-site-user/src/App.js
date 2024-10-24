import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Footer from "./component/Footer/footer";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import JobBoard from "./component/ListJob/ListJob";
import CompanyProfile from "./component/companydetail/CompanyDetail";
import Login from "./component/LoginComponent/Login";
import SignUp from "./component/sign-up/SignUp";
import Criteria from "./component/criteria/criteria";
import CallBack from "./component/sign-up/CallBack";
import VerifyEmail from "./component/sign-up/VerifyEmail";
import EmailVerification from "./component/sign-up/EmailVerification";

function AppContent() {
    // Lấy đường dẫn hiện tại
    const location = useLocation();

    // Kiểm tra xem có phải trang /login hay không
    const isLoginPage = location.pathname === '/login' || location.pathname==='/sign-up' || location.pathname ==='/verify-email';

    return (
        <>
            {/* Chỉ hiển thị Header nếu không phải là trang /login */}
            {!isLoginPage && <Header />}
            <div style={{ minHeight: '80vh', backgroundColor: '#e8edf2' }}> {/* Đặt màu nền */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list-job" element={<JobBoard />} />
                    <Route path="/detail-company/:id" element={<CompanyProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/criteria" element={<Criteria />} />
                    <Route path="/callback" element={<CallBack />} />
                    <Route path="/verify-email" element={<EmailVerification />} />
                </Routes>
            </div>
            {/* Chỉ hiển thị Footer nếu không phải là trang /login */}
            {!isLoginPage && <Footer />}
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
