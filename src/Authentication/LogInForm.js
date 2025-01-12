import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../Api/HisabKitabApi"; // Assuming you have an API to check user credentials
import ForgetPasswordModal from "./ForgetPasswordModal";
const LogInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default to user role
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before login attempt

    // Hardcoded admin credentials
    const adminEmail = "alokadmin@gmail.com";
    const adminPassword = "98765";

    if (role === "admin" && email === adminEmail && password === adminPassword) {
      // Admin login - redirect to admin dashboard
      navigate("/admin-dashboard");
      return;
    }

    // User login via API
    try {
      const response = await loginApi(email, password);
      const user = response.data;
      if (user) {
        navigate("/user-dashboard", { state: { user } }); // Pass user data to the dashboard
      } else {
        setError("Invalid login credentials");
      }
    } catch (error) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div
      id="SignIn-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0"
    >
      <div className="main-form relative p-4 w-[60%] h-[50%] max-w-5xl flex gap-4 justify-center">
        <div className="form-signIn shadow-inner-custom border border-gray-400 relative bg-white w-1/2 rounded-sm shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-2 md:p-2 rounded-sm bg-gray-600">
            <h4 className="text-lg font-semibold text-gray-200">Log in to Hisabkitab</h4>
          </div>
          <form className="p-4 md:p-2" onSubmit={handleLogin}>
          <div className="mb-2 mt-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Select Role
              </label>
              <div className="flex items-center gap-4">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={() => setRole("user")}
                  />
                  User
                </label>
                <label>
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

            <div className="mb-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full input-field-shadow border text-sm border-gray-400 text-gray-600 rounded-sm p-1"
                placeholder="Enter Email Here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2 mt-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full input-field-shadow text-sm border border-gray-400 text-gray-600 rounded-sm p-1"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-rose-600">Forgot password?<span onClick={()=>navigate("/forget-password")} className="text-green-600">Click here</span></p>
            </div>

           
            {error && <p className="text-rose-500 text-sm">{error}</p>}

            <div className="mb-2 mt-1 flex gap-4">
              <button
                type="submit"
                className="w-1/3 bg-teal-600 text-sm text-white px-4 py-1 hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sign In
              </button>
              <span className="text-gray-800">New user?</span>
              <span
                onClick={() => navigate("/signup")}
                className="text-sky-600 cursor-pointer"
              >
                SignUp
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
