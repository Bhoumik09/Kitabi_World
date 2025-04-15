import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backend } from "../../../App";
import { deleteFromCart } from "../../../actions/cartActions";
import { clearCart } from "../../../Reducer/CartReducer";
import { setPurchasedItems } from "../../../Reducer/MyPurchaseReducer";

const CartPage = () => {
  const dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart.cartItems);
  const [books, setBooks] = useState(null);
  const [price, setPrice] = useState(0);
  let userId = useSelector((state) => state.auth.id);
  const handleCheckout = async () => {
    try {
      let response = await axios.post(`${backend}/transaction/checkout`, {
        cartItems,
        userId,
      });
      // console.log(response.data);
      if (response.status === 200) {
        for (let item of cartItems) {
          // console.log(item)
          // console.log(item)
          dispatch(deleteFromCart(item.userId, item.bookId));
        }
        // console.log(response.data);
        dispatch(clearCart());
        dispatch(setPurchasedItems(response.data));
        alert("Transaction SuccessFull");
      } else {
        alert("Transaction unSuccessFull");
      }
    } catch (e) {
      console.log("Error in Transaction", e.message);
    }
  };
  // Fetch book details based on cart items
  useEffect(() => {
    const fetchBooks = async () => {
      if (cartItems.length == 0) {
        setBooks(null); // Don't fetch if cart is empty
        setPrice(0);
        return;
      }
      try {
        const response = await axios.post(`${backend}/cart/get-cart-items`, {
          cartItems,
        });
        // console.log(response);
        setBooks(response.data);

        setPrice(calculateSubtotal(response.data));
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, [cartItems]);

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const handleDelete = (id) => {
    // Dispatch your delete action here

    dispatch(deleteFromCart(userId, id)); // Uncomment and implement the delete action
  };

  return (
    <div className="w-screen flex flex-col items-center p-16 bg-gray-100">
      <h2 className="text-7xl font-bold mb-6 flex">Your Cart</h2>
      <ul className="w-full space-y-4">
        {books?.map((item) => (
          <li
            key={item?._id}
            className="flex items-center p-4 border-b w-full bg-white shadow-md"
          >
            <img
              src={item?.thumbnail}
              alt={item?.title}
              className="h-24 w-16 object-cover mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item?.title}</h3>
              <p className="text-gray-600">Author: {item?.author}</p>
              <p className="text-lg font-bold">${item?.price?.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="ml-4 bg-red-500 text-white font-semibold py-1 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3 className="text-2xl font-bold mt-4">Subtotal: ${price || 0}</h3>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
