import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from '../Authentication/SignupForm';
import UserDashboard from '../UserDashBoard/UserDashboard';
import LoginForm from '../Authentication/LogInForm';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default Routing;
