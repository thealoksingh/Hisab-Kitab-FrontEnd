import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from '../Authentication/SignupForm';
import UserDashboard from '../UserDashBoard/UserDashboard';
import LoginForm from '../Authentication/LogInForm';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import ForgetPasswordModal from '../Authentication/ForgetPasswordModal';
import UnderDevPage from '../UserDashBoard/UnderDevPage';
import LeftSideDashboard from '../UserDashBoard/LeftSideDashboard';
import ErrorComponent from './ErrorComponent';
import AuthProvider, { useAuth } from '../security/AuthContext';
import Home from "../LandingPage/Home";
import About from '../Modals/About';
import Document from '../Tour/Document';
import Layout from '../Tour/Layout';
import Invite from '../Tour/Invite';
import Addfriend from '../Tour/Addfriend';
import Transaction  from '../Tour/Transaction';
import Help  from '../Tour/Help';
import Forget from '../Tour/Forget';


// ✅ Corrected AuthenticatedRoute
function AuthenticatedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

const Routing = () => {
  return (
    <AuthProvider> {/* ✅ Move AuthProvider OUTSIDE BrowserRouter */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/forget-password" element={<ForgetPasswordModal />} />
          <Route path="/user-dashboard" element={<AuthenticatedRoute><UserDashboard /></AuthenticatedRoute>} />
          <Route path="/admin-dashboard" element={<AuthenticatedRoute><AdminDashboard /></AuthenticatedRoute>} />
          <Route path="/under-dev" element={<AuthenticatedRoute><UnderDevPage /></AuthenticatedRoute>} />
          <Route path="/leftsection" element={<AuthenticatedRoute><LeftSideDashboard /></AuthenticatedRoute>} />
          <Route path="/about" element={<About />} />
           <Route path="/document" element={<Document />}>
                <Route path="invite" element={<Invite />} />
                <Route path="addfriend" element={<Addfriend />} />
                <Route path="transaction" element={<Transaction />} />
                 <Route path="help" element={<Help />} />
                  <Route path="forget" element={<Forget />} />

          </Route>
           <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
