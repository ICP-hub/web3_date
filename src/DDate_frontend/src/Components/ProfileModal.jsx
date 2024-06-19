import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileModal({ profile, onClose, indexxx }) {
  // Inline styles for the modal and backdrop
  // const modalStyle = {
  //   position: "fixed",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   backgroundColor: "white",
  //   padding: "20px",
  //   zIndex: 1000,
  //   borderRadius: "10px",
  //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  //   width: "30%",
  // };

  // const imgg = {
  //   maxWidth: "100%",
  //   height: "auto",
  // };

  // const backdropStyle = {
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(0, 0, 0, 0.7)",
  //   zIndex: 1000,
  // };

  // const buttonStyle = {
  //   marginTop: "20px",
  //   padding: "10px 20px",
  //   border: "none",
  //   borderRadius: "5px",
  //   backgroundColor: "#007bff",
  //   color: "white",
  //   cursor: "pointer",
  // };

  const navigate = useNavigate();

  const redirectMessageHandler = () => {
    onClose();
    navigate("/ChattingPage");
  };

  return (
    // <div style={backdropStyle}>
    //   <div style={modalStyle}>
    //     {console.log("I have got this profile at my end!!!", profile)}
    //     {console.log("chlo bhai index dekhde aa ", indexxx)}

    //     <img src={profile.images[0]} style={imgg}></img>
    //     <h2>You've Matched!</h2>
    //     <p>Congratulations, you've been matched with {profile.name}!</p>
    //     <button onClick={onClose} style={buttonStyle}>
    //       Close
    //     </button>
    //   </div>
    // </div>
    <>

      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center ">
        <div className="absolute inset-0 bg-[rgba(51,51,51,0.75)] flex flex-col items-center justify-evenly p-8">
          <div className="text-white text-[30px] font-dynalight mb-10">
            It's a Match!
          </div>
          <div className="flex">
            
              <div className="bg-white w-[150px] h-[150px] overflow-hidden rounded-full">
                <img
                  src={profile.images[0]}
                  alt="Matched Person 1"
                  className="w-full h-full object-cover"
                />
              </div>
            
            
              {/* <div className="bg-white w-[150px] h-[150px] overflow-hidden rounded-full ms-4">
                <img
                  src={profile.images[0]}
                  alt="Matched Person 2"
                  className="w-full h-full object-cover"
                />
              </div> */}
            
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
    </>
  );
}

export default ProfileModal;
