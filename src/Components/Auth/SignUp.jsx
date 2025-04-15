// SignUp.js
import React, { useRef, useState } from "react";
import axios from "axios";
import { backend } from "../../App";
import { Link, useNavigate } from "react-router-dom";
function SignUp({ notificationFunc }) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [button, setButtonState] = useState(false);
  let navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setButtonState(true);
    try {
      // Handle signup logic here (e.g., send to backend)
      const response = await axios.post(
        `${backend}/auth/signup-user`,
        { username, email, password },
        { withCredentials: true }, // Send cookies with the request
      );
      if (response.status == 200) {
        notificationFunc("SginIn Successfull");
        console.log("User Sign In Successfull");
        navigate("/login");
      } else {
        setButtonState(false);
        console.log("User SignUp Failed ");
      }
    } catch (error) {
      setButtonState(false);
      notificationFunc("Username/Email already exixts", true);
      console.log("Error during signUp", error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            id="sign-up"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-green-400 transition duration-200"
            disabled={button}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an Account.{" "}
          <Link to={"/login"} className="font-semibold text-green-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
