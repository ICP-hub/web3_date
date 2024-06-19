// import React, { useEffect, useState } from 'react'

// const Form5 = ({ index, setIndex, updateFormData, AllformData }) => {
//     const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

//     const [formData, setFormData] = useState({
//         selectedintrests: AllformData.selectedintrests || "",
//         selectedpreferAge: AllformData.selectedpreferAge || "",
//         selectedLocation: AllformData.selectedLocation || "",
//         selectedPrefferedLocation: AllformData.selectedPrefferedLocation || "",
//         selectedIntro: AllformData.selectedIntro || "",
//     });

//     useEffect(() => {
//         const handleResize = () => {
//             setIsDesktop(window.innerWidth >= 768);

//         };
//         window.addEventListener("resize", handleResize);
//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);
//     const handleFormChange = (e) => {
//         const { name, value } = e.target;

//         if (name === "selectedpreferAge") {
//             let minAge, maxAge;

//             if (value === "above 30") {
//                 // Set default values for "above 30" option
//                 minAge = 30;
//                 maxAge = 60;
//             } else {
//                 [minAge, maxAge] = value.split("-").map(Number);
//             }

//             setFormData((prevData) => ({
//                 ...prevData,
//                 min_age: minAge,
//                 max_age: maxAge,
//                 selectedpreferAge: value,
//             }));
//         } else if (
//             name === "selectedLocation" ||
//             name === "selectedPrefferedLocation"
//         ) {
//             const lowercaseLocation = value.toLowerCase();
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [name]: lowercaseLocation,
//             }));
//         } else {
//             setFormData((prevData) => ({ ...prevData, [name]: value }));
//         }
//     };

//     const nextPageHandler = () => {
//         setIndex(index + 1);
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         updateFormData(formData);
//         setIndex(index + 1);
//     };


//     return (
//         <form
//             className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
//             onSubmit={handleSubmit}
//         >
//             {/* intrests Selection */}
//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                     Your Interests In
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 px-2 rounded-3xl">
//                     {["Male", "Female", "All"].map((intrests) => (
//                         <label
//                             key={intrests}
//                             className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedintrests === intrests
//                                 ? "bg-yellow-500 text-black"
//                                 : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                 }`}
//                         >
//                             <input
//                                 type="radio"
//                                 name="selectedintrests"
//                                 value={intrests}
//                                 onChange={handleFormChange}
//                                 style={{ display: "none" }}
//                             />
//                             {intrests}
//                         </label>
//                     ))}
//                 </div>
//             </fieldset>

//             <fieldset className="mb-2">
//                 <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                     Preferred Age
//                 </legend>
//                 <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
//                     {["18-20", "20-25", "25-30", "above 30"].map((preferAge) => (
//                         <label
//                             key={preferAge}
//                             className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedpreferAge === preferAge
//                                 ? "bg-yellow-500 text-black"
//                                 : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                                 }`}
//                         >
//                             <input
//                                 type="radio"
//                                 name="selectedpreferAge"
//                                 value={preferAge}
//                                 onChange={handleFormChange}
//                                 style={{ display: "none" }}
//                             />
//                             {preferAge}
//                         </label>
//                     ))}
//                 </div>
//             </fieldset>

//             <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
//                 <div className="flex-1 mb-4 md:mb-0">
//                     <label
//                         htmlFor="selectedLocation"
//                         className="block text-lg font-semibold mb-1 text-white md:text-black"
//                     >
//                         Location
//                     </label>
//                     <input
//                         type="text"
//                         id="selectedLocation"
//                         name="selectedLocation"
//                         placeholder="Your Location"
//                         value={formData.selectedLocation}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
//                     />
//                 </div>

//                 <div className="flex-1">
//                     <label
//                         htmlFor="selectedPrefferedLocation"
//                         className="block text-lg font-semibold mb-1 text-white md:text-black"
//                     >
//                         Preferred Location
//                     </label>
//                     <input
//                         type="text"
//                         id="selectedPrefferedLocation"
//                         name="selectedPrefferedLocation"
//                         placeholder="Your Preffered Location"
//                         value={formData.selectedPrefferedLocation}
//                         onChange={handleFormChange}
//                         className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
//                     />
//                 </div>
//             </div>

