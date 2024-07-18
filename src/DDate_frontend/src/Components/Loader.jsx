import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="load ipad:top-[25%] left-2/5 ">
      <div className=" rounded-full flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="48"
          viewBox="0 0 18 33"
          fill="none"
        >
          <path
            d="M16.1475 29.4413V3.94126C3.74746 -1.65874 1.31413 6.10857 2.14746 11.4419C2.94746 16.2419 12.1475 25.9413 16.1475 29.4413Z"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="48"
          viewBox="0 0 18 33"
          fill="none"
        >
          <path
            d="M2 29.4413V3.94126C14.4 -1.65874 16.8333 6.10857 16 11.4419C15.2 16.2419 6 25.9413 2 29.4413Z"
            stroke="#000000"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
}

export default Loader;
