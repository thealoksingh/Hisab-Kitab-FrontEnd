// Authentication.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SignUpForm2 from './SignUpForm2';
import LogInForm2 from './LogInForm2';
import ForgetPasswordModal from './ForgetPasswordModal';
function Authentication() {
  return (
    <>
      <div className="flex justify-around py-10 px-10">
        <Link
            className="w-1/4 h-1/4 bg-teal-600 text-sm text-white px-4 py-1   hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-emerald-300   shadow-md transition-all duration-300 ease-in-out transform hover:scale-105" 
             
          to="/signup/user"
        >
          User
        </Link>
       
        <Link
           className="w-1/4 h-1/4 bg-teal-600 text-sm text-white px-4 py-1   hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-emerald-300   shadow-md transition-all duration-300 ease-in-out transform hover:scale-105" 
               to="/login/admin" 
        >
          Admin
        </Link>
      </div>

      <hr />
      {/* <Outlet />  */}
     {/* <LogInForm2/> */}
     {/* <ForgetPasswordModal/> */}
     {/* <SignUpForm2/> */}
    </>
  );
}

export default Authentication;
