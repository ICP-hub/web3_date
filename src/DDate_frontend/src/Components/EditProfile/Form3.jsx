// import React, { useEffect, useState } from 'react'

// const Form3 = ({ index, setIndex, updateFormData, AllformData }) => {
//     const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
//     const [formData, setFormData] = useState({
//         selectedsmoking: "",
//         selecteddrink: "",
//         selectedhobbies: "",
//         selectedsports: "",
//     });
//     useEffect(() => {
//         setFormData({
//             selectedsmoking: AllformData.selectedsmoking || "",
//             selecteddrink: AllformData.selecteddrink || "",
//             selectedhobbies: AllformData.selectedhobbies || "",
//             selectedsports: AllformData.selectedsports || "",
//         });
//         const handleResize = () => {
//             setIsDesktop(window.innerWidth >= 768);

//         };
//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     const nextPageHandler=()=>{
//         setIndex(index+1);
//     }

//     const handleFormChange = (e) => {
//         const { name, value, checked } = e.target;
//         const maxSelections = {
//             selectedhobbies: 10,
//             selectedsports: 26,
//         };

//         if (name === "selectedhobbies" || name === "selectedsports") {
//             setFormData((prevData) => {
//                 let updatedData;
//                 if (checked) {
//                     // Adding the selection
//                     updatedData = {
//                         ...prevData,
//                         [name]: [...prevData[name], value],
//                     };
//                 } else {
//                     // Removing the selection
//                     updatedData = {
//                         ...prevData,
//                         [name]: prevData[name].filter((item) => item !== value),
//                     };
//                 }

//                 // Limit the selection to 2 items
//                 if (updatedData[name].length > maxSelections[name]) {
//                     updatedData[name].shift(); // Remove the first item
//                 }
//                 return updatedData;
//             });
//         } else {
//             setFormData((prevData) => ({ ...prevData, [name]: value }));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         updateFormData(formData);
//         setIndex(index + 1);
//     };
//     const [showAllSports, setShowAllSports] = useState(false);
//     const [showhobbies, setshowhobbies] = useState(false);
//     return (
//         <form
//             className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
//             onSubmit={handleSubmit}
//         >
//             {/* smoking Selection */}
//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                     Smoking
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2  rounded-3xl">
//                     {["Regular", "Sometimes", "Never"].map((smoking) => (
//                         <label
//                             key={smoking}
//                             className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedsmoking === smoking
//                                 ? "bg-yellow-500 text-black"
//                                 : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                 }`}
//                         >
//                             <input
//                                 type="radio"
//                                 name="selectedsmoking"
//                                 value={smoking}
//                                 onChange={handleFormChange}
//                                 style={{ display: "none" }}
//                             />
//                             {smoking}
//                         </label>
//                     ))}
//                 </div>
//             </fieldset>

//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                     Alcohol/Drink
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
//                     {["Regular", "Socially", "Special Occasions", "Never"].map((drink) => (
//                         <label
//                             key={drink}
//                             className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selecteddrink === drink
//                                 ? "bg-yellow-500 text-black"
//                                 : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                 }`}
//                         >
//                             <input
//                                 type="radio"
//                                 name="selecteddrink"
//                                 value={drink}
//                                 onChange={handleFormChange}
//                                 style={{ display: "none" }}
//                             />
//                             {drink}
//                         </label>
//                     ))}
//                 </div>
//             </fieldset>

//             {/* Hobbies (select any 2) */}
//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
//                     Hobbies <span className="text-gray-400 text-sm">(select any 2)</span>
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
//                     {[
//                         "Reading",
//                         "Dancing",
//                         "Astronomy",
//                         "DIY",
//                         "Gaming",
//                         "Numerology",
//                         "Amateur Cook",
//                         "Formula One",
//                         "Painting",
//                         "Pottery",
//                         "Camping",
//                         "Singing",
//                         "Photography",
//                         "Others"
//                     ].slice(0, showhobbies ? undefined : 8)
//                         .map((hobbies) => (
//                             <label
//                                 key={hobbies}
//                                 className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedhobbies.includes(hobbies)
//                                     ? "bg-yellow-500 text-black"
//                                     : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                     }`}
//                             >
//                                 <input
//                                     type="checkbox"
//                                     name="selectedhobbies"
//                                     value={hobbies}
//                                     onChange={handleFormChange}
//                                     checked={formData.selectedhobbies.includes(hobbies)}
//                                     style={{ display: "none" }}
//                                 />

