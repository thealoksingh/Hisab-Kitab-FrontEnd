import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from '../Authentication/SignupForm';
import UserDashboard from '../UserDashBoard/UserDashboard';
import LoginForm from '../Authentication/LogInForm';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import ForgetPasswordModal from '../Authentication/ForgetPasswordModal';
import UnderDevPage from '../UserDashBoard/UnderDevPage';
import LeftSideDashboard from '../UserDashBoard/LeftSideDashboard';




const Routing = () => {
  return (
    <Routes >
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/forget-password" element={<ForgetPasswordModal />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/under-dev" element={<UnderDevPage />} />
      <Route path="/leftsection" element={<LeftSideDashboard/>} />
      
    
    </Routes>
  );
};

export default Routing;
