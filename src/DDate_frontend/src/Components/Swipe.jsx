
// import React, { useState, useMemo, useRef, useEffect } from "react";
// import ProfileModal from "./ProfileModal";
// import TinderCard from "react-tinder-card";
// import SidebarComponent from "./SidebarComponent";
// import "./Swipe.css";
// import { Principal } from "@dfinity/principal";
// import { DDate_backend } from "../../../declarations/DDate_backend/index";
// import SwipeBottomBar from "./SwipeBottomBar";
// import Loader from "./Loader";
// import logo from "../../assets/Images/SwapImage/slideLogo1.svg";
// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../auth/useAuthClient';
// import { faClose, faHeart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Nodatacard from "../Components/Nodatacard";
// const itemPerPages = 10;

// function Swipe() {
//   const { backendActor } = useAuth();
//   const location = useLocation();
//   const userId = location.state;

//   console.log('userId', userId)
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const result = await backendActor.get_an_account(userId);
//         console.log('get_an_account', result);
//       } catch (error) {
//         console.error("Error getting data to the backend:", error);
//       }
//     }
//     getData();
//   }, [backendActor, userId]);

//   const principalString = localStorage.getItem("id");
//   const [matchedProfiles, setMatchedProfiles] = useState([]);
//   const [db, setSwipeProfiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(db.length - 1);
//   const [lastDirection, setLastDirection] = useState();
//   const [indexxx, setIndexxx] = useState();
//   const [match, setMatch] = useState(false);
//   const [startLoader, setStartLoader] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [noMatch, setNoMatch] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [current, setCurrent] = useState(null);
//   const [pageData, setMyPageData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [size, setSize] = useState(10);
//   const [swipeStatus, setSwipeStatus] = useState(null); // State for swipe status
//   const [animate, setAnimate] = useState(false);
//   const [Loading, setLoading] = useState(true);

//   const handleDislike = () => {
//     console.log("Dislike button is clicked");
//     setSwipeStatus("Nope"); // Set swipe status to "Unliked"
//     hideStatusTextAfterDelay();
//     swipe("left");
//   };

//   const handleLike = () => {
//     console.log("Like button is clicked");
//     setSwipeStatus("Liked"); // Set swipe status to "Liked"
//     hideStatusTextAfterDelay();
//     swipe("right");
//   };

//   const hideStatusTextAfterDelay = () => {
//     setTimeout(() => {
//       setSwipeStatus(null); // Reset swipe status after 1 second
//     }, 500);
//   };
//   useEffect(() => {
//     if (swipeStatus === 'Nope' || swipeStatus === "Liked") {
//       setAnimate(true);
//     }
//   }, [swipeStatus]);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   function convertStringToPrincipal(principalString) {
//     try {
//       return Principal.fromText(principalString);
//     } catch (error) {
//       console.error("Error converting string to Principal: ", error);
//       return null;
//     }
//   }

//   const principal = convertStringToPrincipal(principalString);

//   const findMatchesForMe = async (principal) => {
//     try {
//       await DDate_backend.find_matches_for_me(principal);
//       console.log("find_matches_for_me called successfully");
//       getMatchedProfiles(principal);
//     } catch (error) {
//       console.error("Error calling find_matches_for_me:", error);
//     }
//   };

//   useEffect(() => {
//     if (principal) {
//       setStartLoader(true);
//       findMatchesForMe(principal);
//     }
//   }, [principal]);

//   const fetchUserProfile = async (principal) => {
//     try {
//       return await DDate_backend.get_profile(principal);
//     } catch (error) {
//       console.error("Error fetching user profile for principal:", principal, error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const getAllPages = async () => {
//       try {
//         setLoading(true);
//         const result = await backendActor.get_all_accounts(userId, { page, size });
//         console.log('result', result)
//         if (result && result?.Ok && result?.Ok?.profiles) {
//           setMyPageData(prevData => [...prevData, ...result?.Ok?.profiles]);
//         }
//         setLoading(true);
//       } catch (error) {
//         console.error("Error fetching data from backend:", error);
//         setLoading(false);

//       }
//     };

//     getAllPages();
//   }, [userId, page, size, backendActor]);

