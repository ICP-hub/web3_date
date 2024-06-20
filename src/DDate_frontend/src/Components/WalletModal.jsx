import * as React from "react";
import { useState } from "react";
import AstroXME from "../../assets/Images/WalletLogos/AstroXME.png";
import infinityWallet from "../../assets/Images/WalletLogos/infinityWallet.png";
import InternetIdentity from "../../assets/Images/WalletLogos/InternetIdentity.png";
import NFID from "../../assets/Images/WalletLogos/NFID.png";
import PlugWallet from "../../assets/Images/WalletLogos/PlugWallet.png";
import StoicWallet from "../../assets/Images/WalletLogos/StoicWallet.png";
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "react-router-dom";
import { toHex } from "@dfinity/agent";
import { useAuth } from "../auth/useAuthClient";
import axios from "axios";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";

const WalletModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login, backendActor, principal } = useAuth();
  // console.log("Login principal", principal);
  const [userToken, setUserToken] = useState("");
  const [userPrincipal, setUserPrincipal] = useState("");

  
  // const [loader, setLoader] = useState(false);

  if (!isOpen) return null;

  const walletModalSvg = [
    {    id: "ii",
    content: (
    <li
            className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600 "
          >
            <img
              src={InternetIdentity}
              alt="InternetIdentity"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span className="text-center flex-grow">Internet Identity</span>
          </li>
    )},
    {
      id: "nfid",
      content: (
<li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img
              src={NFID}
              alt="NFID"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span className="text-center flex-grow">
              NFID
            </span>
          </li>
      )}
  ]
  const existingUserHandler = async () => {
    // const principalString = localStorage.getItem("id");
    // console.log("dae na mc pricipal =>", principal);
    if (principal) {
      try {
        // const newPrincipal = Principal.fromText(principalString);
        const userExist = await backendActor.get_profile(principal);
        const userPrincipalInString = userExist.id.toText();
        const principalToString = principal.toText();

        if (userPrincipalInString === principalToString) {
          navigate("/Swipe");
        } else {
          navigate("/CreateAccount1");
        }
      } catch (error) {
        console.error("Error checking user existence: ", error);
        // navigate("/CreateAccount1");
      }
    } else {
      navigate("/CreateAccount1");
    }
  };

 
  // async function getSignatureWithData(authClient) {
  //   let principal = authClient.getPrincipal().toString();
  //   let encoder = new TextEncoder();
  //   let message = encoder.encode(principal);
  //   let signature = await authClient.getPrincipal().sign(message);
  //   let exportedKey = await crypto.subtle.exportKey('raw', authClient.getPrincipal()._inner._keyPair.publicKey);
  //   return {
  //     publicKey: toHex(exportedKey),
  //     signature: toHex(signature),
  //     principal: principal,
  //   }
  // }

  // async function registerUser(principal, publicKey, signature) {
  //   console.log("inside register user!!")

  //   // Retrieve the necessary information from localStorage
  //   const principal = localStorage.getItem('id');
  //   const publicKey = localStorage.getItem('publicKey'); // Assuming you have stored it already
  //   const signature = localStorage.getItem('signature'); // Assuming you have stored it already

  //   // Construct the API endpoint (if it's always localhost, you can hardcode it, otherwise, make it configurable)
  //   // const apiEndpoint = 'http://localhost:3000/api/v1/register/user';

  //   const apiEndpoint = 'https://ddate.kaifoundry.com/api/v1/register/user';
  //   // Construct the payload
  //   const payload = {
  //     principal,
  //     publicKey,
  //     signature
  //   };

  //   // Use fetch to make the API call
  //   try {
  //     const response = await fetch(apiEndpoint, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(payload)
  //     });

  //     // Check if the request was successful
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Registration successful:', data);

  //       handleLogin(principal, publicKey);

  //       // Handle successful registration (e.g., redirect to a login page or display a success message)
  //     } else {
  //       // If the server response was not ok, handle the error
  //       console.error('Registration failed:', response.status, response.statusText);
  //       // Handle error (e.g., display an error message to the user)
  //     }
  //   } catch (error) {
  //     // Handle network error
  //     console.error('Network error:', error);
  //     // Handle error (e.g., display an error message to the user)
  //   }
  // }

  // const handleLogin = async (principal, publicKey) => {
  //   try {
  //     // Replace with actual login API call
  //     const response = await axios.post('https://ddate.kaifoundry.com/api/v1/login/user', {
  //       principal: principal,
  //       publicKey: publicKey // Modify as needed
  //     });

  //     if (response.data.status) {
  //       onLogin(response.data.userToken, principal);
  //       console.log("login sucesssssss__ss");

  //       console.log("ls see token updated ja nhi befor local storage", userToken);
  //       console.log("ls see userPrincipal updated ja nhi befor local storage", userPrincipal);

  //     } else {
  //       console.log('Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };

  const loginHandler = async (val) => {
    await login(val);
    navigate("/CreateAccount1");

    // await existingUserHandler();
  };


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start z-50 pt-20"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-5 m-3 rounded-lg shadow-lg bg-walletColor text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-lg mb-4 text-center">Connect With</h3>
        <p className="border-t border-white w-full md:w-3/4 lg:w-2/3 mx-auto mb-4"></p>

        <ul className="space-y-3">
        {walletModalSvg.map((wallet, index) => (
                      // console.log('wallet',wallet),
                      <div key={index} onClick={()=>loginHandler(wallet.id)}>
                        {wallet.content}
                      </div>
                    ))}
        </ul>
      </div>
    </div>
  );
};

export default WalletModal;
