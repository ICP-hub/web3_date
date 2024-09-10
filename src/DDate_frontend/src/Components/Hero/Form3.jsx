import React, { useEffect, useState } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useFormContext } from "react-hook-form";


const Form3 = () => {
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
  const selectedhobbies = watch("selectedhobbies", []);
  const selectedsports = watch("selectedsports", []);

  console.log(errors);
  // useEffect(() => {
  //   setValue("selectedhobbies", []);
  //   setValue("selectedsports", []);
  // }, [setValue]);

  return (
    <div className="w-full  rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
      {/* Smoking Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Smoking habits
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["Social smoker", "Smoker", "Vaper", "Non-smoker"].map((smoking) => (
            <label
              key={smoking}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                ${selectedsmoking === smoking
                  ? "bg-primary-option_color text-black"
                  : "bg-transparent hover:bg-primary-option_color hover:text-black text-white md:text-black border border-white md:border-black"
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
                    ? "bg-primary-option_color text-black"
                    : "bg-transparent hover:bg-primary-option_color hover:text-black text-white md:text-black border border-white md:border-black"
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

      {/* Hobbies */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
          Hobbies <span className="text-gray-400 text-sm">(select any 2)</span>
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {[
            "Reading",
            "DIY",
            "Painting",
            "Gaming",
            "Astronomy",
            "Numerology",
            "Amateur Cook",
            "BBQ",
            "Formula One",
            "Cars",
            "Motor Cycles",
            "Movies",
            "Netflix",
            "Fashion",
            "Musical Instrument",
            "Trying New Things",
            "Working Out"

          ]
            .slice(0, showHobbies ? undefined : 8)
            .map((hobby) => (
              <label
                key={hobby}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${selectedhobbies?.includes(hobby)
                    ? "bg-primary-option_color text-black"
                    : "bg-transparent hover:bg-primary-option_color hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >

                <input
                  type="checkbox"
                  value={hobby}
                  {...register("selectedhobbies", {
                    // validate: (value) =>
                    //   value.length <= 2 || "Select up to 2 hobbies only",
                    validate: {
                      // notEmpty: (value) =>
                      //   value.length > 0 || "Please select at least one hobby.",
                      // maxTwo: (value) =>
                      //   value.length <= 2 || "Select up to 2 hobbies only",
                      minTwo: (value) =>
                        value.length >= 2 || "Please select at least 2 hobbies.",
                    },
                  })}
                  checked={selectedhobbies?.includes(hobby)}
                  className="hidden"
                />
                {hobby}
              </label>
            ))}
          <button
            onClick={() => setShowHobbies(!showHobbies)}
            className="text-black text-[12px] md:text-[16px]  font-semibold"
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
            "Golf",
            "CrossFit",
            "Hot yoga",
            "Pilates",
            "Soccer",
            "Martial Arts",
            "Surf",
            "Paddle",
            "Rugby",
            "Boxing",
            "BJJ",
            "Hockey",
            "Cricket",
            "Polo",
            "Bicycle Racing",
            "Fencing",
            "Table Tennis",
            "Paddle",
            "Tennis",
            "Triathlon",
            "Swimming",
            "Gymnastics",
            "Beach Tennis",
            "Weight Lifting",
            "Equestrian",
            "Pole Dancing",
            "Rock Climbing",
            "Wrestling",
            "Acrobatic Yoga"
          ]
            .slice(0, showSports ? undefined : 10)
            .map((sport) => (
              <label
                key={sport}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedsports?.includes(sport)
                  ? "bg-primary-option_color text-black"
                  : "bg-transparent hover:bg-primary-option_color hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="checkbox"
                  value={sport}
                  {...register("selectedsports", {
                    // validate: (value) =>
                    //   value.length <= 2 || "Select up to 2 sports only",
                    validate: {
                      // notEmpty: (value) =>
                      //   value.length > 0 || "Please select at least one sports.",
                      // maxTwo: (value) =>
                      //   value.length <= 2 || "Select up to 2 sports only",
                      minTwo: (value) =>
                        value.length >= 2 || "Please select at least 2 sports.",
                    },
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
