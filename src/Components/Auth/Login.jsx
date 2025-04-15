// src/components/Auth/Login.jsx
import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { backend } from "../../App";
import { login } from "../../Reducer/UsReducer";
import Cookies from "js-cookie"; // Import Cookies
import { Link, useNavigate } from "react-router-dom";
import { checkUserSession } from "../../actions/authActions";
import { addToCart } from "../../actions/cartActions";
import { setCartItems } from "../../Reducer/CartReducer";
import {
  initailizaeCartItems,
  setPurchasedItems,
} from "../../Reducer/MyPurchaseReducer";

function Login({ notificationFunc }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [button, setButtonState] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setButtonState(true);
    console.log("click");
    try {
      const response = await axios.post(
        `${backend}/auth/login`,
        { email, password },
        { withCredentials: true },
      );

      if (response.status === 200) {
        const { token, transaction, cart } = response.data; // Make sure your backend sends user info
        // const cartResponse = await axios.post(`${backend}/cart/get-cart-items`, {
        //   userId:response.data.user.id,
        // });
        Cookies.set("token", token);

        let id = response.data.user.id;
        let bookCart = cart.map((item) => ({ userId: id, bookId: item._id }));
        dispatch(setCartItems(bookCart));
        dispatch(initailizaeCartItems(transaction));
        // Assuming this returns the cart items
        // localStorage.setItem("cartItems", JSON.stringify(cartResponse.data));
        dispatch(
          login({
            user: response.data.user,
            token: response.data.token,
            id: response.data.user.id,
          }),
        );
        //  // Dispatch login action
        // Dispatch the action to check user session
        // dispatch(checkUserSession());
        notificationFunc("Login SuccessFull");
      } else {
        console.log("User Login Failed");
        setButtonState(false);
      }
    } catch (error) {
      notificationFunc("Email or Password is wrong", true);
      setButtonState(false);
      console.log("Error during login:", error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              placeholder="Enter your Email"
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
            id="login-button"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200  disabled:bg-blue-400"
            disabled={button}
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-700 font-semibold">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