//   const fetchAllUserProfiles = async (principals) => {
//     setStartLoader(true);
//     try {
//       const profilesPromises = principals.map((principal) => fetchUserProfile(principal));
//       const profiles = await Promise.all(profilesPromises);
//       setSwipeProfiles(profiles.filter((profile) => profile !== null));
//       setStartLoader(false);
//     } catch (error) {
//       console.error("Error fetching all user profiles:", error);
//     }
//   };

//   useEffect(() => {
//     if (matchedProfiles.length > 0) {
//       fetchAllUserProfiles(matchedProfiles);
//     }
//   }, [matchedProfiles]);

//   const closeKrna = () => {
//     setNoMatch(false);
//   };

//   const getMatchedProfiles = async (principal) => {
//     try {
//       const matchedProfiles = await DDate_backend.get_matched_profiles(principal);
//       if (matchedProfiles.length === 0) {
//         setNoMatch(true);
//       } else {
//         setMatchedProfiles(matchedProfiles);
//       }
//     } catch (error) {
//       console.error("Error fetching matched profiles:", error);
//     }
//   };

//   useEffect(() => {
//     setCurrentIndex(db.length - 1);
//   }, [db]);

//   const currentIndexRef = useRef(currentIndex);

//   const childRefs = useMemo(() => {
//     return Array(db.length).fill(0).map(() => React.createRef());
//   }, [db.length]);

//   const updateCurrentIndex = (val) => {
//     setCurrentIndex(val);
//     currentIndexRef.current = val;
//   };

//   const canGoBack = currentIndex < db.length - 1;
//   const canSwipe = currentIndex >= 0;

//   const swiped = (direction, nameToDelete, index) => {
//     if (direction === 'right') {
//       setSelectedId(db[index].id);
//     }
//     setIndexxx(index);
//     setLastDirection(direction);
//     updateCurrentIndex(index - 1);
//     if (index === 0) {
//       setPage(prevPage => prevPage + 1);
//     }
//   };

//   const checkMatch = async (id) => {
//     try {
//       const isMatch = await DDate_backend.check_user_match(principal, id);
//       if (isMatch) {
//         setMatch(true);
//       }
//     } catch (error) {
//       console.error("Error in checking match:", error);
//     }
//   };

//   const outOfFrame = (name, idx) => {
//     if (currentIndexRef.current >= idx && childRefs[idx] && childRefs[idx].current) {
//       childRefs[idx].current.restoreCard();
//     }
//   };

//   const allTenUserId = pageData.map(data => data.user_id);
//   let userIndex = 0;

//   const swipe = async (dir) => {
//     if (canSwipe && currentIndex >= 0 && currentIndex < db.length) {
//       const cardRef = childRefs[currentIndex];
//       if (cardRef && cardRef.current) {
//         await cardRef.current.swipe(dir);
//       }

//       if (dir === "left") {
//         try {
//           const left = await backendActor.leftswipe({ receiver_id: userId, sender_id: allTenUserId[userIndex] });
//           console.log("left", left)
//         } catch (error) {
//           console.error("Error sending data to the backend:", error);
//         }
//       } else if (dir === "right") {
//         try {
//           const right = await backendActor.rightswipe({ receiver_id: userId, sender_id: allTenUserId[userIndex] });
//           console.log("right", right)
//         } catch (error) {
//           console.error("Error sending data to the backend:", error);
//         }
//       }
//       userIndex++;
//       setMyPageData(prevData => {
//         const newData = [...prevData];
//         newData.splice(currentIndex, 1);
//         return newData;
//       });

//     }
//   };

//   const handleCloseModal = () => {
//     setMatch(false);
//   };

//   useEffect(() => {
//     setSwipeProfiles(pageData);
//   }, [pageData]);

//   return (
//     <div className="flex flex-col grid-cols-9 h-screen z-10">
//       <SidebarComponent userId={userId} className="hidden md:block" />

