// import React, { useEffect, useState } from 'react'

// const Form2 = ({index, setIndex, updateFormData, AllformData}) => {
//     const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

//     const [formData, setFormData] = useState({
//       genderPronouns: "",
//       selectedReligion: "",
//       selectedFooding: "",
//       selectedWhatYouDo: "",
//       selectedlookingFor: "",
//       selectedHeight: "Feet’inch’",
//       selectedZodiac: "",
//       selectedlifePathNumber: "",
//     });

//     useEffect(() => {
//         setFormData({
//             genderPronouns: AllformData.genderPronouns || "",
//             selectedReligion: AllformData.selectedReligion || "",
//             selectedFooding: AllformData.selectedFooding || "",
//             selectedWhatYouDo: AllformData.selectedWhatYouDo || "",
//             selectedlookingFor: AllformData.selectedlookingFor || "",
//             selectedHeight: AllformData.selectedHeight || "Feet’inch’",
//             selectedZodiac: AllformData.selectedZodiac || "",
//             selectedlifePathNumber: AllformData.selectedlifePathNumber || "",
//     });
//       const handleResize = () => {
//         setIsDesktop(window.innerWidth >= 768);

//       };

//       window.addEventListener("resize", handleResize);
//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }, []);

//     const nextPageHandler=()=>{
//         setIndex(index+1);
//     }

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         updateFormData(formData);
//         setIndex(index+1);
//     };
//     return (
//         <form
//             className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
//             onSubmit={handleSubmit}
//         >
//             {/* Gender Selection */}
//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                     Gender Pronouns
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 px-0 rounded-3xl">
//                     {["Man", "Woman", "Nonbinary"].map((genPro) => (
//                         <label
//                             key={genPro}
//                             className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.genderPronouns === genPro
//                                 ? "bg-yellow-500 text-black"
//                                 : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                 }`}
//                         >
//                             <input
//                                 type="radio"
//                                 name="genderPronouns"
//                                 value={genPro}
//                                 onChange={handleFormChange}
//                                 style={{ display: "none" }}
//                             />
//                             {genPro}
//                         </label>
//                     ))}
//                 </div>
//             </fieldset>
//             <div className="flex flex-col md:flex-row md:space-x-4 mb-6">

//                 <fieldset className="mb-2">
//                     <legend className="block text-lg font-semibold  mb-2 text-white md:text-black">
//                         Life-Path Number
//                     </legend>
//                     <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
//                         {["1  ", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"].map(
//                             (lifePathNumber) => (
//                                 <label
//                                     key={lifePathNumber}
//                                     className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedlifePathNumber === lifePathNumber
//                                         ? "bg-yellow-500 text-black"
//                                         : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                         }`}
//                                 >
//                                     <input
//                                         type="radio"
//                                         name="selectedlifePathNumber"
//                                         value={lifePathNumber}
//                                         onChange={handleFormChange}
//                                         style={{ display: "none" }}
//                                     />
//                                     {lifePathNumber}
//                                 </label>
//                             )
//                         )}
//                     </div>
//                 </fieldset>

//             </div>

//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                     Religion
//                 </legend>
//                 <div>
//                     <div className="flex flex-wrap gap-2 md:gap-2  px-0 rounded-3xl">
//                         {["Hindu", "Muslim", "Sikh", "Christian"].map((religion) => (
//                             <label
//                                 key={religion}
//                                 className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedReligion === religion
//                                     ? "bg-yellow-500 text-black"
//                                     : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                     }`}
//                             >
//                                 <input
//                                     type="radio"
//                                     name="selectedReligion"
//                                     value={religion}
//                                     onChange={handleFormChange}
//                                     style={{ display: "none" }}
//                                 />
//                                 {religion}
//                             </label>
//                         ))}
//                     </div>
//                     <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
//                         {["Jain", "Catholic", "Agnostic", "Jewish", "Atheist", "Buddhist", "Spiritual"].map(
//                             (religion) => (
//                                 <label
//                                     key={religion}
//                                     className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedReligion === religion
//                                         ? "bg-yellow-500 text-black"
//                                         : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                         }`}
//                                 >
//                                     <input
//                                         type="radio"
//                                         name="selectedReligion"
//                                         value={religion}
//                                         onChange={handleFormChange}
//                                         style={{ display: "none" }}
//                                     />
//                                     {religion}
//                                 </label>
//                             )
//                         )}
//                     </div>
//                 </div>

//             </fieldset>

//             {/* Height and Zodiac Sign Selection */}

