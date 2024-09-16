import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import back from "../../assets/Images/CreateAccount/back.svg";
import Loader from "./Loader";
import { useAuth } from "../auth/useAuthClient";
import { useLocation } from "react-router-dom";
import ChattingPageforNotification from "./Chatting/ChattingPageforNotification";
import { nodeBackendUrl } from "../DevelopmentConfig";

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [selectedUserPrincipal, setSelectedUserPrincipal] = useState(null);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]); // State to store fetched profiles
  const [chatList, setChatList] = useState([]);
  const location = useLocation();
  const userId = location.state;
  const { backendActor, principal } = useAuth();
  // console.log("UserId",userId)
  const [page, setpage] = useState(1);
  const [size, setsize] = useState(10);


  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true);
      console.log("Call chat history api ");
      try {
        // const formdata = new FormData();
        // formdata.append("x-principal", principal);
        // formdata.append("x-private-token", privateToken);
        // const requestOptions = {
        //   method: "POST",
        //   body: formdata,
        //   redirect: "follow",
        // };


        const privToken = localStorage.getItem("privateToken")
        console.log(privToken)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        const principalString = principal.toText()


        const raw = JSON.stringify({
          "x-principal": principalString,
          "x-private-token": privToken,
          userId,
        })


        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };


        const response = await fetch(
          // "https://ddate.kaifoundry.com/api/v1/chat/history"
          `${nodeBackendUrl}/api/v1/chat/history`, requestOptions
        ); // Adjust the endpoint according to your API
        console.log("chat history response", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.historyUsers)
        let newArr = []
        for (let i = 0; i < data.historyUsers?.length > 0; i++) {
          let otherUser = data?.historyUsers[i]?.from_user_id
          if (data?.historyUsers[i]?.from_user_id == userId) {
            otherUser = data?.historyUsers[i]?.to_user_id
          }
          let userData = await backendActor.get_an_account(otherUser)
          if (userData?.Ok == undefined) {
            continue
          }
          console.log("history userdata : ", userData?.Ok)
          newArr.push({ id: otherUser, name: userData?.Ok?.params?.name[0], images: userData?.Ok?.params?.images[0], chat_id: `chat-${userId}-${otherUser}` })
        }
        console.log("newarr", newArr)
        setChatList(newArr);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchChatHistory();
  }, []);


  useEffect(() => {
    const fetchedprofiledata = async () => {
      setLoading(true);
      try {
        // console.log("userid 76====>>>>> ", userId);
        // console.log("page number ", page);
        // console.log("size of content", size);
        const result = await backendActor.get_rightswiped_matches(
          userId,
          page,
          size
        );
        // console.log("get_fetchedprofile", result?.Ok?.paginated_profiles);
        // console.log("get_fetchedprofile", result?.Ok?.total_matches);
        if (result && result?.Ok) {
          setProfiles(result?.Ok?.paginated_profiles);
          setLoading(false);
          setNoData(false);
        } else {
          setNoData(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error getting data to the backend:", error);
      }
    };
    fetchedprofiledata();
  }, [backendActor, userId, page, size]);
  const addChatList = async (user_id) => {
    try {
      console.log("user id addCHatList : ", user_id)
      const result = await backendActor.add_user_to_chatlist(user_id);
      console.log("add_user_to_chatlist", result);
      if (result && result?.Ok) {
        setChatList(result?.Ok);
      } else {
        console.log(result?.Err);
      }
    } catch (error) {
      console.error("Error getting data to the backend:", error);
    }
  };

  // ------retrieve_notifications_for_user------
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     setLoading(true);
  //     try {
  //       const notificationData =
  //         await backendActor.retrieve_notifications_for_user(userId);
  //       setNotifications(notificationData);
  //       console.log("notificationData", notificationData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch notifications:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchNotifications();
  // }, [backendActor]);

  const handleNotificationClick = (senderId) => {
    // console.log(
    //   "sender id I am getting on click of your matches profile !@!",
    //   senderId,
    //   "we will navigate to this^^&&"
    // );

    setSelectedUserPrincipal(senderId);
    navigate(`/profile/${senderId}`);
  };

  // const notificationElements = notifications.map((notification, index) => (
  //   <div
  //     key={index}
  //     className="notification-item"
  //     onClick={() => handleNotificationClick(notification.sender_id)}
  //   >
  //     {/* Uncomment and use an actual image source for the profile picture */}
  //     {/* <img src={profilePicUrl} alt={`User ${notification.sender_id}`} className="notification-profile-pic" /> */}
  //     <p className="notification-text">Someone liked your profile</p>
  //   </div>
  // ));

  return (
    <>
      <SidebarComponent userId={userId} />

      {loading ? (
        <div className="sm:ml-64">
          <div className="container flex justify-center">
            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white h-screen">
              <div className="h-screen">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen grid grid-cols-10">
          {/* Sidebar - hidden on smaller screens */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Main content area */}
          <div className="col-span-12 md:col-span-8 grid grid-cols-1 lg:grid-cols-5">
            {/* Matches Column */}
            <div className=" lg:col-span-2 max-h-[100vh] overflow-y-auto">
              <div className="flex items-center md:mt-10 ml-8 gap-2 mb-4  ">
                <img
                  src={back}
                  alt="back"
                  onClick={() => navigate("/Swipe", { state: userId })}
                  className="w-4 h-4 cursor-pointer"
                />
                <div className="ml-2 text-lg font-medium">Your Matches</div>
              </div>
              <div className="px-6 xl2:px-12">
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
                <div>
                  {noData ? (
                    <div className="flex justify-center h-[280px] items-center text-center">
                      No Data
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm3:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl4:grid-cols-3 gap-4">
                      {profiles.map((profile, index) => (
                        <div
                          key={index}
                          className="relative w -[230px] h-[280px] "
                          onClick={() =>
                            // addChatList(p => [...p, { ...profile?.matched_profiles?.[0], images: profile?.matched_profiles?.[0]?.image }])
                            addChatList(profile?.matched_profiles?.[0])
                          }
                        >
                          {console.log(profile)}
                          <img
                            className="rounded-[20px] w-full h-full"
                            src="https://cdn.pixabay.com/photo/2022/01/17/22/20/add-6945894_640.png" // {profile.images[0]}
                            alt={
                              // "chirag photo"
                              profile?.params?.name
                            }
                          />
                          <div className="flex items-center justify-between">
                            <div className="absolute bg-yellow-400 m-3 bottom-0 flex h-[41px] items-center justify-center right-0 rounded-full w-[41px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                viewBox="0 0 512 512"
                              >
                                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                              </svg>
                            </div>
                            <div className="absolute bottom-0 p-2 w-9/12 font-medium text-black text-center text-lg">
                              <span className="line-clamp-1 hover:line-clamp-none hover:block text-left w-full">
                                {profile?.params?.name}
                                {/* chirag sangwan */}
                              </span>
                              <span className="flex justify-start">
                                {Number(profile?.params?.age)}
                                {/* 22 */}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <ChattingPageforNotification userId={userId} chatList={chatList} />
          </div>
        </div>
      )}
    </>
  );
};
export default Notification;