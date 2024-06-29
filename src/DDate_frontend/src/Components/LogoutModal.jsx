import * as React from "react";
import { useAuth } from "../auth/useAuthClient";
import { Principal } from "@dfinity/principal";

const LogoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { logout, principal } = useAuth();

  console.log("principal in logoutmodal => ", principal);
  const logoutHandler = async () => {
    // localStorage.removeItem("id");
    // localStorage.removeItem("identity");
    // localStorage.removeItem("wallet");
    await logout()
    // localStorage.removeItem("id");

    onClose();
    window.location.href = "/";

  };
  // let principal = localStorage.getItem("id");

  return (
    <div
      className="fixed inset-0 flex justify-end overflow-hidden items-start pt-14 sm:pt-12 z-50"
      onClick={onClose}
    >
      <div
        className="relative m-5 p-5 rounded-lg shadow-lg bg-walletColor text-white
           max-w-xs sm:max-w-xs md:max-w-xs lg:w-1/3 xl:w-1/4 sm:w-1/3 h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-base mb-2 text-center">Wallet Details</h3>
        <p className="border-t border-white w-3/4 mx-auto mb-4">
          Principal :{principal && principal.toText()}
        </p>

        <div
          className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600"
          onClick={logoutHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-2"
          >
            <path d="M13 16V13H6V11H13V8L17 12L13 16Z" fill="currentColor" />
            <path
              d="M20 21H4C2.9 21 2 20.1 2 19V5C2 3.9 2.9 3 4 3H11V5H4V19H20V5H13V3H20C21.1 3 22 3.9 22 5V19C22 20.1 21.1 21 20 21Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
