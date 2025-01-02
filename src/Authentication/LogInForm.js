import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LogInForm = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before login attempt

    try {
      const response = await fetch('http://localhost:8080/Hisab-Kitab/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }
      const user = await response.json();
      // console.log("Login successful:", user.fullName || user?.data?.fullName || "No name available");
      console.log("User object:", user);


      // Pass user data to the dashboard
      navigate(`/dashboard/${role}`, { state: { user } });
    } catch (error) {
      setError(error.message);
    }
  };

  const goBackHandler = () => {
    navigate("/"); // Navigate to the previous page
  };

  const signUpHandler = () => {
    navigate(`/signup/${role}`); // Navigate to the signup page with the role
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-12 w-auto"
          src="https://www.freeiconspng.com/uploads/blue-user-icon-32.jpg"
          alt="Hisab Kitab"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in as a {role}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {error && <p className="mt-5 text-center text-sm text-red-500">{error}</p>}

        <p className="mt-10 text-center text-sm text-gray-500">
          Are you not {role}?
          <span
            onClick={role === 'admin' ? goBackHandler : signUpHandler}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            {role === 'admin' ? ' Go to the home page' : ` Sign Up as a new ${role}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LogInForm;