//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold  mb-2 text-white md:text-black">
//                     Animal Zodiac Sign
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
//                     {["Rat", "Ox", "Tiger", "Cat", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"].map(
//                         (Zodiac) => (
//                             <label
//                                 key={Zodiac}
//                                 className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedZodiac === Zodiac
//                                     ? "bg-yellow-500 text-black"
//                                     : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                     }`}
//                             >
//                                 <input
//                                     type="radio"
//                                     name="selectedZodiac"
//                                     value={Zodiac}
//                                     onChange={handleFormChange}
//                                     style={{ display: "none" }}
//                                 />
//                                 {Zodiac}
//                             </label>
//                         )
//                     )}
//                 </div>
//             </fieldset>
//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold  mb-2 text-white md:text-black">
//                     Fooding
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
//                     {["Vegan", "vegetarian", "Omnivore", "Kosher", "Carnivore", "Halal", "Pescatarian", "Others"].map(
//                         (Fooding) => (
//                             <label
//                                 key={Fooding}
//                                 className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedFooding === Fooding
//                                     ? "bg-yellow-500 text-black"
//                                     : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                     }`}
//                             >
//                                 <input
//                                     type="radio"
//                                     name="selectedFooding"
//                                     value={Fooding}
//                                     onChange={handleFormChange}
//                                     style={{ display: "none" }}
//                                 />
//                                 {Fooding}
//                             </label>
//                         )
//                     )}
//                 </div>
//             </fieldset>

//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black ">
//                     What You do
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
//                     {["In School", "In College", "Employed", "Unemployed"].map(
//                         (WhatYouDo) => (
//                             <label
//                                 key={WhatYouDo}
//                                 className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedWhatYouDo === WhatYouDo
//                                     ? "bg-yellow-500 text-black"
//                                     : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                     }`}
//                             >
//                                 <input
//                                     type="radio"
//                                     name="selectedWhatYouDo"
//                                     value={WhatYouDo}
//                                     onChange={handleFormChange}
//                                     style={{ display: "none" }}
//                                 />
//                                 {WhatYouDo}
//                             </label>
//                         )
//                     )}
//                 </div>
//             </fieldset>

//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                     What are you looking for
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
//                     {[
//                         "Long-term relationship",
//                         "Short-term relationship",
//                         "Friends",
//                         "Just Flowing",
//                         "Life Partner",
//                     ].map((lookingFor) => (
//                         <label
//                             key={lookingFor}
//                             className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedlookingFor === lookingFor
//                                 ? "bg-yellow-500 text-black"
//                                 : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                 }`}
//                         >
//                             <input
//                                 type="radio"
//                                 name="selectedlookingFor"
//                                 value={lookingFor}
//                                 onChange={handleFormChange}
//                                 style={{ display: "none" }}
//                             />
//                             {lookingFor}
//                         </label>
//                     ))}
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
//                     type="text"
//                     className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black"
//                 >
//                     Next
//                 </button>

//             </div>
//         </form>
//     )
// }

