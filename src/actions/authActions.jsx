// actions/authActions.js
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies
import { backend } from '../App';
import { login, logout } from '../Reducer/UsReducer'; // Import the login and logout actions from the correct file

export const logOutUser=(dispatch)=>{
    Cookies.remove('token');
    localStorage.removeItem('cart');
    dispatch(logout());
}
export const checkUserSession = () => async (dispatch) => {
  const token = Cookies.get('token'); // Get token from cookies
  if (token==undefined) {
    
    dispatch(logout());
    return;
  }
  try {
    const response = await axios.get(`${backend}/auth/verify-token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Dispatch login action with the user and token received from the backend
    dispatch(login({ user: response.data.user, token:response.data.token,id:response.data.user.id  }));
  } catch (error) {
    console.error("Session verification failed:", error.message);
    // Optionally handle errors (e.g., log out the user)
    dispatch(logout());
  }
};

// Optionally, you might want to add an action to handle user logout manually
export const userLogout = () => (dispatch) => {
  Cookies.remove('token'); // Remove token from cookies
  
  dispatch(logout()); // Dispatch logout action to clear user state
};
