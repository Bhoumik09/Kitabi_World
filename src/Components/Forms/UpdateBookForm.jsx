import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { backend } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBookForm() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const genreRef = useRef();
  const tagsRef = useRef();
  const thumbnailRef = useRef();
  const publisherRef = useRef();
  const ratingRef = useRef();
  const authorsRef = useRef();
  const languageRef = useRef();
  const pagesRef = useRef();
  const bookLinkRef=useRef();
  const [loading, setLoading] = useState(true);
  const {id:bookId}=useParams();
  const navigate=useNavigate();
  // Fetch the book data when the component mounts
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`${backend}/books/get-book/${bookId}`);
        const book = response.data;
        
        // Populate the form fields with the existing book data
        titleRef.current.value = book.title;
        descriptionRef.current.value = book.description;
        priceRef.current.value = book.price;
        genreRef.current.value = book.genre;
        tagsRef.current.value = book.tags.map((author)=>(author.name)).join(',');
        authorsRef.current.value = book.authors.map((author)=>(author.name)).join(',');
        thumbnailRef.current.value = book.thumbnail;
        publisherRef.current.value = book.publisher.name;
        ratingRef.current.value = book.rating;
        languageRef.current.value = book.language.name;
        pagesRef.current.value = book.pages;
        bookLinkRef.current.value=book.book_link;

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title: titleRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      price: priceRef.current.value,
      genre: genreRef.current.value.trim(),
      tags: tagsRef.current.value.split(",").map((tag) => tag.trim()),
      authors: authorsRef.current.value.split(",").map((author) => author.trim()),
      thumbnail: thumbnailRef.current.value,
      publisher: publisherRef.current.value.trim(),
      rating: ratingRef.current.value,
      language: languageRef.current.value.trim(),
      pages: parseInt(pagesRef.current.value),
      book_link:bookLinkRef.current.value,
    };

    try {
      let response = await axios.put(`${backend}/books/update-book/${bookId}`, bookData);
      if (response.status === 200) {
        console.log("Book updated successfully");
        navigate('/admin');
      } else {
        console.log("Failed to update the Book", response);
      }
    } catch (e) {
      console.log("An Error Occurred", e.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state while fetching book data
  }

  return (
    <div className="h-screen flex justify-center bg-gradient-to-r from-blue-800 to-pink-800">
      <div className="bg-gray-300 shadow-lg shadow-blue-300 rounded-lg p-8 w-full max-w-lg m-8 overflow-y-scroll">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Update Book
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              ref={titleRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              ref={descriptionRef}
              required
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              ref={priceRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input
              type="text"
              ref={genreRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags (comma separated)</label>
            <input
              type="text"
              ref={tagsRef}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Authors (comma separated)</label>
            <input
              type="text"
              ref={authorsRef}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Thumbnail Image Link</label>
            <input
              type="text"
              ref={thumbnailRef}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Book PDF Link</label>
            <input
              type="text"
              ref={bookLinkRef}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Publisher</label>
            <input
              type="text"
              ref={publisherRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating (0 to 5)</label>
            <input
              type="number"
              ref={ratingRef}
              disabled
              min="0"
              max="5"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Language</label>
            <input
              type="text"
              ref={languageRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pages</label>
            <input
              type="number"
              ref={pagesRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBookForm;
