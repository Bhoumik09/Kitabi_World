import React, { useEffect, useState } from "react";
import GenreCollection from "../Pages/Cards/GerneCollection"; // Ensure the correct import path
import NavMain from "../Pages/UserPages/NavMain";
import SearchPageUser from "../Pages/UserPages/SeachPageUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserSession } from "../../actions/authActions";
import Biography from "../../assets/Biography.jpeg.jpg";
import child from "../../assets/child.webp";
import Cookbooks from "../../assets/Cookbooks.webp";
import Fantasy from "../../assets/Fantasy.webp";
import Fiction from "../../assets/Fiction.jpg";
import Horror from "../../assets/Horror.jpg";
import Mystery from "../../assets/Mystery.jpg";
import Poetry from "../../assets/Poetry.webp";
import Romance from "../../assets/Romance.avif";
function EmployeeDashBoard() {
  // Get the entire user state1 q
  const isAdmin = null || useSelector((state) => state.auth);
  console.log(useSelector((state) => state.purchase));

  const [dataArr, setDataArr] = useState(null);
  const assignData = async ({ data }) => {
    setDataArr(data);
  };

  const emp = [
    { name: "Fiction", image: Fiction },
    { name: "Fantasy", image: Fantasy },
    { name: "Poetry", image: Poetry },
    { name: "Romance", image: Romance },
    { name: "Horror", image: Horror },
    { name: "Mystery", image: Mystery },
    { name: "Cookbooks", image: Cookbooks },
    { name: "Biography", image: Biography },
    
  ];

  return (
    <div className="flex bg-gray-100 h-screen flex-col overflow-x-scroll">
      <NavMain assignData={assignData} />

      {dataArr !== null ? (
        // Render data if available
        <SearchPageUser books={dataArr} />
      ) : (
        // Default background section if data is null
        <div>
          <div className="relative h-[450px] w-screen">
            <div className="background-image relative z-10 h-[450px]">
              <style>{`
              .background-image::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('https://cdn.wallpapersafari.com/0/0/wafE2B.jpg');
                background-size: cover;
                background-position: center;
                opacity: 0.2;
                z-index: 0;
              }
            `}</style>

              <div className="grid lg:grid-cols-2 sm:grid-cols-1 h-full">
                <div className="p-4 flex flex-col justify-center items-center">
                  <h2 className="lg:text-5xl md:text-3xl sm:text-xl text-neutral-950 font-bold mb-4">
                    Discover Great Read
                  </h2>
                  <p className="text-center font-semibold z-50">
                    Explore a curated collection of eBooks across various genres
                    and immerse yourself in a world of stories and knowledge.
                    Your next adventure awaits.
                  </p>
                </div>
                <div className="w-full text-black font-bold  lg:h-[450px] hidden lg:visible lg:flex justify-end z-40">
                  <img
                    className="h-full"
                    src={`${child}`}
                    alt="Reading Book Background"
                  />
                </div>
              </div>
            </div>
          </div>

          <main className="flex flex-col">
            <h1 className="font-bold text-3xl m-5">Popular Genre</h1>
            <div className="flex flex-wrap gap-4 justify-center p-9">
              {emp.map((genre, index) => (
                <GenreCollection
                  key={index}
                  name={genre.name}
                  image={genre.image}
                  assignData={assignData}
                />
              ))}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashBoard;
