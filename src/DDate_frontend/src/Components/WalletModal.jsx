import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuthClient";
import InternetIdentity from "../../assets/Images/WalletLogos/InternetIdentity.png";
import NFID from "../../assets/Images/WalletLogos/NFID.png";
import { Principal } from "@dfinity/principal";
import { nodeBackendUrl } from "../DevelopmentConfig";

// const WalletButton = ({ wallet, loginHandler, handlePopUp }) => (
//   <li
//     className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-primary-color active:bg-primary-color active:border-primary-color"
//     // onClick={() => loginHandler(wallet.id)}
//     onClick={handlePopUp}
//   >
//     <img
//       src={wallet.imgSrc}
//       alt={wallet.alt}
//       className="rounded-full h-8 w-8 flex items-center justify-center bg-black text-white mr-2"
//     />
//     <span className="text-center flex-grow">{wallet.name}</span>
//   </li>
// );


const WalletModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login, isAuthenticated, backendActor, principal, publicKey } =
    useAuth();
  const [userExists, setUserExists] = useState(null);
  const [popUp, setPopUp] = useState(false)
  console.log("isAuthenticated", isAuthenticated);
  console.log("backendActor", backendActor);

  const walletOptions = [
    {
      id: "ii",
      imgSrc: InternetIdentity,
      alt: "InternetIdentity",
      name: "Internet Identity",
    },
    { id: "nfid", imgSrc: NFID, alt: "NFID", name: "NFID" },
  ];

  const arrayBufferToBase64 = (buffer) => {
    return window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
  };

  const base64String = arrayBufferToBase64(publicKey);
  const saveToken = (token) => {
    localStorage.setItem("privateToken", token);
  };
  const registerUser = async (userId) => {
    const principalString = principal.toText();
    console.log("id of the useer = ", principalString)
    const raw = JSON.stringify({
      principal: principalString,
      publicKey: base64String,
      user_id: userId,
    });

    try {
      const response = await fetch(
        // "https://ddate.kaifoundry.com/api/v1/register/user",
        // "http://localhost:5000/api/v1/register/user",
        `${nodeBackendUrl}/api/v1/register/user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        }
      );
      const result = await response.json();
      console.log("registerUser", result);
      return result;
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const loginUser = async (userId) => {
    const principalString = principal.toText();
    const raw = JSON.stringify({
      principal: principalString,
      publicKey: base64String,
      user_id: userId,
    });

    try {
      const response = await fetch(
        // "https://ddate.kaifoundry.com/api/v1/login/user",
        // "http://localhost:5000/api/v1/login/user",
        `${nodeBackendUrl}/api/v1/login/user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        }
      );
      const result = await response.json();
      console.log("loginUser", result);
      if (result?.privateToken) {
        saveToken(result.privateToken);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  const checkUserExists = async () => {
    console.log("principal", principal)
    try {
      const result = await backendActor.get_user_id_by_principal();
      console.log("get_user_id_by_principal", result)
      if (result?.Ok) {
        const userId = result.Ok;
        // Storing userid into the local storage.
        localStorage.setItem('userId', userId);
        console.log("userId line 104 ===>>> : ", userId);
        navigate("/Swipe", { state: userId });

        setUserExists(userId);
        await registerUser(userId);
        await loginUser(userId);
      } else {

        // await registerUser(userId);
        setUserExists(null);
        navigate("/CreateAccount1");
        console.log('createaccount vala')
      }
    } catch (error) {
      console.error("Error checking if user exists:", error);
    }
  };

  useEffect(() => {
    if (backendActor) {
      checkUserExists();
    }
  }, [backendActor, principal, publicKey]);

  // useEffect(() => {

  //   console.log("isAuthenticated && userExists !== null   hfgjkhgf", isAuthenticated)
  //   if (isAuthenticated) {    //&& userExists !== null
  //     // Ensure userExists is not null before navigating
  //     console.log("isAuthenticated && userExists !== null",  userExists )
  //     if (userExists) {
  //       navigate("/Swipe", { state: userExists });
  //       console.log("swipe vala");
  //     } else {
  //       // navigate("/CreateAccount1");
  //       // console.log('createaccount vala')
  //     }
  //   }
  // }, [isAuthenticated, userExists]);

  const loginHandler = async (walletId) => {
    await login(walletId);
  };

  async function handlePopUp(walletId) {
    setPopUp(true)

    // Wait for 1 seconds before proceeding
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Perform the login action after the timeout
    await loginHandler(walletId);

    // Hide the popup after login
    setPopUp(false);

  }

  if (!isOpen) return null;

  const WarningIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-primary-option_color"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M21 12l-9-9-9 9h18z"
      />
    </svg>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-full h-fit max-w-md p-8 m-3 rounded-lg shadow-lg bg-white text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-lg mb-4 text-center font-bold">Connect With</h3>
        <div className="bg-black h-[1px] w-full"></div>
        <p className="border-t border-white w-full md:w-3/4 lg:w-2/3 mx-auto mb-4"></p>
        <ul className="space-y-3">
          {walletOptions.map((wallet) => (
            <li
            className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-primary-color active:bg-primary-color active:border-primary-color"
              // onClick={() => loginHandler(wallet.id)}
              onClick={() => handlePopUp(wallet.id)}
            >
              <img
                src={wallet.imgSrc}
                alt={wallet.alt}
                className="rounded-full h-8 w-8 flex items-center justify-center bg-black text-white mr-2"
              />
              <span className="text-center flex-grow">{wallet.name}</span>
            </li>

            // <WalletButton
            //   key={wallet.id}
            //   wallet={wallet}
            //   loginHandler={loginHandler}
            // />
          ))}
        </ul>
      </div>
      {popUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-center w-full px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60">
            <div className="relative flex flex-col items-center justify-center w-full max-w-md h-96 rounded-lg bg-gray-50 dark:bg-gray-700 p-6">
              <div className="absolute top-4 right-4 cursor-pointer">
                {/* Close button SVG or icon */}
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <WarningIcon className="h-16 w-16 text-primary-option_color mb-3" /> {/* Warning icon */}
                <p className="mb-2 font-bold text-gray-700 dark:text-gray-300">
                  You are being redirected to the login page. Please do not close this window or navigate away until the login process is complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default WalletModal;
