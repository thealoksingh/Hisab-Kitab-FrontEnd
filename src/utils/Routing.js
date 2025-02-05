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
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/forget-password" element={<ForgetPasswordModal />} />
          <Route path="/user-dashboard" element={<AuthenticatedRoute><UserDashboard /></AuthenticatedRoute>} />
          <Route path="/admin-dashboard" element={<AuthenticatedRoute><AdminDashboard /></AuthenticatedRoute>} />
          <Route path="/under-dev" element={<AuthenticatedRoute><UnderDevPage /></AuthenticatedRoute>} />
          <Route path="/leftsection" element={<AuthenticatedRoute><LeftSideDashboard /></AuthenticatedRoute>} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
