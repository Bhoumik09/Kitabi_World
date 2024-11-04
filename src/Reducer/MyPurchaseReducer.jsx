// cartReducer.js
import { createSlice } from '@reduxjs/toolkit';

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    purchasedItems: JSON.parse(localStorage.getItem('purchase'))||[],
    error: null,
  },
  reducers: {
    initailizaeCartItems: (state, action) => {
      console.log(action.payload);
      state.purchasedItems = action.payload
      localStorage.setItem('purchase',JSON.stringify(state.purchasedItems));
    },
    setPurchasedItems: (state, action) => {
      console.log(action.payload);
      state.purchasedItems = [...state.purchasedItems,...action.payload]
      localStorage.setItem('purchase',JSON.stringify(state.purchasedItems));
    },
    setPurchaseError: (state, action) => {
      state.error = action.payload;
    },
    
  },
});

// Export actions and reducer
export const { setPurchaseError,setPurchasedItems, initailizaeCartItems} = purchaseSlice.actions;
export default purchaseSlice.reducer;
