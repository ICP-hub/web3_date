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
        <legend className="block text-lg font-semibold mb-1 text-black md:text-black">
          Gender Pronouns 
          {/* {errors.genderPronouns && <span className="text-red-500">*</span>} */}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 px-0 rounded-3xl">
          {["He/Him", "She/Her", "They/Them"].map((genPro) => (
            <label
              key={genPro}
              className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${selectedGenderPronouns === genPro
                  ? "bg-primary-option_color text-black"
                  : "bg-transparent hover:bg-primary-option_color hover:text-black text-black md:text-black border border-black md:border-black"
                }`}
            >
              <input
                type="radio"
                value={genPro}
                {...register("genderPronouns", {required: "Gender pronoun is required"})}
                // {...register("genderPronouns")}
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
        <legend className="block text-lg font-semibold mb-2 text-black md:text-black">
          Life-Path Number 
          {/* {errors.selectedLifePathNumber && <span className="text-red-500">*</span>} */}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 rounded-3xl">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"].map(
            (lifePathNumber) => (
              <label
                key={lifePathNumber}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${selectedlifePath === lifePathNumber
                    ? "bg-primary-option_color text-black"
                    : "bg-transparent hover:bg-primary-option_color hover:text-black text-black md:text-black border border-black md:border-black"
                  }`}
              >
                <input
                  type="radio"
                  value={lifePathNumber}
                  {...register("selectedLifePathNumber", {required: "Life-path number is required"})}
                  // {...register("selectedLifePathNumber")}
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
        <legend className="block text-lg font-semibold mb-1 text-black md:text-black">
          Religion 
          {/* {errors.selectedReligion && <span className="text-red-500">*</span>} */}
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
                  ? "bg-primary-option_color text-black"
                  : "bg-transparent hover:bg-primary-option_color hover:text-black text-black md:text-black border border-black md:border-black"
                }`}
            >
              <input
                type="radio"
                value={religion}
                {...register("selectedReligion", {required: "Religion is required"})}
                // {...register("selectedReligion")}
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
        <legend className="block text-lg font-semibold mb-2 text-black md:text-black">
          Animal Zodiac Sign 
          {/* {errors.selectedZodiac && <span className="text-red-500">*</span>} */}
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
                  ? "bg-primary-option_color text-black"
                  : "bg-transparent hover:bg-primary-option_color hover:text-black text-black md:text-black border border-black md:border-black"
                }`}
            >
              <input
                type="radio"
                value={zodiac}
                {...register("selectedZodiac", {required: "Zodiac sign is required"})}
                // {...register("selectdZodiac")}
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
        <legend className="block text-lg font-semibold mb-2 text-black md:text-black">
        {/* Dietary Preferences {errors.selectedFooding && <span className="text-red-500">*</span>} */}
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
                  ? "bg-primary-option_color text-black"
                  : "bg-transparent hover:bg-primary-option_color hover:text-black text-black md:text-black border border-black md:border-black"
                }`}
            >
              <input
                type="radio"
                value={fooding}
                {...register("selectedFooding", {required: "Dietary Preferences is required"})}
                // {...register("selectedFooding")}
                className="hidden"
              />
              {fooding}
            </label>
          ))}
        </div>
        {errors.selectedFooding && <p className="text-red-500">{errors.selectedFooding.message}</p>}
      </fieldset>
      {/* <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-black md:text-black">
          What You Do 
          {errors.selectedWhatYouDo && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 py-2 px-0 rounded-3xl">
          {["In School", "In College", "Employed", "Unemployed"].map(
            (option) => (
              <label
                key={option}
                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 
              ${selectedWhatYouDo === option
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent hover:bg-yellow-500 hover:text-black text-black md:text-black border border-black md:border-black"
                  }`}
              >
                <input
                  type="radio"
                  name="selectedWhatYouDo"
                  value={option}
                  {...register("selectedWhatYouDo", {required: "You must select an option."})}
                  // {...register("selectedWhatYouDo")}
                  className="hidden"
                />
                {option}
              </label>
            )
          )}
        </div>
        {errors.selectedWhatYouDo && <p className="text-red-500">{errors.selectedWhatYouDo.message}</p>}
      </fieldset> */}
      {/* <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-black md:text-black">
          What are you looking for? 
          {errors.selectedLookingFor && <span className="text-red-500">*</span>}
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
                  : "bg-transparent hover:bg-yellow-500 hover:text-black text-black md:text-black border border-black md:border-black"
                }`}
            >
              <input
                type="radio"
                name="selectedLookingFor"
                value={lookingFor}
                {...register("selectedLookingFor", {required: "Please select an option."})}
                // {...register("selectedLookingFor")}
                className="hidden"
              />
              {lookingFor}
            </label>
          ))}
        </div>
        {errors.selectedLookingFor && <p className="text-red-500">{errors.selectedLookingFor.message}</p>}
      </fieldset> */}
    </div>
  );
};

export default Form2;