//       {startLoader ? (
//         <Loader />
//       ) : (
//         <div className="w-full h-full flex flex-col items-center absolute lg:left-[9%] transform md:left-[9%] transform">
//           {pageData.length === 0 ? (
//             <Nodatacard />
//           ) : (
//             pageData.map((character, index) => (
//               <TinderCard
//                 ref={childRefs[index]}
//                 className="swipe w-full h-full flex justify-center items-center"
//                 key={character.params.name[0]}
//                 onSwipe={(dir) => swiped(dir, character.params.name[0], index)}
//                 onCardLeftScreen={() => outOfFrame(character.params.name[0], index)}
//               >
//                 <div className="h-full w-full flex flex-col items-center justify-center relative">
//                   <img
//                     alt="img"
//                     src="https://cdn.pixabay.com/photo/2022/01/17/22/20/add-6945894_640.png"
//                     className="h-full w-full lg:max-w-lg"
//                     style={{ height: "106vh" }}
//                   />
//                   <div
//                     className="bg-black rounded-b-xl w-full lg:max-w-lg h-[30%] absolute bottom-0"
//                     style={{
//                       background:
//                         "linear-gradient(to top, rgb(0, 0, 0) 50%, rgba(255, 255, 255, 0) 100%)",
//                     }}
//                   ></div>

//                   <div className="z-20 md:-ml-[12rem] sm2:-ml-[14rem] ipad:-ml-[24rem] -ml-[5rem] md:bottom-16 bottom-[4rem] absolute">
//                     <h2 className="text-4xl font-bold text-white mb-2">
//                       {character.params.name[0]}
//                     </h2>
//                     <p className="text-lg text-gray-700 font-bold">
//                       {character.params.location[0]}
//                     </p>

//                     <p className="mt-2 font-bold text-white mb-6">
//                       {character.params.introduction[0]}
//                     </p>
//                     {match && (
//                       <ProfileModal
//                         profile={db[indexxx]}
//                         indexxx={indexxx}
//                         onClose={handleCloseModal}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </TinderCard>
//             ))
//           )}
//           <div className="flex gap-4 p-6 absolute bottom-[0%] w-full justify-center z-30">
//             <button
//               className="rounded-full h-12 w-12 bg-transparent shadow-md text-3xl border border-pink-700 hover:bg-red-300 font-bold text-gray-800"
//               onClick={() => handleDislike()}
//               disabled={db.length === 0}
//             >
//               <FontAwesomeIcon
//                 icon={faClose}
//                 style={{ color: db.length === 0 ? "#b2b2b2" : "#fd5068" }}
//               />
//             </button>
//             <button
//               className="rounded-full h-12 w-12 bg-transparent shadow-md text-3xl border border-green-700 hover:bg-green-700 font-bold text-gray-800"
//               onClick={() => handleLike()}
//               disabled={db.length === 0}
//             >
//               <FontAwesomeIcon
//                 icon={faHeart}
//                 style={{ color: db.length === 0 ? "#b2b2b2" : "#1be4a1" }}
//               />
//             </button>
//           </div>
//           {swipeStatus === 'Nope' && (
//             <div
//               className={`status-text text-white font-bold text-3xl z-10 absolute top-4 p-3 
//             bg-green-500 rounded-full shadow-lg popup-content status-text-container  ss4:-ml-[17rem]  ipad:-ml-[35rem] lg:-ml-[25rem]  
//             bg-red-500 rounded-full shadow-lg popup-content status-text-container  
//             ${animate ? ' zoom-out' : ''}`}
//             >
//               {swipeStatus}
//             </div>
//           )}
//           {swipeStatus === 'Liked' && (
//             <div
//               className={`status-text text-white font-bold text-3xl z-10 absolute top-4 p-3 
//             bg-green-500 rounded-full shadow-lg popup-content status-text-container  ss4:ml-[17rem] lg:ml-[25rem] ipad:ml-[35rem]  
//             ${animate ? ' zoom-out' : ''}`}
//             >
//               {swipeStatus}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// export default Swipe;
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
import Nodatacard from "../Components/Nodatacard";
const itemPerPages = 10;

