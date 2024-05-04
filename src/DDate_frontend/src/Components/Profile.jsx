import React, { useState, useEffect } from "react";
import SidebarComponent from "./SidebarComponent";
import { Principal } from "@dfinity/principal";
import back from "../../assets/Images/CreateAccount/back.svg";
import Ellipse from "../../assets/Images/UserProfiles/Ellipse.svg";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import Loader from "./Loader";
import "./Swipe.css";

const Profile = () => {
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(60);
  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    name: "",
    mobile_number: "",
    introduction: "",
    images: [],
    gender_pronouns: "",
    matches: []
  });

  const [principal, setPrincipal] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [tempProfileImage, setTempProfileImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);

    const principalString = localStorage.getItem("id");

    // const principalString = "tc7cw-ilo2x-rwqep-gohde-puqog-soeyv-szxvv-ybcgw-lbrkl-sm7ab-wae";
    console.log(principalString);

    if (principalString) {
      const newPrincipal = convertStringToPrincipal(principalString);
      setPrincipal(newPrincipal);

      const fetchUserProfile = async () => {
        try {
          const userProfileData = await DDate_backend.get_profile(newPrincipal);
          console.log("userProfileData ==>>>> ", userProfileData);
          setFormData({
            gender: userProfileData.gender || "",
            email: userProfileData.email || "",
            name: userProfileData.name || "",
            mobile_number: userProfileData.mobile_number || "",
            introduction: userProfileData.introduction || "",
            images: userProfileData.images || [],
            gender_pronouns: userProfileData.gender_pronouns || "",
            matches: userProfileData.matches || [],
            location: userProfileData.location || "",
            dob: userProfileData.dob || "",
            hobbies: userProfileData.hobbies || [],
            occupation: userProfileData.occupation || "",
            smoking: userProfileData.smoking || "",
            drinking: userProfileData.drinking || "",
            religion: userProfileData.religion || "",
            height: userProfileData.height || "",
            diet: userProfileData.diet || "",
            pets: userProfileData.pets || "",
            zodiac: userProfileData.zodiac || "",
            sports: userProfileData.sports || [],
            interests_in: userProfileData.interests_in || "",
            movies: userProfileData.movies || [],
            outdoor_activities: userProfileData.outdoor_activities || [],
            travel: userProfileData.travel || [],
            general_habits: userProfileData.general_habits || [],
            art_and_culture: userProfileData.art_and_culture || [],
            looking_for: userProfileData.looking_for || "",
            min_preferred_age: userProfileData.min_preferred_age || null,
            max_preferred_age: userProfileData.max_preferred_age || null,
            preferred_gender: userProfileData.preferred_gender || "",
            preferred_location: userProfileData.preferred_location || "",
          });

          setLoader(false);
        } catch (error) {
          console.error("Error fetching user profile: ", error);
          setLoader(false);
        }
      };

      fetchUserProfile();
      setLoader(false);
    } else {
      console.warn("Principal string is null or empty.");
    }
  }, []);

  function convertStringToPrincipal(principalString) {
    try {
      const principal = Principal.fromText(principalString);
      console.log("Converted Principal: ", principal.toText());
      return principal;
    } catch (error) {
      console.error("Error converting string to Principal: ", error);
      return null;
    }
  }

  // bs data dekhne k lie
  useEffect(() => {
    if (userProfile) {
      console.log("User Profile: ", userProfile);
    }
  }, [userProfile]);


  const calculateProgressOffset = (progress) => {
    const radius = 47;
    const circumference = 2 * Math.PI * radius;
    return circumference - (progress / 100) * circumference;
  };

  return (
    <div className="md:grid grid-cols-6">
      {principal && <SidebarComponent />}
      {loader ? (
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
        <div className="h-screen md:col-span-5 font-viga ">
          <div className=" px-6 lg:px-10 xl:px-12">
            <div className="flex items-center md:mt-15 gap-2 ">
              <img
                src={back}
                alt="back"
                onClick={() => navigate("/Swipe")}
                className="w-4 h-4 cursor-pointer"
              />
              <div className="text-lg font-medium">My Profile</div>
            </div>
            <div className="px-6 sm:p-4 md:px-8 lg:px-10 xl:px-12 overflow-y-auto">
              <div className="relative flex justify-center items-center w-full mb-16 mt-2">
                <p className="border-t border-black  w-full "></p>
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
              <div className="h-auto w-auto flex-col">
                <div className="mb-4 flex justify-center relative">

                  <label
                    htmlFor="images"
                    className="h-[220px] w-[220px] rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(transparent, transparent), radial-gradient(circle at center, #cccccc, #cccccc)",
                      backgroundBlendMode: "multiply",
                    }}
                  >
                    {formData.images.length > 0 ? (
                      <div
                        className="relative w-full h-full"
                        style={{ top: "0.45rem ", left: "-0.15rem" }}
                      >
                        <svg
                          className="absolute inset-0 w-[228px] h-[228px] -top-4 z-10"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            className="text-gray-300"
                            strokeWidth="5"
                            stroke="#A7A1A1"
                            fill="transparent"
                            r="47"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="bg-yellow-400"
                            strokeWidth="5"
                            strokeDasharray="295.31"
                            strokeDashoffset={calculateProgressOffset(progress)}
                            strokeLinecap="round"
                            stroke="#FFC107"
                            fill="transparent"
                            r="47"
                            cx="50"
                            cy="50"
                          />
                        </svg>

                        <img
                          src={
                            tempProfileImage ||
                            formData.images[0] ||
                            "default-placeholder.jpg"
                          }
                          alt="Profile"
                          className="rounded-full w-full h-full object-cover absolute"
                          style={{ marginTop: "-8px", marginLeft: "2px" }}
                        />

                        <img
                          src={Ellipse}
                          alt="back"
                          className="w-9 h-9 bg-yellow-400 rounded-full absolute top-24 z-20"
                          style={{ top: "11.5rem", left: "6.1rem" }}
                        />
                        <div
                          className=" text-white font-bold text-xs absolute z-30"
                          style={{ top: "12.0rem", left: "6.4rem" }}
                        >
                          {progress} %
                        </div>
                      </div>
                    ) : (
                      <svg
                        className="w-full h-full p-4 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    )}
                  </label>
                </div>
                <div className="flex justify-center mb-[32px] items-center">
                  <p className="text-[20px] font-viga mr-[10px] text-center font-[600]">{formData.name} {formData.gender_pronouns}</p><Link to="/editProfile"><CiEdit className="text-cursor" size={22} /></Link>
                </div>
                <div className="w-full font-viga p-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center">
                      <label
                        htmlFor="gender"
                        className="text-[18px] font-[600]"
                      >
                        Gender
                      </label>
                    </div>
                    <div className="col-span-2">
                      <input
                        disabled
                        id="gender"
                        type="text"
                        name="gender"
                        value={formData.gender}
                        className=" font-[600] w-full px-2 py-1.5 rounded-3xl"
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        htmlFor="email"
                        className="text-[18px] font-[600]"
                      >
                        Email
                      </label>
                    </div>
                    <div className="col-span-2">
                      <input
                        disabled
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        className=" font-[600] w-full px-2 py-1.5 rounded-3xl"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <label
                        htmlFor="mobile_number"
                        className="text-[18px] font-[600]"
                      >
                        Mobile No.
                      </label>
                    </div>
                    <div className="col-span-2">
                      <input
                        disabled
                        id="mobile_number"
                        type="tel"
                        name="mobile_number"
                        value={formData.mobile_number.toString()}
                        className="font-[600] w-full px-2 py-1.5 rounded-3xl"
                      />
                    </div>

                    <div className="flex text-[18px] font-[600] items-center">
                      DOB
                    </div>
                    <p className="font-[600] col-span-2 w-full px-2 py-1.5">
                      {formData.dob}
                    </p>
                    <div className="">
                      <label
                        htmlFor="introduction"
                        className="text-[18px] font-[600]"
                      >
                        My Introduction
                      </label>
                    </div>
                    <div className=" col-span-2">
                      <textarea
                        id="introduction"
                        name="introduction"
                        disabled
                        value={formData.introduction}
                        rows="4"
                        className="bg-[#F0F0F0] font-[600] rounded-xl px-2 py-1.5 w-full "
                      ></textarea>
                    </div>
                  </div>
                  <div className="font-[600] text-[20px] font-viga">
                    <p className="underline underline-offset-4 mb-[35px] font-[600]">About me</p>
                    <div className="grid text-[18px] grid-cols-3">
                      <div className="flex   items-center">
                        Religion
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.religion}
                      </p>
                      <div className="flex items-center">
                        Height
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.height}
                      </p>
                      <div className="flex items-center">
                        Location
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.location}
                      </p>
                      <div className="flex items-center">
                        Smoking
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.smoking}
                      </p>
                      <div className="flex items-center">
                        Alcohol/Drink
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.drinking}
                      </p>
                      <div className="flex items-center">
                        Occupation
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.occupation}
                      </p>
                      <div className="flex items-center">
                        Hobbies
                      </div>
                      <p className="col-span-2 w-full px-2 flex flex-wrap gap-6 py-1.5">
                        {formData?.hobbies?.map((hobby)=>(
                        <div className="">
                          <p className="rounded-lg px-2 py-1.5 bg-[#F0F0F0] ">{hobby}</p>
                        </div>))}
                      </p>
                      <div className="flex items-center">
                        Sports
                      </div>
                      <p className="col-span-2 w-full px-2 flex flex-wrap gap-6 py-1.5">
                        {formData?.sports?.map((hobby)=>(
                        <div className="">
                          <p className="rounded-lg px-2 py-1.5 bg-[#F0F0F0] ">{hobby}</p>
                        </div>))}
                      </p>
                      <div className="flex items-center">
                        Outdoor Activities
                      </div>
                      <p className="col-span-2 w-full px-2 flex flex-wrap gap-6 py-1.5">
                        {formData?.outdoor_activities?.map((hobby)=>(
                        <div className="">
                          <p className="rounded-lg px-2 py-1.5 bg-[#F0F0F0] ">{hobby}</p>
                        </div>))}
                      </p>
                      <div className="flex items-center">
                        Travel
                      </div>
                      <p className="col-span-2 w-full px-2 flex flex-wrap gap-6 py-1.5">
                        {formData?.travel?.map((hobby)=>(
                        <div className="">
                          <p className="rounded-lg px-2 py-1.5 bg-[#F0F0F0] ">{hobby}</p>
                        </div>))}
                      </p>
                      <div className="flex items-center">
                        Movies
                      </div>
                      <p className="col-span-2 w-full px-2 flex flex-wrap gap-6 py-1.5">
                        {formData?.movies?.map((hobby)=>(
                        <div className="">
                          <p className="rounded-lg px-2 py-1.5 bg-[#F0F0F0] ">{hobby}</p>
                        </div>))}
                      </p>
                      <div className="flex items-center">
                        Zodiac Sign
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.zodiac}
                      </p><div className="flex items-center">
                        Diet
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.diet}
                      </p>
                      <div className="flex items-center">
                        General Habits
                      </div>
                      <p className="col-span-2 w-full px-2 flex flex-wrap gap-6 py-1.5">
                        {formData?.general_habits?.map((hobby)=>(
                        <div className="">
                          <p className="rounded-lg px-2 py-1.5 bg-[#F0F0F0] ">{hobby}</p>
                        </div>))}
                      </p>
                      <div className="flex items-center">
                        Art & Culture
                      </div>
                      <p className="col-span-2 w-full px-2 flex flex-wrap gap-6 py-1.5">
                        {formData?.art_and_culture?.map((hobby)=>(
                        <div className="">
                          <p className="rounded-lg px-2 py-1.5 bg-[#F0F0F0] ">{hobby}</p>
                        </div>))}
                      </p>
                      <div className="flex items-center">
                        Pets
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.pets}
                      </p>
                      <div className="flex items-center">
                        What are you looking for
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.looking_for}
                      </p>
                      <div className="flex items-center">
                        Your interests in
                      </div>
                      <p className="col-span-2 w-full px-2 py-1.5">
                        {formData.interests_in}
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-span-12 lg:col-span-4 xl:col-span-4 px-4 lg:px-8 xl:px-10">
            <div className="flex items-center md:mt-10 ml-6 gap-2 mb-6">
              <img
                src={addProfile}
                alt="addProfile"
                className="w-4 h-4 cursor-pointer"
              />
              <div className="ml-2 text-lg font-medium">Your Photos</div>
            </div>
            <div className="relative flex justify-center items-center w-full mb-2 mt-2">
              <p className="border-t border-black w-2/3 px-2 md:w-3/4 lg:w-2/3"></p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 20 19"
                fill="none"
                className="absolute text-black"
              >
                <path
                  d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="border-gray-300">
              <div className="flex items-center justify-center p-4 bg-white mb-2">
                <div className=" text-black text-opacity-50 font-normal text-sm">
                  Add maximum 2 photos for better reach
                </div>
              </div>

              <div className="bg-white">
                <div className="flex items-center flex-wrap p-3 md:p-4 justify-center cursor-pointer gap-4">
                  
                  <div className="w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                    <label htmlFor={`additional-image-1`}>
                      {isLoading[1] ? (
                        <div
                          className="flex items-center justify-center w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200"
                          key="1"
                        >
                          <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      ) : formData.images[1] ? (
                        <img
                          src={formData.images[1]}
                          alt={`Additional Image 1`}
                          className="w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] cursor-pointer"
                        />
                      ) : (
                        <img
                          src={uploadProfile}
                          alt="uploadProfile"
                          className=" rounded-[15px] cursor-pointer"
                        />
                      )}
                      <input
                      disabled
                        id={`additional-image-1`}
                        type="file"
                        onChange={handleAdditionalImageChange(1)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {Object.entries(isLoading).map(([key, value]) =>
                    console.log(value)
                  )}
                  
                  <div className="w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200  flex justify-center items-center">
                    <label htmlFor={`additional-image-2`}>
                      {isLoading[2] ? (
                        <div
                          className="flex items-center justify-center w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200"
                          key="1"
                        >
                          <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      ) : formData.images[2] ? (
                        <img
                          src={formData.images[2]}
                          alt={`Additional Image 2`}
                          className="w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] cursor-pointer"
                        />
                      ) : (
                        <img
                          src={uploadProfile}
                          alt="uploadProfile"
                          className="rounded-[15px] cursor-pointer"
                        />
                      )}
                      <input
                      disabled
                        id={`additional-image-2`}
                        type="file"
                        onChange={handleAdditionalImageChange(2)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
             
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
