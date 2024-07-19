import React, { useState, useEffect } from "react";
import SidebarComponent from "./SidebarComponent";
import { Principal } from "@dfinity/principal";
import back from "../../assets/Images/CreateAccount/back.svg";
import Ellipse from "../../assets/Images/UserProfiles/Ellipse.svg";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
// import { DDate_backend } from "../../../declarations/DDate_backend/index";
import { useAuth } from "../auth/useAuthClient";
import Loader from "./Loader";
import "./Swipe.css";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const Profile = ({ userId }) => {
  const { backendActor } = useAuth();
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(60);
  const [result, SetResult] = useState("");
  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    name: "",
    mobile_number: "",
    introduction: "",
    images: [],
    gender_pronouns: "",
    matches: [],
    age: "",
    art_and_culture: [],
    diet: "",
    dob: "",
    drinking: "",
    general_habbits: "",
    height: "",
    hobbies: [],
    interests_in: "",
    location: "",
    looking_for: "",
    max_preferred_age: "",
    min_preferred_age: "",
    movies: "",
    occupation: "",
    outdoor_activities: [],
    pets: "",
    preferred_gender: "",
    preferred_location: "",
    religion: "",
    travel: "",
    zodiac: "",
  });

  const [principal, setPrincipal] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [tempProfileImage, setTempProfileImage] = useState("");

  const navigate = useNavigate();

  function convertStringToPrincipal(principalString) {
    try {
      const principal = Principal.fromText(principalString);
      // console.log("Converted Principal: ", principal.toText());
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

  const location = useLocation();
  const id = location.state;
  console.log("data in profiel ", id);

  useEffect(() => {
    const getData = async () => {
      // console.log("Generated Id", id);
      try {
        await backendActor.get_an_account(id).then((userProfileData) => {
          if (userProfileData) {
            const myData = userProfileData?.Ok?.params;
            // console.log("My Data Abhishek ka hai ", myData);
            const dateObj = new Date(myData?.dob);

            const day = String(dateObj.getDate()).padStart(2, "0");
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const year = dateObj.getFullYear();

            const formattedDateStr = `${day}-${month}-${year}`;

            // console.log(formattedDateStr);
            if (myData) {
              SetResult(myData);
              setFormData({
                name: myData?.name[0],
                email: myData?.email[0],
                age: myData?.age[0],
                art_and_culture: myData?.art_and_culture,
                diet: myData?.diet[0],
                dob: formattedDateStr,
                sports: myData?.sports,
                drinking: myData?.drinking[0],
                smoking: myData?.smoking[0],
                gender: myData?.gender[0],
                gender_pronouns: myData?.gender[0],
                habbits: myData?.general_habits,
                height: myData?.height[0],
                selected_hobbies: myData?.hobbies,
                images: myData?.images,
                interests_in: myData?.interests_in[0],
                introduction: myData?.introduction[0],
                location: myData?.location[0],
                looking_for: myData?.looking_for[0],
                max_preferred_age: myData?.max_preferred_age[0],
                min_preferred_age: myData?.min_preferred_age[0],
                selected_movies: myData?.movies,
                occupation: myData?.occupation[0],
                outdoor_activities: myData?.outdoor_activities,
                pets: myData.pets[0],
                preferred_gender: myData?.preferred_gender[0],
                preferred_location: myData?.preferred_location[0],
                religion: myData?.religion[0],
                travels: myData?.travel,
                zodiac: myData.zodiac[0],
                mobile_number: myData.mobile_number[0],
              });
            } else {
            }
          }
        });
      } catch (error) {
        console.error("Error getting data to the backend:", error);
      }
    };
    getData();
  }, [id, backendActor]);

  // console.log('user data', formData)

  return (
    <div>
      <SidebarComponent userId={id} />
      {loader ? (
        <div className="sm:ml-64 ">
          <div className="container flex justify-center">
            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white  h-screen ">
              <div className="h-screen">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen float-right md:w-[80%] font-viga ">
          <div className=" lg:px-10 px-6 xl:px-12">
            <div className="flex items-center mt-[15px] md:mt-15 gap-2 ">
              <img
                src={back}
                alt="back"
                onClick={() => navigate("/Swipe", { state: id })}
                className="w-4 h-4 cursor-pointer"
              />
              <div className=" ml-2 text-lg font-medium">My Profile</div>
            </div>
            <div className=" sm:p-4 md:px-8 lg:px-10 xl:px-12 overflow-y-auto">
              <div className="relative flex justify-center items-center w-full mb-8 mt-8">
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
                  <p className="text-[20px] font-viga mr-[10px] text-center font-[600]">
                    {formData.name}
                  </p>
                  <div
                    onClick={() => navigate("/editProfile", { state: result })}
                    div
                  >
                    <CiEdit className="text-cursor" size={22} />
                  </div>
                </div>
                <div className="w-full font-viga p-4">
                  <div className="grid grid-cols-3 gap-y-2 gap-x-4 ">
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
                        value={formData?.gender ?? ""}
                        className=" font-[600] w-full pl-10 py-1.5 rounded-3xl"
                      />
                    </div>

                    <div className="flex items-center">
                      <label htmlFor="email" className="text-[18px] font-[600]">
                        Email
                      </label>
                    </div>
                    <div className="col-span-2">
                      <input
                        disabled
                        id="email"
                        type="email"
                        name="email"
                        value={formData?.email ?? ""}
                        className=" font-[600] w-full pl-10 py-1.5 rounded-3xl"
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
                    <div className="col-span-2 ">
                      <input
                        disabled
                        id="mobile_number"
                        type="tel"
                        name="mobile_number"
                        value={formData?.mobile_number ?? ""}
                        className="font-[600] w-full pl-10 py-1.5 rounded-3xl"
                      />
                    </div>

                    <div className="flex text-[18px] font-[600] items-center">
                      DOB
                    </div>
                    <p className="font-[600] col-span-2 w-full pl-10 py-1.5">
                      {formData?.dob ?? ""}
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
                        rows="4"
                        value={formData?.introduction ?? ""}
                        className=" font-[600] rounded-xl pl-10 py-1.5 w-full "
                      ></textarea>
                    </div>
                  </div>
                  <div className="font-[600] text-[20px] font-viga">
                    <p className="underline underline-offset-4 mb-[35px] font-[600]">
                      About me
                    </p>
                    <div className="grid text-[18px] grid-cols-3">
                      <div className="flex   items-center">Religion</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.religion ?? ""}
                      </p>
                      <div className="flex items-center">Height</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        none
                      </p>
                      <div className="flex items-center">Location</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.location ?? ""}
                      </p>
                      <div className="flex items-center">Smoking</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.smoking ?? ""}
                      </p>
                      <div className="flex items-center">Alcohol/Drink</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.drinking ?? ""}
                      </p>
                      <div className="flex items-center">Occupation</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.occupation ?? ""}
                      </p>
                      <div className="flex items-center">Hobbies</div>
                      <p
                        className="col-span-2 w-full px-12
                       flex flex-wrap gap-6 py-1.5"
                      >
                        {formData?.selected_hobbies?.map((hobby, index) => (
                          <div className="" key={index}>
                            <p className="rounded-lg py-1.5">
                              {hobby.join(", ")}
                            </p>
                          </div>
                        ))}
                      </p>
                      <div className="flex items-center">Sports</div>
                      <p
                        className="col-span-2 w-full px-12
                       flex flex-wrap gap-6 py-1.5"
                      >
                        {formData?.sports?.map((sport) => (
                          <div className="">
                            <p className="rounded-lg py-1.5">
                              {sport.join(", ")}
                            </p>
                          </div>
                        ))}
                      </p>
                      <div className="flex items-center">
                        Outdoor Activities
                      </div>
                      <p
                        className="col-span-2 w-full px-12
                       flex flex-wrap gap-6 py-1.5"
                      >
                        {formData?.outdoor_activities?.map(
                          (activities, index) => (
                            <div className="" key={index}>
                              <p className="rounded-lg py-1.5">
                                {activities.join(", ")}
                              </p>
                            </div>
                          )
                        )}
                      </p>
                      <div className="flex items-center">Travel</div>
                      <p
                        className="col-span-2 w-full px-12
                       flex flex-wrap gap-6 py-1.5"
                      >
                        {formData?.travels?.map((travel, index) => (
                          <div className="" key={index}>
                            <p className="rounded-lg py-1.5">
                              {travel.join(", ")}{" "}
                            </p>
                          </div>
                        ))}
                      </p>
                      <div className="flex items-center">Movies</div>
                      <p
                        className="col-span-2 w-full px-12
                       flex flex-wrap gap-6 py-1.5"
                      >
                        {formData?.selected_movies?.map((movie, index) => (
                          <div className="" key={index}>
                            <p className="rounded-lg py-1.5">
                              {movie.join(", ")}{" "}
                            </p>
                          </div>
                        ))}
                      </p>
                      <div className="flex items-center">Zodiac Sign</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.zodiac ?? ""}
                      </p>
                      <div className="flex items-center">Diet</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.diet ?? ""}
                      </p>
                      <div className="flex items-center">General Habits</div>
                      <p
                        className="col-span-2 w-full px-12
                       flex flex-wrap gap-6 py-1.5"
                      >
                        {formData?.habbits?.map((habbit, index) => (
                          <div className="" key={index}>
                            <p className="rounded-lg py-1.5">
                              {habbit.join(", ")}{" "}
                            </p>
                          </div>
                        ))}
                      </p>
                      <div className="flex items-center">Art & Culture</div>
                      <p
                        className="col-span-2 w-full px-12
                       flex flex-wrap gap-6 py-1.5"
                      >
                        {formData?.art_and_culture?.map((artAndCul, index) => (
                          <div className="" key={index}>
                            <p className="rounded-lg py-1.5">
                              {artAndCul.join(", ")}{" "}
                            </p>
                          </div>
                        ))}
                      </p>
                      <div className="flex items-center">Pets</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.pets ?? ""}
                      </p>
                      <div className="flex items-center">
                        What are you looking for
                      </div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.looking_for ?? ""}
                      </p>
                      <div className="flex items-center">Your interests in</div>
                      <p
                        className="col-span-2 w-full px-12
                       py-1.5"
                      >
                        {formData?.interests_in ?? ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
