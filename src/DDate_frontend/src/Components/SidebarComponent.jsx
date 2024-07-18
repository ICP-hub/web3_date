import React from "react";
// import userpic from "../../assets/Images/UserProfiles/userpic.svg";
import logo from "../../assets/Images/CreateAccount/logo.png";
import { useState, useEffect } from "react";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import { useNavigate } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import { IoLogOut } from "react-icons/io5";
import Loader from "./Loader";
import { useAuth } from "../auth/useAuthClient";
import userpic from "../../assets/Images/UserProfiles/userpic.svg";

const SidebarComponent = ({ userId }) => {
  const { logout } = useAuth();

  const [formData, setFormData] = useState({
    preferred_location: "",
    interests_in: "",
    location: "",
    max_preferred_age: "",
    min_preferred_age: "",
    images: null,
    combinedAge: "",
  });

  // console.log("MY user id in the sidebar", userId)
  const navigate = useNavigate();

  const [principal, setPrincipal] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDropDown, setShowDropdown] = useState(false);
  const [startLoader, setStartLoader] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const logoutHandler = async () => {
    await logout();
    // localStorage.removeItem("id");
    // localStorage.removeItem("identity");
    // localStorage.removeItem("wallet");

    // setLoader(false)
    window.location.href = "/";
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 1024 && !isInputFocused) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isInputFocused]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isMobileOrTablet = windowWidth <= 870;

  useEffect(() => {
    const principalString = localStorage.getItem("id");
    console.log(principalString);

    if (principalString) {
      const newPrincipal = convertStringToPrincipal(principalString);
      setPrincipal(newPrincipal);

      const fetchUserProfile = async () => {
        try {
          const userProfileData = await DDate_backend.get_profile(newPrincipal);
          console.log("userProfileData ==>>>> ", userProfileData);
          setFormData({
            preferred_location: userProfileData.preferred_location || "",
            interests_in: userProfileData.interests_in || "",
            location: userProfileData.location || "",
            max_preferred_age: userProfileData.max_preferred_age || "",
            min_preferred_age: userProfileData.min_preferred_age || "",
            combinedAge:
              userProfileData.min_preferred_age +
              "-" +
              userProfileData.max_preferred_age,
            images: userProfileData.images || null,
            // gender_pronouns: userProfileData.gender_pronouns || "",
          });
        } catch (error) {
          console.error("Error fetching user profile: ", error);
        }
      };

      fetchUserProfile();
    } else {
      console.warn("Principal string is null or empty.");
    }
  }, []);

  // function convertStringToPrincipal(principalString) {
  //   try {
  //     const principal = Principal.fromText(principalString);
  //     console.log("Converted Principal: ", principal.toText());
  //     return principal;
  //   } catch (error) {
  //     console.error("Error converting string to Principal: ", error);
  //     return null;
  //   }
  // }
  async function convertStringToPrincipal(principalString) {
    console.log('Original principalString:', principalString);
    console.log('Type of principalString:', typeof principalString);

    if (principalString instanceof Principal) {
      console.log('principalString is already a Principal object:', principalString);
      // If you need the string representation of the Principal object
      principalString = principalString.toText();
      console.log('principalString Converted to text:', principalString);
    } else if (typeof principalString !== 'string') {
      console.error('Error: principalString is not a string');
      return null;
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "location" || name === "preferred_location") {
      setIsInputFocused(true);
    } else {
      setIsInputFocused(false);
    }

    if (name === "preferAge") {
      let minAge, maxAge;
      if (formData.combinedAge === "above 30") {
        minAge = 30;
        maxAge = 60;
      } else {
        // Split the selected age range into minimum and maximum values
        [minAge, maxAge] = value.split("-").map(Number);
      }

      setFormData((prevData) => ({
        ...prevData,
        min_age: minAge,
        max_age: maxAge,
        selectedpreferAge: value,
      }));
    } else if (name === "location" || name === "preferred_location") {
      const lowercaseLocation = value.toLowerCase();
      setFormData((prevData) => ({
        ...prevData,
        [name]: lowercaseLocation,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    setStartLoader(true);
    e.preventDefault();
    // setImageError(false);

    // Check if the image is provided
    // if (!formData.images && !userProfile?.images) {
    //   setImageError(true);
    //   return;
    // }

    // Construct updated profile data with original data as fallback
    const updatedFilterData = {
      id: principal,
      new_preferred_location:
        formData.preferred_location !== userProfile?.preferred_location
          ? [formData.preferred_location]
          : [userProfile?.preferred_location],
      new_interests_in:
        formData.interests_in !== userProfile?.interests_in
          ? [formData.interests_in]
          : [userProfile?.interests_in],
      new_location:
        formData.location !== userProfile?.location
          ? [formData.location]
          : [userProfile?.location],
      new_max_preferred_age:
        formData.max_preferred_age !== userProfile?.max_preferred_age
          ? [Number(formData.max_preferred_age)]
          : [userProfile?.max_preferred_age],
      new_min_preferred_age:
        formData.min_preferred_age !== userProfile?.min_preferred_age
          ? [Number(formData.min_preferred_age)]
          : [userProfile?.min_preferred_age],
      // new_introduction: formData.introduction !== userProfile?.introduction ? [formData.introduction] : [userProfile?.introduction],
      new_introduction: userProfile?.introduction || [],
      images: userProfile?.images || [],
      new_dob: userProfile?.dob || [],
      new_religion: userProfile?.religion || [],
      new_height: userProfile?.height || [],
      new_zodiac: userProfile?.zodiac || [],
      new_diet: userProfile?.diet || [],
      new_occupation: userProfile?.occupation || [],
      new_looking_for: userProfile?.looking_for || [],
      new_smoking: userProfile?.smoking || [],
      new_drinking: userProfile?.drinking || [],
      new_hobbies: userProfile?.hobbies || [],
      new_sports: userProfile?.sports || [],
      new_art_and_culture: userProfile?.art_and_culture || [],
      new_pets: userProfile?.pets || [],
      new_general_habits: userProfile?.general_habits || [],
      new_outdoor_activities: userProfile?.outdoor_activities || [],
      new_travel: userProfile?.travel || [],
      new_movies: userProfile?.movies || [],
      new_gender: userProfile?.gender || [],
      new_age: userProfile?.age || [],
      new_email: userProfile?.email || [],
      new_gender_pronouns: userProfile?.gender_pronouns || [],
      new_mobile_number: userProfile?.mobile_number || [],
      new_preferred_gender: userProfile?.preferred_gender || [],
      new_name: userProfile?.name || [],
      new_matched: userProfile?.matched || [],
    };

    console.log("updatedFilterData =>", updatedFilterData);
    try {
      await DDate_backend.update_profile(updatedFilterData);
      navigate("/Swipe");
      setStartLoader(false);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      setStartLoader(false);
    }
  };

  return (
    <div className="z-40">
      <button
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {startLoader ? (
        <div className="sm:ml-64">
          <div className="container flex justify-center">
            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white h-screen ">
              <div className="h-screen">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <aside
          className={`fixed top-0 w-64  md:w-[20%] h-screen z-50  transition-transform ${isSidebarOpen || !isMobileOrTablet ? "" : "-translate-x-full"
            }`}
          aria-label="Sidebar"
        >
          {/* <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-r from-[#26011C] via-[#9E5500] to-[#26011C]"> */}
          <div
            className="h-full px-3 py-4 overflow-y-auto"
            style={{
              background:
                "radial-gradient( rgba(158,85,0,1) 0%, rgba(158,85,0,1) 4%, rgba(38,1,28,1) 100%)",
            }}
          >
            <div className="flex justify-end px-3 py-4">
              <button onClick={toggleSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  viewBox="0 0 320 512"
                  className="rotate-180 md:hidden "
                >
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
              </button>
            </div>
            <div
              className="mb-6 flex ml-2"
            // style={{ marginTop: "-36.5px" }}
            >
              <img className="h-20 w-20 " src={logo} alt="Ddate logo" />
            </div>
            <ul className="w-full text-center">
              <li
                onClick={() => navigate("/Profile", { state: userId })}
                className=" mb-2 flex flex-row items-center rounded-full p-2  text-gray-900  dark:text-white hover:bg-yellow-700 dark:hover:bg-yellow-800  group"
              >
                {formData.images ? (
                  <div className="pt-2">
                    <img
                      src={
                        formData.images[0] || "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="rounded-full w-10 h-10  object-cover border-2 border-white "
                      style={{ marginTop: "-10px" }}
                    />
                  </div>
                ) : (
                  // <img
                  //   src="https://via.placeholder.com/150"
                  //   alt="Profile"
                  //   className="rounded-full h-12 w-12"
                  // />
                  <svg
                    className="h-12 w-12 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                )}
                <button className="block p-2 text-white text-sm rounded">
                  <span>My Profile</span>
                </button>
              </li>

              <li
                onClick={() => navigate("/Notification", { state: userId })}
                className=" mb-2 flex flex-row items-center rounded-full p-2 text-gray-900  dark:text-white hover:bg-yellow-700 dark:hover:bg-yellow-800  group"
              >
                <div className="relative mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 27 23"
                    fill="none"
                  >
                    <path
                      d="M19.5268 0C17.0377 0 14.8584 1.064 13.5 2.8625C12.1416 1.064 9.96228 0 7.47321 0C5.49188 0.00221995 3.59234 0.785612 2.19132 2.17831C0.790305 3.571 0.00223321 5.45927 0 7.42883C0 15.8162 12.5104 22.6052 13.0432 22.8856C13.1836 22.9607 13.3406 23 13.5 23C13.6594 23 13.8164 22.9607 13.9568 22.8856C14.4896 22.6052 27 15.8162 27 7.42883C26.9978 5.45927 26.2097 3.571 24.8087 2.17831C23.4077 0.785612 21.5081 0.00221995 19.5268 0ZM13.5 20.9445C11.299 19.6696 1.92857 13.862 1.92857 7.42883C1.93049 5.96762 2.51527 4.5668 3.55467 3.53356C4.59408 2.50033 6.00327 1.91902 7.47321 1.91712C9.81763 1.91712 11.786 3.15845 12.608 5.15226C12.6807 5.32807 12.8043 5.47844 12.9631 5.58427C13.1219 5.69009 13.3088 5.74659 13.5 5.74659C13.6912 5.74659 13.8781 5.69009 14.0369 5.58427C14.1957 5.47844 14.3193 5.32807 14.392 5.15226C15.214 3.15486 17.1824 1.91712 19.5268 1.91712C20.9967 1.91902 22.4059 2.50033 23.4453 3.53356C24.4847 4.5668 25.0695 5.96762 25.0714 7.42883C25.0714 13.8524 15.6986 19.6684 13.5 20.9445Z"
                      fill="white"
                    />
                  </svg>
                  <span className="absolute top-0  right-0 w-2 h-2 bg-yellow-600 rounded-full"></span>
                </div>
                <button className="block p-2 text-white text-sm rounded">
                  <span>Matches</span>
                </button>
              </li>

              <li
                onClick={() => navigate("/ChattingPage", { state: userId })}
                className=" mb-2 flex flex-row items-center  p-2 text-gray-900 rounded-full dark:text-white hover:bg-yellow-700 dark:hover:bg-yellow-800  group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 27 28"
                  fill="none"
                  className="mr-2"
                >
                  <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-600 rounded-full"></span>

                  <path
                    d="M1.42105 25.4104L6.52263 20.3088H22.7368C23.4906 20.3088 24.2135 20.0094 24.7465 19.4764C25.2795 18.9434 25.5789 18.2205 25.5789 17.4667V4.67722C25.5789 3.92345 25.2795 3.20055 24.7465 2.66755C24.2135 2.13455 23.4906 1.83512 22.7368 1.83512H4.26316C3.50938 1.83512 2.78648 2.13455 2.25349 2.66755C1.72049 3.20055 1.42105 3.92345 1.42105 4.67722V25.4104ZM1.42105 27.4141H0V4.67722C0 3.54656 0.449153 2.46221 1.24865 1.66271C2.04815 0.863215 3.1325 0.414063 4.26316 0.414062H22.7368C23.8675 0.414063 24.9519 0.863215 25.7514 1.66271C26.5508 2.46221 27 3.54656 27 4.67722V17.4667C27 18.5974 26.5508 19.6817 25.7514 20.4812C24.9519 21.2807 23.8675 21.7299 22.7368 21.7299H7.10526L1.42105 27.4141Z"
                    fill="white"
                  />
                </svg>
                <button className="block p-2 text-white text-sm rounded">
                  <span>Messages</span>
                </button>
              </li>

              <li
                className=" mb-2 cursor-pointer flex flex-row items-center bg-yellow-600 py-1 rounded-full  "
                onClick={() => {
                  setShowDropdown(!showDropDown);
                }}
                style={{
                  background:
                    "radial-gradient(68.18% 68.18% at 50% 50%, #FFC107 0%, #E28110 100%)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 26 29"
                  fill="none"
                  className="mr-2 ml-6 hover:text-white"
                >
                  <path
                    d="M12.9929 3.9541L24.8418 3.9541M1.14391 24.6321L5.58727 24.6321M1.14391 3.9541L7.06838 3.9541M11.5117 24.6321L24.8418 24.6321M20.3984 14.2931L24.8418 14.2931M1.14391 14.2931L14.474 14.2931"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.06772 3.95401C7.06772 5.58546 8.39395 6.90801 10.03 6.90801C11.6659 6.90801 12.9922 5.58546 12.9922 3.95401C12.9922 2.32255 11.6659 1 10.03 1C8.39395 1 7.06772 2.32255 7.06772 3.95401Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14.473 14.2929C14.473 15.9243 15.7992 17.2469 17.4352 17.2469C19.0712 17.2469 20.3975 15.9243 20.3975 14.2929C20.3975 12.6614 19.0712 11.3389 17.4352 11.3389C15.7992 11.3389 14.473 12.6614 14.473 14.2929Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5.58725 24.6322C5.58725 26.2637 6.91349 27.5862 8.54948 27.5862C10.1855 27.5862 11.5117 26.2637 11.5117 24.6322C11.5117 23.0008 10.1855 21.6782 8.54948 21.6782C6.91349 21.6782 5.58725 23.0008 5.58725 24.6322Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="block p-2 text-black hover:text-white text-sm rounded ">
                  <span>Filter </span>
                </div>
              </li>
            </ul>
            {showDropDown && (
              <form
                className="transition-all duration-500 ease-in-out "
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col mb-2 ml-4 text-white">
                  <fieldset className="mb-1">
                    <legend className="font-bold p-2 text-base rounded">
                      Your interests in
                    </legend>
                    <div className="flex flex-wrap gap-2 md:gap-2 mb-1 py-2 px-2 rounded-3xl font-light text-sm">
                      {["Male", "Female", "All"].map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input
                            type="radio"
                            name="interests_in"
                            value={interest}
                            checked={formData.interests_in === interest}
                            onChange={handleFormChange}
                            style={{ marginRight: "0.5rem" }}
                          />
                          {interest}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="mb-1">
                    <legend className="font-bold p-2 text-base rounded">
                      Preferred age
                    </legend>
                    <div className="flex flex-wrap gap-2 md:gap-2 mb-1 py-2 px-2 rounded-3xl font-light	text-sm">
                      {["18-20", "20-25", "25-30", "above 30"].map(
                        (preferAge) => (
                          <label key={preferAge} className="flex items-center">
                            <input
                              type="radio"
                              name="preferAge"
                              value={preferAge}
                              onChange={handleFormChange}
                              checked={formData.combinedAge === preferAge}
                              style={{ marginRight: "0.5rem" }}
                            />
                            {preferAge}
                          </label>
                        )
                      )}
                    </div>
                  </fieldset>
                </div>

                <div className="mb-3 ml-4">
                  <label
                    htmlFor="location"
                    className="block text-base  font-bold mb-1 ml-1 text-white"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Your Location"
                    value={formData.location}
                    onChange={handleFormChange}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="w-11/12 px-2 py-2 rounded-full text-sm border border-white bg-transparent text-white focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div className="mb-6 ml-4">
                  <label
                    htmlFor="preferred_location"
                    className="block text-base  font-bold mb-1 ml-1 text-white"
                  >
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    id="preferred_location"
                    name="preferred_location"
                    placeholder="Your Preferred Location"
                    value={formData.preferred_location}
                    onChange={handleFormChange}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="w-11/12 px-2 py-2 rounded-full text-sm border border-white bg-transparent text-white font-num  focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="text-black hover:text-white font-normal py-2 px-20 text-sm rounded-full mb-4"
                    style={{
                      background:
                        "radial-gradient(68.18% 68.18% at 50% 50%, #FFC107 0%, #E28110 100%)",
                    }}
                    onClick={() => {
                      console.log(
                        "Form data by tushar jain" + formData.location
                      );
                      navigate("/Swipe", {
                        state: { forceRerender: Date.now() },
                      });
                    }}
                  >
                    Apply
                  </button>
                </div>
              </form>
            )}
            <div className="flex flex-col items-center">
              <button
                onClick={logoutHandler}
                className="text-black hover:text-white text-left flex gap-3 px-6 font-normal py-2 w-full mt-2 text-sm rounded-full "
                style={{
                  background:
                    "radial-gradient(68.18% 68.18% at 50% 50%, #FFC107 0%, #E28110 100%)",
                }}
              >
                <IoLogOut size={22} /> Logout
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default SidebarComponent;
