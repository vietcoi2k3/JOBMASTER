import './App.css';
import { Routes, Route } from 'react-router-dom';
import MiniDrawer from './component/dashboard/Dashboard';
import UserProfile from './component/user-profile/UserProfile'
import SignUp from './component/sign-up/SignUp'
import Callback from './component/sign-up/CallBack'
import VerifyEmail from './component/sign-up/VerifyEmail';
import EmailVerification from './component/sign-up/EmailVerification';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<MiniDrawer />}>
        {/* Trang mặc định khi truy cập /dashboard sẽ là UserProfile */}
        <Route index element={<UserProfile />} />
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/verify" element={<VerifyEmail/>}/>
      <Route path="/verify-email" element={<EmailVerification/>}/>
    </Routes>
  );
}

export default App;