// <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
//     <div className="flex-1 mb-4 md:mb-0">
//         <label
//             htmlFor="selectedIntro"
//             className="block text-lg font-semibold mb-1 text-white md:text-black"
//         >
//             Introduce Yourself
//         </label>
//         <textarea
//             id="selectedIntro"
//             name="selectedIntro"
//             placeholder="Let us know something about you"
//             value={formData.selectedIntro}
//             onChange={handleFormChange}
//             className="w-full px-4 py-2 rounded-lg border border-white md:border-black bg-transparent text-white md:text-black"
//         />
//     </div>
// </div>

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

// export default Form5
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const Form5 = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const selectedInterests = watch("selectedInterests", []);
  const selectedPreferAge = watch("selectedPreferAge", "");
  const selectedLocation = watch("selectedLocation", "");
  const selectedPreferLocation = watch("selectedPreferLocation", "");
  const selectedIntro = watch("selectedIntro", "");

  return (
    <div className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Interests
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 rounded-3xl">
          {["Male", "Female", "All"].map((interest) => (
            <label
              key={interest}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedInterests?.includes(interest) ? "bg-yellow-500 text-black" : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="checkbox"
                value={interest}
                {...register("selectedInterests")}
                checked={selectedInterests?.includes(interest)}
                className="hidden"
              />
              {interest}
            </label>
          ))}
          {errors.selectedInterests && <p className="text-red-500">{errors.selectedInterests.message}</p>}
        </div>
      </fieldset>

      <fieldset className="mb-2">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Preferred Age
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
          {["18-20", "20-25", "25-30", "30 50"].map((preferAge) => (
            <label
              key={preferAge}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedPreferAge === preferAge ? "bg-yellow-500 text-black" : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                name="selectedPreferAge"
                value={preferAge}
                {...register("selectedPreferAge")}
                checked={selectedPreferAge === preferAge}
                className="hidden"
              />
              {preferAge}
            </label>
          ))}
          {errors.selectedPreferAge && <p className="text-red-500">{errors.selectedPreferAge.message}</p>}
        </div>
      </fieldset>

      <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
        <div className="flex-1 mb-4 md:mb-0">
          <label
            htmlFor="selectedLocation"
            className="block text-lg font-semibold mb-1 text-white md:text-black"
          >
            Location
          </label>
          <input
            type="text"
            id="selectedLocation"
            name="selectedLocation"
            placeholder="Your Location"
            {...register("selectedLocation")}
            className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
          />
          {errors.selectedLocation && <p className="text-red-500">{errors.selectedLocation.message}</p>}
        </div>

        <div className="flex-1">
          <label
            htmlFor="selectedPreferLocation"
            className="block text-lg font-semibold mb-1 text-white md:text-black"
          >
            Preferred Location
          </label>
          <input
            type="text"
            id="selectedPreferLocation"
            name="selectedPreferLocation"
            placeholder="Your Preferred Location"
            {...register("selectedPreferLocation")}
            className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
          />
          {errors.selectedPreferLocation && <p className="text-red-500">{errors.selectedPreferLocation.message}</p>}
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <div className="flex-1 mb-4 md:mb-0">
          <label
            htmlFor="selectedIntro"
            className="block text-lg font-semibold mb-1 text-white md:text-black"
          >
            Introduce Yourself
          </label>
          <textarea
            id="selectedIntro"
            name="selectedIntro"
            placeholder="Let us know something about you"
            {...register("selectedIntro")}
            className="w-full px-4 py-2 rounded-lg border border-white md:border-black bg-transparent text-white md:text-black"
          />
          {errors.selectedIntro && <p className="text-red-500">{errors.selectedIntro.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Form5;
