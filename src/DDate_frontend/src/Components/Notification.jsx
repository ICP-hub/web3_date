import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate } from "react-router-dom";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";
import back from "../../assets/Images/CreateAccount/back.svg";
import Loader from "./Loader";
import { useAuth } from "../auth/useAuthClient";
import { useLocation } from "react-router-dom";
import ChattingPageforNotification from "./Chatting/ChattingPageforNotification";

const fetchedProfiles = [
  {
    id: 1,
    name: "John Doe",
    images: ["https://via.placeholder.com/150"],
  },
  {
    id: 2,
    name: "Jane Smith",
    images: ["https://via.placeholder.com/150"],
  },
  {
    id: 3,
    name: "Alice Johnson",
    images: ["https://via.placeholder.com/150"],
  },
];

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [selectedUserPrincipal, setSelectedUserPrincipal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]); // State to store fetched profiles
  const auth = useAuth();
  // console.log(auth);
  const { backendActor } = useAuth();
  const location = useLocation();
  const userId = location.state;
  // console.log("UserId",userId)
  const [page, setpage] = useState(1);
  const [size, setsize] = useState(10);
  useEffect(() => {
    const fetchProfiles = async () => {
      const fetchedProfiles = [];

      for (const notification of notifications) {
        try {
          setLoading(true);
          // Fetch the profile using the sender_id from the notification
          const profile = await DDate_backend.get_profile(
            notification.sender_id
          );
          fetchedProfiles.push(profile);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          setLoading(false);
        }
      }

      setProfiles(fetchedProfiles);
    };

    if (notifications.length > 0) {
      fetchProfiles();
    }
  }, [notifications]);

  useEffect(() => {
    const fetchedprofiledata = async () => {
      try {
        // console.log("userid 76====>>>>> ", userId);
        // console.log("page number ", page);
        // console.log("size of content", size);
        const result = await backendActor.get_rightswiped_matches(
          userId,
          page,
          size
        );
        // console.log("get_fetchedprofile", result);
      } catch (error) {
        console.error("Error getting data to the backend:", error);
      }
    };
    fetchedprofiledata();
  }, [backendActor, userId, page, size]);
  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       console.log("User ID: ", userId);
  //       console.log("Page number: ", page);
  //       console.log("Size of content: ", size);

  //       const result = await backendActor.get_rightswiped_matches(userId, page, size);

  //       if (result && result.Ok && result.Ok.profiles) {
  //         setMyPageData(prevData => [...prevData, ...result.Ok.profiles]);
  //       } else if (result && result.Err) {
  //         console.error("Error from backend: ", result.Err);
  //         setError(result.Err);
  //       } else {
  //         console.error("Unknown error from backend");

  //       }
  //     } catch (error) {
  //       console.error("Error getting data from the backend: ", error);

  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   setLoading(true);
  //   fetchProfileData();
  // }, [backendActor, userId, page, size]);

  const principalString = localStorage.getItem("id");
  // console.log("this is principal strinng", principalString);

  function convertStringToPrincipal(principalString) {
    // console.log("conversion pr/incipal is being called");
    try {
      const principal = Principal.fromText(principalString);
      // console.log("Converted Principal: ", principal.toText());
      return principal;
    } catch (error) {
      console.error("Error converting string to Principal: ", error);
      return null;
    }
  }

  // const principal = convertStringToPrincipal(principalString); //principal

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const notificationData =
          await backendActor.retrieve_notifications_for_user(principal);
        setNotifications(notificationData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [backendActor]);

  // const principalString = "tc7cw-ilo2x-rwqep-gohde-puqog-soeyv-szxvv-ybcgw-lbrkl-sm7ab-wae";

  // const principalString = localStorage.getItem("id");
  // console.log("this is principal strinng", principalString);

  function convertStringToPrincipal(principalString) {
    // console.log("conversion principal is being called");
    try {
      const principal = Principal.fromText(principalString);
      // console.log("Converted Principal: ", principal.toText());
      return principal;
    } catch (error) {
      console.error("Error converting string to Principal: ", error);
      return null;
    }
  }

  const principal = convertStringToPrincipal(principalString); //principal

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const notificationData =
          await DDate_backend.retrieve_notifications_for_user(principal);
        setNotifications(notificationData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // console.log(
  //   "these are the notification Which I have got in the array",
  //   notifications
  // );
  // console.log("profiles from where notifications are received!!!", profiles);

  // Handler for when a notification is clicked
  const handleNotificationClick = (senderId) => {
    // console.log(
    //   "sender id I am getting on click of your matches profile !@!",
    //   senderId,
    //   "we will navigate to this^^&&"
    // );

    setSelectedUserPrincipal(senderId);
    // You can then pass 'selectedUserPrincipal' to the getProfileComponent or navigate to a route that handles it
    navigate(`/profile/${senderId}`); // This is just an example. Replace with your actual routing logic.
  };

  const notificationElements = notifications.map((notification, index) => (
    <div
      key={index}
      className="notification-item"
      onClick={() => handleNotificationClick(notification.sender_id)}
    >
      {/* Uncomment and use an actual image source for the profile picture */}
      {/* <img src={profilePicUrl} alt={`User ${notification.sender_id}`} className="notification-profile-pic" /> */}
      <p className="notification-text">Someone liked your profile</p>
    </div>
  ));
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
                  <div className="grid grid-cols-1 sm3:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl4:grid-cols-3 gap-4">
                    {fetchedProfiles.map((profile, index) => (
                      <div
                        key={index}
                        className="relative w -[230px] h-[280px] "
                      >
                        <img
                          className="rounded-[20px] w-full h-full"
                          src="https://cdn.pixabay.com/photo/2022/01/17/22/20/add-6945894_640.png" // {profile.images[0]}
                          alt={
                            // "chirag photo"
                            profile.name
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
                              {profile.name}
                              {/* chirag sangwan */}
                            </span>
                            <span className="flex justify-start">
                              {/* {profile.age} */}
                              22
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <ChattingPageforNotification />
          </div>
        </div>
      )}
    </>
  );
};
export default Notification;
