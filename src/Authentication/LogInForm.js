import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginApi } from "../Api/HisabKitabApi"; // Assuming you have an API to check user credentials
import hisabKitabBlack from "../assets/images/hisabkitab-black.png";
import "../CssStyle/GroupDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../Redux/Selector";
import { signIn } from "../Redux/Thunk";
import { showSnackbar } from "../Redux/SanckbarSlice";


const LogInForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default to user role
  const [error, setError] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser); // Get user from Redux store
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Check if user is already logged in and redirect to user dashboard if true
  const validate = () => {
    let tempErrors = {};


    // Email: Validate format
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      tempErrors.email = "Invalid email format";
    }


    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };
  useEffect(() => {
    if (user) {
      navigate("/user-dashboard");
    }
  }, [user, navigate]);

 const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setError(null); // Reset error before login attempt

    // Hardcoded admin credentials
    const adminEmail = "alokadmin@gmail.com";
    const adminPassword = "98765";

    if (
      role === "admin" &&
      email === adminEmail &&
      password === adminPassword
    ) {
      dispatch(showSnackbar({ message: "Admin login successful!", type: "success" })); // <-- Success snackbar
      navigate("/admin-dashboard");
      setIsLoading(false);
      return;
    }

    try {
      // console.log("Attempting login...");
      const response = await dispatch(signIn({ email, password, role }));
      if (signIn.fulfilled.match(response)) {
        dispatch(showSnackbar({ message: "Login successful!", type: "success" })); // <-- Success snackbar
        navigate("/user-dashboard/friends");
        console.log("User logged in successfully:", response.payload);
      } else {
        dispatch(showSnackbar({ message:response?.payload?.message, type: "error" })); // <-- Failure snackbar
        setError(response?.payload?.message || "Login failed, Please Check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(showSnackbar({ message: error?.message || "Login failed. Please try again.", type: "error" })); // <-- Failure snackbar
      setError(error?.message || "Login failed. Please Try Again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {

    navigate("/"); // Redirect to the home page
  };

  return (
    <>
     <div
  id="SignIn-modal"
  tabIndex="-1"
  aria-hidden="false"
  className="fixed inset-0 bg-cover bg-center bg-gray-300 flex items-center justify-center p-4 sm:p-8"
>
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

  {/* ✅ Responsive modal container */}
  <div className="main-form relative w-full sm:w-[80%] md:w-[70%] lg:w-[45%] max-w-3xl flex gap-4 justify-center">
    <div className="form-signIn shadow-inner-custom border border-gray-600 bg-white w-full rounded-sm shadow dark:bg-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-600">
        <div className="font-semibold text-gray-200">
          <img
            src={hisabKitabBlack}
            alt="logo"
            className="h-8 max-w-md sm:max-w-lg md:max-w-xl filter invert brightness-200"
          />
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

      {/* Form */}
      <form className="p-4" onSubmit={handleLogin}>
        {/* Select Role */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Select Role
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              Admin
            </label>
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full input-field-shadow border text-sm border-gray-400 text-gray-600 rounded-sm p-2"
            placeholder="Enter Email Here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="text-rose-600 text-xs">{errors.email}</span>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Enter Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full input-field-shadow border text-sm border-gray-400 text-gray-600 rounded-sm p-2"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-sm mt-2 text-rose-600">
            Forgot password?{" "}
            <a
              href="/forget-password"
              className="text-green-600 font-semibold hover:underline hover:scale-105 inline-block transition-transform duration-300"
            >
              Click here to reset
            </a>
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 mb-3">{error}</div>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="border text-white bg-cyan-600 hover:bg-cyan-500 hover:text-white border-cyan-500 rounded-sm px-4 py-1 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-t-4 border-white rounded-full animate-spin"></div>
                <div className="font-semibold ml-2">Signing In..</div>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <a
            href="/signup"
            className="text-sm text-blue-600 hover:underline hover:scale-105"
          >
            Create an account
          </a>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  );
};

export default LogInForm;
