import React from "react";
import Hero from "../Components/Hero/Hero";
import Info from "../Components/Info";
import Explore from "../Components/Explore";
import MemberStatistics from "../Components/MemberStatistics";
import Feedback from "../Components/Feedback";
import Footer from "../Components/Footer";

const HomePage = () => {
  return (
    <div className=" sm:px-0 lg:px-0">
      <Hero />
      <Info />
      <Explore />
      <MemberStatistics />
      <Feedback />
      <Footer />
    </div>
  );
};

export default HomePage;