function Swipe() {
  const { backendActor } = useAuth();
  const location = useLocation();
  const userId = location.state;

  console.log('userId', userId)
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
  const [swipeStatus, setSwipeStatus] = useState(null); // State for swipe status
  const [animate, setAnimate] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [isSwipeInProgress, setIsSwipeInProgress] = useState(false); // New state to track swipe progress

  const handleDislike = () => {
    console.log("Dislike button is clicked");
    setSwipeStatus("Nope"); // Set swipe status to "Unliked"
    hideStatusTextAfterDelay();
    swipe("left");
  };

  const handleLike = () => {
    console.log("Like button is clicked");
    setSwipeStatus("Liked"); // Set swipe status to "Liked"
    hideStatusTextAfterDelay();
    swipe("right");
  };

  const hideStatusTextAfterDelay = () => {
    setTimeout(() => {
      setSwipeStatus(null); // Reset swipe status after 1 second
    }, 500);
  };
  useEffect(() => {
    if (swipeStatus === 'Nope' || swipeStatus === "Liked") {
      setAnimate(true);
    }
  }, [swipeStatus]);

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
        setLoading(true);
        const result = await backendActor.get_all_accounts(userId, { page, size });
        console.log('result', result)
        if (result && result?.Ok && result?.Ok?.profiles) {
          setMyPageData(prevData => [...prevData, ...result?.Ok?.profiles]);
        }
        setLoading(true);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
        setLoading(false);

      }
    };

    getAllPages();
  }, [userId, page, size, backendActor]);

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
    setIsSwipeInProgress(false); // Re-enable buttons after swipe action
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
      setIsSwipeInProgress(true); // Disable buttons while swipe action is in progress
      const cardRef = childRefs[currentIndex];
      if (cardRef && cardRef.current) {
        await cardRef.current.swipe(dir);
      }

      if (dir === "left") {
        try {
          const left = await backendActor.leftswipe({ receiver_id: userId, sender_id: allTenUserId[userIndex] });
          console.log("left", left)
        } catch (error) {
          console.error("Error sending data to the backend:", error);
        }
      } else if (dir === "right") {
        try {
          const right = await backendActor.rightswipe({ receiver_id: userId, sender_id: allTenUserId[userIndex] });
          console.log("right", right)
        } catch (error) {
          console.error("Error sending data to the backend:", error);
        }
      }
      userIndex++;
      setMyPageData(prevData => {
        const newData = [...prevData];
        newData.splice(currentIndex, 1);
        return newData;
      });
    }
  };

  const handleCloseModal = () => {
    setMatch(false);
  };

  useEffect(() => {
    setSwipeProfiles(pageData);
  }, [pageData]);

  return (
    <div className="flex flex-col grid-cols-9 h-screen z-10">
      <SidebarComponent userId={userId} className="hidden md:block" />

      {startLoader ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-col items-center absolute lg:left-[9%] transform md:left-[9%] transform">
          {pageData.length === 0 ? (
            <Nodatacard />
          ) : (
            pageData.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe w-full h-full flex justify-center items-center"
                key={character.params.name[0]}
                onSwipe={(dir) => swiped(dir, character.params.name[0], index)}
                onCardLeftScreen={() => outOfFrame(character.params.name[0], index)}
              >
                <div className="h-full w-full flex flex-col items-center justify-center relative">
                  <img
                    alt="img"
                    src="https://cdn.pixabay.com/photo/2022/01/17/22/20/add-6945894_640.png"
                    className="h-full w-full lg:max-w-lg"
                    style={{ height: "106vh" }}
                  />
                  <div
                    className="bg-black rounded-b-xl w-full lg:max-w-lg h-[30%] absolute bottom-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgb(0, 0, 0) 50%, rgba(255, 255, 255, 0) 100%)",
                    }}
                  ></div>

                  <div className="z-20 md:-ml-[12rem] sm2:-ml-[14rem] ipad:-ml-[24rem] -ml-[5rem] md:bottom-16 bottom-[4rem] absolute">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {character.params.name[0]}
                    </h2>
                    <p className="text-lg text-gray-700 font-bold">
                      {character.params.location[0]}
                    </p>

                    <p className="mt-2 font-bold text-white mb-6">
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
          {swipeStatus === 'Nope' && (
            <div
              className={`status-text text-white font-bold text-3xl z-10 absolute top-4 p-3 
            bg-red-500 rounded-full shadow-lg popup-content status-text-container  
            ${animate ? 'zoom-out' : ''}`}
            >
              {swipeStatus}
            </div>
          )}
          {swipeStatus === 'Liked' && (
            <div
              className={`status-text text-white font-bold text-3xl z-10 absolute top-4 p-3 
            bg-green-500 rounded-full shadow-lg popup-content status-text-container  
            ${animate ? 'zoom-out' : ''}`}
            >
              {swipeStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Swipe;
