import React from "react";
import Hero from "../Components/Hero/Hero";
import Info from "../Components/Info";
import Explore from "../Components/Explore";
import MemberStatistics from "../Components/MemberStatistics";
import Feedback from "../Components/Feedback";
import Footer from "../Components/Footer";
import { useAuth } from "./auth/useAuthClient";
const HomePage = () => {
  const { reloadLogin, isAuthenticated } = useAuth();
  useEffect(() => {
    reloadLogin();
  })
  return (
    <div >
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
