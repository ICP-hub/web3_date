import React from "react";

const MemberStatistics = () => {
  return (
    <div
      className="font-num flex  flex-wrap w-full lg:px-36 md: items-center p-4 "
      style={{
        background:
          "radial-gradient(84.33% 84.32% at 51.71% 43.22%, #E28110 0%, #26011C 100%)",
      }}
    >
      {/* Adjust width and padding for each stat block for different breakpoints */}
      <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center p-2 md:p-2">
        {/* SVG and layout adjustments */}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full overflow-hidden mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="56"
            viewBox="0 0 78 63"
            fill="none"
          >
            <path
              d="M17.875 16.75C17.875 15.4696 18.1272 14.2018 18.6172 13.0188C19.1072 11.8359 19.8253 10.7611 20.7307 9.85571C21.6361 8.95034 22.7109 8.23216 23.8938 7.74217C25.0768 7.25219 26.3446 7 27.625 7C28.9054 7 30.1732 7.25219 31.3562 7.74217C32.5391 8.23216 33.6139 8.95034 34.5193 9.85571C35.4247 10.7611 36.1428 11.8359 36.6328 13.0188C37.1228 14.2018 37.375 15.4696 37.375 16.75C37.375 19.3359 36.3478 21.8158 34.5193 23.6443C32.6908 25.4728 30.2109 26.5 27.625 26.5C25.0391 26.5 22.5592 25.4728 20.7307 23.6443C18.9022 21.8158 17.875 19.3359 17.875 16.75ZM27.625 0.5C23.3152 0.5 19.182 2.21205 16.1345 5.25951C13.087 8.30698 11.375 12.4402 11.375 16.75C11.375 21.0598 13.087 25.193 16.1345 28.2405C19.182 31.288 23.3152 33 27.625 33C31.9348 33 36.068 31.288 39.1155 28.2405C42.163 25.193 43.875 21.0598 43.875 16.75C43.875 12.4402 42.163 8.30698 39.1155 5.25951C36.068 2.21205 31.9348 0.5 27.625 0.5ZM50.375 0.5H47.125V7H50.375C51.6554 7 52.9232 7.25219 54.1062 7.74218C55.2891 8.23216 56.3639 8.95034 57.2693 9.85571C58.1747 10.7611 58.8928 11.8359 59.3828 13.0188C59.8728 14.2018 60.125 15.4696 60.125 16.75C60.125 18.0304 59.8728 19.2982 59.3828 20.4812C58.8928 21.6641 58.1747 22.7389 57.2693 23.6443C56.3639 24.5497 55.2891 25.2678 54.1062 25.7578C52.9232 26.2478 51.6554 26.5 50.375 26.5H47.125V33H50.375C54.6848 33 58.818 31.288 61.8655 28.2405C64.9129 25.193 66.625 21.0598 66.625 16.75C66.625 12.4402 64.9129 8.30698 61.8655 5.25951C58.818 2.21205 54.6848 0.5 50.375 0.5ZM0 55.75C0 51.4402 1.71205 47.307 4.75951 44.2595C7.80698 41.212 11.9402 39.5 16.25 39.5H39C43.3098 39.5 47.443 41.212 50.4905 44.2595C53.538 47.307 55.25 51.4402 55.25 55.75V62.25H48.75V55.75C48.75 53.1641 47.7228 50.6842 45.8943 48.8557C44.0658 47.0272 41.5859 46 39 46H16.25C13.6641 46 11.1842 47.0272 9.35571 48.8557C7.52723 50.6842 6.5 53.1641 6.5 55.75V62.25H0V55.75ZM78 55.75C78 53.616 77.5797 51.5029 76.763 49.5314C75.9464 47.5599 74.7494 45.7685 73.2405 44.2595C71.7315 42.7506 69.9401 41.5536 67.9686 40.737C65.9971 39.9203 63.884 39.5 61.75 39.5H58.5V46H61.75C64.3359 46 66.8158 47.0272 68.6443 48.8557C70.4728 50.6842 71.5 53.1641 71.5 55.75V62.25H78V55.75Z"
              fill="black"
            />
          </svg>{" "}
        </div>
        <p className="text-white font-bold text-base md:text-lg lg:text-xl mt-2">
          Total Members
        </p>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center p-4">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full overflow-hidden mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="56"
            viewBox="0 0 81 81"
            fill="none"
          >
            <path
              d="M32.6531 46.2375L35.6063 36.6188L27.8438 30.375H37.4625L40.5 20.925L43.5375 30.375H53.1562L45.3094 36.6188L48.2625 46.2375L40.5 40.2469L32.6531 46.2375ZM20.25 77.625V51.5531C18.1125 49.1906 16.4531 46.4906 15.2719 43.4531C14.0906 40.4156 13.5 37.1812 13.5 33.75C13.5 26.2125 16.1156 19.8281 21.3469 14.5969C26.5781 9.36562 32.9625 6.75 40.5 6.75C48.0375 6.75 54.4219 9.36562 59.6531 14.5969C64.8844 19.8281 67.5 26.2125 67.5 33.75C67.5 37.1812 66.9094 40.4156 65.7281 43.4531C64.5469 46.4906 62.8875 49.1906 60.75 51.5531V77.625L40.5 70.875L20.25 77.625ZM40.5 54C46.125 54 50.9062 52.0312 54.8438 48.0938C58.7812 44.1562 60.75 39.375 60.75 33.75C60.75 28.125 58.7812 23.3438 54.8438 19.4062C50.9062 15.4688 46.125 13.5 40.5 13.5C34.875 13.5 30.0938 15.4688 26.1562 19.4062C22.2188 23.3438 20.25 28.125 20.25 33.75C20.25 39.375 22.2188 44.1562 26.1562 48.0938C30.0938 52.0312 34.875 54 40.5 54ZM27 67.5844L40.5 64.125L54 67.5844V57.1219C52.0312 58.2469 49.9073 59.1334 47.628 59.7814C45.3488 60.4294 42.9727 60.7523 40.5 60.75C38.025 60.75 35.6479 60.426 33.3686 59.778C31.0894 59.13 28.9665 58.2446 27 57.1219V67.5844Z"
              fill="black"
            />
          </svg>{" "}
        </div>
        <p className="text-white font-bold text-base md:text-lg lg:text-xl mt-2">
          Premium Members
        </p>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center p-4">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full overflow-hidden mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="56"
            viewBox="0 0 87 87"
            fill="none"
          >
            <path
              d="M43.5 29C49.5061 29 54.375 24.1311 54.375 18.125C54.375 12.1189 49.5061 7.25 43.5 7.25C37.4939 7.25 32.625 12.1189 32.625 18.125C32.625 24.1311 37.4939 29 43.5 29Z"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M56.1875 79.75V63.4375L65.25 58L58 34.4375C58 34.4375 50.75 29 43.5 29C36.25 29 29 34.4375 29 34.4375L21.75 56.1875L30.8125 63.4375V79.75"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{" "}
        </div>
        <p className="text-white font-bold text-base md:text-lg lg:text-xl mt-2">
          Men
        </p>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center p-4">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full overflow-hidden mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="56"
            viewBox="0 0 96 96"
            fill="none"
          >
            <path
              d="M48 32C54.6274 32 60 26.6274 60 20C60 13.3726 54.6274 8 48 8C41.3726 8 36 13.3726 36 20C36 26.6274 41.3726 32 48 32Z"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M54 72V88M42 72V88M54.46 32H41.54L20 72H76L54.46 32Z"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{" "}
        </div>
        <p className="text-white font-bold text-base md:text-lg lg:text-xl mt-2">
          Women
        </p>
      </div>
    </div>
  );
};

export default MemberStatistics;
