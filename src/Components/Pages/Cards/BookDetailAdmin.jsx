import React from 'react';
import { useSelector } from 'react-redux';

const Modal = ({ book, onClose }) => {
  if (!book) return null;
  let isAdmin=useSelector((state)=>state.auth.user.is_admin);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-cover bg-center rounded-lg shadow-lg p-6 max-w-md w-full flex flex-col text-white font-bold"
        style={{
          backgroundImage: `url(${book.thumbnail})`,
          height: '85%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70 rounded-lg"></div> {/* Semi-transparent overlay */}
        
        <div className="flex flex-col justify-between z-10 h-full text-xl">
          <div>
            <h2 className="text-4xl mb-2 text-center">{book?.title}</h2>
            <p className="mb-2"><strong>Language:</strong> {book?.language?.name.toUpperCase()}</p>
            {isAdmin &&<p className="mb-2"><strong>Pdf Link:</strong> <a href={`${book.book_link}`} className="underline">BOOK</a></p>}
            {isAdmin &&<p className="mb-2"><strong>Sales:</strong> {book?.transactionCount || 0}</p>}
            <p className="mb-2">Tags</p>
            <div className='flex overflow-x-scroll gap-4 mb-2 no-scrollbar'>
              {book?.tags?.map((tag, index) => (
                <div key={index} className='bg-blue-400 h-fit px-2 py-2 rounded-xl'>
                  {tag.name}
                </div>
              ))}
            </div>
            <p className="mb-2">Authors</p>
            <div className='flex overflow-x-scroll gap-4 mb-2 no-scrollbar'>
              {book.authors.map((author, index) => (
                <div key={index} className='bg-green-400 h-fit px-2 py-2 rounded-xl'>
                  {author.name}
                </div>
              ))}
            </div>
          </div>

          {/* The description takes up remaining space */}
          <div className="flex-grow mb-4 overflow-y-auto no-scrollbar">
            <strong>Description:</strong>
            <p>{book?.description}</p>
          </div>

          <div className="flex w-full mt-4 gap-3">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
            >
              Close
            </button>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
