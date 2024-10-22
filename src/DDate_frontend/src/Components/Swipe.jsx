import React, { useState, useMemo, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuthClient";
import TinderCard from "react-tinder-card";
import SidebarComponent from "./SidebarComponent";
import ProfileModal from "./ProfileModal";
import SwipeBottomBar from "./SwipeBottomBar";
import Loader from "./Loader";
import Nodatacard from "../Components/Nodatacard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Swipe.css";

const Swipe = () => {
  const { backendActor } = useAuth();
  // const location = useLocation();
  // const userId = location.state;

  const userId = localStorage.getItem("userId")
  console.log("uid fetch from localstorage : ". userId)

  const [getAccountresult, setGetAccountresult] = useState();
  const [db, setSwipeProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [indexxx, setIndexxx] = useState();
  const [match, setMatch] = useState(false);
  const [startLoader, setStartLoader] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pageData, setMyPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [swipeStatus, setSwipeStatus] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [isSwipeInProgress, setIsSwipeInProgress] = useState(false);

  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    [db.length]
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await backendActor.get_an_account(userId);
        console.log("we git our account :: ", result.Ok.params.images[0]);
        localStorage.setItem("profilePic",result.Ok.params.images[0])
        setGetAccountresult(result);
      } catch (error) {
        console.error("Error getting data from the backend:", error);
      }
    };
    getData();
  }, [backendActor, userId]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getAllPages();
  }, [userId, page, size, backendActor]);

  const getAllPages = async () => {
    try {
      setLoading(true);
      const result = await backendActor.get_all_accounts(userId, {
        page,
        size,
      });
      // const res = await backendActor.get_all()
      // console.log("new res : ", res.Ok)
      if (result?.Ok?.profiles) {
        setMyPageData((prevData) => [...prevData, ...result.Ok.profiles]);
      // console.log("all profilesss : ", [...pageData,...result.Ok.profiles])
      // if (res?.Ok) {
      //   setMyPageData((prevData) => [...prevData, ...res.Ok[1]])
      }
      console.log("get_all_accounts: ", result);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setCurrentIndex(db.length - 1);
  }, [db]);

  useEffect(() => {
    setSwipeProfiles(pageData);
  }, [pageData]);

  useEffect(() => {
    if (swipeStatus === "Nope" || swipeStatus === "Liked") {
      setAnimate(true);
    }
  }, [swipeStatus]);

  const handleDislike = () => {
    setSwipeStatus("Nope");
    hideStatusTextAfterDelay();
    swipe("left");
  };

  const handleLike = () => {
    setSwipeStatus("Liked");
    hideStatusTextAfterDelay();
    swipe("right");
  };

  const hideStatusTextAfterDelay = () => {
    setTimeout(() => setSwipeStatus(null), 500);
  };

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = async (direction, nameToDelete, index, receiver_id) => {
    if (direction === "right") {
      setSelectedId(db[index].id);
      console.log("sender_id", userId);
      console.log("receiver_id", receiver_id);
      console.log("Right swipe successfully")
      try {
        const right = await backendActor.rightswipe({
          receiver_id: receiver_id,
          sender_id: userId,
        });

        console.log("right: ", right);
      } catch (error) {
        console.error("Error sending data to the backend:", error);
      }
    } else if (direction === "left") {
      try {
        const left = await backendActor.leftswipe({
          receiver_id: receiver_id,
          sender_id: userId,
        });
        console.log("left: ", left);
      } catch (error) {
        console.error("Error sending data to the backend:", error);
      }
    }
    setIndexxx(index);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    setIsSwipeInProgress(false);
    if (index === 0) {
      setPage((prevPage) => prevPage + 1);
    }
    getAllPages();
  };

  const outOfFrame = (name, idx) => {
    if (currentIndexRef.current >= idx && childRefs[idx]?.current) {
      childRefs[idx].current.restoreCard();
    }
  };

  const allTenUserId = pageData.map((data) => data.user_id);
  let userIndex = 0;

  const swipe = async (dir) => {
    if (canSwipe && currentIndex >= 0 && currentIndex < db.length) {
      setIsSwipeInProgress(true);
      const cardRef = childRefs[currentIndex];
      if (cardRef?.current) {
        await cardRef.current.swipe(dir);
      }
      userIndex++;
      setMyPageData((prevData) => {
        const newData = [...prevData];
        newData.splice(currentIndex, 1);
        return newData;
      });
    }
  };

  const handleCloseModal = () => {
    setMatch(false);
  };

  const getData = async () => {
    console.log("Generated Id", userId);
    try {
      await backendActor.get_an_account(userId).then((userProfileData) => {
        if (userProfileData) {
          const myData = userProfileData?.Ok?.params;
          

          // console.log(formattedDateStr);
          if (myData) {
            console.log("Image got on swipe : ", myData?.images[0])            
          } 
        }
      });
    } catch (error) {
      console.error("Error getting data to the backend:", error);
    }
  };


  return (
    <div className="flex flex-col grid-cols-9 h-screen z-10">
      <SidebarComponent userId={userId} className="hidden " />
      {startLoader ? (
        <Loader />
      ) : (
        <div className="h-full w-full flex flex-col items-center absolute lg:left-[9%] md:left-[9%]">
          {pageData.length === 0 ? (
            <Nodatacard />
          ) : (
            pageData.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe h-full w-full flex justify-center items-center"
                key={character.params.name[0]}
                onSwipe={(dir) =>
                  swiped(
                    dir,
                    character.params.name[0],
                    index,
                    character?.user_id
                  )
                }
                onCardLeftScreen={() =>
                  outOfFrame(character.params.name[0], index)
                }
              >
                <div className="h-full w-full lg:max-w-lg flex flex-col items-center justify-center relative">
                  <img
                    alt="img"
                    // src="https://cdn.pixabay.com/photo/2022/01/17/22/20/add-6945894_640.png"
                    src={character.params.images[0]}
                    loading="lazy"
                    className="h-full w-full lg:max-w-lg"
                  // style={{ height: "106vh" }}
                  />
                  <div
                    className="w-full lg:max-w-lg h-[30%] absolute bottom-0"
                    style={{
                      background:
                        // "linear-gradient(to top, rgb(0, 0, 0) 50%, rgba(255, 255, 255, 0) 100%)",
                        "linear-gradient(0deg, rgba(115, 134, 133, 0.5) 50%, rgba(255, 255, 255, 0) 100%)"
                    }}
                  ></div>
                  <div className="z-20 px-10 md:bottom-16 bottom-[4rem] absolute left-0">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {character.params.name[0]}
                    </h2>
                    <p className="text-lg text-white font-bold">
                      {character.params.location_city[0] + " " + character.params.location_state[0]}
                    </p>
                    <p className="mt-2 font-bold text-white line-clamp-1 hover:line-clamp-none mb-6">
                      {character.params.introduction[0]}
                    </p>
                    {match && (
                      <ProfileModal
                        profile={db[indexxx]}
                        indexxx={indexxx}
                        onClose={handleCloseModal}
                      />
                    )}
                  </div>
                </div>
              </TinderCard>
            ))
          )}
          <div className="flex gap-4 p-6 absolute bottom-[0%] w-full justify-center z-30">
            <button
              className="rounded-full h-12 w-12 bg-transparent shadow-md text-3xl border border-pink-700 hover:bg-red-300 font-bold text-gray-800"
              onClick={handleDislike}
              disabled={isSwipeInProgress || db.length === 0}
            >
              <FontAwesomeIcon
                icon={faClose}
                style={{ color: db.length === 0 ? "#b2b2b2" : "#fd5068" }}
              />
            </button>
            <button
              className="rounded-full h-12 w-12 bg-transparent shadow-md text-3xl border border-green-700 hover:bg-green-700 font-bold text-gray-800"
              onClick={handleLike}
              disabled={isSwipeInProgress || db.length === 0}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: db.length === 0 ? "#b2b2b2" : "#1be4a1" }}
              />
            </button>
          </div>
          {swipeStatus === "Nope" && (
            <div
              className={`status-text text-white font-bold text-3xl z-10 absolute top-4 p-3 bg-red-500 rounded-full shadow-lg popup-content status-text-container ${animate ? "zoom-out" : ""
                }`}
            >
              {swipeStatus}
            </div>
          )}
          {swipeStatus === "Liked" && (
            <div
              className={`status-text text-white font-bold text-3xl z-10 absolute top-4 p-3 bg-green-500 rounded-full shadow-lg popup-content status-text-container ${animate ? "zoom-out" : ""
                }`}
            >
              {swipeStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Swipe;
