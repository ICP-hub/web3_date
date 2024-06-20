
import React from "react";

import p1 from "../../assets/Images/FeedbackImages/p1.svg";
import p2 from "../../assets/Images/FeedbackImages/p2.svg";
import p3 from "../../assets/Images/FeedbackImages/p3.svg";

const Feedback = () => {
  const feedbackData = [
    {
      name: "Camilla",
      description:
        "I had an amazing experience using the app! The user interface is so user-friendly, and I quickly found new friends.",
    },
    {
      name: "Eliana",
      description:
        "The app has exceeded my expectations. It's not just about dating; it's about meaningful connections. Thanks to this app, I met someone special.",
    },
    {
      name: "Antonio",
      description:
        "I've been using this app for a while now, and it has helped me expand my professional network significantly. It's a game-changer!",
    },
  ];

  return (
    <>
      <div className="bg-white flex font-num flex-col items-center w-full mt-14  md:px-6 lg:px-[4%]">
        <h2 className="text-center text-black text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          Happy Customers
        </h2>
        <p className="font-custom text-center text-black text-lg font-light max-w-4xl mx-auto mb-5">
          Discover what our users have to say about their experiences:
        </p>

        <div className="relative flex justify-center items-center w-full mb-6 lg:mb-16">
          <p className="border-t border-black mx-4 sm:mx-10 md:mx-20 lg:mx-60 w-full"></p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 20 19"
            fill="none"
            className="absolute text-red-700"
          >
            <path
              d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-10 px-2 md:px-4">
          {feedbackData.map((feedback, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-lg border border-gray-300 rounded-lg p-4"
            >
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2">
                  <p className="text-black text-sm md:text-base font-medium">
                    {feedback.name}
                  </p>
                  <div className="w-12 h-12 rounded-full overflow-hidden self-center mt-2 md:mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="37"
                      viewBox="0 0 48 37"
                      fill="none"
                    >
                      <path
                        d="M4.26134 33.8105C1.48864 30.8509 0 27.5315 0 22.1508C0 12.6823 6.6141 4.19588 16.2324 0L18.6363 3.72787C9.65868 8.60818 7.90354 14.9412 7.20363 18.9342C8.64921 18.1821 10.5416 17.9197 12.3964 18.0929C17.2526 18.5446 21.0806 22.5511 21.0806 27.5316C21.0806 30.0427 20.0879 32.4511 18.321 34.2268C16.5541 36.0024 14.1576 37 11.6588 37C10.2769 36.9879 8.91123 36.6996 7.64124 36.1521C6.37125 35.6045 5.22233 34.8085 4.26134 33.8105ZM31.1808 33.8105C28.4081 30.8509 26.9194 27.5315 26.9194 22.1508C26.9194 12.6823 33.5335 4.19588 43.1518 0L45.5557 3.72787C36.5781 8.60818 34.8229 14.9412 34.123 18.9342C35.5686 18.1821 37.461 17.9197 39.3158 18.0929C44.1721 18.5446 48 22.5511 48 27.5316C48 30.0427 47.0074 32.4511 45.2404 34.2268C43.4735 36.0024 41.077 37 38.5782 37C37.1963 36.9879 35.8306 36.6996 34.5606 36.1521C33.2907 35.6045 32.1417 34.8085 31.1808 33.8105Z"
                        fill="#A40320"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-black text-xs md:text-sm font-light mt-2 md:mt-4">
                  {feedback.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="bg-yellow-400 rounded-full py-2 px-4 md:px-8 lg:px-12 mb-10">
          <button className="text-sm md:text-base lg:text-lg">Read More</button>
        </div> */}
      </div>
    </>
  );
};

export default Feedback;


