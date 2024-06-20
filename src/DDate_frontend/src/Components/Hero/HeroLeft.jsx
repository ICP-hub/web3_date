import React from "react";
import heroLeft from "../../../assets/Images/heroLeft.png";
import logo from "../../../assets/Images/CreateAccount/logo.png"

const HeroLeft = () => {
  return (
    <div className="w-full lg:w-2/5 h-full relative">
      <img src={heroLeft} alt="heroLeft" className="object-cover " />
      
    <img 
        src={logo}
        alt="Logo" 
        className="h-16 w-16 lg:h-18 lg:w-18 mb-4 absolute top-5 left-5 lg:top-8 lg:left-8" 
      />
    </div>
  );
};

export default HeroLeft;
