import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Auth/Login";
import { checkUserSession } from "./actions/authActions";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import Cookies

import React from "react";
import EmployeeDashBoard from "./Components/DashBoard/EmployeeDashBoard";
import CartPage from "./Components/Pages/UserPages/Cart";
import CreateBookForm from "./Components/Forms/NewBook";
import AdminHomePage from "./Components/DashBoard/AdminBoard";
import SignUp from "./Components/Auth/SignUp";
import MyOrders from "./Components/Pages/UserPages/MyOrders";
import UpdateBookForm from "./Components/Forms/UpdateBookForm";
import Notification from "./Components/Pages/Cards/Notification";

export const backend = "https://kitabi-duniya-backend.vercel.app";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let auth = useSelector((state) => state.auth.isAuthenticated);
  let [navMsg, setNotMsg] = useState("");
  let [isError, setNotificationErrorStatus]=useState();
   const  setNotificationMsg = (text,isError=false) => {
    setNotMsg(text);
    setNotificationErrorStatus(isError);
  };

  // Get the entire user state1 q
  const isAdmin = null || useSelector((state) => state.auth.user?.is_admin);

  useEffect(() => {
    if (Cookies.get("token")) {
      if (!auth) {
        dispatch(checkUserSession());
      }
    } else {
      dispatch(checkUserSession());
    }
  }, [dispatch]);

  useEffect(() => {
    // Navigate to /check if the user is authenticated
    if (auth) {
      if (!isAdmin) navigate("/user");
      else {
        navigate("/admin");
      }
    } else {
      navigate("/login");
    }
  }, [auth]);

  return (
    <>
      <Notification text={navMsg} setOpen={navMsg.length>0 && true } notificationFunc={setNotificationMsg} isError={isError}  />
      <Routes>
        <Route
          path="/admin/newBook"
          element={<CreateBookForm notificationFunc={setNotificationMsg}   />}
        />
        <Route path="/login" element={<Login notificationFunc={setNotificationMsg}/>} />
        <Route path="/signup" element={<SignUp notificationFunc={setNotificationMsg} />} />
        <Route path="/admin" element={<AdminHomePage  notificationFunc={setNotificationMsg}/>} />
        <Route path="/admin/upload-book" element={<CreateBookForm notificationFunc={setNotificationMsg} />} />
        <Route path="/admin/update-book/:id" element={<UpdateBookForm notificationFunc={setNotificationMsg} />} />
        <Route path="/user/cart" element={<CartPage notificationFunc={setNotificationMsg}/>} />
        <Route path="/user" element={<EmployeeDashBoard notificationFunc={setNotificationMsg}/>} />
        <Route path="/user/purchase-history" element={<MyOrders notificationFunc={setNotificationMsg}/>} />
      </Routes>
    </>
  );
}

export default App;
