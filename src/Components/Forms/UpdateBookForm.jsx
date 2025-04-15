import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    genre: "",
    tags: "", // Initialize as a string
    authors: "", // Initialize as a string
    thumbnail: "",
    publisher: "",
    rating: "",
    language: "",
    pages: "",
    book_link: "",
  });
  const [loading, setLoading] = useState(true);
  const { id: bookId } = useParams();
  const navigate = useNavigate();

  // Fetch the book data when the component mounts
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`${backend}/books/get-book/${bookId}`);
        const book = response.data;
        console.log(book); // Check if book data is correct

        // Populate the form fields with the existing book data
        setFormData({
          title: book.title,
          description: book.description,
          price: book.price,
          genre: book.genre,
          tags: book.tags.map((tag) => tag.name).join(", "), // Join tags as a string
          authors: book.authors.map((author) => author.name).join(", "), // Join authors as a string
          thumbnail: book.thumbnail,
          publisher: book.publisher.name,
          rating: book.rating,
          language: book.language.name,
          pages: book.pages,
          book_link: book.book_link,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update authors and tags as strings
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Set value directly as a string
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split authors and tags back into arrays for submission
    const authorsArray = formData.authors.split(",").map((item) => item.trim());
    const tagsArray = formData.tags.split(",").map((item) => item.trim());

    try {
      const response = await axios.put(
        `${backend}/books/update-book/${bookId}`,
        {
          ...formData,
          tags: tagsArray, // Convert back to array
          authors: authorsArray, // Convert back to array
        },
      );
      if (response.status === 200) {
        console.log("Book updated successfully");
        navigate("/admin");
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
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags} // Display tags as a string
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Authors (comma separated)
            </label>
            <input
              type="text"
              name="authors"
              value={formData.authors} // Display authors as a string
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Thumbnail Image Link</label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Book PDF Link</label>
            <input
              type="text"
              name="book_link"
              value={formData.book_link}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating (0 to 5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
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
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pages</label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:bg-gradient-to-r from-blue-100 to-pink-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBookForm;
