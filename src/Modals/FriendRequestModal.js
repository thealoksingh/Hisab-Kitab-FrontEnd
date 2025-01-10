import React, { useState, useEffect } from "react";

const FriendRequestModal = ({ isOpen, toggleModal }) => {


  if (!isOpen) return null; // Conditional return AFTER hooks

  return (
    <div
      id="Friend-Request-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`inset-0 z-50 fixed bg-gray-900 bg-opacity-70`}
    >
      <div className="z-50 main-form w-full relative p-2 h-full flex justify-end">
        <div
          className="form1 w-1/4 bg-white rounded-sm shadow dark:bg-gray-300 form-custom-shadow-inner"
          
        >
          <div className="flex items-center justify-between p-2 md:p-2  rounded-t bg-gray-600 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Friend Requests
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="main-content h-full p-2 ">
            <h4 className="font-semibold text-gray-900">
              Take Action on Request
            </h4>
            <div className="incoming-friend-request shadow-inner-custom h-72 w-full bg-gray-300 mt-2 p-2">
              <div className="scrollable  shadow-inner-custom h-full w-full bg-gray-50 p-1">
                {/* repeat requests  */}
                <div className="requests shadow-inner-custom h-10 w-full bg-gray-100 mb-1 p-1.5 justify-between flex">
                  <div className="h-7 w-7 text-xs rounded-full bg-cyan-600 flex justify-center items-center">
                    A
                  </div>
                  <div className=" w-36  flex justify-center items-center  gap-1 p-0.5">
                    <button className="w-16 text-xs h-full text-sm text-cyan-600 border border-cyan-600 hover:text-white   hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                      Accept
                    </button>

                    <button className="w-16 text-xs h-full text-sm text-rose-600 border border-rose-600 hover:text-white   hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                      Reject
                    </button>
                  </div>
                </div>
                {/* ....  */}

                {/* ....... */}
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mt-1">
              Pending Requests
            </h4>
            <div className="pending-friend-request shadow-inner-custom h-64 w-full bg-gray-300 mt-2 p-2">
              <div className="scrollable  shadow-inner-custom h-full w-full p-1 bg-gray-50">
                <div className="requests shadow-inner-custom h-10 w-full bg-gray-100 mb-1 p-1.5 justify-between flex">
                  <div className="h-7 w-7 text-xs rounded-full bg-teal-600 flex justify-center items-center">
                    A
                  </div>
                  <div className=" w-36  flex justify-center items-center p-0.5">
                    <button className="w-16 text-xs h-full text-sm text-yellow-600 border border-yellow-600 hover:text-white   hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                      Unsend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      //{" "}
    </div>
  );
};

export default FriendRequestModal;
