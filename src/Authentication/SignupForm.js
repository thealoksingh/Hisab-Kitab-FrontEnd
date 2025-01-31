import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpEmail, signUpUser } from "../Api/HisabKitabApi";
import "../CssStyle/GroupDashboard.css";

const SignUpForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpEntered, setOtpEntered] = useState("");
  const [timer, setTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState(null);
  const [isClicked, setClicked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isButtonDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false);
      setTimer(60);
    }
    return () => clearInterval(interval);
  }, [isButtonDisabled, timer]);

  const handleTimeAndOtp = (e) => {
    e.preventDefault();
    if (email) {
      handleOtpRequest(e);
      setIsButtonDisabled(true);
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  const role = "user";

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (!otpVerified) {
      setError("Please verify OTP first");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      fullName,
      email,
      contactNo: phoneNumber,
      password,
      role,
    };

    try {
      await signUpUser(userData);
      setSuccessMessage("Signup successful! You can now log in.");
      setTimeout(() => navigate(`/`), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "User already exists or invalid input");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await sendOtpEmail(email);
      setOtp(response.data);
      setOtpSent(true);
    } catch (error) {
      setOtpSent(false);
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    setClicked(true);

    if (otpEntered.trim() !== otp.toString().trim()) {
      setOtpVerified(false);
      setMessage("Incorrect OTP");
      return;
    }

    setOtpVerified(true);
    setMessage("OTP Verified Successfully");
  };

  if (!isOpen) return null;

  return (
    <div
      id="signUp-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form-signup shadow-inner-custom relative bg-white w-1/2 rounded-sm border border-gray-400 shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-2 md:p-2 rounded-sm bg-gray-600">
            <h4 className="text-lg font-semibold text-gray-200">Sign up as a New User</h4>
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSignup}>
            {/* Input Fields */}
            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-1/2 input-field-shadow border text-sm border-gray-400 text-gray-600 rounded-sm p-1"
                placeholder="Enter your Full Name"
              />
            </div>
            {/* More Fields */}
            {/* Success/Error Messages */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;