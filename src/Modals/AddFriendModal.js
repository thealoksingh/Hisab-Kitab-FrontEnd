import React, { useState, useEffect } from "react";
import { addFriend, sendInvitationEmail } from "../Api/HisabKitabApi";

const AddFriendModal = ({ isOpen, toggleModal, user }) => {
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true); // Tracks whether to show Add or Invite button
  const [contactNo, setContactNo] = useState(""); // State to store the contact number
  const [email, setEmail] = useState(""); // State to store the email
  const [error, setError] = useState(null);
  const [AddFriendErrorMessage, setAddFriendErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [timer, setTimer] = useState(30); // State for timer
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for disabling button

// const [loading, setLoading] = useState(false);

useEffect(() => {
  let interval;

  if (isButtonDisabled && timer > 0) {
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1); // Decrease timer by 1 every second
    }, 1000);
  } else if (timer === 0) {
    setIsButtonDisabled(false); // Enable the button when the timer reaches 0
    setTimer(30); // Reset the timer
    setError(null); // Clear the error message after 60 seconds
  }

  return () => clearInterval(interval); // Cleanup the interval
}, [isButtonDisabled, timer]); // Dependencies to watch

  const handleInviteRequest = (e) => {
    e.preventDefault();
    if (email !== "") {
      handleInvite(e); // Send OTP request
      setIsButtonDisabled(true); // Disable button after OTP is sent
    } else {
      alert("Please enter a valid email.");
    }
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    if (contactNo !== "") {
      await addFriend(user.userId, contactNo)
        .then((data) => {
          console.log("Friend request sent successfully:", data);
          setAddFriendErrorMessage("Friend request sent successfully");
          setContactNo(""); // Reset the contact number
          
        })
        .catch((error) => {
          console.error("Error adding friend:", error);
  
          // Handle specific error messages from the backend
          if (error.response && error.response.data) {
            const errorMessage = error.response.data;
             console.log("🥹"+errorMessage);
            if (errorMessage === "You cannot send a friend request to yourself.") {
              setAddFriendErrorMessage("You cannot send a friend request to yourself.");
            } else if (errorMessage === "You are already friends.") {
              setAddFriendErrorMessage("You are already friends.");
            } else if (errorMessage === "Friend request already sent.") {
              setAddFriendErrorMessage("Friend request already sent.");
            } else if (errorMessage === "User not exist") {
              setIsAddButtonVisible(false); // Switch to invite mode
              setAddFriendErrorMessage("The user does not exist.");
            } else {
              setAddFriendErrorMessage("An unexpected error occurred. Please try again.");
            }
          } else {
            // Handle other generic errors
            setAddFriendErrorMessage("Failed to send friend request. Please check your network or try again later.");
          }
  
         
          setContactNo(""); // Reset the contact number
        });
    } else {
      setAddFriendErrorMessage("Please enter a valid mobile number.");
    }
  };
  

  const handleInvite = async (e) => {
    e.preventDefault();
    console.log("Invite button clicked");
    
    if (email !== "") {
      await sendInvitationEmail(email, user.fullName)
        .then((data) => {
          console.log("Invite email sent:", email);
          setAddFriendErrorMessage("Invitation sent successfully");
          alert("Invitation sent successfully");
          setEmail(""); // Reset the email
          toggleModal(); // Close the modal
        })
        .catch((error) => {
          console.error("Error sending invitation email:", error);
          setError(error.message || "An unexpected error occurred");
          setEmail(""); // Reset the email
        });
    } else {
      alert("Please enter a valid email");
    }
  };
  return (
    <div
      id="add-friend-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 ${isOpen ? "" : "hidden"}`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form-add-frnd border border-gray-400 shadow-inner-custom relative bg-white w-1/3 h-1/3 rounded-sm shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-2 md:p-2 rounded-sm bg-cyan-600">
            <h4 className="text-lg font-semibold text-gray-200">Add Friend</h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-cyan-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-cyan-600 dark:hover:text-white"
              onClick={() => {
                toggleModal(); // Close modal
                setIsAddButtonVisible(true); // Reset to Add mode
                setAddFriendErrorMessage(null);
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
          <form className="p-4 md:p-5">
            <div className={`${isAddButtonVisible ? "block" : "hidden"} mb-4`}>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Mobile number
              </label>
              <input
                name="mobile"
                type="text"
                id="mobile"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="w-full input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2"
                placeholder="Enter Mobile number"
                required={isAddButtonVisible}
                disabled={!isAddButtonVisible}
              />
            </div>
            <div className={`${!isAddButtonVisible ? "block" : "hidden"} mb-4`}>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email Id
              </label>
              <input
                name="email"
                type="email"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2"
                placeholder="Enter Email Id here"
                required={!isAddButtonVisible}
                disabled={isAddButtonVisible}
              />
            </div>
              {/* Display error or success message */}
      {AddFriendErrorMessage && (
    <p className={`mb-3 text-sm ${AddFriendErrorMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
      {AddFriendErrorMessage}
    </p>
   )}

            {error && <p className="text-red-500">{error}</p>}

            <h4 className={`${!isAddButtonVisible ? "block" : "hidden"} mb-2 text-rose-500 text-sm`}>
              !!User Doesn't Exist.<span className="text-cyan-700"> Enter Email and Click below to Invite </span>
            </h4>

            {isButtonDisabled && <h5 className="text-orange-500 font-sm">
              {`Trying to send , Wait few Seconds`}<span className="text-rose-600 font-sm"> {isButtonDisabled && ` Resend in ${timer} sec`}</span>
            </h5>}

          
            <div className="mb-2 flex gap-4">
              <button
                type="submit"
                className={`${isAddButtonVisible ? "block" : "hidden"} w-1/3 bg-cyan-600 text-white px-4 py-1 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 `}
                onClick={handleAddFriend}
              >
                Add
              </button>
              <button
                type="submit"
                className={`${!isAddButtonVisible ? "block" : "hidden"} w-1/3 bg-teal-600 text-white px-4 py-1 focus:outline-none focus:ring-4 focus:ring-teal-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 `}
                onClick={handleInviteRequest}
                disabled={isButtonDisabled} // Disable button when timer is active
                style={{
                  backgroundColor: isButtonDisabled ? "transparent" : "rgb(0, 150, 135)", // Change color when disabled
                }}
              >
                Invite
              </button>
              <button
                 onClick={() => {
                  toggleModal(); // Close modal
                  setIsAddButtonVisible(true); // Reset to Add mode
                  setAddFriendErrorMessage(null);
                }}
                className="w-1/3 bg-rose-600 text-white px-4 py-1 focus:outline-none focus:ring-4 focus:ring-rose-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 "
              
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

export default AddFriendModal;
