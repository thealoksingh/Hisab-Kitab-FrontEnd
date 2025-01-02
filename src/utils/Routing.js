import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupForm from '../Authentication/SignupForm';
import LogInForm from '../Authentication/LogInForm';
import Authentication from '../Authentication/Authentication';
import UserDashboard from '../UserDashBoard/UserDashboard'; 

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Authentication />}>
        <Route path="signup/:role" element={<SignupForm />} />
        <Route path="login/:role" element={<LogInForm />} />
      </Route>
  
      <Route path="dashboard/:role" element={<UserDashboard />} /> 
    </Routes>
  );
};

export default Routing;
