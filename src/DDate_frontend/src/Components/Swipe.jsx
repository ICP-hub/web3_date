import React, { useState, useMemo, useRef, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import TinderCard from "react-tinder-card";
import SidebarComponent from "./SidebarComponent";
import "./Swipe.css";
import { Principal } from "@dfinity/principal";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import SwipeBottomBar from "./SwipeBottomBar";
import Loader from "./Loader";
import logo from "../../assets/Images/SwapImage/slideLogo1.svg";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuthClient';
import { faClose, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const itemPerPages = 10;

function Swipe() {
  const { backendActor } = useAuth();
  const location = useLocation();
  const userId = location.state;

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await backendActor.get_an_account(userId);
        console.log('get_an_account', result);
      } catch (error) {
        console.error("Error getting data to the backend:", error);
      }
    }
    getData();
  }, [backendActor, userId]);

  const principalString = localStorage.getItem("id");
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  const [db, setSwipeProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [indexxx, setIndexxx] = useState();
  const [match, setMatch] = useState(false);
  const [startLoader, setStartLoader] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [noMatch, setNoMatch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [current, setCurrent] = useState(null);
  const [pageData, setMyPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const handleDislike = () => {
    console.log("Dislike button is clicked");
  };

  const handleLike = () => {
    console.log("Like button is clicked");
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function convertStringToPrincipal(principalString) {
    try {
      return Principal.fromText(principalString);
    } catch (error) {
      console.error("Error converting string to Principal: ", error);
      return null;
    }
  }

  const principal = convertStringToPrincipal(principalString);

  const findMatchesForMe = async (principal) => {
    try {
      await DDate_backend.find_matches_for_me(principal);
      console.log("find_matches_for_me called successfully");
      getMatchedProfiles(principal);
    } catch (error) {
      console.error("Error calling find_matches_for_me:", error);
    }
  };

  useEffect(() => {
    if (principal) {
      setStartLoader(true);
      findMatchesForMe(principal);
    }
  }, [principal]);

  const fetchUserProfile = async (principal) => {
    try {
      return await DDate_backend.get_profile(principal);
    } catch (error) {
      console.error("Error fetching user profile for principal:", principal, error);
      return null;
    }
  };

  useEffect(() => {
    const getAllPages = async () => {
      try {
        const result = await backendActor.get_all_accounts({ page, size });
        if (result && result.Ok && result.Ok.profiles) {
          setMyPageData(prevData => [...prevData, ...result.Ok.profiles]);
        }
      } catch (error) {
        console.error("Error getting pages to the backend:", error);
      }
    };
    getAllPages();
  }, [page, size, backendActor]);

  const fetchAllUserProfiles = async (principals) => {
    setStartLoader(true);
    try {
      const profilesPromises = principals.map((principal) => fetchUserProfile(principal));
      const profiles = await Promise.all(profilesPromises);
      setSwipeProfiles(profiles.filter((profile) => profile !== null));
      setStartLoader(false);
    } catch (error) {
      console.error("Error fetching all user profiles:", error);
    }
  };

  useEffect(() => {
    if (matchedProfiles.length > 0) {
      fetchAllUserProfiles(matchedProfiles);
    }
  }, [matchedProfiles]);

  const closeKrna = () => {
    setNoMatch(false);
  };

  const getMatchedProfiles = async (principal) => {
    try {
      const matchedProfiles = await DDate_backend.get_matched_profiles(principal);
      if (matchedProfiles.length === 0) {
        setNoMatch(true);
      } else {
        setMatchedProfiles(matchedProfiles);
      }
    } catch (error) {
      console.error("Error fetching matched profiles:", error);
    }
  };

  useEffect(() => {
    setCurrentIndex(db.length - 1);
  }, [db]);

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(() => {
    return Array(db.length).fill(0).map(() => React.createRef());
  }, [db.length]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    if (direction === 'right') {
      setSelectedId(db[index].id);
    }
    setIndexxx(index);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (index === 0) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const checkMatch = async (id) => {
    try {
      const isMatch = await DDate_backend.check_user_match(principal, id);
      if (isMatch) {
        setMatch(true);
      }
    } catch (error) {
      console.error("Error in checking match:", error);
    }
  };

  const outOfFrame = (name, idx) => {
    if (currentIndexRef.current >= idx && childRefs[idx] && childRefs[idx].current) {
      childRefs[idx].current.restoreCard();
    }
  };

  const allTenUserId = pageData.map(data => data.user_id);
  let userIndex = 0;

  const swipe = async (dir) => {
    if (canSwipe && currentIndex >= 0 && currentIndex < db.length) {
      const cardRef = childRefs[currentIndex];
      if (cardRef && cardRef.current) {
        await cardRef.current.swipe(dir);
      }

      if (dir === "left") {
        try {
          await backendActor.leftswipe({ swiped_user_id: userId, swiping_user_id: allTenUserId[userIndex] });
        } catch (error) {
          console.error("Error sending data to the backend:", error);
        }
      } else if (dir === "right") {
        try {
          await backendActor.rightswipe({ swiped_user_id: userId, swiping_user_id: allTenUserId[userIndex] });
        } catch (error) {
          console.error("Error sending data to the backend:", error);
        }
      }
      userIndex++;
    }
  };

  const handleCloseModal = () => {
    setMatch(false);
  };

  console.log("I am at pageData this page number ", pageData);

  useEffect(() => {
    setSwipeProfiles(pageData);
  }, [pageData]);

  return (
    <div className="flex flex-col grid-cols-9 h-screen z-10 ">
      <SidebarComponent userId={userId} className="hidden md:block  " />

      {startLoader ? (
        <div className="w-full flex justify-center items-center  ">
          <div className="container flex justify-center">
            <div className="max-w-xs  lg:max-w-lg xl:max-w-xl bg-white h-screen flex items-center justify-center relative ">
              <Loader />
            </div>
          </div>
        </div>
      ) : (<div className="mx-auto md:col-start-5 w-full h-screen flex flex-col items-center absolute  ">
        {
          false
            // db.length === 0
            ? (
              <div className="flex justify-center">


                <div className="max-w-xs md:max-w-md  bg-white h-screen ">
                  <Loader />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center absolute  lg:left-[9%] transform md:left-[9%] transform" >
                {pageData.map((character, index) => (
                  <TinderCard
                    ref={childRefs[index]}
                    className="swipe w-full h-full flex justify-center items-center"
                    key={character.params.name[0]}
                    onSwipe={(dir) => swiped(dir, character.params.name[0], index)}
                    onCardLeftScreen={() => outOfFrame(character.params.name[0], index)}
                  >
                    <div className="h-full  w-full flex flex-col items-center justify-center relative">
                      <img
                        alt="img"
                        // src={character.images[0]}
                        className="h-full w-full  lg:max-w-lg  "
                        style={{ height: "106vh" }}
                      />
                      <div
                        className="bg-black rounded-b-xl w-full  lg:max-w-lg h-[30%] absolute bottom-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgb(0, 0, 0) 50%, rgba(255, 255, 255, 0) 100%)",
                        }}
                      >
                      </div>
                      {/* <div className="pl-4 md:bottom-16 bottom-[8rem] absolute z-20 justify-center "> */}
                      <div className="z-20 md:-ml-[17.5rem]  dsx:-ml-[14rem] -ml-[12rem] md:bottom-16 bottom-[4rem] absolute">
                        <h2 className="text-4xl font-bold text-white  mb-2 ">
                          {character.params.name[0]}
                        </h2>
                        <p className="text-lg text-gray-700 font-bold ">
                          {character.params.location[0]}
                        </p>

                        <p className="mt-2 font-bold text-white mb-6 ">
                          {character.params.introduction[0]}
                        </p>
                        {match && (
                          <ProfileModal
                            profile={db[indexxx]}
                            indexxx={indexxx}
                            onClose={handleCloseModal} />
                        )}
                      </div>
                    </div>
                  </TinderCard>
                ))}
              </div>
            )}
        <div className="flex gap-4  p-6  absolute bottom-[0%]  w-full justify-center z-30  ">
          <button
            className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-pink-700 hover:bg-red-300 font-bold text-gray-800 "
            onClick={() => swipe("left")}
            disabled={db.length === 0}
          >
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: db.length === 0 ? "#b2b2b2" : "#fd5068" }}
            />
          </button>
          <button
            className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-green-700 hover:bg-green-700 font-bold text-gray-800"
            onClick={() => swipe("right")}
            disabled={db.length === 0}
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: db.length === 0 ? "#b2b2b2" : "#1be4a1" }}
            />
          </button>
        </div>

      </div>
      )}
    </div>
  );

}

export default Swipe;

