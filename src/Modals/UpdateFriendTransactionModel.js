import React, { useEffect, useState } from "react";
import "../CssStyle/GroupDashboard.css";

const UpdateFriendTransaction = ({ isOpen, toggleModal }) => {


  if (!isOpen) return null;

  return (
    <div
      id="UpdateFriendTransaction-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form1 relative w-1/3 bg-white rounded-sm shadow dark:bg-gray-300 form-custom-shadow-inner ">
          {" "}
          <div className="flex items-center justify-between p-2 md:p-4  rounded-sm bg-gray-600 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Transaction
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
          <form className="p-4 md:p-5">
            <div className="mb-4">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select type
              </label>

              {/* select type*/}
              <div className="flex gap-4 space-x-4 mt-4  p-2 rounded border border-gray-300">
              
               <div className="w-1/3">
                <input
                  type="radio"
                  id="transType"
                  name="transaction-type"
                  value="e"
                  className="form-radio-button-shadow text-gray-400 dark:text-white"
                  required
                />
                <label
                  htmlFor="expense"
                  className="ml-3 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Give
                </label>
               </div>
               <div className="w1/3">
               <input
                  type="radio"
                  id="transType"
                  name="transaction-type"
                  value="e"
                  className="form-radio-button-shadow text-gray-400 dark:text-white"
                  required
                />
                <label
                  htmlFor="got"
                  className="ml-3 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Got
                </label>
                </div>
              </div>
            </div>
           
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Description
              </label>
              <input
                  type="text"
                  id="transaction-decription"
                  className="w-full h-1/2 input-field-shadow border border-gray-300 text-gray-400 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2 bg-white placeholder-gray-400"
                  placeholder="Enter Description "
                  required
                />
            </div>

            <div className="mb-4 flex relative gap-2">
              <div className="w-1/2  ">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Transaction Date
                </label>

                <input
                  type="date"
                  id="transaction-date"
                  className="w-full h-1/2 input-field-shadow border border-gray-300 text-gray-400 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2 bg-white placeholder-gray-400"
                  placeholder="Enter Transaction Date"
                  required
                />
              </div>
              <div className="w-1/2  ">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Transaction Amount
                </label>

                <input
                  type="text"
                  id="transaction-amont"
                  className="w-full h-1/2 input-field-shadow border border-gray-300 text-gray-400 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2 bg-white placeholder-gray-400"
                  placeholder="Enter Amount"
                  required
                />
              </div>

              
            </div>

            <div className="mb-2 flex gap-4 ">
            <button 
            type="submit"
            className="w-1/3 text-sm text-white bg-sky-500  hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 font-medium rounded-sm px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              Save
            </button>
            <button 
             onClick={toggleModal}
            type="submit"
            className="w-1/3 text-sm text-white bg-rose-500  hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              Cancel
            </button>
            </div>
          </form>
        </div>
       
      </div>
    </div>
  );
};

export default UpdateFriendTransaction;