// export default Form2

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const Form2 = ({ setIndex }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  console.log(errors)
  const selectedGenderPronouns = watch("genderPronouns");
  const selectedlifePath = watch("selectedLifePathNumber");
  const selectedReligionValue = watch("selectedReligion");
  const selectedZodiacSign = watch("selectedZodiac");
  const selectedFoodingValue = watch("selectedFooding");
  const selectedWhatYouDo = watch("selectedWhatYouDo");
  const selectedLookingFor = watch("selectedLookingFor");
  //   useEffect(() => {
  //     setValue("genderPronouns", "Man");
  //     setValue("selectedlifePathNumber", "1");
  //     setValue("selectedReligion", "Hindu");
  //     setValue("selectedZodiac", "Rat");
  //     setValue("selectedFooding", "Vegan");
  //     setValue("selectedWhatYouDo", "Employed");
  //     setValue("selectedLookingFor", "Long-term relationship");
  //   }, []);

  // const onSubmit = data => {
  //     console.log("Submitted Data:", data); // Log or handle the form data
  //     setIndex(currentIndex => currentIndex + 1); // Move to next step
  // };

  return (
    <div className="w-full rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
      {/* Gender Pronouns Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Gender Pronouns {errors.genderPronouns && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 px-0 rounded-3xl">
          {["Man", "Woman", "Nonbinary"].map((genPro) => (
            <label
              key={genPro}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${selectedGenderPronouns === genPro
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                value={genPro}
                {...register("genderPronouns", {
                  required: "Gender pronoun is required",
                })}
                className="hidden"
              />
              {genPro}
            </label>
          ))}
        </div>
        {errors.genderPronouns && <p className="text-red-500">{errors.genderPronouns.message}</p>}

      </fieldset>

      {/* Life Path Number Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
          Life-Path Number {errors.selectedLifePathNumber && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"].map(
            (lifePathNumber) => (
              <label
                key={lifePathNumber}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${selectedlifePath === lifePathNumber
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="radio"
                  value={lifePathNumber}
                  {...register("selectedLifePathNumber", {
                    required: "Life-path number is required",
                  })}
                  className="hidden"
                />
                {lifePathNumber}
              </label>
            )
          )}
        </div>
        {errors.selectedLifePathNumber && <p className="text-red-500">{errors.selectedLifePathNumber.message}</p>}
      </fieldset>

      {/* Religion Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Religion {errors.selectedReligion && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 px-0 rounded-3xl">
          {[
            "Hindu",
            "Muslim",
            "Sikh",
            "Christian",
            "Jain",
            "Catholic",
            "Agnostic",
            "Jewish",
            "Atheist",
            "Buddhist",
            "Spiritual",
          ].map((religion) => (
            <label
              key={religion}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${selectedReligionValue === religion
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                value={religion}
                {...register("selectedReligion", {
                  required: "Religion is required",
                })}
                className="hidden"
              />
              {religion}
            </label>
          ))}
        </div>
        {errors.selectedReligion && <p className="text-red-500">{errors.selectedReligion.message}</p>}

      </fieldset>

      {/* Zodiac Sign Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
          Animal Zodiac Sign {errors.selectedZodiac && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {[
            "Rat",
            "Ox",
            "Tiger",
            "Cat",
            "Dragon",
            "Snake",
            "Horse",
            "Goat",
            "Monkey",
            "Rooster",
            "Dog",
            "Pig",
          ].map((zodiac) => (
            <label
              key={zodiac}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${zodiac === selectedZodiacSign
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                value={zodiac}
                {...register("selectedZodiac", {
                  required: "Zodiac sign is required",
                })}
                className="hidden"
              />
              {zodiac}
            </label>
          ))}
        </div>
        {errors.selectedZodiac && <p className="text-red-500">{errors.selectedZodiac.message}</p>}
      </fieldset>

      {/* Fooding Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
          Fooding {errors.selectedFooding && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {[
            "Vegan",
            "vegetarian",
            "Omnivore",
            "Kosher",
            "Carnivore",
            "Halal",
            "Pescatarian",
            "Others",
          ].map((fooding) => (
            <label
              key={fooding}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${errors.selectedFooding && "border-red-500"}
                            ${fooding === selectedFoodingValue
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                value={fooding}
                {...register("selectedFooding", {
                  required: "Fooding preference is required",
                })}
                className="hidden"
              />
              {fooding}
            </label>
          ))}
        </div>
        {errors.selectedFooding && <p className="text-red-500">{errors.selectedFooding.message}</p>}
      </fieldset>
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          What You Do {errors.selectedWhatYouDo && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 px-0 rounded-3xl">
          {["In School", "In College", "Employed", "Unemployed"].map(
            (option) => (
              <label
                key={option}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 
              ${selectedWhatYouDo === option
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="radio"
                  name="selectedWhatYouDo"
                  value={option}
                  {...register("selectedWhatYouDo", {
                    required: "You must select an option.",
                  })}
                  className="hidden"
                />
                {option}
              </label>
            )
          )}
        </div>
        {errors.selectedWhatYouDo && <p className="text-red-500">{errors.selectedWhatYouDo.message}</p>}
      </fieldset>
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          What are you looking for? {errors.selectedLookingFor && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 px-0 rounded-3xl">
          {[
            "Long-term relationship",
            "Short-term relationship",
            "Friends",
            "Just Flowing",
            "Life Partner",
          ].map((lookingFor) => (
            <label
              key={lookingFor}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 
              ${selectedLookingFor === lookingFor
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                name="selectedLookingFor"
                value={lookingFor}
                {...register("selectedLookingFor", {
                  required: "Please select an option.",
                })}
                className="hidden"
              />
              {lookingFor}
            </label>
          ))}
        </div>
        {errors.selectedLookingFor && <p className="text-red-500">{errors.selectedLookingFor.message}</p>}
      </fieldset>
    </div>
  );
};

export default Form2;
