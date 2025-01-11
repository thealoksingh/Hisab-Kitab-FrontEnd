import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from '../Api/HisabKitabApi'
const SignUpForm2 = () => {
  const [isOpen, setIsOpen] = useState(true); // State to control modal visibility
  const [otpSent, setOtpSent] = useState(false); // State to handle OTP sent status
  const [otpVerified, setOtpVerified] = useState(false); // State to handle OTP verification
  const navigate = useNavigate();


//    const { role } = useParams();
//   const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const role ="user";
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

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
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "User already exists or invalid input");
    }
  };


  const handleClose = () => {
    setIsOpen(false);  // Close the modal
    navigate("/");  // Redirect to the login page
  };

  const handleOtpRequest = (e) => {
    e.preventDefault();
    setOtpSent(true);
    // Future integration: Add API call for OTP sending
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    setOtpVerified(true);
    // Future integration: Add API call for OTP verification
  };

  if (!isOpen) return null;  // If the modal is closed, return nothing

  return (
    <div
      id="signUp-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form2 relative bg-white w-1/2 rounded-sm shadow dark:bg-gray-300">
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
            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-1/2 input-field-shadow border text-sm border-gray-300 text-gray-600 rounded-sm p-1"
                placeholder="Enter your Full Name"
              
              />
            </div>
            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Mobile number</label>
              <input
               id="phoneNumber"
               name="phoneNumber"
               type="tel"
               required
               value={phoneNumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
               autoComplete="off"
                className="w-1/2 input-field-shadow border text-sm border-gray-300 text-gray-600 rounded-sm p-1"
                placeholder="Enter Mobile Number"
              />
            </div>

            <div className="mb-1 mt-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
              <div className="flex justify-between">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  className="w-[65%] input-field-shadow text-sm border border-gray-300 text-gray-600 rounded-sm p-1"
                  placeholder="Enter email Address"
                
                />
                <button
                  type="submit"
                  onClick={handleOtpRequest}
                  className="w-1/3 bg-sky-600 text-sm text-white px-4 py-1 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Send OTP
                </button>
              </div>
            </div>
            {otpSent && (
              <h5 className="text-green-500 font-sm">
                OTP sent successfully{" "}
                <span className="font-sm text-rose-500">Resend in 40 sec</span>
              </h5>
            )}

            {otpSent && !otpVerified && (
              <div className="mb-2 mt-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="otp"
                    className="w-1/4 input-field-shadow text-sm border border-gray-300 text-gray-600 rounded-sm p-1"
                    placeholder="Enter OTP"
                    required
                  />
                  <button
                    type="submit"
                    onClick={handleOtpVerify}
                    className="w-1/3 bg-cyan-700 text-sm text-white px-4 py-1 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}
            {otpVerified && <h5 className="text-green-500 font-sm">OTP Verified</h5>}
            {!otpVerified && otpSent && (
              <h5 className="text-rose-500 font-sm">!!! Incorrect OTP</h5>
            )}

            <div className="mb-4 mt-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Enter Password</label>
              <div className="flex gap-2">
                <input
 id="password"
 name="password"
 type="password"
 required
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 autoComplete="off"
                  className="w-1/2 input-field-shadow text-sm border border-gray-300 text-gray-600 rounded-sm p-1"
                  placeholder="Enter Password"
                 
                />
                <input
                                 id="confirmPassword"
                                 name="confirmPassword"
                                 type="password"
                                 required
                                 value={confirmPassword}
                                 onChange={(e) => setConfirmPassword(e.target.value)}
                                 autoComplete="off"
                  className="w-1/2 input-field-shadow text-sm border border-gray-300 text-gray-600 rounded-sm p-1"
                  placeholder="Confirm Password"
                
                />
              </div>
            </div>
            {error && <p className="mt-1 py-1 mb-2 text-center text-sm text-red-500">{error}</p>}
            {/* <p className="mt-1 py-1 mb-2 text-center text-sm text-red-500 ">Signup succesfu you can login now</p> */}
        {successMessage && <p className="mt-1 py-1 mb-2 text-center text-sm text-green-500">{successMessage}</p>}

            <div className="mb-2 flex gap-4">
              <button
                type="submit"
                className="w-1/3 bg-teal-600 text-sm text-white px-4 py-1 hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Up
              </button>
              <span className="text-gray-800">Existing user?</span>
              <span onClick={() => navigate("/")} className="text-sky-600">
                SignIn
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm2;
