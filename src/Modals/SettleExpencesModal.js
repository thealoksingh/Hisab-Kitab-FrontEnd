import React, { useEffect, useState } from "react";
import "../CssStyle/GroupDashboard.css";

const SettleExpencesModal = ({ isOpen, toggleModal }) => {
   
  if (!isOpen) return null;

  return (
    <div
      id="settle-Expences-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form-settle relative w-1/2  bg-white rounded-sm shadow dark:bg-gray-300 form-custom-shadow-inner ">
          <div className="flex items-center justify-between p-2 md:p-4  rounded-t bg-gray-600 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Settle an Expence
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
                Paid By
              </label>
              {/* Group Members Section */}
              <div className="flex  overflow-x-auto space-x-4 mt-4 bg-gray-100 p-2 rounded border border-gray-300">
                {[1, 2, 3, 4, 5, 6].map((member) => (
                  <label
                    key={member}
                    className="flex  items-center input-field-shadow space-x-2 bg-gray-200 px-4 py-1 rounded cursor-pointer hover:bg-gray-300"
                    style={{
                      whiteSpace: "nowrap",
                    }} /* Ensures text stays on one line */
                  >
                    <input
                      type="radio"
                      name="groupMember"
                      value={member}
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 text-sm">
                      Member {member}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Paid to
              </label>

              {/* Given By selcetion */}
              <div className="flex  overflow-x-auto  space-x-4 mt-4 bg-gray-100 p-2 rounded border border-gray-300">
                {[1, 2, 3, 4, 5, 6].map((member) => (
                  <label
                    key={member}
                    className="flex rounded-full items-center input-field-shadow space-x-2 bg-gray-200 px-4 py-1 rounded cursor-pointer hover:bg-gray-300"
                    style={{
                      whiteSpace: "nowrap",
                    }} /* Ensures text stays on one line */
                  >
                    <input
                      type="radio"
                      name="groupMember"
                      value={member}
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 text-sm">
                      Member {member}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="Amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Enter Amount here
              </label>
              <input
                type="text"
                id="Amount"
               
                className=" border input-field-shadow border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Amount "
                required
              />
            </div>

            <div className="mb-4  relative">
              
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Transaction Date
                </label>

                <input
                  type="date"
                  id="transaction-date"
                  className="w-full  input-field-shadow border border-gray-300 text-gray-400 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2 bg-white placeholder-gray-400"
                  placeholder="Enter Transaction Date"
                  required
                />
             
            </div>
            <div className="mb-2 flex gap-4 ">
            <button 
            type="submit"
            className="w-1/3 text-sm text-white bg-emerald-500  hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              Settle
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

export default SettleExpencesModal;
