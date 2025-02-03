import React, { useState } from "react";
import "../CssStyle/GroupDashboard.css";
import { deleteTransactionById } from "../Api/HisabKitabApi";

const DeleteAlertModal = ({
  isOpen,
  toggleCommentSection,
  setIsCommentOpen,
  toggleModal,
  transId,
  refreshFriendTransaction,
  setRefreshFriendTransaction,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDeleteTransaction = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);

    if (!isChecked) {
      alert("Please confirm deletion by checking the checkbox.");
      setIsLoading(false)
      return;
    }
    console.log("transId = " + transId);
    try {
      const response = await deleteTransactionById(transId);
      console.log("Transaction deleted successfully: ", response.data);
      // Update state to refresh the transactions list
      setRefreshFriendTransaction(!refreshFriendTransaction);
      toggleModal();
      toggleCommentSection();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }finally{setIsLoading(false)}
  };

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
      <div className="main-form relative p-10 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form1 relative w-[90%] sm:w-[70%]  md:w-[70%]   bg-white rounded-sm shadow dark:bg-gray-300 shadow-inner-custom">
          <div className="flex items-center justify-between p-4 md:p-4  rounded-sm bg-rose-500 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Alert
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-rose-700 hover:text-rose-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-rose-600 dark:hover:text-white"
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
              {/* Checkbox */}
              <div className="flex items-center gap-3 mt-1 p-2 ">
                <label
                  htmlFor="description"
                  className="block mb-2 text-nowrap text-md font-medium text-gray-900 dark:text-black"
                >
                  Are You Sure:
                </label>
                <input
                  type="checkbox"
                  id="delete-confirmation"
                  name="delete-confirmation"
                  value="e"
                  className="form-radio-button-shadow mb-1 text-gray-400 dark:text-white"
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="delete-confirmation"
                  className=" align-middle text-center pb-1  text-md font-medium text-gray-900 dark:text-black"
                >
                  Yes
                </label>
              </div>
            </div>

            <div className="mb-2 flex  gap-4">
              <button
                onClick={(e) => handleDeleteTransaction(e)}
                type="button"
                className="w-1/2 text-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                 {isLoading ? (<div className="flex gap-2 items-center">
                    <div className="w-5 h-5 border-3 border-t-4 border-white rounded-full animate-spin"></div>
                    <div className="font-semibold ml-1">Deleting..</div>
                    </div>
                  ) : (
                    "Delete"
                  )} 
              </button>
              <button
                onClick={toggleModal}
                type="button"
                className="w-1/2 text-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlertModal;
