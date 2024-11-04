import React from "react";
import { useSelector } from "react-redux";

function MyOrders() {
  let obj = useSelector((state) => state.purchase).purchasedItems.map((item)=>({tid:item._id,book:item.book}));
//   console.log(books);
  return (
    <div className="w-screen flex flex-col items-center p-16 bg-gray-100 ">
      <h2 className=" text-7xl font-bold mb-6 flex">Your Purchases</h2>
      <ul className=" max-w-[700px] space-y-4 ">
        {obj?.map((item) => (
          <li
            key={item?.tid}
            className="flex items-center p-4 border-b w-full bg-white shadow-2xl rounded-3xl"
          >
            <img
              src={item?.book.thumbnail}
              alt={item?.book.title}
              className="h-24 w-16 object-cover mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item?.book.title}</h3>
              <p>TransactionId: <strong className="cursor-pointer" onClick={()=>{alert(`The TID is ${item?.tid} `)}}>See Transaction Id</strong></p>
              <p className="text-lg font-bold">${item?.book.price?.toFixed(2)}</p>
            </div>
            
          </li>
        ))}
      </ul>
      <h3 className="text-2xl font-bold mt-4"></h3>
      
    </div>
  );
}

export default MyOrders;
