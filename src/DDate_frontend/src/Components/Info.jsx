
import React from "react";

const Info = () => {
  return (
    <div  style={{
      background:
        "radial-gradient(84.33% 84.32% at 51.71% 43.22%, #E28110 0%, #26011C 100%)",
    }}>
    <div className="container mx-auto">
    <div className=" flex flex-col items-center w-full font-num">
      <div
        className="w-full py-8 sm:py-10 md:py-12 lg:py-14 px-[6%]"
       
      >
        <h2 className="text-center font-num text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 mt-2">
          How It Works
        </h2>
        <p className="text-center text-white text-sm sm:text-base md:text-lg lg:text-lg font-light max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto mb-4">
          Three Easy Steps To Join Us And Find Your Perfect Match
        </p>

        {/* Adjust horizontal lines and svg for different screen sizes */}
        <div className="relative flex justify-center items-center">
          <p className="border-t border-gray-300 mx-4 sm:mx-10 md:mx-20 lg:mx-60 w-full"></p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="15"
            viewBox="0 0 20 19"
            fill="none"
            className="absolute"
          >
            <path
              d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start pt-6 sm:pt-8 md:pt-10 lg:pt-12 font-num font-custom mb-12 md:mb-14 lg:mb-2">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="text-7xl text-white mr-4">1</div>
            <div>
              <p className="text-2xl text-white mb-2">Create Account</p>
              <p className="text-white text-sm font-light max-w-xs">
                Create an account to get started on our platform. It's easy and
                only takes a few minutes to set up your profile.
              </p>
            </div>
          </div>

          <div className="flex items-center mb-2 md:mb-0">
            <div className="text-7xl text-white mr-4">2</div>
            <div>
              <p className="text-2xl text-white mb-2">Update Your Profile</p>
              <p className="text-white text-sm font-light max-w-xs">
                Make your profile stand out by adding your interests, photos,
                and more. The more information you provide, the easier it is for
                others to find you.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-7xl text-white mr-4">3</div>
            <div>
              <p className="text-2xl text-white mb-2">Swipe To Find Match</p>
              <p className="text-white text-sm font-light max-w-xs">
                Explore and discover potential matches by swiping right or left.
                Find people who share your interests and start a conversation
                today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Info;

