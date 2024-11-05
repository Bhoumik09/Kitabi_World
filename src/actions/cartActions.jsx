import axios from "axios";
import { backend } from "../App"; // Adjust path if necessary
import { setCartItems, setError } from "../Reducer/CartReducer"; // Import the reducers from the cart slice

// Action to add a book to the cart
export const addToCart = (userId, bookId) => async (dispatch, getState) => {
  // Retrieve the current cart items from the Redux store
  const existingCartItems = getState().cart.cartItems;

  // Check if the book is already in the cart
  const isPresent = existingCartItems.some((item) => item.bookId === bookId);
  if (isPresent) {
    console.log("Item is already in the cart");
    return; // If the item is already in the cart, exit early
  }

  // Add new item to the cart array
  const updatedItems = [...existingCartItems, { userId, bookId }];

  // Update Redux and localStorage
  dispatch(setCartItems(updatedItems));
  localStorage.setItem("cartItems", JSON.stringify(updatedItems));

  // Optionally sync with the backend
  try {
    let response=await axios.post(`${backend}/cart/add-to-cart`, { userId, bookId });
  } catch (error) {
    dispatch(setError(error?.response?.data || "Failed to add item to cart"));
  }
};

// Action to remove a book from the cart
export const deleteFromCart = (userId, bookId) => async (dispatch, getState) => {
  // Retrieve the current cart items from the Redux store
  const existingCartItems = getState().cart.cartItems;

  // Filter out the item to be removed
  const updatedItems = existingCartItems.filter((item) => item.bookId !== bookId);
  
  // Update Redux and localStorage
  dispatch(setCartItems(updatedItems));
  localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  // Optionally sync with the backend
  try {
    let response=await axios.post(`${backend}/cart/delete-from-cart`, { userId, bookId });
    
  } catch (error) {
    dispatch(setError(error?.response?.data || "Failed to delete item from cart"));
  }
};

// Action to synchronize local cart items with the backend
export const syncCartWithBackend = (userId) => async (dispatch) => {
  // Retrieve local cart items
  const localCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  try {
    // Send local cart items to the backend for synchronization
    const response = await axios.post(`${backend}/cart/sync-cart`, {
      userId,
      items: localCartItems,
    });
    
    // Update the Redux store with the backend-synced cart items
    dispatch(setCartItems(response.data.cartItems));
  } catch (error) {
    dispatch(setError(error?.response?.data || "Failed to sync cart with backend"));
  }
};
