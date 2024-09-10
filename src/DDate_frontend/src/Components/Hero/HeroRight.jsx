import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletModal from '../WalletModal';
import LogoutModal from '../LogoutModal';
import createPageImage from '../../../assets/Images/CreateAccount/popUp.png';
import { useAuth } from '../../auth/useAuthClient';

const HeroRight = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isLogoutModal, setLogoutModal] = useState(false);
  const id = localStorage.getItem('id');
  const isUserLoggedIn = !!id;
  const toggleWalletModal = () => {
    setWalletModalOpen(!isWalletModalOpen);
  };

  const toggleLogoutModal = () => {
    setLogoutModal(!isLogoutModal);
  };

  useEffect(() => {
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isWalletModalOpen || isLogoutModal) {
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = '0';
    }

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = '0';
    };
  }, [isWalletModalOpen, isLogoutModal]);

  return (
    <div className="relative w-full lg:w-3/5 h-auto flex flex-col justify-center items-center lg:p-8">
      {/* {isAuthenticated && */}
      {/* ( */}
      <img
        src={createPageImage}
        loading='lazy'
        alt="Logout"
        onClick={toggleLogoutModal}
        className="rounded-full h-12 w-12 flex items-center justify-center text-black cursor-pointer absolute right-6 top-4 lg:flex hidden md:hidden "
      />
      {/* ) */}
      {/* } */}
      <div className="text-center mx-auto mt-4 md:mt-10">
        <h1 className="font-num text-3xl md:text-6xl font-semibold mb-2">
          Find Your Perfect
        </h1>
        <h1 className="font-custom-weight font-num text-3xl md:text-6xl font-semibold mb-4">
          Match
        </h1>
        <p className="font-num font-normal mb-1">
          Building Bridges, Building Bonds: Where
        </p>
        <p className="font-num font-normal mb-auto md:mb-10">
          Blockchain and Relationships Converge
        </p>
        <button
          onClick={toggleWalletModal}
          disabled={isAuthenticated}
          className={`font-num text-sm py-2 px-8 md:px-20 mt-4 md:mt-10 rounded-full mb-10 ${isAuthenticated
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-primary-color hover:bg-secondary-dark_hover text-white hover:text-white'
            }`}
        >
          Connect Wallet
        </button>
      </div>
      <WalletModal isOpen={isWalletModalOpen} onClose={toggleWalletModal} />
      <LogoutModal isOpen={isLogoutModal} onClose={toggleLogoutModal} />
    </div>
  );
};

export default HeroRight;
