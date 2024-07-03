import React from "react";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
import Swipe from "../Chatting/ChattingSinglePage";
const Hero = () => {
  return (
    <div className="px-0 w-full">
      <div className="flex flex-col lg:flex-row w-full h-auto">
        <HeroLeft />
        <HeroRight />
      </div>
    </div>
  );
};

export default Hero;
