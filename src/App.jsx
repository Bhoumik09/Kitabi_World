import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Auth/Login";
import { checkUserSession } from "./actions/authActions";
import { useEffect } from "react";
import Cookies from 'js-cookie'; // Import Cookies

import React from "react";
import EmployeeDashBoard from "./Components/DashBoard/EmployeeDashBoard";
import CartPage from "./Components/Pages/UserPages/Cart";
import CreateBookForm from "./Components/Forms/NewBook";
import AdminHomePage from "./Components/DashBoard/AdminBoard";
import SignUp from "./Components/Auth/SignUp";
import MyOrders from "./Components/Pages/UserPages/MyOrders";
import UpdateBookForm from "./Components/Forms/UpdateBookForm";

export const backend = "http://localhost:5000";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let auth=useSelector((state) => state.auth.isAuthenticated)
  console.log("hrhr");
  console.log(auth)
  // Get the entire user state1 q
  const isAdmin = null || useSelector((state) => state.auth.user?.is_admin);
  console.log(isAdmin);
  useEffect(()=>{
    
    if(Cookies.get('token')){
      if(!auth){
        
        dispatch(checkUserSession());
      }
    }else{
      dispatch(checkUserSession());
    }
  },[dispatch])
 
  

  useEffect(() => {
    // Navigate to /check if the user is authenticated
    if (auth) {
      if(!isAdmin)navigate("/user");
      else{
        navigate('/admin');
      }
    }else{
      navigate('/login');
    }
  }, [auth]);

  return (
    <Routes>
      <Route path="/newBook" element={<CreateBookForm/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/admin" element={<AdminHomePage/>}/>
      <Route path="/admin/upload-book" element={<CreateBookForm/>}/>
      <Route path="/admin/update-book/:id" element={<UpdateBookForm/>}/>
      <Route path="/user/cart" element={<CartPage />} />
      <Route path="/user" element={<EmployeeDashBoard />} />
      <Route path="/user/purchase-history" element={<MyOrders />} />
    </Routes>
  );
}

export default App;
