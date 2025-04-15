import axios from "axios";
import React from "react";
import { backend } from "../../../App";

function GenreCollection({ name, assignData, image }) {
  let searchByGerne = async (name) => {
    let data = await axios.get(`${backend}/books/`, {
      params: {
        search: name,
      },
    });
    assignData(data);
  };

  return (
    <div
      onClick={() => searchByGerne(name)}
      className="relative border-white border-4 w-1/3 lg:w-1/4 xl:2-1/5  h-52 shadow-lg transition-all hover:scale-[102%] rounded-3xl overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain bg-center rounded-3xl"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      {/* Overlay for darkening effect */}
      <div className="absolute inset-0 bg-black opacity-30 rounded-3xl"></div>

      {/* Centered Text */}
      <div className="relative flex justify-center items-center h-full ">
        <p className="text-white text-lg font-semibold  bg-black bg-opacity-50 px-4 py-1 rounded-lg w-full text-center">
          {name}
        </p>
      </div>
    </div>
  );
}

export default GenreCollection;
