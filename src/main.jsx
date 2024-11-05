import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./Store.jsx";
import Item from "./Components/Pages/UserPages/Item.jsx";

createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <BrowserRouter>
       <App/>
      </BrowserRouter>
    </Provider>
  
);
