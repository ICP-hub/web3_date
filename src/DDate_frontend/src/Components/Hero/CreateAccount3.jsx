import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";
import { SlArrowUp,SlArrowDown } from "react-icons/sl";
const CreateAccount3 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedsmoking: "",
    selecteddrink: "",
    selectedhobbies: "",
    selectedsports: "",
  });

  const backpageHandler = () => {
    navigate("/CreateAccount2");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("form3");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value, checked } = e.target;

    const maxSelections = {
      selectedhobbies: 10,
      selectedsports: 26,
    };

    if (name === "selectedhobbies" || name === "selectedsports") {
      setFormData((prevData) => {
        let updatedData;
        if (checked) {
          // Adding the selection
          updatedData = {
            ...prevData,
            [name]: [...prevData[name], value],
          };
        } else {
          // Removing the selection
          updatedData = {
            ...prevData,
            [name]: prevData[name].filter((item) => item !== value),
          };
        }

        // Limit the selection to 2 items
        if (updatedData[name].length > maxSelections[name]) {
          updatedData[name].shift(); // Remove the first item
        }
        return updatedData;
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("form3", JSON.stringify(formData));
    console.log(formData);
    navigate("/CreateAccount4");
  };
  const [showAllSports, setShowAllSports] = useState(false); 
  const [showhobbies , setshowhobbies] = useState(false);
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
            </h1>
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
          <div className="border-t-2 border-solid md:border-black border-white w-full mt-4 mb-4 ml-6"></div>

          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            {/* smoking Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Smoking
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2  rounded-3xl">
                {["Regular", "Sometimes", "Never"].map((smoking) => (
                  <label
                    key={smoking}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedsmoking === smoking
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedsmoking"
                      value={smoking}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {smoking}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Alcohol/Drink 
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["Regular", "Socially", "Special Occasions", "Never"].map((drink) => (
                  <label
                    key={drink}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selecteddrink === drink
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selecteddrink"
                      value={drink}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {drink}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Hobbies (select any 2) */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
                Hobbies <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {[
                  "Reading",
                  "Dancing",
                  "Astronomy",
                  "DIY",
                  "Gaming",
                  "Numerology",
                  "Amateur Cook",
                  "Formula One",
                  "Painting",
                  "Pottery",
                  "Camping",
                  "Singing",
                  "Photography",
                  "Others"
                ].slice(0, showhobbies ? undefined : 8)
                .map((hobbies) => (
                  <label
                    key={hobbies}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedhobbies.includes(hobbies)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedhobbies"
                      value={hobbies}
                      onChange={handleFormChange}
                      checked={formData.selectedhobbies.includes(hobbies)}
                      style={{ display: "none" }}
                    />

                    {hobbies}
                  </label>
                ))}
                {showhobbies && ( // Render the "See Less" button if showAllSports is true
                <button

                  onClick={() => setshowhobbies(false)}
                  className="text-[#4D73F9] text-md font-semibold flex items-center"
                  type="button"
                >
                  see less <SlArrowUp className="bold-icon ml-[10px]"  />
                </button>
              )}
              <button
                onClick={() => setshowhobbies(!showhobbies)}
                className="text-[#4D73F9] text-md font-semibold"
                type="button"
              >
                {showhobbies ? "" : <p className="flex items-center ">see more <SlArrowDown className="ml-[10px]" /></p>}
              
              </button>
              </div>
            </fieldset>

            {/* Sports (select any 2) */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Sports <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {[
                  "Cricket",
                  "Football",
                  "Basketball",
                  "Tennis",
                  "Badminton",
                  "Boxing",
                  "Gym",
                  "Yoga",
                  "Volleyball",
                  "Chess",
                  "Carrom",
                  "Golf",
                  "Table-Tennis",
                  "Weightlifting",
                  "Polo",
                  "Rugby",
                  "Cycling",
                  "Wrestling",
                  "Swimming",
                  "Snooker",
                  "Sumo Wrestling",
                  "Aerobics",
                  "Skydiving",
                  "Karate",
                  "Judo",
                  "Others",
                ]
                .slice(0, showAllSports ? undefined : 10)
                .map((sports) => (
                  <label
                    key={sports}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedsports.includes(sports)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedsports"
                      value={sports}
                      onChange={handleFormChange}
                      checked={formData.selectedsports.includes(sports)}
                      style={{ display: "none" }}
                    />
                    {sports}
                  </label>
                ))}
                {showAllSports && ( // Render the "See Less" button if showAllSports is true
                <button
                  onClick={() => setShowAllSports(false)}
                  className="text-[#4D73F9] text-lg font-semibold flex items-center"
                  type="button" 
                >
                  see less  <SlArrowUp className="bold-icon ml-[10px]"  />
                </button>
              )}
              <button
                onClick={() => setShowAllSports(!showAllSports)}
                className="text-[#4D73F9] text-md font-semibold "
                type="button"
              >
                {showAllSports ? "" : <p className="flex items-center ml-[6px]">see more <SlArrowDown className="ml-[10px]" /></p>}
              </button>
              </div>
              
            </fieldset>

            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-transparent text-white md:text-black font-semibold py-2 px-4 rounded border  hover:bg-yellow-500 hover:text-white  hover:border-white border-white md:border-black"
                onClick={backpageHandler}
              >
                Back
              </button>
              <button
                type="submit"
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

export default CreateAccount3;
