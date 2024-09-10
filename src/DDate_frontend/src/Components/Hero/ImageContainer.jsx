import React from 'react'
import createAccountImage from "../../../assets/Images/CreateAccount/together.png";
import Logo from "../../../assets/Images/CreateAccount/logo1.svg"

const ImageContainer = () => {
  return (
    <div
      className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0 text-center"
      style={{ backgroundImage: `url(${createAccountImage})` }}
    >
      <div className='mt-14 ml-10'>
        <img src={Logo} loading='lazy' className='h-14' alt="" />
      </div>
      <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
        <div className="w-full max-w-xl mx-auto text-left ">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 font-viga mx-auto">
            Create Your
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-black font-viga mb-2">
            account here
          </h2>
          <p className="text-black font-[600] mt-[30px] font-viga md:text-2xl">Welcome ..</p>
          <p className="text-black font-[600] font-viga md:text-xl">
            Complete Your Profile Here.
          </p>
          <p className="text-black font-[600] w-2/3 font-viga md:text-md">
            Tell us about yourself and let us help you find the perfect
            match
          </p>
          <p className="text-[#C2839E] font-[600] mt-[15px] md:text-lg">Good Luck!</p>
        </div>
      </div>

      {/* Image Overlay for smaller screens */}
      <div className="w-full h-full bg-black opacity-50 md:opacity-0"></div>
    </div>
  )
}

export default ImageContainer