
import React, { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import CreateAccount1 from "./Components/Hero/CreateAccount1";
import Swipe from "./Components/Swipe";
import Profile from "./Components/Profile";
import Notification from "./Components/Notification";
import ChattingPage from "./Components/Chatting/ChattingPage";
import ProfileViewer from "./Components/ProfileViewer";
import ChattingSinglePage from "./Components/Chatting/ChattingSinglePage";
import EditProfile from "./Components/EditProfile/EditProfile"



const AllRoutes = () => {

  const [finalMatch, setFinalMatch] = useState([]);

  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/CreateAccount1" element={<CreateAccount1 />} />
          <Route path="/Swipe" element={<Swipe />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/ChattingPage" element={<ChattingPage finalMatch={finalMatch} />} />
          <Route path="/ChattingSinglePage/:chatId" element={<ChattingSinglePage />} />

          <Route path="/profile/:senderId" element={<ProfileViewer finalMatch={finalMatch} setFinalMatch={setFinalMatch} />} />

        </Routes>
    </>
  );
};

export default AllRoutes;

