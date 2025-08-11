import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import hisabKitabBlack from "../assets/images/hisabkitab-black.png";
import "../CssStyle/GroupDashboard.css";
import { showSnackbar } from "../Redux/SanckbarSlice";
import { register, sendOTP } from "../Redux/Thunk";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [otpExpireError, setOtpExpireError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (otpSent) {
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
        const response = await dispatch(register(userData));
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
    }
  };

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
        const response = await dispatch(sendOTP({ email, type: "sign-up" }));
        if(sendOTP.fulfilled.match(response)){

          setOtp(response?.payload?.data); // Update state with OTP
          //  console.log("OTP sent successfully:",response?.payload?.data);
          setOtpSent(true);
          setErrorMessage(null);
          setSuccessMessage("Otp sent successfully");

          dispatch(showSnackbar({
            message: response?.payload?.message || "OTP sent successfully",
            type: "success",

          }));
          // console.log("OTP sent successfully meassage:", response?.payload?.message);
        } else{
          console.log("Error in sending OTP:", response?.payload?.message);
        }
      } catch (error) {
        console.error("catch error in sending OTP:", error);
        setErrorMessage(error?.response?.data || "An error occurred");
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

    if (otpEntered?.trim() !== otp?.toString()?.trim()) {
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
  className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-cover bg-center w-full h-screen ${
    isOpen ? "" : "hidden"
  }`}
>
  {/* Disclaimer */}
  {showDisclaimer && (
    <div className="absolute top-1 sm:top-16 lg:right-4 m-1 bg-rose-100 flex z-50 border border-rose-300 text-gray-700 px-4 py-3 rounded-sm shadow-lg items-start w-full sm:w-2/3 lg:w-1/3">
      <div className="flex-1">
        <p className="text-xs mb-2">
          Dear user, we are sorry 🥹! This service is using a free server,
          which may cause it to run slower than expected, especially the first
          time while the backend is starting.{" "}
          <span className="font-semibold">After that, it will run fluently.</span>
          Thank you for your patience.
        </p>
        <p className="text-xs">
          For the best experience, please use a desktop-sized screen with Chrome
          or Brave browsers. 🙏
        </p>
      </div>
      <button
        onClick={() => setShowDisclaimer(false)}
        className="ml-4 font-bold text-gray-600 hover:text-yellow-800 focus:outline-none"
      >
        ✕
      </button>
    </div>
  )}

  {/* Modal container */}
  <div className="flex flex-col items-center justify-center w-full h-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] sm:h-auto rounded-lg">
    <div className="main-form relative p-4 w-full flex justify-center">
      <div className="form-signup shadow-inner-custom relative bg-white w-full rounded-sm border border-gray-600 shadow dark:bg-gray-300">
        {/* Header */}
        <div className="flex items-center justify-between p-2 bg-gray-600">
          <div className="flex items-center">
            <img
              src={hisabKitabBlack}
              alt="logo"
              className="h-8 invert brightness-200 ml-2"
            />
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          </button>
        </div>

        {/* Form */}
        <form className="p-4 md:p-5" onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full sm:w-[70%] border border-gray-400 text-sm rounded-sm p-2"
              placeholder="Enter your Full Name"
            />
            <span className="text-rose-600 text-xs">{errors.fullName}</span>
          </div>

          {/* Mobile Number */}
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium">Mobile Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="off"
              className="w-full sm:w-[70%] border border-gray-400 text-sm rounded-sm p-2"
              placeholder="Enter Mobile Number"
            />
            <span className="text-rose-600 text-xs">{errors.number}</span>
          </div>

          {/* Email + Send OTP */}
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium">Email Address</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="flex-1 border border-gray-400 text-sm rounded-sm p-2"
                placeholder="Enter email address"
              />
              <button
                type="button"
                onClick={handleTimeAndOtp}
                disabled={isButtonDisabled}
                className={`px-4 py-1 rounded-sm text-white text-sm shadow-inner transition-all duration-300 ${
                  isButtonDisabled
                    ? "bg-gray-400"
                    : "bg-sky-600 hover:bg-sky-500"
                }`}
              >
                Send OTP
              </button>
            </div>
            {isButtonDisabled && (
              <span className="text-rose-600 text-sm">
                Resend in {timer} sec
              </span>
            )}
            <span className="text-rose-600 text-xs">{errors.email}</span>
          </div>

          {/* OTP Input */}
          {otpSent && !otpVerified && (
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                id="otp"
                onChange={(e) => setOtpEntered(e.target.value)}
                className="flex-1 border border-gray-400 text-sm rounded-sm p-2"
                placeholder="Enter OTP"
                required
              />
              <button
                type="button"
                onClick={handleOtpVerify}
                className="bg-cyan-700 hover:bg-cyan-500 text-white text-sm px-2 py-1 rounded-sm shadow-md"
              >
                Verify OTP
              </button>
            </div>
          )}
          <h5 className="text-rose-500 text-xs">
            {otpExpireError && "Otp has expired"}
          </h5>

          {/* Password Fields */}
          {otpVerified && (
          <div className="mb-4 mt-1 flex flex-col lg:flex-row gap-2">
  <input
    id="password"
    name="password"
    type="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="flex-1 border border-gray-400 text-sm rounded-sm p-2 w-full"
    placeholder="Enter Password"
  />
  <input
    id="confirmPassword"
    name="confirmPassword"
    type="password"
    required
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="flex-1 border border-gray-400 text-sm rounded-sm p-2 w-full"
    placeholder="Confirm Password"
  />
</div>

          )}
          <span className="text-rose-600 text-xs">{errors.password}</span>

          {/* Error & Success */}
          {errorMessage && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-center text-sm text-green-500">{successMessage}</p>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center gap-4">
            <button
              type="submit"
              className="w-1/3 rounded-sm bg-cyan-600 text-sm text-white px-4 lg:py-2 py-1 hover:bg-cyan-500 shadow-md"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-t-4 border-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            <span className="text-gray-800">Existing user?</span>
            <span
              onClick={() => navigate("/signin")}
              className="text-sky-600 cursor-pointer"
            >
              Sign In
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