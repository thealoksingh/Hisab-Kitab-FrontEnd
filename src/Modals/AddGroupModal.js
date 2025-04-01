import React, { useEffect, useState } from "react";
import "../CssStyle/GroupDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash } from "@fortawesome/free-solid-svg-icons";
const AddGroupModal = ({ isOpen, toggleModal }) => {

  if (!isOpen) return null;

  return (
    <div
      id="add-Group-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70 ${
      isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
      <div
          className="add-group-form relative bg-white w-1/2 h-1/3 rounded-sm shadow dark:bg-gray-300 form-custom-shadow-inner"
         
        >
          <div className="flex items-center justify-between p-2 md:p-4  rounded-t bg-gray-600 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Choose split options
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
          <div className="mb-4 flex relative gap-2">
              <div className="w-[60%]  ">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Enter Email Id
                </label>

                <input
                type="text"
                id="description"
               
                  className="w-full h-1/2 input-field-shadow border border-gray-300 text-gray-400 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2 bg-white placeholder-gray-400"
                  placeholder="Enter Group Member Email Id"
                  required
                />
              </div>

              <button    
                className="bottom-1 flex item-center right-1 input-field-shadow absolute w-1/3 h-1/2 text-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm px-8 py-1 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
               <p>Add Member</p> 
              </button>
            </div>


            <div className="mb-4">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
              Added Members
              </label>

              {/* Email input */}
              <div className=" overflow-y-auto h-44 input-field-shadow  mt-4 bg-gray-100 p-2 rounded border border-gray-300">
               {/* repeat  */}
                  <div className="input-field-shadow w-full mt-1 rounded-sm py-1 px-2 text-gray-900 text-sm flex  items-center justify-between">
                    <h4>alok@gmail.com</h4>
                    <div className=" text-rose-500 hover:scale-110 transition-transform duration-200">
                                     <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  {/* ....  */}

                  <div className="input-field-shadow w-full mt-1 rounded-sm py-1 px-2 text-gray-900 text-sm flex  items-center justify-between">
                    <h4>ravi@gmail.com</h4>
                    <div className=" text-rose-500 hover:scale-110 transition-transform duration-200">
                                     <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
            
              </div>

              <button
              type="submit"
              className=" mt-4 w-full text-sm input-field-shadow text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-10 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Add a New Group
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
