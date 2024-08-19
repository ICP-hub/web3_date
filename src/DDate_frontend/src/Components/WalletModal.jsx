import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuthClient";
import InternetIdentity from "../../assets/Images/WalletLogos/InternetIdentity.png";
import NFID from "../../assets/Images/WalletLogos/NFID.png";
import { Principal } from "@dfinity/principal";

const WalletButton = ({ wallet, loginHandler }) => (
  <li
    className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600"
    onClick={() => loginHandler(wallet.id)}
  >
    <img
      src={wallet.imgSrc}
      alt={wallet.alt}
      className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
    />
    <span className="text-center flex-grow">{wallet.name}</span>
  </li>
);

const WalletModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login, isAuthenticated, backendActor, principal, publicKey } =
    useAuth();
  const [userExists, setUserExists] = useState(null);
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
    const raw = JSON.stringify({
      principal: principalString,
      publicKey: base64String,
      user_id: userId,
    });

    try {
      const response = await fetch(
        "https://ddate.kaifoundry.com/api/v1/register/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        }
      );
      const result = await response.json();
      // console.log("registerUser", result);
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
        "https://ddate.kaifoundry.com/api/v1/login/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        }
      );
      const result = await response.json();
      // console.log("loginUser", result);
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
        console.log("userId line 104 ===>>> : ", userId);
        setUserExists(userId);
        await registerUser(userId);
        await loginUser(userId);
      } else {
        setUserExists(null);
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

  useEffect(() => {

    console.log("isAuthenticated && userExists !== null   hfgjkhgf", isAuthenticated && userExists !== null)
    if (isAuthenticated) {    //&& userExists !== null
      // Ensure userExists is not null before navigating
      console.log("isAuthenticated && userExists !== null", isAuthenticated && userExists !== null)
      if (userExists) {
        navigate("/Swipe", { state: userExists });
        console.log("swipe vala");
      } else {
        navigate("/CreateAccount1");
        console.log('createaccount vala')
      }
    }
  }, [isAuthenticated, userExists]);

  const loginHandler = async (walletId) => {
    await login(walletId);
  };

  if (!isOpen) return null;

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
          {walletOptions.map((wallet) => (
            <WalletButton
              key={wallet.id}
              wallet={wallet}
              loginHandler={loginHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WalletModal;
