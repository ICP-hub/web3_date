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
  const selectedhobbies = watch("selectedhobbies", []);
  const selectedsports = watch("selectedsports", []);

  useEffect(() => {
    setValue("selectedhobbies", selectedhobbies);
    setValue("selectedsports", selectedsports);
  }, []);

  const handleCheckboxChange = (value, type) => {
    let updatedList;
    if (type === "hobbies") {
      updatedList = selectedhobbies.includes(value)
        ? selectedhobbies.filter((hobby) => hobby !== value)
        : [...selectedhobbies, value].slice(0, 2); // Ensure no more than 2 are selected
      setValue("selectedhobbies", updatedList);
    } else if (type === "sports") {
      updatedList = selectedsports.includes(value)
        ? selectedsports.filter((sport) => sport !== value)
        : [...selectedsports, value].slice(0, 2); // Ensure no more than 2 are selected
      setValue("selectedsports", updatedList);
    }
  };

  return (
    <div className="w-full rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none ">
      {/* Smoking Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold text-black">
          Smoking
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["Regular", "Sometimes", "Never"].map((smoking) => (
            <label
              key={smoking}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedsmoking === smoking
                ? "bg-yellow-500 text-black"
                : "bg-transparent hover:bg-yellow-500 hover:text-black md:text-black border border-black"
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
        {errors.selectedsmoking && (
          <p className="text-red-500">{errors.selectedsmoking.message}</p>
        )}
      </fieldset>

      {/* Drink Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold text-black">
          Alcohol/Drink
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["Regular", "Socially", "Special Occasions", "Never"].map(
            (drink) => (
              <label
                key={drink}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${errors.selecteddrink && "border-red-500"
                  } ${selecteddrink === drink
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent hover:bg-yellow-500 hover:text-black text-black border border-black"
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
        {errors.selecteddrink && (
          <p className="text-red-500">{errors.selecteddrink.message}</p>
        )}
      </fieldset>

      {/* Hobbies Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold text-black">
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
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedhobbies?.includes(hobby)
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-black border border-black"
                  }`}
              >
                <input
                  type="checkbox"
                  value={hobby}
                  {...register("selectedhobbies", {
                    validate: (value) =>
                      value.length <= 2 || "Select up to 2 hobbies only",
                  })}

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
        {errors.selectedhobbies && (
          <p className="text-red-500">{errors.selectedhobbies.message}</p>
        )}
      </fieldset>
      {/* Sports Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold text-black">
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
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-black border border-black"
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
        {errors.selectedsports && (
          <p className="text-red-500">{errors.selectedsports.message}</p>
        )}
      </fieldset>
    </div>
  );
};

export default Form3;
