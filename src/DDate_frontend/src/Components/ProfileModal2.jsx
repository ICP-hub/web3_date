import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Principal } from "@dfinity/principal";

function ProfileModal2({ profile, onClose }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ images: null });
  const [principal, setPrincipal] = useState(null);


  const redirectMessageHandler = () => {
    onClose();
    navigate("/ChattingPage");
  };


  useEffect(() => {
    const principalString = localStorage.getItem("id");
    if (principalString) {
      const principal = Principal.fromText(principalString);
      setPrincipal(principal);

      const fetchUserProfile = async () => {
        try {
          const userProfileData = await backendActor.get_profile(principal);
          setFormData({ images: userProfileData.images || [] });
        } catch (error) {
          console.error("Error fetching user profile: ", error);
        }
      };

      fetchUserProfile();
    } else {
      console.warn("Principal string is null or empty.");
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-[rgba(51,51,51,0.75)] flex flex-col items-center justify-evenly p-8">
        <div className="text-white text-[30px] font-dynalight mb-10">
          It's a Match!
        </div>
        <div className="flex">
          {formData.images && formData.images.length > 0 && (
            <div className="bg-white w-[150px] h-[150px] overflow-hidden rounded-full">
              <img
                src={formData.images[0]}
                alt="Matched Person 1"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {profile.images && profile.images.length > 0 && (
            <div className="bg-white w-[150px] h-[150px] overflow-hidden rounded-full ms-4">
              <img
                src={profile.images[0]}
                alt="Matched Person 2"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="font-dynalight text-white text-[20px]">
          Congratulations, you've been matched with {profile.name}!
        </div>
        <button
          className="text-white text-lg border border-white w-[250px] py-4 px-6 rounded-md mb-5"
          onClick={redirectMessageHandler}
        >
          Send a Message
        </button>
      </div>
    </div>
  );
}

export default ProfileModal2;