//                                 {hobbies}
//                             </label>
//                         ))}
//                     {showhobbies && ( // Render the "See Less" button if showAllSports is true
//                         <button

//                             onClick={() => setshowhobbies(false)}
//                             className="text-black text-[12px] md:text-[14px] font-semibold flex items-center"
//                             type="button"
//                         >
//                             see less <SlArrowUp size={12} className="bold-icon ml-[5px]" />
//                         </button>
//                     )}
//                     <button
//                         onClick={() => setshowhobbies(!showhobbies)}
//                         className="text-black text-[12px] md:text-[14px] font-semibold"
//                         type="button"
//                     >
//                         {showhobbies ? "" : <p className="flex items-center ">see more <SlArrowDown size={12} className="ml-[5px]" /></p>}

//                     </button>
//                 </div>
//             </fieldset>

//             {/* Sports (select any 2) */}
//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                     Sports <span className="text-gray-400 text-sm">(select any 2)</span>
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
//                     {[
//                         "Cricket",
//                         "Football",
//                         "Basketball",
//                         "Tennis",
//                         "Badminton",
//                         "Boxing",
//                         "Gym",
//                         "Yoga",
//                         "Volleyball",
//                         "Chess",
//                         "Carrom",
//                         "Golf",
//                         "Table-Tennis",
//                         "Weightlifting",
//                         "Polo",
//                         "Rugby",
//                         "Cycling",
//                         "Wrestling",
//                         "Swimming",
//                         "Snooker",
//                         "Sumo Wrestling",
//                         "Aerobics",
//                         "Skydiving",
//                         "Karate",
//                         "Judo",
//                         "Others",
//                     ]
//                         .slice(0, showAllSports ? undefined : 10)
//                         .map((sports) => (
//                             <label
//                                 key={sports}
//                                 className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedsports.includes(sports)
//                                     ? "bg-yellow-500 text-black"
//                                     : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                     }`}
//                             >
//                                 <input
//                                     type="checkbox"
//                                     name="selectedsports"
//                                     value={sports}
//                                     onChange={handleFormChange}
//                                     checked={formData.selectedsports.includes(sports)}
//                                     style={{ display: "none" }}
//                                 />
//                                 {sports}
//                             </label>
//                         ))}
//                     {showAllSports && ( // Render the "See Less" button if showAllSports is true
//                         <button
//                             onClick={() => setShowAllSports(false)}
//                             className="text-black text-[12px] md:text-[14px] font-semibold flex items-center"
//                             type="button"
//                         >
//                             see less  <SlArrowUp size={12} className="bold-icon ml-[5px]" />
//                         </button>
//                     )}
//                     <button
//                         onClick={() => setShowAllSports(!showAllSports)}
//                         className="text-black text-[12px] md:text-[14px] font-semibold "
//                         type="button"
//                     >
//                         {showAllSports ? "" : <p className="flex items-center ml-[6px]">see more <SlArrowDown size={12} className="ml-[5px]" /></p>}
//                     </button>
//                 </div>

//             </fieldset>

//             {/* Form Buttons */}
//             <div className="flex justify-between mt-6">
//                 <button
//                     type="submit"
//                     className={`font-semibold py-2 px-2 ${isDesktop ? "text-black" : "text-yellow-500"
//                         }`}
//                     onClick={nextPageHandler}
//                 >
//                     SKIP
//                 </button>

//                 <button
//                     type="submit"
//                     className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black"
//                 >
//                     Next
//                 </button>
//             </div>
//         </form>
//     )
// }

// export default Form3

import React, { useEffect, useState } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useFormContext } from "react-hook-form";

