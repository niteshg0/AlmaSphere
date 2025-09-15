import React, { useState } from "react";
import { AiFillDownCircle } from "react-icons/ai";

const FilterCard = ({ title, value, onChange, options }) => {
  const [rotate, setRotate] = useState(false);
  const handleClick = (val) => {
    setRotate((p) => !p);
    onChange(val)
  };
  return (
    <div className="group relative overflow-hidden rounded-3xl">
      {/* Fixed hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-purple-500/30 via-cyan-500/20 to-blue-500/30 blur-xl" />

      <div className="relative px-2 py-4 bg-black backdrop-blur-xl rounded-3xl group-hover:border-gray-600/60 transition-colors duration-300">
        <h3 className="text-xl font-bold text-gray-100 mb-4">{title}</h3>
        <div
          className="rounded-3xl text-white py-2 px-4 border flex cursor-pointer justify-between items-center border-gray-800"
          onClick={(e) => handleClick("")}
        >
          <h2 className="">{value ? `${value}` : `Select ${title}`}</h2>
          <span className="bg-white border border-black text-black rounded-full w-4 h-4">
            <div
              className={`w-full h-full ${
                rotate ? "-rotate-180" : "-rotate-0"
              } transition-transform duration-300`}
            >
              <AiFillDownCircle height={8} width={8} />
            </div>
          </span>
        </div>
        {rotate && (
          <div className="max-h-[200px] overflow-scroll scroll-m-0">
            <ul className="text-white flex flex-col my-3 justify-center text-center gap-3 items-center transition-all duration-300">
              {options.map((p) => (
                <li
                  className="w-full border cursor-pointer border-gray-800 py-2 px-4 rounded-3xl bg-gradient-to-r from-black via-black to-gray-700/50"
                  key={p}
                  onClick={(e) => handleClick(p)}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterCard;
