import React, { useState, useEffect } from "react";
import axios from 'axios';

import { sendOtpEmail, signUpUser } from '../Api/HisabKitabApi'
import { apiClient } from "../Api/ApiClient";
const FriendTransactionReport= ({isOpen, toggleModal,selectedFriend, user}) => {
  const [friendId, setFriendId] = useState("");
  const [userId, setUserId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    setFriendId(selectedFriend.userId);
    setUserId(user.userId); 
  }, [selectedFriend, user]);
 
  
  if (!isOpen) return null;  // If the modal is closed, return nothing

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.get("/api/reports/friend-transaction", {
        params: {
          friendId,
          userId,
          fromDate,
          toDate,
        },
        responseType: "blob", // Ensures the response is handled as a binary file
      });

      // Create a Blob from the response
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Generate a URL for the Blob
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      // Extract filename from Content-Disposition header (if available)
      const contentDisposition = response.headers["content-disposition"];
      let filename = user.fullName+"-"+selectedFriend.fullName+" ("+fromDate+" to "+toDate+") report.pdf";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+?)"/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      // Set the filename and trigger download
      link.download = filename;
      link.click();

      setLoading(false);
    } catch (err) {
      setError("Failed to download the report. Please try again.");
      setLoading(false);
    }
  };

  
  return (
    <div
      id="signUp-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 ${isOpen ? "" : "hidden"}`}
    >
      <div className="main-form relative p-4 w-1/2 max-w-5xl flex gap-4 justify-center">
        <div className="form-signup shadow-inner-custom relative bg-white w-1/2 rounded-sm border border-gray-400 shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-2 md:p-2 rounded-sm bg-cyan-600">
            <h4 className="text-lg font-semibold text-gray-200">Transaction Report</h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-cyan-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-cyan-600 dark:hover:text-white"
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
          <div className="profile h-12 w-full border border-gray-400 shadow-inner-custom bg-gray-200 p-5 flex items-center gap-1">
            <h1 className="text-white h-4 w-4 p-4 flex justify-center items-center rounded-full bg-indigo-600">{selectedFriend.fullName[0].toUpperCase()}</h1>
            <h1 className="text-gray-800 h-4  p-5 flex justify-center items-center">{selectedFriend.fullName}</h1>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleDownload}>
            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Enter Start Date</label>
              <input
                id="start_date"
                name="startDate"
                type="date"
                required
                value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
                className="w-full  input-field-shadow  border text-sm border-gray-400 text-gray-600 rounded-sm p-1"
                placeholder="Enter Start Date"

              />
            </div>  
            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Enter End Date</label>
              <input
                id="end_date"
                name="endDate"
                type="date"
                value={toDate}
            onChange={(e) => setToDate(e.target.value)}
                required
                
                className="w-full  input-field-shadow  border text-sm border-gray-400 text-gray-600 rounded-sm p-1"
                placeholder="Enter End date"

              />
            </div>      
     
            <div className="mb-2 mt-2">
              <button
                type="submit"
                className=" bg-cyan-600 font-semibold text-white px-4 py-1 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}>
                  {loading ? "Downloading..." : "Download Report"}
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FriendTransactionReport;
