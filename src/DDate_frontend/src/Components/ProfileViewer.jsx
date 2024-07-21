import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";
import TinderCard from "react-tinder-card";
import SidebarComponent from "./SidebarComponent";
import ProfileModal2 from "./ProfileModal2";
import {
  faArrowRotateLeft,
  faClose,
  faStar,
  faHeart,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./Loader";

const ProfileViewer = ({ setFinalMatch, finalMatch }) => {
  const { senderId } = useParams(); // assuming the sender's ID is passed as a URL parameter

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [somebodyLiked, setSomebodyLiked] = useState(false);

  // console.log("senderId is this______", senderId);

  // const principalString = localStorage.getItem("id");

  // console.log("its mine only principaaaaaaaaaaaaaaaaal", principalString);


  // const [finalMatch, setFinalMatch]= useState([]);

  // const swipe = async (dir) => {
  //   console.log("Attempting to swipe:", dir);

  //   //if (canSwipe && currentIndex >= 0 && currentIndex < db.length) {
  //   // const cardRef = childRefs[currentIndex];
  //   // if (cardRef && cardRef.current) {
  //   //   console.log("Swiping card with index:", currentIndex);
  //   //   await cardRef.current.swipe(dir); // Swipe the card!
  //   // } else {
  //   //   console.error("Invalid card reference at index:", currentIndex);
  //   // }
  //   // } else {
  //   //   console.error("Cannot swipe. Index or db length issue.");
  //   // }

  //   if (dir == "right") {
  //     console.log("like button hoya clicked##");
  //     setSomebodyLiked(true);

  //     console.log(
  //       "aha profile jehre array chh pai rhi hai",
  //       profile.id.toText()
  //     );



  //     setFinalMatch((currentMatches) => [...currentMatches, profile.id]);


  //   } else {
  //     console.log("Dislike button ho clicked##");
  //   }
  // };


  // const swipe = async (dir) => {
  //   console.log("Attempting to swipe:", dir);

  //   if (dir === "right") {
  //     console.log("Like button clicked");
  //     setSomebodyLiked(true);

  //     // Assuming 'principalString' is the current user's ID
  //     const currentUserPrincipal = localStorage.getItem("id");

  //     // Convert string to Principal
  //     const currentUser = Principal.fromText(currentUserPrincipal);
  //     const likedUser = Principal.fromText(profile.id.toText());

  //     // Prepare updated profile data
  //     const updatedProfileData = {
  //       id: currentUser,
  //       matches: [likedUser], // Add more fields as necessary
  //     };

  //     // Update profile in the backend
  //     try {
  //       await DDate_backend.update_profile(updatedProfileData);
  //       console.log("Profile updated with new match");
  //     } catch (error) {
  //       console.error("Error updating profile:", error);
  //     }

  //     // Update final match state
  //     setFinalMatch((currentMatches) => [...currentMatches, likedUser]);
  //   } else {
  //     console.log("Dislike button clicked");
  //   }
  // };
  // const swipe = async (dir) => {
  //   console.log("Attempting to swipe:", dir);

  //   if (dir === "right") {
  //     console.log("Like button clicked");
  //     setSomebodyLiked(true);

  //     // Assuming 'principalString' is the current user's ID
  //     const currentUserPrincipal = localStorage.getItem("id");
  //     const currentUser = Principal.fromText(currentUserPrincipal);
  //     const likedUser = Principal.fromText(profile.id.toText());

  //     try {
  //       // Fetch the current user's profile to get existing matches
  //       const currentProfileData = await DDate_backend.get_profile(currentUser);
  //       const currentMatches = currentProfileData.matches || [];

  //       // Append the likedUser to the existing matches
  //       const updatedMatches = [...currentMatches, likedUser];

  //       // Prepare updated profile data with the new matches array
  //       const updatedProfileData = {
  //         id: currentUser,
  //         matches: updatedMatches,
  //       };

  //       // Update profile in the backend
  //       await DDate_backend.update_profile(updatedProfileData);
  //       console.log("Profile updated with new match");

  //       // Update final match state
  //       setFinalMatch((currentMatches) => [...currentMatches, likedUser]);
  //     } catch (error) {
  //       console.error("Error updating profile:", error);
  //     }
  //   } else {
  //     console.log("Dislike button clicked");
  //   }
  // };

  const swipe = async (dir) => {
    // console.log("Attempting to swipe:", dir);

    if (dir === "right") {
      // console.log("Like button clicked");
      setSomebodyLiked(true);

      // Assuming 'principalString' is the current user's ID
      const currentUserPrincipal = localStorage.getItem("id");
      const currentUser = Principal.fromText(currentUserPrincipal);
      // const likedUser = Principal.fromText(profile.id.toText());
      const likedUser = profile.id;

      try {
        // Fetch the current user's profile to get existing data
        const currentProfileData = await DDate_backend.get_profile(currentUser);
        const likedUserData = await DDate_backend.get_profile(likedUser);
        // console.log("mere profile da dataaaaaaa", currentProfileData);
        // console.log("liked user data", likedUserData);


        // Update the matches array with the new liked user
        // const updatedMatches = [...(currentProfileData.matches || []), likedUser];

        // // Prepare the complete updated profile object
        // const updatedProfileData = {
        //   ...currentProfileData, // Spread all existing data
        //   matches: updatedMatches, // Update only the matches field
        // };

        // const updatedProfileDataa = {
        //   id: currentProfileData.id,
        //   new_name: currentProfileData.name,
        //   new_email: currentProfileData.email,
        //   new_mobile_number: currentProfileData.mobile_number,
        //   new_dob: currentProfileData.dob,
        //   new_gender_pronouns: currentProfileData.gender_pronouns,
        //   new_religion: currentProfileData.religion,
        //   new_height: currentProfileData.height,
        //   new_zodiac: currentProfileData.zodiac,
        //   new_diet: currentProfileData.diet,
        //   new_occupation: currentProfileData.occupation,
        //   new_looking_for: currentProfileData.looking_for,
        //   new_smoking: looking_for.smoking,
        //   new_drinking: Option < String >,
        //   new_hobbies: Option < Vec < String >>,
        //   new_sports: Option < Vec < String >>,
        //   new_art_and_culture: Option < Vec < String >>,
        //   new_pets: Option < String >,
        //   new_general_habits: Option < Vec < String >>,
        //   new_outdoor_activities: Option < Vec < String >>,
        //   new_travel: Option < Vec < String >>,
        //   new_movies: Option < Vec < String >>,
        //   new_interests_in: Option < String >,
        //   new_age: Option < u64 >,
        //   new_location: Option < String >,
        //   new_min_preferred_age: Option < u64 >,
        //   new_max_preferred_age: Option < u64 >,
        //   new_preferred_gender: Option < String >,
        //   new_preferred_location: Option < String >,
        //   new_matched: Option < bool >,
        //   new_introduction: Option < String >,
        //   images: Option < Vec < String >>,
        //   new_gender: Option < String >,
        // }

        let arr = [...currentProfileData.matches, likedUser]
        // console.log("arr",arr)

        let arrLiked = [...likedUserData.matches, currentUser]

        const updateParams = {
          id: currentProfileData.id,
          new_name: [currentProfileData.name], // Set the 'new_name' based on 'currentProfileData'
          new_email: [currentProfileData.email], // Set the 'new_email' based on 'currentProfileData'
          new_mobile_number: [currentProfileData.mobile_number], // Set the 'new_mobile_number' based on 'currentProfileData'
          new_dob: [currentProfileData.dob], // Set the 'new_dob' based on 'currentProfileData'
          new_gender_pronouns: [currentProfileData.gender_pronouns], // Set the 'new_gender_pronouns' based on 'currentProfileData'
          new_religion: [currentProfileData.religion], // Set the 'new_religion' based on 'currentProfileData'
          new_height: [currentProfileData.height], // Set the 'new_height' based on 'currentProfileData'
          new_zodiac: [currentProfileData.zodiac], // Set the 'new_zodiac' based on 'currentProfileData'
          new_diet: [currentProfileData.diet], // Set the 'new_diet' based on 'currentProfileData'
          new_occupation: [currentProfileData.occupation], // Set the 'new_occupation' based on 'currentProfileData'
          new_looking_for: [currentProfileData.looking_for], // Set the 'new_looking_for' based on 'currentProfileData'
          new_smoking: [currentProfileData.smoking], // Set the 'new_smoking' based on 'currentProfileData'
          new_drinking: [currentProfileData.drinking], // Set the 'new_drinking' based on 'currentProfileData'
          new_hobbies: [currentProfileData.hobbies], // Set the 'new_hobbies' based on 'currentProfileData'
          new_sports: [currentProfileData.sports], // Set the 'new_sports' based on 'currentProfileData'
          new_art_and_culture: [currentProfileData.art_and_culture], // Set the 'new_art_and_culture' based on 'currentProfileData'
          new_pets: [currentProfileData.pets], // Set the 'new_pets' based on 'currentProfileData'
          new_general_habits: [currentProfileData.general_habits], // Set the 'new_general_habits' based on 'currentProfileData'
          new_outdoor_activities: [currentProfileData.outdoor_activities], // Set the 'new_outdoor_activities' based on 'currentProfileData'
          new_travel: [currentProfileData.travel], // Set the 'new_travel' based on 'currentProfileData'
          new_movies: [currentProfileData.movies], // Set the 'new_movies' based on 'currentProfileData'
          new_interests_in: [currentProfileData.interests_in], // Set the 'new_interests_in' based on 'currentProfileData'
          new_age: [currentProfileData.age], // Set the 'new_age' based on 'currentProfileData'
          new_location: [currentProfileData.location], // Set the 'new_location' based on 'currentProfileData'
          new_min_preferred_age: [currentProfileData.min_preferred_age], // Set the 'new_min_preferred_age' based on 'currentProfileData'
          new_max_preferred_age: [currentProfileData.max_preferred_age], // Set the 'new_max_preferred_age' based on 'currentProfileData'
          new_preferred_gender: [currentProfileData.preferred_gender], // Set the 'new_preferred_gender' based on 'currentProfileData'
          new_preferred_location: [currentProfileData.preferred_location], // Set the 'new_preferred_location' based on 'currentProfileData'
          new_matched: [false], // Set the 'new_matched' based on 'currentProfileData'
          new_introduction: [currentProfileData.introduction], // Set the 'new_introduction' based on 'currentProfileData'
          images: [currentProfileData.images], // Set the 'images' based on 'currentProfileData'
          new_gender: [currentProfileData.gender], // Set the 'new_gender' based on 'currentProfileData'
         matches: [arr], // Update the 'matches' field
         // matches: [likedUser],
        };



        // console.log("data aaf updated profile 1", updateParams);




        // Update profile in the backend with the complete profile object
        await DDate_backend.update_profile(updateParams);
        // console.log("Profile1 updated with new match");

        const updateParamsLiked = {
          id: likedUserData.id,
          new_name: [likedUserData.name], // Set based on 'likedUserData'
          new_email: [likedUserData.email], // Set based on 'likedUserData'
          new_mobile_number: [likedUserData.mobile_number], // Set based on 'likedUserData'
          new_dob: [likedUserData.dob], // Set based on 'likedUserData'
          new_gender_pronouns: [likedUserData.gender_pronouns], // Set based on 'likedUserData'
          new_religion: [likedUserData.religion], // Set based on 'likedUserData'
          new_height: [likedUserData.height], // Set based on 'likedUserData'
          new_zodiac: [likedUserData.zodiac], // Set based on 'likedUserData'
          new_diet: [likedUserData.diet], // Set based on 'likedUserData'
          new_occupation: [likedUserData.occupation], // Set based on 'likedUserData'
          new_looking_for: [likedUserData.looking_for], // Set based on 'likedUserData'
          new_smoking: [likedUserData.smoking], // Set based on 'likedUserData'
          new_drinking: [likedUserData.drinking], // Set based on 'likedUserData'
          new_hobbies: [likedUserData.hobbies], // Set based on 'likedUserData'
          new_sports: [likedUserData.sports], // Set based on 'likedUserData'
          new_art_and_culture: [likedUserData.art_and_culture], // Set based on 'likedUserData'
          new_pets: [likedUserData.pets], // Set based on 'likedUserData'
          new_general_habits: [likedUserData.general_habits], // Set based on 'likedUserData'
          new_outdoor_activities: [likedUserData.outdoor_activities], // Set based on 'likedUserData'
          new_travel: [likedUserData.travel], // Set based on 'likedUserData'
          new_movies: [likedUserData.movies], // Set based on 'likedUserData'
          new_interests_in: [likedUserData.interests_in], // Set based on 'likedUserData'
          new_age: [likedUserData.age], // Set based on 'likedUserData'
          new_location: [likedUserData.location], // Set based on 'likedUserData'
          new_min_preferred_age: [likedUserData.min_preferred_age], // Set based on 'likedUserData'
          new_max_preferred_age: [likedUserData.max_preferred_age], // Set based on 'likedUserData'
          new_preferred_gender: [likedUserData.preferred_gender], // Set based on 'likedUserData'
          new_preferred_location: [likedUserData.preferred_location], // Set based on 'likedUserData'
          new_matched: [false], // Set to false by default
          new_introduction: [likedUserData.introduction], // Set based on 'likedUserData'
          images: [likedUserData.images], // Set based on 'likedUserData'
          new_gender: [likedUserData.gender], // Set based on 'likedUserData'
          matches: [arrLiked], // Update the 'matches' field
        };
        

        await DDate_backend.update_profile(updateParamsLiked);

        // console.log("like krn wale de profile update ho gyi");




        // Update final match state
        setFinalMatch((currentMatches) => [...currentMatches, likedUser]);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.log("Dislike button clicked");
    }
  };


  console.log("these are final matched principals...", finalMatch);

  console.log("profile jehre fetch hoe aa from senderID", profile);

  // Define styles directly within the component
  const profileStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  };

  const loadingStyle = {
    fontSize: "20px",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("fetchProfile is being called!!@@@");
      try {
        setLoading(true);
        // Convert the senderId to Principal inside useEffect
        const principal = Principal.fromText(senderId);

        console.log("jehre get principal de vich jau ge", principal);
        const profileData = await DDate_backend.get_profile(principal);

        console.log("jehre backend ton aae aa profile", profileData);

        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (senderId) {
      fetchProfile();
    }
  }, [senderId]);

  // if (loading) {
  //   return (
  //     <div style={profileStyle}>
  //       <div>Loading profile...</div>
  //       <div style={loadingStyle}>Loading...</div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div style={profileStyle}>
        <div>Error fetching profile: {error}</div>
      </div>
    );
  }

  // if (!profile) {
  //   return (
  //     <div style={profileStyle}>
  //       <div>No profile data found.</div>
  //     </div>
  //   );
  // }

  const handleCloseModal = () => {
    setSomebodyLiked(false);
    //setMatchedProfile(null);
  };

  console.log("profile which will be viewed!!!", profile);

  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to determine the card's width based on the window width
  const getCardWidth = () => {
    if (windowWidth > 1200) {
      // Large screens
      return "450px";
    } else if (windowWidth > 768) {
      // Medium screens
      return "300px";
    } else {
      // Small screens
      return "100%"; // Full width on small screens
    }
  };

  // Render the profile data
  // let nafees make the UI
  //return (
  // <div style={profileStyle}>
  //   <h1>Profile Viewer</h1>
  //   {/* Render your profile details here */}
  //   <p>Principal ID: {profile.sender_id}</p>
  //   {/* Add more profile details as needed */}
  // </div>
  //setMatchedProfile(null);
  // };

  return (
    <>
      <SidebarComponent />

      {loading ? (
        <div className="sm:ml-64">
          <div className="container flex justify-center">
            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white  h-screen ">
              <div className="h-screen">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:ml-64">
          <div className="container flex justify-center px-4">
            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-xl shadow-2xl shadow-slate-100 h-screen overflow-hidden">
              <div>
                <div className="h-screen my-10">
                  {/* <div className=" pl-2 pb-2 pt-4">
                      <img src={logo} alt="swapLogo" />
                    </div> */}

                  <div className="object-fit md:absolute relative">
                    <img
                      alt="img"
                      src={profile.images[0]}
                      className="h-screen object-cover rounded-xl relative md:top-0 top-[-83px] "
                    // style={{ height: "83vh"}}
                    />
                  </div>
                  {/* <div
                      className="bg-black h-48 w-full z-10 bottom-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgb(0, 0, 0) 64%, rgba(255, 255, 255, 0) 100%)",
                        position: "fixed",
                      }}
                    ></div> */}

                  <div
                    className="pl-4 md:relative absolute top-0 md:top-6 z-21"
                  // style={{ marginBottom: "-7px", lineHeight: "4px" }}
                  >
                    <h2 className="text-4xl font-bold text-white  z-30  relative">
                      {profile.name}
                    </h2>
                    <p className="text-lg text-gray-500 z-30 font-bold  relative">
                      {profile.location}
                    </p>
                    {/* {console.log(profile.id)}
                      {console.log(profile.id.toText())}
                      {console.log(profile.location)}
                      {console.log(profile.images[0])} */}
                    <p className="mt-2 z-30 relative font-bold text-white">
                      {profile.introduction}
                    </p>
                    <div
                      className=" flex absolute gap-4 "
                    // style={{ paddingTop: "65px" }}
                    >
                      <button
                        className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-pink-700 font-bold text-gray-800"
                        onClick={() => swipe("left")}
                      >
                        <FontAwesomeIcon
                          icon={faClose}
                          style={{ color: "#fd5068" }}
                        />
                      </button>
                      <button
                        className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-green-700 font-bold text-gray-800"
                        onClick={() => swipe("right")}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={{ color: "#1be4a1" }}
                        />
                      </button>
                    </div>
                  </div>
                  {somebodyLiked && (
                    <>
                      {console.log("somebodyLiked", somebodyLiked)}
                      <ProfileModal2
                        profile={profile}
                        onClose={handleCloseModal}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileViewer;
