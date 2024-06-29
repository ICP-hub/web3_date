import React, { useState, useEffect } from 'react';
import heroLeft from "../../../assets/Images/heroLeft.png";
import logo from "../../../assets/Images/CreateAccount/logo.png";
import createPageImage from '../../../assets/Images/CreateAccount/createPageImage.png';
import WalletModal from '../WalletModal';
import LogoutModal from '../LogoutModal';
import { useAuth } from '../../auth/useAuthClient';

const HeroLeft = () => {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isLogoutModal, setLogoutModal] = useState(false);
  const { principal, isAuthenticated } = useAuth();

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
    <div className="w-full lg:w-2/5 h-full relative">
      <img src={heroLeft} alt="heroLeft" className="object-cover w-full h-full" />
      <img
        src={logo}
        alt="Logo"
        className="h-16 w-16 lg:h-18 lg:w-18 mb-4 absolute top-5 left-5 lg:top-8 lg:left-8"
      />
      {isAuthenticated && (
        <img
          src={createPageImage}
          alt="Logout"
          onClick={toggleLogoutModal}
          className="rounded-full h-16 w-16 flex items-center justify-center text-black cursor-pointer absolute right-6 top-4 lg:hidden"
        />
      )}
      <LogoutModal isOpen={isLogoutModal} onClose={toggleLogoutModal} />
      <WalletModal isOpen={isWalletModalOpen} onClose={toggleWalletModal} />
    </div>
  );
};

export default HeroLeft;
