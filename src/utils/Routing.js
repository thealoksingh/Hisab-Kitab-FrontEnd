import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupForm from '../SignupForm';
import LogInForm from '../LogInForm';
import Authentication from '../Authentication';
import UserDashboard from '../UserDashboard'; 

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
