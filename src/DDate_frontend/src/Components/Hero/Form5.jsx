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

  const selectedInterests = watch("selectedInterests");
  const selectedPreferAge = watch("selectedPreferAge", "");
  const selectedLocation = watch("selectedLocation", "");
  const selectedPreferLocation = watch("selectedPreferLocation", "");
  const selectedIntro = watch("selectedIntro", "");

  return (
    <div className="w-full space-y-2 rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Interests
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 rounded-3xl">
          {["Male", "Female", "All"].map((interest) => (
            <label
              key={interest}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 
                ${selectedInterests === interest
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                value={interest}
                {...register("selectedInterests", {
                  required: "Selecting a Interest is required",
                })}
                // checked={selectedInterests?.includes(interest)}
                // checked={selectedInterests === interest}
                className="hidden"
              />
              {interest}
            </label>
          ))}
          {errors.selectedInterests && <p className="text-red-500">{errors.selectedInterests.message}</p>}
        </div>
      </fieldset>

      {/* Age selection */}
      <fieldset className="mb-2">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Preferred Age
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
          {["18-20", "20-25", "25-30", "30-50"].map((preferAge) => (
            <label
              key={preferAge}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedPreferAge === preferAge ? "bg-yellow-500 text-black" : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                name="selectedPreferAge"
                value={preferAge}
                {...register("selectedPreferAge", {
                  required: "Selecting a age preferance is required",
                })}
                checked={selectedPreferAge === preferAge}
                className="hidden"
              />
              {preferAge}
            </label>
          ))}
          {errors.selectedPreferAge && <p className="text-red-500">{errors.selectedPreferAge.message}</p>}
        </div>
      </fieldset>

      {/* user location */}
      <div className='flex-col space-y-2'>
        <h1 className="block text-lg font-semibold mb-1 text-white md:text-black">Location</h1>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          {/* City Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="selectedCity"
            >
            </label>
            <div className='md:w-44'>
              <select
                id="selectedCity"
                name="selectedCity"
                {...register("selectedCity",{required : "Select a city"})}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value=""disabled >City</option>
                <option value="delhi">Delhi</option>
                <option value="bombay">Bombay</option>
                <option value="chennai">Chennai</option>
                {/* Add more options as needed */}
              </select>
              {errors.selectedCity && <p className="text-red-500">{errors.selectedCity.message}</p>}
              <svg
                className="absolute top-[20px] right-4 transform -translate-y-1/2 w-8 h-8 font-semibold text-white md:text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* State Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="selectedState"
            >
            </label>
            <div className='md:w-44'>
              <select
                id="selectedState"
                name="selectedState"
                {...register("selectedState", {required : "Select a state"})}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value=""disabled >State</option>
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
                <option value="state3">State 3</option>
                {/* Add more options as needed */}
              </select>
              {errors.selectedState && <p className="text-red-500">{errors.selectedState.message}</p>}
              <svg
                className="absolute top-[20px] right-4 transform -translate-y-1/2 w-8 h-8 font-semibold text-white md:text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Country Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="selectedCountry"
            >
            </label>
            <div className='md:w-44'>
              <select
                id="selectedCountry"
                name="selectedCountry"
                {...register("selectedCountry", {required : "Select a country"})}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value=""disabled >Country</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                {/* Add more options as needed */}
              </select>
              {errors.selectedCountry && <p className="text-red-500">{errors.selectedCountry.message}</p>}
              <svg
                className="absolute top-[20px] right-4 transform -translate-y-1/2 w-8 h-8 font-semibold text-white md:text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Preferred location */}
      <div className='flex-col space-y-2'>
        <div className='flex justify-between'>
          <h1 className="block text-lg font-semibold mb-1 text-white md:text-black">Preferred Location</h1>
          <div className='p-[4px] bg-yellow-400 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>

          </div>

        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          {/* City Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="preferredCity"
            >
            </label>
            <div className='md:w-44'>
              <select
                id="preferredCity"
                name="preferredCity"
                {...register("preferredCity", {required: "Select a city"})}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value="" disabled>City</option>
                <option value="delhi">Delhi</option>
                <option value="bombay">Bombay</option>
                <option value="chennai">Chennai</option>
                {/* Add more options as needed */}
              </select>
              {errors.preferredCity && <p className="text-red-500">{errors.preferredCity.message}</p>}
              <svg
                className="absolute top-[20px] right-4 transform -translate-y-1/2 w-8 h-8 font-semibold text-white md:text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* State Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="preferredState"
            >
            </label>
            <div className='md:w-44'>
              <select
                id="preferredState"
                name="preferredState"
                {...register("preferredState", {required: "Select a state"})}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value=""disabled >State</option>
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
                <option value="state3">State 3</option>
                {/* Add more options as needed */}
              </select>
              {errors.preferredState && <p className="text-red-500">{errors.preferredState.message}</p>}
              <svg
                className="absolute top-[20px] right-4 transform -translate-y-1/2 w-8 h-8 font-semibold text-white md:text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Country Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="preferredCountry"
            >
            </label>
            <div className='md:w-44'>
              <select
                id="preferredCountry"
                name="preferredCountry"
                {...register("preferredCountry", {required: "Select a country"})}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value=""disabled >Country</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                {/* Add more options as needed */}
              </select>
              {errors.preferredCountry && <p className="text-red-500">{errors.preferredCountry.message}</p>}
              <svg
                className="absolute top-[20px] right-4 transform -translate-y-1/2 w-8 h-8 font-semibold text-white md:text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex-1 my-4 md:my-7">
          <label
            htmlFor="selectedIntro"
            className="block text-lg font-semibold mb-1 text-white md:text-black"
          >
            Introduce Yourself
          </label>
          <textarea
            id="selectedIntro"
            name="selectedIntro"
            rows={5}
            placeholder="Let us know something about you"
            {...register("selectedIntro", {required: "Enter something about yourself"})}
            className="bg-gray-100 w-full px-4 py-2 rounded-lg  border-none text-black"
          />
          {errors.selectedIntro && <p className="text-red-500">{errors.selectedIntro.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Form5;
