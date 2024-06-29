import React, { useEffect, useState } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useFormContext } from "react-hook-form";

const Form4 = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useFormContext();

  const [showArt, setShowArt] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showTravel, setShowTravel] = useState(false);

  const selectedArt = watch("selectedArt", []);
  const selectedPets = watch("selectedPets");
  const selectedHabits = watch("selectedHabits", []);
  const selectedActivities = watch("selectedActivities", []);
  const selectedMovies = watch("selectedMovies", []);
  const selectedTravel = watch("selectedTravel", []);

  // Optionally set default values on mount using setValue
  useEffect(() => {
    setValue("selectedArt", []);
    setValue("selectedPets", "");
    setValue("selectedHabits", []);
    setValue("selectedActivities", []);
    setValue("selectedMovies", []);
    setValue("selectedTravel", []);
  }, [setValue]);

  const handleCheckboxChange = (name, value) => {
    const selectedValues = watch(name, []);
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    // Limit the number of selections to 2
    if (updatedValues.length <= 2) {
      setValue(name, updatedValues);
    }

    // Manually trigger validation
    trigger(name);
  };

  return (
    <div className="w-full rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
      {/* Art Selection */}
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Art and Culture{" "}
          <span className="text-gray-400 text-sm">(select up to 2)</span>
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {[
            "Museum",
            "Drawing",
            "Theaters",
            "Craft",
            "Art Galleries",
            "Live music",
            "Night Life",
            "Cosplay",
            "Exhibitions",
            "Folk music",
            "Playwriting",
            "Hip-hop music",
            "Cultural festivals",
            "Others",
          ]
            .slice(0, showArt ? undefined : 9)
            .map((art) => (
              <label
                key={art}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedArt?.includes(art)
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="checkbox"
                  value={art}
                  {...register("selectedArt", {
                    validate: (value) =>
                      value.length === 0 || value.length === 2 || "Select either 0 or 2 arts",
                  })}
                  checked={selectedArt?.includes(art)}
                  onChange={() => handleCheckboxChange("selectedArt", art)}
                  className="hidden"
                />
                {art}
              </label>
            ))}
          <button
            onClick={() => setShowArt(!showArt)}
            className="text-black text-[12px] md:text-[16px] font-semibold"
            type="button"
          >
            {showArt ? "see less" : "see more"}
            <span>
              {showArt ? (
                <SlArrowUp size={12} className="font-extrabold ml-2" />
              ) : (
                <SlArrowDown size={12} className="ml-2 font-extrabold" />
              )}
            </span>
          </button>
        </div>
        {errors?.selectedArt && (
          <p className="text-red-500">{errors?.selectedArt?.message}</p>
        )}
      </fieldset>
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Pets
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["Dogs", "Cats", "Birds", "Others"].map((pet) => (
            <label
              key={pet}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                        ${pet === selectedPets
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="radio"
                value={pet}
                {...register("selectedPets", {
                  required: "Selecting a pet is required",
                })}
                className="hidden"
              />
              {pet}
            </label>
          ))}
        </div>
        {errors?.selectedPets && (
          <p className="text-red-500">{errors?.selectedPets?.message}</p>
        )}
      </fieldset>
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
          General Habits
          <span className="text-gray-400 text-sm">(select up to 2)</span>
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["Early rise", "Night owl", "lazy", "Active"].map((habit) => (
            <label
              key={habit}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedHabits?.includes(habit)
                ? "bg-yellow-500 text-black"
                : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="checkbox"
                value={habit}
                {...register("selectedHabits", {
                  validate: (value) =>
                    value.length === 0 || value.length === 2 || "Select either 0 or 2 habits",
                })}
                checked={selectedHabits?.includes(habit)}
                onChange={() => handleCheckboxChange("selectedHabits", habit)}
                style={{ display: "none" }} // Hide the checkbox but keep it functional
              />
              {habit}
            </label>
          ))}
        </div>
        {errors.selectedHabits && <p className="text-red-500">{errors.selectedHabits.message}</p>}
      </fieldset>
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Outdoor Activities{" "}
          <span className="text-gray-400 text-sm">(select any 2)</span>
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {[
            "Hiking",
            "Trekking",
            "Fishing",
            "Skiing",
            "Motor Sports",
            "Diving",
            "Surfing",
            "Sailing",
            "Paddle Boarding",
            "Kayaking",
            "Trail running",
            "cycling",
            "Tennis",
            "Others",
          ]
            .slice(0, showActivities ? undefined : 10)
            .map((activity) => (
              <label
                key={activity}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedActivities?.includes(activity)
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="checkbox"
                  value={activity}
                  {...register("selectedActivities", {
                    validate: (value) =>
                      value.length === 0 || value.length === 2 || "Select either 0 or 2 activities",
                  })}
                  checked={selectedActivities?.includes(activity)}
                  onChange={() => handleCheckboxChange("selectedActivities", activity)}
                  style={{ display: "none" }}
                />
                {activity}
              </label>
            ))}
          <button
            onClick={() => setShowActivities(!showActivities)}
            className="text-black text-[12px] md:text-[14px] font-semibold"
            type="button"
          >
            {showActivities ? (
              <span className="flex items-center">
                see less <SlArrowUp size={12} className="ml-[5px] font-bold " />
              </span>
            ) : (
              <span className="flex items-center">
                see more{" "}
                <SlArrowDown size={12} className="ml-[5px] font-bold " />
              </span>
            )}
          </button>
        </div>
        {errors?.selectedActivities && <p className="text-red-500">{errors?.selectedActivities?.message}</p>}
      </fieldset>
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Movies <span className="text-gray-400 text-sm">(select any 2)</span>
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {[
            "Animated",
            "Action",
            "Comedy",
            "Crime",
            "Romantic",
            "Rom-com",
            "Sci-fi",
            "Thriller",
          ].map((movie) => (
            <label
              key={movie}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedMovies?.includes(movie)
                ? "bg-yellow-500 text-black"
                : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                }`}
            >
              <input
                type="checkbox"
                value={movie}
                {...register("selectedMovies", {
                  validate: (value) =>
                    value.length === 0 || value.length === 2 || "Select either 0 or 2 movies",
                })}
                checked={selectedMovies?.includes(movie)}
                onChange={() => handleCheckboxChange("selectedMovies", movie)}
                style={{ display: "none" }} // Hide the checkbox but keep it functional
              />
              {movie}
            </label>
          ))}
        </div>
        {errors?.selectedMovies && <p className="text-red-500">{errors?.selectedMovies?.message}</p>}
      </fieldset>
      <fieldset className="mb-2">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Travel <span className="text-gray-400 text-sm">(select any 2)</span>
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
          {[
            "Mountains",
            "Beach",
            "Adventure",
            "Wonderlust",
            "Exploring cuisines",
            "Road Trips",
            "Historical Sites",
            "Wildlife Safari",
            "Eco-Tourism",
            "Spa Weekends",
            "Urban Exploration",
            "staycations",
            "Camping",
            "Backpacking",
          ]
            .slice(0, showTravel ? undefined : 8)
            .map((travel) => (
              <label
                key={travel}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${selectedTravel?.includes(travel)
                  ? "bg-yellow-500 text-black"
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                  }`}
              >
                <input
                  type="checkbox"
                  value={travel}
                  {...register("selectedTravel", {
                    validate: (value) =>
                      value.length === 0 || value.length === 2 || "Select either 0 or 2 travel options",
                  })}
                  checked={selectedTravel?.includes(travel)}
                  onChange={() => handleCheckboxChange("selectedTravel", travel)}
                  style={{ display: "none" }}
                />
                {travel}
              </label>
            ))}
          <button
            onClick={() => setShowTravel(!showTravel)}
            className="text-black text-[12px] md:text-[14px] font-semibold"
            type="button"
          >
            {showTravel ? (
              <span className="flex items-center">
                see less <SlArrowUp size={12} className="ml-[5px] font-bold " />
              </span>
            ) : (
              <span className="flex items-center">
                see more{" "}
                <SlArrowDown size={12} className="ml-[5px] font-bold " />
              </span>
            )}
          </button>
        </div>
        {errors.selectedTravel && <p className="text-red-500">{errors.selectedTravel.message}</p>}
      </fieldset>
    </div>
  );
};

export default Form4;
