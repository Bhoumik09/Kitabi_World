import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backend } from "../../../App";

function Item({ book }) {
  // Retrieve the transaction ID from Redux based on the book ID
  const transactionId = useSelector(
    (state) =>
      state.purchase.purchasedItems.find((item) => item.book._id === book._id)
        ?._id,
  );

  // State variables to manage user rating, average rating, and rating count
  const [userRating, setUserRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch initial rating data for the book and user's transaction rating
  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        if (transactionId) {
          const response = await axios.get(
            `${backend}/books/transactions/${transactionId}/rating`,
          );
          const { userRating, averageRating, ratingsCount } = response.data;

          // Set rating data from the backend response
          setUserRating(userRating);
          setTotalRatings(averageRating * ratingsCount);
          setRatingsCount(ratingsCount);
        }
      } catch (error) {
        console.error("Error fetching rating data:", error);
        setError("An error occurred while fetching rating data.");
      }
    };

    fetchRatingData();
  }, [transactionId]);

  // Handle rating click to set the user rating and submit to the backend
  const handleRatingClick = async (rating) => {
    setUserRating(rating); // Set selected rating locally
    await submitRating(transactionId, rating); // Submit the rating to the backend
  };

  // Calculate average rating
  const averageRating = ratingsCount
    ? (totalRatings / ratingsCount).toFixed(2)
    : 0;

  // Function to submit the user rating
  const submitRating = async (transactionId, rating) => {
    try {
      const response = await axios.post(
        `${backend}/books/rate-book/${transactionId}`,
        { rating },
      );
      if (response.status === 200) {
        setSuccess(
          `Rating submitted successfully. New average: ${response.data.averageRating}`,
        );
        setError(null); // Clear previous errors
        // console.log(response)
        // Update total ratings and count based on the new average rating
        setRatingsCount(response.data.count);
        setTotalRatings(response.data.averageRating * ratingsCount);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("An error occurred while submitting your rating.");
      setSuccess(null); // Clear previous success messages
    }
  };

  return (
    <div className="h-screen">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 h-full">
        <div
          id="pImage"
          className="grid"
          style={{ gridTemplateRows: "2fr 1fr" }}
        >
          <img
            className="rounded-lg lg:scale-125 md:scale-110 shadow-xl m-auto"
            src={book?.thumbnail}
            alt="Book"
          />
          <div className="flex justify-center items-start">
            {book?.tags?.map((tag, index) => (
              <span
                key={index}
                className="py-2 px-5 font-bold m-2 bg-blue-400 rounded-lg shadow-2xl shadow-gray-500"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="h-full flex flex-col w-full p-10">
          <div className="font-extrabold lg:text-8xl md:text-6xl sm:text-8xl mb-6 text-center">
            {book?.title}
          </div>
          <section className="mb-3 text-xl max-h-[200px] overflow-y-scroll">
            {book.description}
          </section>
          <section className="mb-3 text-2xl font-serif">
            <strong>BookLink: </strong>
            <a href={book?.book_link}>{book?.title}</a>
          </section>
          <section className="mb-3 text-3xl md:text-2xl">
            <strong>Publisher:</strong> {book?.publisher?.name}
          </section>
          <section className="mb-3 text-2xl">
            <strong>Author:</strong>{" "}
            {book?.authors?.map((author) => author.name).join(", ")}
          </section>

          {/* Rating Section */}
          <div className="flex items-center mb-2 ">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${userRating > index ? "text-yellow-300" : "text-gray-300"} me-1 cursor-pointer`}
                onClick={() => handleRatingClick(index + 1)}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Average Rating: {averageRating} out of 5
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Ratings: {ratingsCount}
          </p>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default Item;
