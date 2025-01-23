import React from "react";
import underDev from "../assets/underDev.png";
import { useNavigate } from "react-router-dom";

function UnderDevPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);  // Goes back to the previous page in history
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
      <img src={underDev} alt="Under Development Icon" className="w-52 h-52 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        This page is under development.
      </h2>
      <p className="text-lg text-gray-600 text-center mb-4">
        We are working hard to bring this feature to life!
      </p>
      <button
        onClick={handleGoBack}
        className="w-1/3 bg-teal-600 rounded-sm font-semibold text-sm text-white px-4 py-2 hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Go Back
      </button>
    </div>
  );
}

export default UnderDevPage;
