// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducer/UsReducer'; // import your auth reducer
import cartReducer from './Reducer/CartReducer';
import purchaseReducer from './Reducer/MyPurchaseReducer';

const store = configureStore({
  reducer: {
    auth: authReducer, // add the auth reducer to the store
    cart:cartReducer,
    purchase:purchaseReducer
  },
});

export default store;
