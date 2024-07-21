import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "../SidebarComponent";
import back from "../../../assets/Images/CreateAccount/back.svg";
import Loader from "../Loader";
import ChattingPageformessage from "./ChattingPageformessage";
import { useAuth } from "../../auth/useAuthClient";
const ChattingPageforNotification = ({ userId, chatList }) => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState([]);
  const { principal } = useAuth();

  // Fetch chat history on component mount
  // useEffect(() => {
  //   const fetchChatHistory = async () => {
  //     setLoading(true);
  //     console.log("api call ho rhi h ");
  //     try {
  //       const formdata = new FormData();
  //       formdata.append("x-principal", principal);
  //       formdata.append("x-private-token");

  //       const requestOptions = {
  //         method: "POST",
  //         body: formdata,
  //         redirect: "follow",
  //       };
  //       const response = await fetch(
  //         "https://ddate.kaifoundry.com/api/v1/chat/history"
  //       ); // Adjust the endpoint according to your API
  //       console.log("response", response);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setChatHistory(data.historyUsers);
  //     } catch (error) {
  //       console.error("Error fetching chat history:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchChatHistory();
  // }, []);
  let privateToken = localStorage.getItem("privateToken");
  console.log("privateToken", privateToken);
  // Fetch specific user messages when a profile is selected
  useEffect(() => {
    if (selectedProfile) {
      const fetchUserMessages = async () => {
        setLoading(true);
        try {
          const principalString = principal.toText();
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            "x-principal": principalString,
            "x-private-token": privateToken,
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          const response = await fetch(
            `https://ddate.kaifoundry.com/api/v1/chat/${principalString}/${selectedProfile?.chat_id}`,
            requestOptions
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log("Fetched data:", data);
          if (data) {
            setMessages(data?.messages);
            setStatus(data?.status);
          } else {
            setMessages(null);
            setStatus(null);
          }
          // Process and set the messages here, e.g., setMessages(data.messages);
        } catch (error) {
          console.error("Error fetching user messages:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserMessages();
    }
  }, [selectedProfile]);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleBackClick = () => {
    setSelectedProfile(null);
    setMessages([]); // Clear messages when going back
  };

  return (
    <>
      <div className="lg:col-span-3 px-6 lg:px-0 border-l-4 grow-1 max-h-[100vh] overflow-y-auto">
        {/* Sidebar - hidden on smaller screens */}
        <div className="hidden md:block md:col-span-2"></div>

        {/* Left side - takes 40% of the width */}
        <div
          className={`col-span-12 ${
            selectedProfile ? "md:col-span-4" : "md:col-span-10"
          } px-6 lg:px-10  ${selectedProfile ? "hidden md:block" : ""}`}
        >
          <div className="flex items-center md:mt-10  gap-2 mb-4">
            <img
              src={back}
              alt="back"
              onClick={() => navigate("/Swipe", { state: userId })}
              className="w-4 h-4 cursor-pointer"
            />
            <div className="ml-2 text-lg font-medium">Your Messages</div>
          </div>

          <div className="">
            <div className="relative flex justify-center items-center w-full mb-8 mt-8">
              <p className="border-t border-black w-full md:w-3/4 lg:w-2/3"></p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 20 19"
                fill="none"
                className="absolute text-black z-10"
              >
                <path
                  d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="border-b border-gray-300">
              {/* Search or title bar */}
              <div className="flex items-center p-4 bg-white">
                <input
                  className="flex-grow py-2 px-4 border bg-gray-200 rounded-full"
                  type="text"
                  placeholder="Search by name"
                />
              </div>

              <div className="bg-white">
                {loading ? (
                  <Loader />
                ) : (
                  chatList.map((pro, index) => (
                    <div key={index}>
                      {console.log("pro", pro)}
                      <div
                        className="flex items-center p-3 md:p-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleProfileClick(pro)}
                      >
                        <img
                          src={pro?.image?.[0]}
                          alt={pro?.name}
                          className="w-10 h-10 md:w-10 md:h-10 rounded-full mr-3 md:mr-4"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{pro?.name}</span>
                          <span className="text-gray-600 text-ellipsis">
                            {pro?.content}
                          </span>
                        </div>
                      </div>
                      {index !== chatList.length - 1 && (
                        <hr className="border-gray-300" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - ChattingPageformessage takes 60% of the width */}
        {selectedProfile && (
          <div className="col-span-12 md:col-span-6 flex h-screen">
            <ChattingPageformessage
              profile={selectedProfile}
              onBack={handleBackClick}
              messages={messages}
              status={status}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChattingPageforNotification;
