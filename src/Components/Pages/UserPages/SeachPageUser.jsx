import React, { useEffect, useState } from "react";
import BookCard from "../Cards/Book";
import Modal from "../Cards/BookDetailAdmin";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import Item from "./Item";

function SearchPageUser({ books, notificationFunc }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [sortBy, setSortBy] = useState("rating");
  const [selectedBook, setSelectedBook] = useState(null);
  const userId = useSelector((state) => state.auth.id);
  const [seeBookInfo, setSeeBookInfo] = useState(null);

  const purchasedBooks = useSelector(
    (state) => state.purchase?.purchasedItems,
  )?.map((items) => items.book._id);
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical Fiction",
    "Horror",
    "Young Adult",
    "Children’s",
    "Self-Help",
    "Cookbooks",
    "Graphic Novels",
    "Poetry",
    "Travel",
    "Memoir",
    "Science",
    "Psychology",
  ];
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const closeModal = () => {
    setSelectedBook(null);
  };
  useEffect(() => {
    setSeeBookInfo(null);
  }, [books]);
  const handleGenreSelection = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre],
    );
  };

  const handleRatingSelection = (rating) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filterBooks = () => {
    return books.filter((book) => {
      const matchesGenre =
        selectedGenres.length === 0 || selectedGenres.includes(book.genre);
      const matchesRating =
        selectedRating === null || book.rating === selectedRating;

      return matchesGenre && matchesRating;
    });
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCartAction = (book) => {
    const isPresent = cartItems.some((item) => item.bookId === book._id);
    if (isPresent) {
      notificationFunc("Item Deleted Successfully", true);
      dispatch(deleteFromCart(userId, book._id));
    } else {
      notificationFunc("Item Added Successfully");
      dispatch(addToCart(userId, book._id));
    }
  };

  const sortBooks = (filteredBooks) => {
    if (sortBy === "rating") {
      return filteredBooks.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      return filteredBooks.sort((a, b) => a.price - b.price);
    }
    return filteredBooks;
  };

  const filteredBooks = filterBooks();
  const sortedFilteredBooks = sortBooks(filteredBooks);

  const hasFilters =
    selectedGenres.length > 0 ||
    selectedRating !== null ||
    selectedLanguage !== null;

  const booksToDisplay = hasFilters ? sortedFilteredBooks : sortBooks(books);

  return (
    <div className="flex p-8 bg-gray-100 min-h-screen">
      {seeBookInfo ? (
        <Item book={seeBookInfo} />
      ) : (
        <>
          <aside className="w-1/4 pr-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">SORT BY</h2>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full border border-gray-300 p-2 rounded-lg mb-8"
            >
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>

            <h2 className="text-2xl font-bold text-purple-700 mb-4">RATING</h2>
            <div className="space-y-2 mb-8">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingSelection(rating)}
                    className="w-5 h-5 text-purple-700"
                  />
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating ? "text-purple-700" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-purple-700 mb-4">GENRE</h2>
            <div className="space-y-2 overflow-y-scroll h-[20%]">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <input
                    id={genre}
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreSelection(genre)}
                    className="w-5 h-5 text-purple-700"
                  />
                  <span>{genre}</span>
                </div>
              ))}
            </div>
          </aside>

          <Modal
            book={selectedBook}
            onClose={closeModal}
            isPresent={
              selectedBook &&
              cartItems.some((item) => item.bookId === selectedBook._id)
            }
            onCartAction={handleCartAction}
          />

          <main className="w-3/4">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              BOOKS BY GENRES
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {booksToDisplay.length > 0 ? (
                booksToDisplay.map((book) => {
                  const isPresent = cartItems.some(
                    (item) => item.bookId === book._id,
                  );
                  return (
                    <div
                      key={book._id}
                      className="w-full  flex flex-col  bg-gray-300 shadow-lg shadow-slate-400 p-6 rounded-lg"
                    >
                      <div className="">
                        <BookCard book={book} />
                      </div>

                      {!purchasedBooks?.includes(book._id) ? (
                        <>
                          <button
                            className="block w-full bg-blue-500 mt-4 rounded-lg font-semibold p-2"
                            onClick={() => {
                              handleBookClick(book);
                            }}
                          >
                            Info
                          </button>
                          <button
                            className={`block w-full ${
                              isPresent ? "bg-red-500" : "bg-green-500"
                            } mt-4 rounded-lg font-semibold p-2`}
                            onClick={() => handleCartAction(book)}
                          >
                            {isPresent ? "Remove from Cart" : "Add to Cart"}
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex-grow"></div>
                          <button
                            onClick={() => {
                              setSeeBookInfo(book);
                            }}
                            className={`block w-full bg-cyan-400 mt-4 rounded-lg font-semibold p-2`}
                          >
                            See Purchased Item
                          </button>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">
                  No books available for the selected filters.
                </p>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default SearchPageUser;
