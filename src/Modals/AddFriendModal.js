import React, { useState } from "react";
import { addFriend } from "../Api/HisabKitabApi";

const AddFriendModal = ({ isOpen, toggleModal, userId, refreshFriendTransaction, setRefreshFriendTransaction }) => {
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true); // Tracks whether to show Add or Invite button
  const [contactNo, setContactNo] = useState(""); // State to store the contact number
  const [email, setEmail] = useState(""); // State to store the email

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactNo !== "") {
      addFriend(userId, contactNo)
        .then((data) => {
          console.log("Friend added successfully:", data);
          toggleModal(); // Close the modal
        })
        .catch((error) => {
          console.error("Error adding friend:", error);
          setIsAddButtonVisible(false); // Toggle the button visibility
          setContactNo(""); // Reset the contact number
        });
    } else {
      console.log("Invite email clicked", email);
    }
  };

  return (
    <div
      id="add-friend-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form2 relative bg-white w-1/3 h-1/3 rounded-sm shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-2 md:p-4 rounded-sm bg-gray-600">
            <h4 className="text-lg font-semibold text-gray-200">Add Friend</h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                toggleModal(); // Call the toggleModal function
                setIsAddButtonVisible(true); // Reset the visibility state
              }}
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
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`${isAddButtonVisible ? "block" : "hidden"} block mb-2 text-sm font-medium text-gray-900`}>
                Mobile number
              </label>
              <input
                name="mobile"
                type="text"
                id="mobile"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className={`${isAddButtonVisible ? "block" : "hidden"} w-full input-field-shadow border border-gray-300 text-gray-600 rounded-sm p-2`}
                placeholder="Enter Mobile number"
                // required={isAddButtonVisible}
                // disabled={!isAddButtonVisible}
              />
              <label className={`${!isAddButtonVisible ? "block" : "hidden"} block mb-2 text-sm font-medium text-gray-900`}>
                Email Id
              </label>
              <input
                name="email"
                type="email"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${!isAddButtonVisible ? "block" : "hidden"} w-full input-field-shadow border border-gray-300 text-gray-600 rounded-sm p-2`}
                placeholder="Enter Email Id here"
                // required={!isAddButtonVisible}
                // disabled={isAddButtonVisible}
              />
              <h4 className={`${!isAddButtonVisible ? "block" : "hidden"} text-rose-500 text-xs`}>
                !!User Doesn't Exist<span className="text-cyan-700"> Click below to Invite </span>
              </h4>
            </div>
            <div className="mb-2 flex gap-4">
              <button
                type="submit"
                className={`${isAddButtonVisible ? "block" : "hidden"} w-1/3 bg-sky-600 text-white px-4 py-2`}
              >
                Add
              </button>
              <button
                type="button"
                className={`${!isAddButtonVisible ? "block" : "hidden"} w-1/3 bg-cyan-600 text-white px-4 py-2`}
              >
                Invite
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
