import React, { useEffect, useState } from "react";
import "../CssStyle/GroupDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
const GroupDashboardMiddleSection = () => {
  return (
    <>
     <div className="w-[60%] h-full border border-gray-300 bg-gray-100 flex flex-col relative items-center rounded overflow-hidden">
          <div className="text-white text-lg h-16 p-2 bg-gray-600 w-full items-center  flex">
            <div className="flex items-center ">
              <div className=" h-10 w-10 rounded-full bg-orange-500 items-center justify-center flex text-white ">
                G
              </div>
              <h4 className="px-4 text-lg text-white">Group Name 3</h4>
            </div>
            <div className="flex items-center gap-2 right-4 absolute">
              <button className="text-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 font-medium rounded-sm px-10 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                Add Expences
              </button>
              <button className="text-sm text-white bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm px-10 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                Settle
              </button>
            </div>
          </div>
          {/* transaction */}
          <div className="w-full h-[83%] flex flex-col  items-center relative rounded scrollable">

            {/* ......................  */}
          <div className="transaction w-full  border ">
          <div className="transaction-date-row p-1  w-full h-6 bg-gray-200 border border-gray-400 flex items-center shadow-inner-custom">
              <p className="text-xs">JANUARY 2025</p>
              <p className="text-xs absolute right-4 text-sky-600 hover:scale-105">
                Download Detail
              </p>
            </div>
            {/* first row */}
            <div className="transaction-detail-row border border-gray-400 hover:bg-gray-200 h-14 bg-gray-300 flex items-center shadow-inner-custom">
              <div className="flex">
                <div className="Date-of-trans px-4 py-2">
                  <div className="text-sm">Jan</div>
                  <div className="font-bold text-lg">25</div>
                </div>
                <div className="Reciept-icon text-2xl transform transition-transform p-4 duration-200 hover:scale-110">
                  <FontAwesomeIcon icon={faDownload} />
                </div>

                <div className="trans-description p-5">
                  Aaalo ,Bhindi ,Baigan
                </div>
              </div>
              <div className="flex gap-4 items-center absolute right-4">
                <div className="">
                  <div className="text-sm">You Paid</div>
                  <div className="font-semibold">$100</div>
                </div>

                <div className="">
                  <div className="text-sm">You Lent</div>
                  <div className="text-green-600 font-semibold">$100</div>
                </div>
                <div className="text-2xl text-rose-500 hover:scale-110 transition-transform duration-200">
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            </div>
            {/* 2nd row  */}
            <div className="transaction-detail-row border border-gray-400 hover:bg-gray-200 h-14 bg-gray-300 flex items-center shadow-inner-custom">
              <div className="flex">
                <div className="Date-of-trans px-4 py-2">
                  <div className="text-sm">Jan</div>
                  <div className="font-bold text-lg">25</div>
                </div>
                <div className="Reciept-icon text-2xl transform transition-transform p-4 duration-200 hover:scale-110">
                  <FontAwesomeIcon icon={faDownload} />
                </div>

                <div className="trans-description p-5">
                  Aaalo ,Bhindi ,Baigan
                </div>
              </div>
              <div className="flex gap-4 items-center absolute right-4">
                <div className="">
                  <div className="text-sm">You Paid</div>
                  <div className="font-semibold">$100</div>
                </div>

                <div className="">
                  <div className="text-sm">You Lent</div>
                  <div className="text-green-600 font-semibold">$100</div>
                </div>
                <div className="text-2xl text-rose-500 hover:scale-110 transition-transform duration-200">
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            </div>
            
          </div>

          {/* ................ */}

          <div className="transaction w-full h-20  border ">
          <div className="transaction-date-row p-1  w-full h-6 bg-gray-200 border border-gray-400 flex items-center shadow-inner-custom">
              <p className="text-xs">JANUARY 2025</p>
              <p className="text-xs absolute right-4 text-sky-600 hover:scale-105">
                Download Detail
              </p>
            </div>
            <div className="transaction-detail-row hover:bg-gray-200 h-14 bg-gray-300 flex items-center shadow-inner-custom">
              <div className="flex">
                <div className="Date-of-trans px-4 py-2">
                  <div className="text-sm">Jan</div>
                  <div className="font-bold text-lg">25</div>
                </div>
                <div className="Reciept-icon text-2xl transform transition-transform p-4 duration-200 hover:scale-110">
                  <FontAwesomeIcon icon={faDownload} />
                </div>

                <div className="trans-description p-5">
                  Aaalo ,Bhindi ,Baigan
                </div>
              </div>
              <div className="flex gap-4 items-center absolute right-4">
                <div className="">
                  <div className="text-sm">You Paid</div>
                  <div className="font-semibold">$100</div>
                </div>

                <div className="">
                  <div className="text-sm">You Lent</div>
                  <div className="text-green-600 font-semibold">$100</div>
                </div>
                <div className="text-2xl text-rose-500 hover:scale-110 transition-transform duration-200">
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
 {/* ................ */}

          </div>
    {/* Middle footer  */}
          <div className="absolute bottom-0 w-full h-[10%] p-2 bg-gray-600 flex items-center justify-center"></div>
        </div>
    </>
  );
};

export default GroupDashboardMiddleSection;
