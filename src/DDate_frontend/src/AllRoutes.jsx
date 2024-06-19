import React, { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import CreateAccount1 from "./Components/Hero/CreateAccount1";
import Swipe from "./Components/Swipe";
import Profile from "./Components/Profile";
import Notification from "./Components/Notification";
import ChattingPage from "./Components/Chatting/ChattingPage";
import ProfileViewer from "./Components/ProfileViewer";
import { DDate_backend } from "../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";
import { useNavigate } from "react-router-dom";
import ChattingSinglePage from "./Components/Chatting/ChattingSinglePage";
import EditProfile from "./Components/EditProfile/EditProfile"

//import { toHex } from "@dfinity/agent";


const AllRoutes = () => {

  
  const navigate = useNavigate();
  const [userCheckComplete, setUserCheckComplete] = useState(false);
  const [finalMatch, setFinalMatch] = useState([]);
  const [myPrincipal, setMyPrincipal] = useState('');

  //const [publicKey, setPublicKey] = useState('');
  const [signature, setSignature] = useState('');
  const [principal, setPrincipal] = useState('');


  const userToken = localStorage.getItem('userToken');

  // console.log("getting it from local storage", userToken);


  // useEffect(()=>{


  // }, [principalString, publicKey])


  //





  const existingUserHandler = async () => {
    try {
      const principalString = localStorage.getItem("id");
      // console.log("Principal string from localStorage:", principalString);
  
      if (principalString) {
        const principal = Principal.fromText(principalString);
  
        if (principal) {
          const userExist = await DDate_backend.get_profile(principal);
          const userPrincipalInString = userExist.id.toText();
          const principalToString = principal.toText();
  
          if (userPrincipalInString === principalToString) {
            navigate("/Swipe");
          }
        }
      }
    } catch (error) {
      console.error("Error in existingUserHandler:", error);
    } finally {
      setUserCheckComplete(true);
    }
  };
  



  useEffect(() => {
    existingUserHandler();
  }, []);

  // function convertStringToPrincipal(principalString) {
  //   try {
  //     const principal = Principal.fromText(principalString);
  //     // console.log("Converted Principal: ", principal.toText());
  //     return principal;
  //   } catch (error) {
  //     console.error("Error converting string to Principal: ", error);
  //     return null;
  //   }
  // }

  //   async function getSignatureWithData(authClient){
  //     let principal = authClient.getIdentity().getPrincipal().toString();
  //     let encoder = new TextEncoder();
  //     let message = encoder.encode(principal);
  //     let signature = await authClient.getIdentity().sign(message);
  //     let exportedKey = await crypto.subtle.exportKey('raw', authClient.getIdentity()._inner._keyPair.publicKey);
  //     return {
  //         publicKey: toHex(exportedKey),
  //         signature: toHex(signature),
  //         principal: principal,
  //     }
  // } 

  // const fetchSignatureData = async (authClient) => {
  //   try {

  //     const data = await getSignatureWithData(authClient);
  //     setPublicKey(data.publicKey);
  //     setSignature(data.signature);
  //     setPrincipal(data.principal);
  //   } catch (error) {
  //     console.error('Error fetching signature data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchSignatureData(authClient);
  // }, []);



  return (
    <>
       {userCheckComplete && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<EditProfile />} /> */}
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/CreateAccount1" element={<CreateAccount1 />} />
          <Route path="/Swipe" element={<Swipe />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/ChattingPage" element={<ChattingPage finalMatch={finalMatch}/>} />
          <Route path="/ChattingSinglePage/:chatId" element={<ChattingSinglePage />} />

          <Route path="/profile/:senderId" element={<ProfileViewer finalMatch={finalMatch} setFinalMatch={setFinalMatch} />} />
          
        </Routes>
      )} 

      


    </>
  );
};

export default AllRoutes;

//lqfrt-gz5bh-7z76h-3hb7a-jh2hq-be7jp-equjq-b7wrw-u2xub-tnk3x-qqe
