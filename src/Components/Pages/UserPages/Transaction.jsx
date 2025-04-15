// Transaction.js
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { backend } from "../../../App";
import TransactionCard from "../Cards/TransactionCard";

function Transaction({ selectedBook, transactions }) {
  // Accept transactions as prop
  let [seeTransaction, setSeeTransaction] = useState(false);
  let userId = useSelector((state) => state.auth.id);
  let [transactionArr, setTransactionArray] = useState([]);

  const getAllTransaction = async () => {
    try {
      if (transactionArr.length === 0) {
        let response = await axios.get(
          `${backend}/transaction/all-transactions`,
        );
        if (response.status === 200) {
          console.log("Fetched Transaction Successfully");
          setTransactionArray(response.data);
        } else {
          alert("Failed to fetch Transaction");
        }
      }
      setSeeTransaction(!seeTransaction);
    } catch (e) {
      console.log("An error occurred", e.message);
    }
  };

  return (
    <div className="mt-8 m-6">
      <h3 className="text-xl font-semibold mb-2">Transaction Records</h3>

      <div className="grid md:grid-cols-2 sm:grid-cols-1">
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={getAllTransaction}
          >
            {!seeTransaction ? "View All Transactions" : "Hide Transactions"}
          </button>
          {seeTransaction &&
            transactionArr.map((transaction) => (
              <TransactionCard
                key={transaction.transactionId}
                transaction={transaction}
              />
            ))}
        </div>
        <div>
          {transactions.length > 0 ? (
            <span
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition "
              onClick={getAllTransaction}
            >
              Books Data
            </span>
          ) : (
            <button className=" mt-2 font-extrabold text-xl cursor-not-allowed text-black py-2 px-4 rounded">
              No Books Seleted
            </button>
          )}

          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.transactionId}
              transaction={transaction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transaction;
