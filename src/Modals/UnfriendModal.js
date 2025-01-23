
import "../CssStyle/GroupDashboard.css";
import React, { useState } from "react";
import { unFriendApi } from "../Api/HisabKitabApi";



const UnfriendModal = ({ isOpen, toggleModal, userId, friendId }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleUnfriend = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!isChecked) {
      alert("Please confirm by checking the box.");
      return;
    }

    try {
      const response = await unFriendApi(userId, friendId);
      console.log("Unfriend successful ", response.data);
      toggleModal();
    } catch (error) {
      console.error("Error while unfriending", error);
    }
  };

  return (
    <div
      id="UpdateFriendTransaction-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70 ${isOpen ? "" : "hidden"}`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form1 relative w-1/3 rounded-sm shadow dark:bg-gray-300 shadow-inner-custom">
          <div className="flex items-center justify-between p-2 md:p-2 rounded-sm bg-rose-500 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">UnFriend Alert</h4>
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
            {/* the GIF */}
            <div className="flex justify-center mb-4">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG5qajA3aGpsYzBoZWFzN2U2eno5c2FpOXc2ZGY5bTUyNmV5Ymp6dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Je3fAJ02BkvLYEE/giphy.gif"
                alt="Unfriend Gif"
                className="w-full h-full rounded-sm object-contain"
              />
            </div>

            <div className="mb-4">
              <div className="flex gap-3 mt-1 p-2 rounded border border-gray-300">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Are you sure ?
                </label>
                <input
                  type="checkbox"
                  id="unfriend-confirmation"
                  name="unfriend-confirmation"
                  className="form-radio-button-shadow mb-1 text-gray-400 dark:text-white"
                  required
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange();
                  }} // Prevents the event from bubbling
                />
                <label
                  className="ml-1 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Yes
                </label>
              </div>
            </div>

            <div className="mb-2 flex gap-4">
              <button
                onClick={(e) => handleUnfriend(e)}
                type="button"
                className="w-1/3 text-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                UnFriend
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Ensure only the Cancel button triggers the modal
                  toggleModal();
                }}
                type="button"
                className="w-1/3 text-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
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

export default UnfriendModal;
