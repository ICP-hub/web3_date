import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "../SidebarComponent";
import back from "../../../assets/Images/CreateAccount/back.svg";
import { useState, useEffect} from "react";
import { DDate_backend } from "../../../../declarations/DDate_backend/index";
import Loader from "../Loader";



const ChattingPage = ({ finalMatch }) => {
  const navigate = useNavigate();

  const [fetchedProfiles, setFetchedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const profilePromises = finalMatch.map(principal =>
          DDate_backend.get_profile(principal)
        );
        const profiles = await Promise.all(profilePromises);
        setFetchedProfiles(profiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (finalMatch.length > 0) {
      console.log("message list should be shown as profiles are being fetched from backend!")
      fetchProfiles();
    } else {
      console.log("matched profiles array is empty!!! No Message List will be shown");
    }
  }, [finalMatch]);
 
  if (error) {
    return <div>Error fetching profiles: {error}</div>;
  }

  console.log("these are the fetched profiles whom you can send messages #@#@#@", fetchedProfiles);


  return (
    <>
      <SidebarComponent />
  
      {loading ? (
        <div className="sm:ml-64">
        <div className="container flex justify-center">
          <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white  h-screen ">
                  <div className="h-screen">
                 <Loader/>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="h-screen grid grid-cols-12">
          {/* Sidebar - hidden on smaller screens */}
          <div className="hidden md:block md:col-span-2"></div>
  
          {/* Main content area */}
          <div className="col-span-12 md:col-span-10 lg:col-span-6 xl:col-span-6 px-6 lg:px-10 xl:px-12">
            <div className="flex items-center md:mt-10 ml-12 gap-2 mb-4">
              <img
                src={back}
                alt="back"
                onClick={() => navigate("/Swipe")}
                className="w-4 h-4 cursor-pointer"
              />
              <div className="ml-2 text-lg font-medium">Your Messages</div>
            </div>
  
            <div className="px-6 sm:p-4 md:px-8 lg:px-10 xl:px-12 overflow-y-auto">
              <div className="relative flex justify-center items-center w-full mb-16 mt-2">
                <p className="border-t border-black w-full md:w-3/4 lg:w-2/3"></p>
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
  
              <div className="border-b border-gray-300">
                {/* Search or title bar */}
                <div className="flex items-center p-4 bg-white">
                  <input
                    className="flex-grow py-2 px-4 border bg-gray-200 rounded-full"
                    type="text"
                    placeholder="Search by name"
                  />
                </div>
  
                <div className="bg-white">
                  {fetchedProfiles.map((pro) => (
                    <div
                      key={pro.id}
                      className="flex items-center p-3 md:p-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/ChattingSinglePage/${pro.id}`, { state: { profile: pro } })}
                    >
                      <img
                        src={pro.images[0]}
                        alt={pro.name}
                        className="w-10 h-10 md:w-10 md:h-10 rounded-full mr-3 md:mr-4"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{pro.name}</span>
                        <span className="text-gray-600 text-ellipsis">
                          write your message
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
};

export default ChattingPage;
