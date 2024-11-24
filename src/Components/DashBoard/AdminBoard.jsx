import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookCard from "../Pages/Cards/Book";
import { backend } from "../../App";
import Modal from "../Pages/Cards/BookDetailAdmin";
import { useNavigate } from "react-router-dom";
import Transaction from "../Pages/UserPages/Transaction";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../actions/authActions";

function AdminHomePage({notificationFunc}) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  let dispatch = useDispatch();
  const [transactionButtonState, setTransactionButtonState] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [bookArray, setBooksArray] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const searchRef = useRef();
  const currentTimeRef = useRef(); // Ref for the clock
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backend}/books/`,{ withCredentials: true});
        setBooksArray(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    if (bookArray === null) fetchBooks();

    const intervalRef = setInterval(() => {
      const newTime = new Date().toLocaleString(undefined, options);
      if (currentTimeRef.current) {
        currentTimeRef.current.innerHTML = newTime; // Use innerHTML here
      }
    }, 1000);

    return () => clearInterval(intervalRef);
  }, [bookArray]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const search = searchRef.current.value;
      const { data } = await axios.get(`${backend}/books/`, {
        params: { search: search },
      });
      setBooksArray(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSeeTransactions = async (bookName, bookId) => {
    let response;
    try {
      if (!transactionButtonState[bookName]?.clicked) {
        response = await axios.get(`${backend}/transaction/${bookId}`);
      }
      let newTransactions = response?.data?.transactions;
      setTransactions((prevTransactions) => {
        const filteredTransactions = prevTransactions.filter(
          (transaction) => transaction.bookName !== bookName
        );
        return newTransactions ? [...filteredTransactions, ...newTransactions] : [...filteredTransactions];
      });

      setTransactionButtonState((prevState) => ({
        ...prevState,
        [bookName]: { loading: false, clicked: !prevState[bookName]?.clicked },
      }));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleBookClick = (book, e) => {
    if (e.target.classList.contains("edit-button")) {
      return;
    }
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen w-screen">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <form className="w-full mx-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            ref={searchRef}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-lg"
          />
        </form>
        <p className="text-gray-600" ref={currentTimeRef}>{new Date().toLocaleString(undefined, options)}</p>
      </div>
      <div className="flex justify-between mb-4">
        <h4 className="font-medium">
          Welcome: <span className="font-bold">Bhoumik</span>
        </h4>
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            onClick={() => navigate("upload-book")}
          >
            Upload New Book
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            onClick={() => {
              notificationFunc("Logout SuccessFull");
              logOutUser(dispatch);
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <Modal book={selectedBook} onClose={closeModal} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bookArray.map((book) => (
          <div
            className="bg-white rounded shadow-md p-4 hover:shadow-lg transition flex flex-col justify-between"
            key={book._id}
            onClick={(e) => handleBookClick(book, e)}
          >
            <BookCard book={book} />
            <button
              className="edit-button bg-yellow-500 text-white py-2 px-2 rounded mt-2 w-full"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/update-book/${book._id}`);
              }}
            >
              Edit
            </button>
            <button
              className={`edit-button ${transactionButtonState[book.title]?.clicked ? "bg-green-500" : "bg-red-500"} text-white py-2 px-2 rounded mt-2 w-full`}
              onClick={() => handleSeeTransactions(book.title, book._id)}
            >
              {transactionButtonState[book.title]?.clicked ? "Transactions Loaded" : "See Transactions"}
            </button>
          </div>
        ))}
      </div>

      <Transaction transactions={transactions} />
    </div>
  );
}

export default AdminHomePage;
