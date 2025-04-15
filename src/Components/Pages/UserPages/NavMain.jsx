import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { backend } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../actions/authActions";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.jpg";
function NavMain({ assignData, notificationFunc }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const openCartFunc = () => {
    navigate("/user/cart");
  };
  const username = useSelector((state) => state.auth.user?.username);

  const logOutApp = () => {
    logOutUser(dispatch);
    navigate("/login");
    notificationFunc("User Logout Successfull");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let search = searchRef.current.value;
      if (search === null) {
        search = "";
        return;
      }
      let data = await axios.get(`${backend}/books/`, {
        params: {
          search: search,
        },
      });
      assignData(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  return (
    <nav className="flex h-full  bg-pink-800 w-screen  justify-between  px-14 p-4 items-center">
      <img src={`${logo}`} alt="Logo" className="h-14 rounded-2xl" />
      <form
        className="flex items-center bg-white px-3 rounded-xl"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search"
          ref={searchRef}
          className="px-2 py-1 rounded-xl outline-none border-none bg-transparent"
        />
        <svg
          onClick={handleSubmit}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 cursor-pointer transition hover:scale-110"
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </form>
      <div className="relative">
        <div className="flex items-center gap-2" onClick={toggleDropdown}>
          <span className="cursor-pointer font-bold text-white text-xl">
            {username}
          </span>
          <svg
            className={`h-4 transition duration-150 invert ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </svg>
        </div>
        {dropdownOpen && (
          <div className="absolute w-28 bg-white shadow-md rounded mt-2 p-2 z-20 ">
            <ul>
              <li
                className="hover:bg-gray-200 p-2 cursor-pointer z-2"
                onClick={() => {
                  navigate("/user/purchase-history");
                }}
              >
                My Transactions
              </li>
              <li
                className="hover:bg-gray-200 p-2 cursor-pointer"
                onClick={openCartFunc}
              >
                Cart
              </li>
              <li
                className="hover:bg-gray-200 p-2 cursor-pointer"
                onClick={logOutApp}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavMain;
