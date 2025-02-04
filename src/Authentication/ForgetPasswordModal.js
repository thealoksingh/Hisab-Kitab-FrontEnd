import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpEmail, forgetPassword } from "../Api/HisabKitabApi";
import forget from "../assets/forget1.jpg";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpEntered, setOtpEntered] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState(null); // For success or incorrect OTP message
  const [newPassword, setNewPassword] = useState(""); // For new password
  const [confirmPassword, setConfirmPassword] = useState(""); // For confirm password
  const [showPasswordFields, setShowPasswordFields] = useState(false); // Hide/Show password fields
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60); // State for timer
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for disabling button
  const [isClicked, setClicked] = useState(false); // State to handle error prompt
  
  useEffect(() => {
    let interval;

    if (isButtonDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); // Correctly update timer using the previous value
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false); // Enable the button when timer reaches 0
      setTimer(60); // Reset the timer
    }
    return () => clearInterval(interval); // Clean up interval when the component unmounts or timer reaches 0
  }, [isButtonDisabled, timer]); // Dependencies to trigger the timer logic


  
  const handleTimeAndOtp = (e) => {
    
    if(email!==""){
    handleOtpRequest(e); // Send OTP request
    setIsButtonDisabled(true); // Disable button after OTP is sent
  }else{
    setMessage("Please enter a valid email.");
  }

};

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const response = await sendOtpEmail(email, "forget-password");
      setOtp(response.data);
      setOtpSent(true);
      setMessage("OTP sent successfully.");
      setIsButtonDisabled(true); // Disable button after OTP is sent
    } catch (error) {
      setOtpSent(false);
      setMessage("Error sending OTP. Please try again.");
    }
  };

  const handleOtpVerify = (e) => {
    setClicked(true);
    e.preventDefault();

    if (otpEntered.trim() !== otp.toString().trim()) {
      setOtpVerified(false);
      setMessage("Incorrect OTP");
      return;
    }

    setOtpVerified(true);
    setMessage("OTP Verified Successfully");
    setShowPasswordFields(true); // Show password fields after OTP is verified
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await forgetPassword(email, newPassword);
      setMessage("Password updated successfully.");
      navigate("/"); // Redirect to login after password reset
    } catch (error) {
      setMessage("Error updating password. Please try again.");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div
      id="SignIn-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-cover bg-center   bg-black bg-opacity-0 "
      style={{ backgroundImage: `url(${forget})` }}
    >
      <div className="main-form w-full relative max-w-5xl flex  justify-center">
        <div className="form-forget shadow-inner-custom border border-gray-400 relative bg-white w-[90%] sm:w-1/2 md:w-1/2 rounded-sm shadow dark:bg-gray-300">
          <div className="flex items-center justify-between  md:p-2 rounded-sm bg-gray-600">
            <h4 className="text-lg p-2  sm:p-0 md:p-2 font-semibold text-gray-200">
              Forgot Password
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
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
              <span className="sr-only ">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="mb-1 mt-1">
              <label className="block mt-5  font-Poppins sm:mt-2 text-md font-medium  text-gray-900">
                Email address
              </label>
              <div className="flex mt-5   justify-between">
                <input
                  type="email"
                  id="email"
                  className="w-[65%] py-2 input-field-shadow text-xs px-1  sm:text-sm border border-gray-400 text-gray-600 rounded-sm "
                  placeholder="Enter email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                 <button
                  type="submit"
                  className="w-[30%] py-2 text-xs sm:text-sm text-white px-3 border border-gray-300 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleTimeAndOtp}
                  disabled={isButtonDisabled} // Disable button when timer is active
                  style={{
                    backgroundColor: isButtonDisabled ? "transparent" : "rgb(0, 150, 135)", // Change color when disabled
                  }}
                >
                  Send OTP
                </button>
              </div>
            </div>
            {isButtonDisabled && <h5 className="text-green-500 font-sm">
              {`OTP sent successfully. `}<span className="text-rose-600 font-sm"> {isButtonDisabled && ` Resend in ${timer} sec`}</span>
            </h5>}
           

            {!otpVerified && otpSent &&(<div className="mb-2 mt-5">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="otp"
                  className="w-1/4 input-field-shadow text-sm border border-gray-400 text-gray-600  rounded-sm p-1"
                  placeholder="Enter OTP"
                  value={otpEntered}
                  onChange={(e) => setOtpEntered(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-1/3 bg-cyan-700 text-sm text-white px-4 py-1   hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300   shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleOtpVerify}
                >
                  Verify OTP
                </button>
              </div>
            </div>)}
            <h5 className="text-green-500 font-sm">
              {otpVerified && `OTP verified successfully. `}
            </h5>
            <h5 className="text-rose-500 font-sm">
              {!otpVerified &&  isClicked && (` !!! incorrect OTP  `)}
            </h5>
           
            {otpVerified && (
              <div className="set-new-pass-div  mb-5 mt-1">
                <label className="block mt-2 text-md font-Poppins  text-gray-900">
                  Set  New Password
                </label>
                <div className="flex mt-5 gap-2">
                  <input
                    type="password"
                    id="new-password"
                    className="w-[60%] input-field-shadow text-[12px] sm:text-md  border border-gray-400 text-gray-600  rounded-sm p-2"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-[70%] input-field-shadow text-[12px] sm:text-md   border border-gray-400 text-gray-600  rounded-sm   p-2"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="mt-5  flex gap-4">
              {otpVerified && (
                <button
                  type="submit"
                  className="w-1/2 bg-teal-600 text-sm text-white px-5 py-2 rounded-sm   hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-emerald-300   shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;