// cartReducer.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    error: null,
  },
  reducers: {
    
    setCartItems: (state, action) => {
      
      state.cartItems = action.payload;
      
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems'); // Clear from local storage as well
    },
  },
});

// Export actions and reducer
export const { addToCart, deleteFromCart, setCartItems, setError ,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
