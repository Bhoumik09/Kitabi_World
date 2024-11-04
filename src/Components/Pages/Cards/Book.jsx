// BookCard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function BookCard({ book }) {
  let isAdmin=useSelector((state)=>state.auth.user.is_admin);
  return (
    <div className="flex flex-col" >
      <img src={book?.thumbnail} alt={book?.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-semibold mt-2">{book?.title}</h3>
      {isAdmin &&<p className="text-gray-600 h-40 mb-2 overflow-y-scroll">{book?.description}</p>}
      <p className="text-gray-800 font-bold">Price: ${book?.price}</p>
      <p className="text-gray-600">Rating: {book?.rating} / 5</p>
      {isAdmin && <p className="text-gray-600">Sales: {book?.transactionCount || 0}</p>}

     
      
    </div>
  );
}

export default BookCard;
