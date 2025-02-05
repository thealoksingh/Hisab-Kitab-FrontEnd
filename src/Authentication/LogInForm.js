import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { loginApi } from "../Api/HisabKitabApi"; // Assuming you have an API to check user credentials
import ForgetPasswordModal from "./ForgetPasswordModal";
import "../CssStyle/GroupDashboard.css";
import { useAuth } from "../security/AuthContext";
import forget from "../assets/forget1.jpg";

const LogInForm = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default to user role
  const [error, setError] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Check if user is already logged in and redirect to user dashboard if true
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
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
      navigate("/admin-dashboard");
      return;
    }

    try {
      // const response = await loginApi(email, password);
      // const user = response.data;
      if (await authContext.login(email, password)) {
        console.log("Login successful");
        navigate("/user-dashboard");
      } else {
        setError("Invalid login credentials");
      }
    } catch (error) {
      setError("Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        id="SignIn-modal"
        tabIndex="-1"
        aria-hidden="false"
        style={{ backgroundImage: `url(${forget})` }}

        className="fixed inset-0 bg-cover bg-center  flex items-center justify-center p-4 sm:p-8"
      >
        {showDisclaimer && (
          <div className="absolute flex z-50 top-2  border-lg  sm:top-16  lg:right-4 bg-rose-100 border border-rose-400 text-gray-700 px-4 py-3 rounded-sm shadow-lg  items-start w-full sm:w-2/3 lg:w-1/3">
            <div>
              <p className="text-gray-700 text-xs mb-2">
                Dear user, we are sorry 🥹! This service is using a free server,
                which may cause it to run slower than expected, especially
                during the first time when the backend is starting.
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

        <div className="main-form relative  w-full max-md:w-94 max-w-3xl flex gap-4 justify-center">
          <div className="form-signIn shadow-inner-custom border border-gray-400 bg-white w-full lg:w-[70%] sm:w-full md:w-full rounded-sm shadow dark:bg-gray-300">
            <div className="flex items-center justify-between p-3 bg-gray-600 rounded-t-sm">
              <h4 className="text-lg font-semibold text-gray-200">
                Log in to Hisabkitab
              </h4>
            </div>
            <form className="p-4" onSubmit={handleLogin}>
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
              </div>

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

                    className=" text-green-600 font-semibold hover:underline hover:scale-105 inline-block transition-transform duration-300"
                  >
                    Reset here
                  </a>
                </p>
              </div>

              {error && (
                <div className="text-sm text-red-600 mb-3">{error}</div>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="border text-white bg-cyan-600 hover:bg-cyan-500 hover:text-white border-cyan-500 text-cyan-500 rounded-sm px-4 py-1 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-3 border-t-4 border-white rounded-full animate-spin"></div>
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
