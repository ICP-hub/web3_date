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
    <div className="w-full  rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
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
                {...register("selectedInterests",{
                  required: "Selecting a Interest is required",
                })}
                // checked={selectedInterests?.includes(interest)}
                hecked={selectedInterests === interest}
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
                {...register("selectedPreferAge",{
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
            {...register("selectedLocation",{
              required: "Selecting a location is required",
            })}
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
            {...register("selectedPreferLocation",{
              required: "Selecting a location preferance is required",
            })}
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
            rows={5}
            placeholder="Let us know something about you"
            {...register("selectedIntro")}
            className="bg-gray-100 w-full px-4 py-2 rounded-lg  border-white md:border-black  text-white md:text-black"
          />
          {errors.selectedIntro && <p className="text-red-500">{errors.selectedIntro.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Form5;
