import React, { useState, useEffect } from "react";
import { sendInvitationEmail } from "../Api/HisabKitabApi";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Selector";
import { useNavigate, useSearchParams } from "react-router-dom";

const InviteModal = () => {
   const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State to store the email
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [timer, setTimer] = useState(30); // State for timer
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for disabling button
  const [inviteLoading, setInviteLoading] = useState(false);
  const user =useSelector(selectUser);
   const [searchParams] = useSearchParams(); // query params
   
    const action = searchParams.get("action"); 
  // Only show modal if action is 'invite'
  const isOpen = action === "invite";
  useEffect(() => {
    let interval;

    if (isButtonDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); // Decrease timer by 1 every second
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false); // Enable the button when the timer reaches 0
      setTimer(30); // Reset the timer
      setErrorMessage(null); // Clear the error message after 60 seconds
    }

    return () => clearInterval(interval); // Cleanup the interval
  }, [isButtonDisabled, timer]); // Dependencies to watch

  const handleInviteRequest = (e) => {
   
    e.preventDefault();
    if (email !== "") {
      handleInvite(e); // Send OTP request
      setIsButtonDisabled(true); // Disable button after OTP is sent
    } else {
        setErrorMessage("Please enter a valid email.");
    }
  };

 

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (email !== "") {
      try {
        await sendInvitationEmail(email, user.fullName);
        // Success: Invite sent
        setSuccessMessage("Invitation sent successfully");
        setEmail(""); // Reset the email
       
      } catch (error) {
        // Error: Failed to send invite
        setErrorMessage(error.message || "An unexpected error occurred");
        setEmail(""); // Reset the email
      } finally {
        // Reset loading state
        setInviteLoading(false);
      }
    } else {
      alert("Please enter a valid email");
    }
  };
  return (
    <div
      id="Invite-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full max-w-3xl flex gap-4 justify-center">
        <div className="form-add-frnd border border-gray-400 shadow-inner-custom relative bg-white w-[80%] h-full md:w-1/2 md:-1/2  lg:w-[60%] sm:-1/2 rounded-sm shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-2 md:p-2 rounded-sm bg-cyan-600">
            <h4 className="text-lg font-semibold text-gray-200">Invite Your Friend</h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-cyan-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-cyan-600 dark:hover:text-white"
              onClick={() => {
               navigate(-1); 
                setSuccessMessage(null);
                setErrorMessage(null);
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
          <form className="p-4 md:p-5 overflow-visible">
            
            <div className=" mb-4">
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
                required={true}
               
              />
            </div>
            {/* Display error or success message */}
            <div className="w-full text-wrap mb-2">
              {successMessage && (
                <p className="text-green-500 text-xs">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-rose-500 text-xs">{errorMessage}</p>
              )}

              <span
                className="
                mb-2 text-cyan-600 text-xs"
              >
                Enter Email , Click below to Invite
              </span>
              {isButtonDisabled && (
                <h5 className="text-teal-600 font-sm">
                  {" "}
                  {isButtonDisabled && ` Resend in ${timer} sec`}
                </h5>
              )}
            </div>

            <div className="mb-2 flex justyify-between gap-2 sm:gap-3">
             
              <button
                type="submit"
                className={`${
                  isButtonDisabled
                    ? "bg-gray-100 border border-gray-300 text-gray-400   cursor-not-allowed" // Disabled state
                    : "bg-teal-600 text-white hover:scale-105 focus:ring-4 focus:ring-teal-300" // Enabled state
                }  px-4 py-1 focus:outline-none rounded-sm shadow-md transition-all duration-300 ease-in-out`}
                onClick={handleInviteRequest}
                disabled={isButtonDisabled} // Disable button when timer is active
              >
                {inviteLoading ? (
                  <div className="flex ">
                    <div className="w-5 h-5 border-3 border-t-4 border-gray-400 rounded-full animate-spin"></div>
                    <div className="font-semibold ml-2">Sending..</div>
                  </div>
                ) : (
                  "Invite"
                )}
              </button>
              <button
                onClick={() => {
                navigate(-1); 
                 setSuccessMessage(null);
                 setErrorMessage(null);
                }}
                className=" bg-rose-600  rounded-sm text-white text-xs sm:text-sm px-3 py-1 sm:px-7 sm:py-2 focus:outline-none focus:ring-4 focus:ring-rose-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 "
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

export default InviteModal;
