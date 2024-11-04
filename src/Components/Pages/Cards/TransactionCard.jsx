import React from 'react';

function TransactionCard({ transaction }) {
  // Format the date and time
  const dateTime = transaction?.date ? new Date(transaction.date) : null;
  const formattedDate = dateTime ? dateTime.toLocaleDateString() : '';
  const formattedTime = dateTime ? dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md rounded-lg p-4 m-4 transition-transform transform hover:scale-105 hover:shadow-lg max-w-xs sm:max-w-sm md:max-w-md">
      <h2 className="text-lg font-semibold mb-2">Transaction ID: {transaction?.transactionId}</h2>
      <p className="font-bold">Book Name: {transaction?.bookName}</p>
      <p>Amount: ${transaction?.price}</p>
      <p>Date: {formattedDate} {formattedTime}</p>
    </div>
  );
}

export default TransactionCard;
