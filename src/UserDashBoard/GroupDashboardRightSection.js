import React, { useEffect, useState } from "react";
import "../CssStyle/GroupDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
const GroupDashboardRightSection = () => {
  return (
    <>
     <div className="w-[20%] h-full bg-gray-200 flex flex-col  items-center rounded overflow-hidden">
          <div className="text-white text-lg h-10 p-2 bg-gray-400 w-full items-center justify-center flex">
            Group Members
          </div>
          {/* Group Members */}
          <div className="w-full h-[83%] flex flex-col  items-center relative rounded scrollable">
            {/* member */}
            <div className=" h-14 p-2 border border-gray-300 bg-gray-500 w-full items-center  flex  flex hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium  shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className=" h-7 w-7 rounded-full bg-sky-900 items-center justify-center flex text-white ">
                A
              </div>
              <div className="px-4">
                <h4 className=" text-sm text-white">Group Member 1</h4>
                <p className="text-sm text-green-500 ">
                  Gets back :<span> $ 2000</span>
                </p>
              </div>
            </div>
             {/* member */}
             <div className=" h-14 p-2 border border-gray-300 bg-gray-500 w-full items-center  flex  flex hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium  shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className=" h-7 w-7 rounded-full bg-purple-700 items-center justify-center flex text-white ">
                A
              </div>
              <div className="px-4">
                <h4 className=" text-sm text-white">Group Member 2</h4>
                <p className="text-sm text-green-500 ">
                  Gets back :<span> $ 2000</span>
                </p>
              </div>
            </div>
             {/* member */}
             <div className=" h-14 p-2 border border-gray-300 bg-gray-500 w-full items-center  flex  flex hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium  shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className=" h-7 w-7 rounded-full bg-pink-900 items-center justify-center flex text-white ">
                A
              </div>
              <div className="px-4">
                <h4 className=" text-sm text-white">Group Member 3</h4>
                <p className="text-sm text-rose-500 ">
                  Owes :<span> $ 2000</span>
                </p>
              </div>
            </div>
          </div>

        </div>
    </>
  );
};

export default GroupDashboardRightSection;
