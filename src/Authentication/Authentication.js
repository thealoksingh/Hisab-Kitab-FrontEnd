// Authentication.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Authentication() {
  return (
    <>
      <div className="flex justify-around py-10 px-10">
        <Link
          className="bg-sky-500 text-white font-bold py-2 px-4 rounded hover:bg-sky-700"
          to="/signup/user"
        >
          User
        </Link>
       
        <Link
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
          to="/login/admin" 
        >
          Admin
        </Link>
      </div>

      <hr />
      <Outlet /> 
    </>
  );
}

export default Authentication;
