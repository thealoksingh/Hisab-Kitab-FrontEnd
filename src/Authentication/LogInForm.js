import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../Api/HisabKitabApi"; // Assuming you have an API to check user credentials
import ForgetPasswordModal from "./ForgetPasswordModal";
import "../CssStyle/GroupDashboard.css";

const LogInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default to user role
  const [error, setError] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before login attempt

    // Hardcoded admin credentials
    const adminEmail = "alokadmin@gmail.com";
    const adminPassword = "98765";

    if (role === "admin" && email === adminEmail && password === adminPassword) {
      navigate("/admin-dashboard");
      return;
    }

    try {
      const response = await loginApi(email, password);
      const user = response.data;
      if (user) {
        navigate("/user-dashboard", { state: { user } });
      } else {
        setError("Invalid login credentials");
      }
    } catch (error) {
      setError("Invalid login credentials");
    }
  };

  return (
    <>
      <div
        id="SignIn-modal"
        tabIndex="-1"
        aria-hidden="false"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        {showDisclaimer && (
          <div className="absolute top-10 sm:top-16  lg:right-4  bg-green-50 border border-gray-400 text-gray-700 px-4 py-3 rounded-lg shadow-lg flex items-start w-full sm:w-2/3 lg:w-1/3">
            <p className="text-sm">
              “We’re currently using free services, so it may take a moment for the backend to start. For the best experience, please switch to desktop mode, as the website’s responsiveness is still under development. Thank you for your patience!”
            </p>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="text-yellow-600 font-bold ml-4 hover:text-yellow-800 focus:outline-none"
            >
              ✕
            </button>
          </div>
        )}

        <div className="main-form relative    p-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-5xl flex gap-4 justify-center">
          <div className="form-signIn shadow-inner-custom border border-gray-400 bg-white w-full rounded-md shadow dark:bg-gray-300">
            <div className="flex items-center justify-between p-3 bg-gray-600 rounded-t-md">
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
                  className="w-full input-field-shadow border text-sm border-gray-400 text-gray-600 rounded-md p-2"
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
                  className="w-full input-field-shadow border text-sm border-gray-400 text-gray-600 rounded-md p-2"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              <p className="text-sm text-rose-600">
                  Forgot password?{" "}
                  <a
                    href="/reset-password"
                    className="text-blue-600 hover:underline"
                  >
                    Reset here
                  </a>
                </p>
              </div>

              {error && (
                <div className="text-sm text-red-600 mb-3">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Log In
                </button>
                <a
                  href="/register"
                  className="text-sm text-blue-600 hover:underline"
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