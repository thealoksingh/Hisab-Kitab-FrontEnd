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
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
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
        navigate("/user-dashboard", { state: { user } }); 
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
    <div
    id="SignIn-modal"
    tabIndex="-1"
    aria-hidden="false"
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0"
  >
    <div className=" flex flex-col items-center justify-center w-[40%] h-[90%]  rounded-lg ">
    <div className="alert-div bg-white relative p-4 w-full h-auto border-rose-500 border max-w-5xl rounded-md shadow-lg">
          <h2 className="text-sm font-semibold text-rose-600 mb-2">Note:</h2>
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
          <p className="text-gray-700 font-semibold text-xs">
            For the best experience, please use a desktop-sized screen with
            Chrome or Brave browsers. Your patience is appreciated. 🙏
          </p>
        </div>
      <div className="main-form relative p-4 w-full h-auto flex gap-4 justify-center  rounded-md">
       
        <div className="form-signIn shadow-inner-custom border border-gray-400 relative bg-white w-[70%] rounded-sm shadow dark:bg-gray-300">
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
                className="w-1/3 rounded-sm bg-teal-600 text-sm text-white px-4 py-1 hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {isLoading ? (<div className="flex ">
                    <div className="w-5 h-5 border-3 border-t-4 border-white rounded-full animate-spin"></div>
                    <div className="font-semibold ml-2">loading..</div>
                    </div>
                  ) : (
                    "Sign In"
                  )}
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
  
  
  </div>
  
  
  );
};

export default LogInForm;
