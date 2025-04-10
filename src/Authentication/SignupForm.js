import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpEmail, signUpUser } from "../Api/HisabKitabApi";
import "../CssStyle/GroupDashboard.css";
import forget from "../assets/forget1.jpg";
import hisabKitabBlack from "../assets/images/hisabkitab-black.png";

const SignUpForm = () => {
  const [isOpen, setIsOpen] = useState(true); // State to control modal visibility
  const [otpSent, setOtpSent] = useState(false); // State to handle OTP sent status
  const [otpVerified, setOtpVerified] = useState(false); // State to handle OTP verification
  const [otpEntered, setOtpEntered] = useState(""); // State to handle OTP verification
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60); // State for timer
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for disabling button
  const [isClicked, setClicked] = useState(false); // State to handle error prompt
  //    const { role } = useParams();
  //   const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const [showDisclaimer, setShowDisclaimer] = useState(true);
const[successMessage, setSuccessMessage] = useState("");
const[errorMessage, setErrorMessage] = useState("");
const [errors, setErrors] = useState({});
 const [otpExpireError, setOtpExpireError] = useState(false);

  useEffect(() => {
    if (otpSent ) {
      const timer = setTimeout(() => {
        setOtp("");
        setOtpExpireError(true);
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(timer); // Cleanup on unmount or re-trigger
    }
  }, [otpSent]);

const validate = () => {
  let tempErrors = {};

  // Full Name: Required, 1-50 characters, no special characters
  if (!fullName.trim()) {
    tempErrors.fullName = "Full Name is required";
  } else if (!/^[a-zA-Z ]{1,50}$/.test(fullName)) {
    tempErrors.fullName = "Full Name must be 1-50 letters (no special characters)";
  }

  // Email: Validate format
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    tempErrors.email = "Invalid email format";
  }

  // Phone Number: Exactly 10 digits
  if (!/^\d{10}$/.test(phoneNumber)) {
    tempErrors.number = "Number must be exactly 10 digits";
  }

  
  setErrors(tempErrors);
  
  return Object.keys(tempErrors).length === 0; // Returns true if no errors
};


 const validateAfterOtpVerified = () => {
    let tempErrors = {};


    // Email: Validate format
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      tempErrors.email = "Invalid email format";
    }

    // Password: Min 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character
    if (!password || !confirmPassword) {
      tempErrors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password) ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(confirmPassword)
    ) {
      tempErrors.password =
        "Password must be 8+ chars with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }


    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };




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
    if (validate()) {
      handleOtpRequest(e); // Send OTP request
      setIsButtonDisabled(true); // Disable button after OTP is sent
    }
  };

    const role = "user";
    const handleSignup = async (e) => {
    e.preventDefault();
  
    setErrorMessage(null);
    if (!otpVerified) {
      setErrorMessage("Please verify OTP First");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const userData = {
      fullName,
      email,
      contactNo: phoneNumber,
      password,
      role,
    };
    if (validateAfterOtpVerified() && otpVerified) {
      setIsLoading(true);
    try {
    await signUpUser(userData);
      setSuccessMessage("Signup successful! You can now log in.");
      setTimeout(() => {
        navigate(`/signin`);
      }, 3000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "User already exists or invalid input"
      );
    } finally {
      setIsLoading(false);
    }
  }};

  const handleClose = () => {
    setIsOpen(false); // Close the modal
    navigate("/signin"); // Redirect to the login page
  };
  const resetMessages = () => {
    setOtpExpireError(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  const handleOtpRequest = async (e) => {
    resetMessages();
    e.preventDefault();
    if (validate()) {
      try {
        const response = await sendOtpEmail(email, "sign-up");
        setOtp(response.data); // Update state with OTP
       
        setOtpSent(true);
        setErrorMessage(null);
        setSuccessMessage("Otp sent successfully");
      } catch (error) {
        setErrorMessage( error.response?.data ||"An error occurred");
        console.error("Error sending OTP:", error);
        setOtpSent(false);
        setIsButtonDisabled(false); // Display
      }
    } else {
      alert("Please enter a valid email");
    }
  };

  const handleOtpVerify = (e) => {
    resetMessages();
    setClicked(true);
    e.preventDefault();

    if (otpEntered.trim() !== otp.toString().trim()) {
      setOtpVerified(false);
      setErrorMessage("Incorrect OTP");
      return;
    }

    setOtpVerified(true);
    setSuccessMessage("OTP Verified Successfully");
    // Show password fields after OTP is verified
  };

  if (!isOpen) return null; // If the modal is closed, return nothing

  return (
    <div
      id="signUp-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      // style={{ backgroundImage: `url(${forget})` }}
      className={`fixed inset-0 z-50 flex items-center bg-gray-300 bg-cover bg-center justify-center w-full h-screen  ${
        isOpen ? "" : "hidden"
      }`}
    >

{showDisclaimer && (
          <div className="absolute m-1 bg-rose-100 flex z-50 top-1 border border-lg border-rose-300 sm:top-16 lg:right-4   text-gray-700 px-4 py-3 rounded-sm shadow-lg  items-start w-full sm:w-2/3 lg:w-1/3">
           <div>
            <p className="text-gray-700 text-xs mb-2">
            Dear user, we are sorry 🥹! This service is using a free server,
            which may cause it to run slower than expected, especially during
            the first time when the backend is starting.
            <span className="font-semibold text-xs">
              {" "}
              After that, it will run fluently.
            </span>{" "}
            Thank you for your patience.
          </p>
          <p className="text-gray-700 text-xs">
            For the best experience, please use a desktop-sized screen with
            Chrome or Brave browsers. Your patience is appreciated. 🙏
          </p>
          </div>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="text-greeb-600 font-bold ml-4 hover:text-yellow-800 focus:outline-none"
            >
              ✕
            </button>
          </div>
        )}

      <div className="items-center justify-center  flex flex-col w-full h-[90%] sm:w-[40%] sm:h-[90%] rounded-lg ">
        <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
          <div className="form-signup shadow-inner-custom relative bg-white w-[100%] rounded-sm border border-gray-600 shadow dark:bg-gray-300">
            <div className="flex items-center justify-between p-2 md:p-2 bg-gray-600">
              <div className="text-lg font-semibold text-gray-200">
               
                <span> <img
                    src={hisabKitabBlack}
                    alt="logo"
                    className="h-8 max-w-md sm:max-w-lg md:max-w-xl filter ml-2 invert brightness-200"
                  /></span>
              </div>
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
                <label className="block font-Poppins mb-2  text-sm font-medium text-gray-900">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className=" w-[70%]  input-field-shadow   border text-sm border-gray-400 text-gray-600 rounded-sm   p-2"
                  placeholder="Enter your Full Name"
                />
              </div>
              <span className="text-rose-600 text-xs">{errors.fullName}</span>
             
              <div className="mb-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Mobile number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoComplete="off"
                  className=" input-field-shadow w-[70%]   border text-sm border-gray-400 text-gray-600 rounded-sm   p-2"
                  placeholder="Enter Mobile Number"
                />
                
              </div>
              <span className="text-rose-600 text-xs">{errors.number}</span>
              <div className="mb-1 mt-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="flex justify-between">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    className="w-[60%] input-field-shadow text-sm border font-Poppins border-gray-400 text-gray-600 rounded-sm p-2"
                    placeholder="Enter email Address"
                  />
                  <button
                    type="submit"
                    className="w-[35%] bg-sky-600 rounded-sm shadow-inner  text-sm sm:text-sm font-Poppins text-white px-4 py-1 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleTimeAndOtp}
                    disabled={isButtonDisabled} // Disable button when timer is active
                    style={{
                      backgroundColor: isButtonDisabled
                        ? "rgb(197, 197, 197)"
                        : "rgb(0, 150, 135)", // Change color when disabled
                    }}
                  >
                    Send OTP
                  </button>
                </div>
                <span className="text-rose-600 text-xs">{errors.email}</span>
              </div>
              {isButtonDisabled && (
                <h5 className="text-green-500 text-sm">
                   
                  <span className="text-rose-600 text-sm">
                    {" "}
                    {isButtonDisabled && ` Resend in ${timer} sec`}
                  </span>
                </h5>
              )}

              {otpSent && !otpVerified && (
                <div className="mb-2 mt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="otp"
                      onChange={(e) => setOtpEntered(e.target.value)}
                      className="w-1/2 input-field-shadow text-sm border border-gray-400 text-gray-600 rounded-sm p-2"
                      placeholder="Enter OTP"
                      required
                    />
                    <button
                      type="submit"
                      onClick={handleOtpVerify}
                      className=" rounded-sm bg-cyan-700 text-sm text-white px-2 py-1 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}

              {/* {otpVerified && (
                
                <h5 className="text-green-500 font-sm">{successMessage}</h5>
              )}

              {!otpVerified && isClicked && (
                <h5 className="text-rose-500 font-sm">{errorMessage}</h5>
              )} */}
             <h5 className="text-rose-500 text-xs">
              {otpExpireError && `Otp has expired`}
            </h5>
             { otpVerified && <div className="mb-4 mt-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Enter Password
                </label>
                <div className="flex gap-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    className="w-1/2 input-field-shadow text-sm border border-gray-400 text-gray-600 rounded-sm p-2"
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
                    className="w-1/2 input-field-shadow text-sm border border-gray-400 text-gray-600 rounded-sm p-2"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>}
              <span className="text-rose-600 text-xs">{errors.password}</span>
           
              {errorMessage && (
                <p className="mt-2 py-1 mb-2 text-center text-sm text-red-500">
                  {errorMessage}
                </p>
              )}
              {/* <p className="mt-1 py-1 mb-2 text-center text-sm text-red-500 ">Signup succesfu you can login now</p> */}
             
               {successMessage &&  <p className="mt-1 py-1 mb-2 text-center text-sm text-green-500">{successMessage}</p>}
              <div className="mb-2 mt-4 flex gap-4">
                <button
                  type="submit"
                  className="w-1/3  rounded-sm bg-cyan-600 text-sm text-white px-4 py-2 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {isLoading ? (<div className="flex ">
                    <div className="w-5 h-5 border-3 border-t-4  border-white rounded-full animate-spin"></div>
                    <div className="font-semibold ml-2  py-2">Signing Up..</div>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <span className="text-gray-800 mt-1">Existing user?</span>
                <span onClick={() => navigate("/signin")} className="text-sky-600 mt-1">

               
                  SignIn
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;