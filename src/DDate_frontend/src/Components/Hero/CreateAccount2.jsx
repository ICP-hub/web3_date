import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";

const CreateAccount2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    genderPronouns: "",
    selectedReligion: "",
    selectedFooding: "",
    selectedWhatYouDo: "",
    selectedlookingFor: "",
    selectedHeight: "Feet’inch’",
    selectedZodiac: "",
  });

  const backpageHandler = () => {
    navigate("/CreateAccount1");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("form2");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("form2", JSON.stringify(formData));
    console.log(formData);
    navigate("/CreateAccount3");
  };

  return (
    <div className="flex w-full h-screen md:flex-row font-num">
      {/* Image container for larger screens */}
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${createAccountImage})` }}
      >
        <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
          <div className="w-full max-w-xl mx-auto text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-num mx-auto">
              Create Your
            </h1>{" "}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              account here
            </h2>
            <p className="text-white text-bold md:text-2xl">Welcome ..</p>
            <p className="text-white font-light md:text-xl">
              Complete Your Profile Here.
            </p>
            <p className="text-white font-extralight md:text-lg">
              Tell us about yourself and let us help you finding the perfect
              match
            </p>
            <p className="italic text-yellow-700 md:text-lg">Good Luck!</p>
          </div>
        </div>

        {/* Image Overlay for smaller screens */}
        <div className="w-full h-full bg-black opacity-50 md:opacity-0"></div>
      </div>

      {/* Form container */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-4 md:px-12 z-10 overflow-y-auto">
        <div className="w-full max-w-md my-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center">
            Allow Us to Know You
          </h2>
          {/* <div className="border-t-2 border-dotted md:border-black border-white w-full mt-4 mb-4"></div> */}
          <div className="border-t-2 border-solid md:border-black border-white w-full mt-4 mb-4 ml-6"></div>
          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            {/* Gender Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Gender Pronouns
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 px-0 rounded-3xl">
                {["Man", "Woman", "Nonbinary"].map((genPro) => (
                  <label
                    key={genPro}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.genderPronouns === genPro
                      ? "bg-yellow-500 text-black"
                      : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                      }`}
                  >
                    <input
                      type="radio"
                      name="genderPronouns"
                      value={genPro}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {genPro}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
              {/* Height Input */}
              <div className="flex-1 mb-4 md:mb-0">
                <label
                  htmlFor="selectedHeight"
                  className=" block text-lg font-semibold  mb-2 text-white md:text-black"
                >
                  Height
                </label>
                <input
                  type="number"
                  id="selectedHeight"
                  name="selectedHeight"
                  placeholder="Feet’inch’’"
                  value={formData.selectedHeight}
                  onChange={handleFormChange}
                  className="px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500 text-center font-samibold w-48"
                />

              </div>

              {/* Zodiac Sign Input */}
              {/* <div className="flex-1">
                <label
                  htmlFor="selectedZodiac"
                  className="block text-lg font-semibold  mb-2 text-white md:text-black"
                >
                  Zodiac Sign
                </label>
                <input
                  type="text"
                  id="selectedZodiac"
                  name="selectedZodiac"
                  placeholder="Your zodiac sign"
                  value={formData.selectedZodiac}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div> */}
            </div>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Religion
              </legend>
              <div>
                <div className="flex flex-wrap gap-2 md:gap-2  px-0 rounded-3xl">
                  {["Hindu", "Muslim", "Sikh", "Christian"].map((religion) => (
                    <label
                      key={religion}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedReligion === religion
                          ? "bg-yellow-500 text-black"
                          : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedReligion"
                        value={religion}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {religion}
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
                  {["Jain", "Catholic", "Agnostic", "Jewish", "Atheist", "Buddhist", "Spiritual"].map(
                    (religion) => (
                      <label
                        key={religion}
                        className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedReligion === religion
                            ? "bg-yellow-500 text-black"
                            : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                          }`}
                      >
                        <input
                          type="radio"
                          name="selectedReligion"
                          value={religion}
                          onChange={handleFormChange}
                          style={{ display: "none" }}
                        />
                        {religion}
                      </label>
                    )
                  )}
                </div>
              </div>

            </fieldset>

            {/* Height and Zodiac Sign Selection */}
           
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold  mb-2 text-white md:text-black">
                Zodiac Sign
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"].map(
                  (Zodiac) => (
                    <label
                      key={Zodiac}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedZodiac === Zodiac
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedZodiac"
                        value={Zodiac}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {Zodiac}
                    </label>
                  )
                )}
              </div>
            </fieldset>
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold  mb-2 text-white md:text-black">
                Fooding
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["Vegan", "vegetarian", "Omnivore", "Kosher", "Carnivore", "Halal", "Pescatarian", "Others"].map(
                  (Fooding) => (
                    <label
                      key={Fooding}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedFooding === Fooding
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedFooding"
                        value={Fooding}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {Fooding}
                    </label>
                  )
                )}
              </div>
            </fieldset>


            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black ">
                What You do
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
                {["In School", "In College", "Employed", "Unemployed"].map(
                  (WhatYouDo) => (
                    <label
                      key={WhatYouDo}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedWhatYouDo === WhatYouDo
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedWhatYouDo"
                        value={WhatYouDo}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {WhatYouDo}
                    </label>
                  )
                )}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                What are you looking for
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
                {[
                  "Long-term relationship",
                  "Short-term relationship",
                  "Friends",
                  "Just Flowing",
                  "Life Partner",
                ].map((lookingFor) => (
                  <label
                    key={lookingFor}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedlookingFor === lookingFor
                      ? "bg-yellow-500 text-black"
                      : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                      }`}
                  >
                    <input
                      type="radio"
                      name="selectedlookingFor"
                      value={lookingFor}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {lookingFor}
                  </label>
                ))}
              </div>
            </fieldset>
            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-transparent text-white  md:text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500 hover:text-white  hover:border-white border border-white md:border-black"
                onClick={backpageHandler}
              >
                Back
              </button>
              <button
                type="text"
                className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount2;
