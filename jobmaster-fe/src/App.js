import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import MiniDrawer from './component/dashboard/Dashboard';
import UserProfile from './component/user-profile/UserProfile'
import ChangePassword from './component/user-profile/ChangePassword'
import SignUp from './component/sign-up/SignUp'
import Callback from './component/sign-up/CallBack'
import VerifyEmail from './component/sign-up/VerifyEmail';
import EmailVerification from './component/sign-up/EmailVerification';
import LoginComponent from './component/sign-in/SignIn';
import SideBarProfile from "./component/user-profile/SideBarUserProfile";
import CertificateBusiness from "./component/user-profile/CertificateBusiness";
import Job from "./component/dashboard/Job";
import RecruitmentPopup from "./component/share/RecruitmentPopup ";
import JobForm from "./component/dashboard/JobForm";
import ServiceList from "./component/dashboard/ServiceList";
import InfoCompany from "./component/user-profile/InfoCompany";
import ManagePost from "./component/dashboard/ManagePost";
import ViewCV from "./component/dashboard/ViewCV";
import CVLayout from "./component/CVLayout/CVLayout";
import History from "./component/user-profile/History";
import PaymentSuccess from "./component/user-profile/PaymentSuccess";
import News from './component/dashboard/News';
import ForgotPassword from "./component/forgot-password/ForgotPassword";
import theme from './theme';
import {ThemeProvider} from "@mui/material";
import BannedNotification from "./component/BannedNotification/BannedNotification"; // import theme

function App() {

  return (
      <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/dashboard" element={<MiniDrawer />}>
        <Route index element={<SideBarProfile />} />
        <Route path="news" element={<News />} />
        <Route path="profile" element={<SideBarProfile />}>
          <Route path='change-password' element={<ChangePassword />} />
          <Route path="certificate" element={<CertificateBusiness />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="info-company" element={<InfoCompany />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="job" element={<Job />} />
        <Route path="job-form/detail/:id" element={<JobForm operator={'detail'} />} />
        <Route path="job-form/update/:id" element={<JobForm operator={'update'} />} />
        <Route path="job-form/create" element={<JobForm operator={'create'} />} />
        <Route path="service" element={<ServiceList />} />
        <Route path="manage-post" element={<ManagePost />} />
        <Route path="view-cv/:id" element={<ViewCV />} />
        <Route path="detail-cv/:id" element={<CVLayout />} />
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/popup" element={<RecruitmentPopup />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/user-is-ban" element={<BannedNotification/>}/>
      <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/forgot-pass" element={<ForgotPassword />} />
      <Route path="/" element={<LoginComponent />} />
    </Routes>
      </ThemeProvider>
  );
}

export default App;