const Form3 = (props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [showHobbies, setShowHobbies] = useState(false);
  const [showSports, setShowSports] = useState(false);

  const selectedsmoking = watch("selectedsmoking");
  const selecteddrink = watch("selecteddrink");
  const selectedhobbies = watch("selectedhobbies", props.prevalue.selectedhobbies || []);
  const selectedsports = watch("selectedsports", []);

  useEffect(() => {
    setValue("selectedhobbies", props.prevalue.selectedhobbies || []);
    setValue("selectedsports", []);
  }, [props.prevalue.selectedhobbies, setValue]);

  const handleCheckboxChange = (value) => {
    const updatedHobbies = selectedhobbies.includes(value)
      ? selectedhobbies.filter((hobby) => hobby !== value)
      : [...selectedhobbies, value].slice(0, 2); // Ensure no more than 2 are selected

    setValue("selectedhobbies", updatedHobbies);
  };

  return (
    <div className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
      {/* Smoking Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Smoking
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["Regular", "Sometimes", "Never"].map((smoking) => (
            <label
              key={smoking}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                ${selectedsmoking === smoking
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                value={smoking}
                {...register("selectedsmoking", {
                  required: "Smoking preference is required",
                })}
                className="hidden"
              />
              {smoking}
            </label>
          ))}
        </div>
        {errors.selectedsmoking && <p className="text-red-500">{errors.selectedsmoking.message}</p>}
      </fieldset>

      {/* Drink Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Alcohol/Drink
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["Regular", "Socially", "Special Occasions", "Never"].map(
            (drink) => (
              <label
                key={drink}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                  ${errors.selecteddrink && "border-red-500"}
                  ${selecteddrink === drink
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="radio"
                  value={drink}
                  {...register("selecteddrink", {
                    required: "Drinking preference is required",
                  })}
                  className="hidden"
                />
                {drink}
              </label>
            )
          )}
        </div>
        {errors.selecteddrink && <p className="text-red-500">{errors.selecteddrink.message}</p>}
      </fieldset>

      {/* Hobbies Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
          Hobbies <span className="text-gray-400 text-sm">(select any 2)</span>
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
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
            "Others",
          ]
            .slice(0, showHobbies ? undefined : 8)
            .map((hobby) => (
              <label
                key={hobby}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                  ${selectedhobbies?.includes(hobby)
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="checkbox"
                  value={hobby}
                  {...register("selectedhobbies", {
                    validate: (value) =>
                      value.length <= 2 || "Select up to 2 hobbies only",
                  })}
                  onChange={() => handleCheckboxChange(hobby)}
                  checked={selectedhobbies?.includes(hobby)}
                  className="hidden"
                />
                {hobby}
              </label>
            ))}
          <button
            onClick={() => setShowHobbies(!showHobbies)}
            className="text-black text-[12px] md:text-[16px] font-semibold"
            type="button"
          >
            <span className="flex text-base text-nowrap items-center">
              {showHobbies ? "see less" : "see more"}
              <span>
                {showHobbies ? (
                  <SlArrowUp size={12} className="font-extrabold ml-2" />
                ) : (
                  <SlArrowDown size={12} className="ml-2 font-extrabold" />
                )}
              </span>
            </span>
          </button>
        </div>
        {errors.selectedhobbies && <p className="text-red-500">{errors.selectedhobbies.message}</p>}
      </fieldset>
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Sports <span className="text-gray-400 text-sm">(select any 2)</span>
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
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
            .slice(0, showSports ? undefined : 10)
            .map((sport) => (
              <label
                key={sport}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedsports?.includes(sport)
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="checkbox"
                  value={sport}
                  {...register("selectedsports", {
                    validate: (value) =>
                      value.length <= 2 || "Select up to 2 sports only",
                  })}
                  checked={selectedsports?.includes(sport)}
                  className="hidden"
                />
                {sport}
              </label>
            ))}
          <button
            onClick={() => setShowSports(!showSports)}
            className="text-black text-[12px] md:text-[16px] font-semibold flex items-center"
            type="button"
          >
            {showSports ? "see less" : "see more"}
            <span>
              {showSports ? (
                <SlArrowUp size={12} className="font-extrabold ml-2" />
              ) : (
                <SlArrowDown size={12} className="ml-2 font-extrabold" />
              )}
            </span>
          </button>
        </div>
        {errors.selectedsports && <p className="text-red-500">{errors.selectedsports.message}</p>}
      </fieldset>
    </div>
  );
};

export default Form3;
