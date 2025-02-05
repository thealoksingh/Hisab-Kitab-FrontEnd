import hisabKitabBlack from "../assets/images/hisabkitab-black.png";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-4 min-h-screen w-full bg-black">
      <div className="navigation-bar flex justify-around items-center ">
        <div className="logo-div">
          {" "}
          <img
            src={hisabKitabBlack}
            alt="logo"
            className="h-12 max-w-md sm:max-w-lg md:max-w-xl filter invert brightness-200"
          />
        </div>
        <div className="nav-items hidden lg:flex text-white gap-20">
          <span  onClick={() => navigate("/")} className="">Home</span>
          <span className="">About</span>
          <span  onClick={() => navigate("/user-dashboard")} className="">Friend</span>
        </div>
        <div className="button-signup">
          <button
            onClick={() => navigate("/signup")}
            className=" text-white font-semibold text-sm px-4 py-2 rounded-sm shadow-md transition-all duration-300 ease-in-out transform hover:scale-105
                bg-[#9b1f53] "
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="its-line h-1 bg-white mt-4 mb-2"></div>
      <div className="main-content lg:flex">
        <div className="left lg:w-1/2 w-full">
          <div className="title mt-2 font-poppins lg:text-7xl text-5xl text-white font-bold">
            Manage Your <span className="block">Finances</span> Here !
          </div>

          <div className="Description mt-4 w-full">
            <p className="text-justify text-white">
              Hisab Kitab is a user-friendly financial management platform
              designed to help individuals and businesses track and manage their
              finances. The app allows users to record and categorize income,
              expenses, and transactions with ease. Features include budget
              tracking, expense analysis, and reporting, enabling users to make
              informed financial decisions.
            </p>
          </div>
          <button
            onClick={() => navigate("/user-dashboard")}
            className="px-10 py-2 mt-8 text-white bg-[#9b1f53] font-semibold flex gap-4 items-center  rounded-full 
             hover:bg-[#b02561] hover:scale-105 transition-all duration-300 ease-in-out shadow-lg active:scale-95"
          >
            <div className="circle rounded-full w-2 h-2 bg-white"></div>
            Get Started
          </button>
        </div>

        <div className="right ">{/* right side content goes here  */}</div>
        {/* Bubbles */}
        <div className="circles flex justify-center gap-4 mt-20 z-10 ">
          <div
            className="lg:w-[250px] lg:h-[250px] w-[90px] h-[90px] rounded-full  animate-pulse"
            style={{
              background: "linear-gradient(to right, #9b1f53, black)",
            }}
          ></div>
          <div
            className="w-[20px] h-[20px]  rounded-full animate-pulse"
            style={{
              background: "linear-gradient(45deg, #9b1f53, black)",
            }}
          ></div>
          <div
            className="w-[10px] h-[10px]  rounded-full animate-pulse"
            style={{
              background: "linear-gradient(45deg, #9b1f53, black)",
            }}
          ></div>
          <div
            className="lg:w-[170px] lg:h-[170px] w-[50px] h-[50px] rounded-full animate-bounce"
            style={{
              background: "linear-gradient(45deg, #9b1f53, black)",
            }}
          ></div>
          <div
            className="w-[150px] h-[150px] rounded-full animate-spin  animate-bounce"
            style={{
              background: "linear-gradient(to bottom, #9b1f53, black)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
