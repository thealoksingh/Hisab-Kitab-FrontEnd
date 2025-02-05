import errorImage from "../assets/errorPage.png";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function ErrorComponent() {

    const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);  // Goes back to the previous page in history
  };
  return (
    <div className="flex flex-col items-center p-4 justify-center min-h-screen bg-white text-center">
      <img
        src={errorImage}
        alt="404 Error"
        className="w-[60%] max-w-md sm:max-w-lg mb-4 md:max-w-xl"
      />

      
      <button
      onClick={handleGoBack}
        className="w-1/3 mt-4 text-white font-semibold text-sm px-4 py-2 rounded-sm shadow-md transition-all duration-300 ease-in-out transform hover:scale-105
             bg-gradient-to-r from-[#fa3c7b] via-[#181a39] to-[#00e6fa] 
             hover:from-[#00e6fa] hover:via-[#fa3c7b] hover:to-[#181a39] 
             focus:outline-none focus:ring-4 focus:ring-[#fa3c7b]"
      >
        Go Back
      </button>
    </div>
  );
}
