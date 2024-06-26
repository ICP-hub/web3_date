import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuthClient";
import InternetIdentity from "../../assets/Images/WalletLogos/InternetIdentity.png";
import NFID from "../../assets/Images/WalletLogos/NFID.png";
import { DDate_backend } from "../../../declarations/DDate_backend/index";

const WalletModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login, isAuthenticated, backendActor } = useAuth();

  const walletModalSvg = [
    {
      id: "ii",
      content: (
        <li
          className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600"
          onClick={() => loginHandler("ii")}
        >
          <img
            src={InternetIdentity}
            alt="InternetIdentity"
            className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
          />
          <span className="text-center flex-grow">Internet Identity</span>
        </li>
      ),
    },
    {
      id: "nfid",
      content: (
        <li
          className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600"
          onClick={() => loginHandler("nfid")}
        >
          <img
            src={NFID}
            alt="NFID"
            className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
          />
          <span className="text-center flex-grow">NFID</span>
        </li>
      ),
    },
  ];

  const [userExists, setUserExists] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to track mounted state

    const userExistOrNot = async (caller) => {
      try {
        const result = await caller.get_user_id_by_principal();
        console.log('result', result);
        if (isMounted) { 
          if(result){
          setUserExists(result?.Ok);
          }
          else{
            setUserExists('')
          }
        }
      } catch (error) {
        console.error("Error sending data to the backend:", error);
      }
    };

    if (backendActor) {
      userExistOrNot(backendActor); // Pass backendActor to the async function
    }

    return () => {
      isMounted = false; // Set mounted flag to false on cleanup
    };
  }, [backendActor]);

  useEffect(() => {
    if (isAuthenticated && userExists !== null) { // Ensure userExists is not null before navigating
      if (userExists) {
        navigate("/Swipe", { state: userExists });
      } else {
        navigate("/CreateAccount1");
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
          {walletModalSvg.map((wallet, index) => (
            <div key={index}>
              {wallet.content}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WalletModal;
