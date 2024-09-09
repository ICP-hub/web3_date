import React, { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { useFormContext, Controller } from 'react-hook-form';

const Form5 = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const selectedCountry = watch("selectedCountry");
  const selectedState = watch("selectedState");
  const selectedCity = watch("selectedCity");
  const preferredCity = watch("preferredCity");
  const preferredState = watch("preferredState");
  const preferredCountry = watch("preferredCountry");

  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);

  const [preferredStatesList, setPreferredStatesList] = useState([]);
  const [preferredCitiesList, setPreferredCitiesList] = useState([]);

  // const [availableCountries, setAvailableCountries] = useState([]);
  // const [availableStates, setAvailableStates] = useState([]);
  // const [availableCities, setAvailableCities] = useState([]);

  // const [preferredCountriesList, setPreferredCountriesList] = useState([]);
  // const [preferredStatesList, setPreferredStatesList] = useState([]);
  // const [preferredCitiesList, setPreferredCitiesList] = useState([]);

  // const [currentCountry, setCurrentCountry] = useState('');
  // const [currentState, setCurrentState] = useState('');
  // const [currentCity, setCurrentCity] = useState('');

  // const [preferredCountry, setPreferredCountry] = useState('');
  // const [preferredState, setPreferredState] = useState('');
  // const [preferredCity, setPreferredCity] = useState('');

  // list of the states as accordance to the country.
  useEffect(() => {
    if (selectedCountry) {
      setValue('selectedState', selectedState);
      setAvailableStates([])
      setAvailableStates(State.getStatesOfCountry(selectedCountry))
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setValue('selectedCity', selectedCity);
      setAvailableCities([])
      setAvailableCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState, selectedCountry]);

   //  list of the states as accordance to the country
   useEffect(() => {
    if (preferredCountry) {
      setValue('preferredState', preferredState);
      setPreferredStatesList([])
      setPreferredStatesList(State.getStatesOfCountry(preferredCountry))
    }
  }, [preferredCountry]);

  useEffect(() => {
    if (preferredState) {
       setValue('preferredCity', preferredCity);
       setPreferredCitiesList([])
      setPreferredCitiesList(City.getCitiesOfState(preferredCountry, preferredState));
    }
  }, [preferredState, preferredCountry])


  // Fetch available countries for user location
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const countries = await Country.getAllCountries();
  //       setAvailableCountries(countries);
  //     } catch (error) {
  //       console.error('Error fetching countries:', error);
  //     }
  //   };

  //   fetchCountries();
  // }, []);

  // // Fetch available states when current country changes
  // useEffect(() => {
  //   if (currentCountry) {
  //     const fetchStates = async () => {
  //       try {
  //         const states = await State.getStatesOfCountry(currentCountry);
  //         setAvailableStates(states);
  //         // Reset state and city if the new country does not include previous selections
  //         setCurrentState('');
  //         setCurrentCity('');
  //       } catch (error) {
  //         console.error('Error fetching states:', error);
  //       }
  //     };

  //     fetchStates();
  //   }
  // }, [currentCountry]);

  // // Fetch available cities when current state changes
  // useEffect(() => {
  //   if (currentState) {
  //     const fetchCities = async () => {
  //       try {
  //         const cities = await City.getCitiesOfState(currentCountry, currentState);
  //         setAvailableCities(cities);
  //         // Reset city if the new state does not include previous selections
  //         setCurrentCity('');
  //       } catch (error) {
  //         console.error('Error fetching cities:', error);
  //       }
  //     };

  //     fetchCities();
  //   }
  // }, [currentCountry, currentState]);

  // // Fetch preferred countries
  // useEffect(() => {
  //   const fetchPreferredCountries = async () => {
  //     try {
  //       const countries = await Country.getAllCountries();
  //       setPreferredCountriesList(countries);
  //     } catch (error) {
  //       console.error('Error fetching preferred countries:', error);
  //     }
  //   };

  //   fetchPreferredCountries();
  // }, []);

  // // Fetch preferred states when preferred country changes
  // useEffect(() => {
  //   if (preferredCountry) {
  //     const fetchPreferredStates = async () => {
  //       try {
  //         const states = await State.getStatesOfCountry(preferredCountry);
  //         setPreferredStatesList(states);
  //         // Reset state and city if the new country does not include previous selections
  //         setPreferredState('');
  //         setPreferredCity('');
  //       } catch (error) {
  //         console.error('Error fetching preferred states:', error);
  //       }
  //     };

  //     fetchPreferredStates();
  //   }
  // }, [preferredCountry]);

  // // Fetch preferred cities when preferred state changes
  // useEffect(() => {
  //   if (preferredState) {
  //     const fetchPreferredCities = async () => {
  //       try {
  //         const cities = await City.getCitiesOfState(preferredCountry, preferredState);
  //         setPreferredCitiesList(cities);
  //         // Reset city if the new state does not include previous selections
  //         setPreferredCity('');
  //       } catch (error) {
  //         console.error('Error fetching preferred cities:', error);
  //       }
  //     };

  //     fetchPreferredCities();
  //   }
  // }, [preferredCountry, preferredState]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsDesktop(window.innerWidth >= 768);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const selectedInterests = watch("selectedInterests");
  const selectedPreferAge = watch("selectedPreferAge", "");
  // const selectedLocation = watch("selectedLocation", "");
  // const selectedPreferLocation = watch("selectedPreferLocation", "");
  // const selectedIntro = watch("selectedIntro", "");

  return (
    <div className="w-full space-y-2 rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
      <fieldset className="mb-4">
        <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
          Looking for
        </legend>
        <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 rounded-3xl">
          {["Male", "Female", "Network", "Friends", "Business partner"].map((interest) => (
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
                checked={selectedInterests === interest}
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

          {/* Country Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="selectedCountry"
            >
            </label>

            <div className='md:w-44'>
              <Controller className
                name="selectedCountry"
                {...register("selectedCountry", { required: "Select a country" })}
                render={({ field }) => (
                  <><select className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none" {...field}>
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map(country => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select><svg
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
                        d="M19 9l-7 7-7-7" />
                    </svg></>
                )}
              />
              {errors.selectedCountry && <p className="text-red-500">{errors.selectedCountry.message}</p>}
            </div>

            {/* <div className='md:w-44'>
              <select
                id="selectedCountry"
                name="selectedCountry"
                value={currentCountry}
                {...register("selectedCountry", { required: "Select a country" })}
                onChange={(e) => setCurrentCountry(e.target.value)}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value="">Select country</option>
                {availableCountries.map((Country) => {
                  return (
                    <option key={Country.isoCode} value={Country.isoCode}>
                      {Country.name}
                    </option>
                  )
                })}
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
            </div> */}
          </div>

          {/* State Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="selectedState"
            >
            </label>
            <div className='md:w-44'>
              <Controller className
                // name="selectedCountry"
                {...register("selectedState", { required: "Select a state" })}
                render={({ field }) => (
                  <><select className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none" {...field}>
                    <option value="">Select State</option>
                    {availableStates.map(state => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select><svg
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
                        d="M19 9l-7 7-7-7" />
                    </svg></>
                )}
              />
              {errors.selectedState && <p className="text-red-500">{errors.selectedState.message}</p>}
            </div>
            {/* <div className='md:w-44'>
              <select
                // disabled={!currentCountry}
                id="selectedState"
                name="selectedState"
                value={currentState}
                {...register("selectedState", { required: "Select a state" })}
                onChange={(e) => setCurrentState(e.target.value)}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value="">Select state</option>
                {availableStates.map((state) => {
                  return (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  )
                })}
              </select>
              {selectedState && errors.selectedState && <p className="text-red-500">{errors.selectedState.message}</p>}
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
            </div> */}
          </div>

          {/* City Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="selectedCity"
            >
            </label>
            <div className='md:w-44'>
              <Controller
                {...register("selectedCity")}
                render={({ field }) => (
                  <><select className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none" {...field}>
                    <option value="">Select City</option>
                    {availableCities.map(city => (
                      <option key={city.isoCode} value={city.isoCode}>
                        {city.name}
                      </option>
                    ))}
                  </select><svg
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
                        d="M19 9l-7 7-7-7" />
                    </svg></>
                )}
              />
            </div>
            {/* <div className='md:w-44'>
              <select
                // disabled={!currentState}
                value={currentCity}
                id="selectedCity"
                name="selectedCity"
                {...register("selectedCity", { required: "Select a city" })}
                onChange={(e) => setCurrentCity(e.target.value)}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value="">Select city</option>
                {availableCities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}

              </select>
              {currentState && errors.selectedCity && <p className="text-red-500">{errors.selectedCity.message}</p>}
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
            </div> */}
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

          {/* Country Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="preferredCountry"
            >
              <div className='md:w-44'>
              <Controller className
                name="preferredCountry"
                {...register("preferredCountry", { required: "Select a country" })}
                render={({ field }) => (
                  <><select className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none" {...field}>
                    <option value="">Select State</option>
                    {Country.getAllCountries().map(country => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select><svg
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
                        d="M19 9l-7 7-7-7" />
                    </svg></>
                )}
              />
            </div>
            {errors.preferredCountry && <p className="text-red-500">{errors.preferredCountry.message}</p>}
            </label>
            {/* <div className='md:w-44'>
              <select
                id="preferredCountry"
                name="preferredCountry"
                value={preferredCountry}
                {...register("preferredCountry", { required: "Select a country" })}
                onChange={(e) => setPreferredCountry(e.target.value)}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value="" disabled >Select country</option>
                {preferredCountriesList.map((Country) => {
                  return (
                    <option key={Country.isoCode} value={Country.isoCode}>
                      {Country.name}
                    </option>
                  )
                })}
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
            </div> */}
          </div>


          {/* State Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="preferredState"
            >
            </label>

            <div className='md:w-44'>
              <Controller className
                // name="selectedCountry"
                {...register("preferredState", { required: "Select a state" })}
                render={({ field }) => (
                  <><select className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none" {...field}>
                    <option value="">Select State</option>
                    {preferredStatesList.map(country => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select><svg
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
                        d="M19 9l-7 7-7-7" />
                    </svg></>
                )}
              />
            </div>
            {errors.preferredState && <p className="text-red-500">{errors.preferredState.message}</p>}

            {/* <div className='md:w-44'>
              <select
                disabled={!preferredCountry}
                value={preferredState}
                id="preferredState"
                name="preferredState"
                {...register("preferredState", { required: "Select a state" })}
                onChange={(e) => setPreferredState(e.target.value)}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value="" disabled >Select state</option>
                {preferredStatesList.map((state) => {
                  return (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  )
                })}
              </select>
              {preferredCountry && errors.preferredState && <p className="text-red-500">{errors.preferredState.message}</p>}
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
            </div> */}
          </div>

          {/* City Dropdown */}
          <div className="relative mb-4 md:mb-0">
            <label
              htmlFor="preferredCity"
            >
            </label>

            <div className='md:w-44'>
              <Controller className
                {...register("preferredCity")}
                render={({ field }) => (
                  <><select className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none" {...field}>
                    <option value="">Select State</option>
                    {preferredCitiesList.map(city => (
                      <option key={city.isoCode} value={city.isoCode}>
                        {city.name}
                      </option>
                    ))}
                  </select><svg
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
                        d="M19 9l-7 7-7-7" />
                    </svg></>
                )}
              />
            </div>
            
            {/* <div className='md:w-44'>
              <select
                disabled={!preferredState}
                value={preferredCity}
                id="preferredCity"
                name="preferredCity"
                {...register("preferredCity", { required: "Select a city" })}
                onChange={(e) => setPreferredCity(e.target.value)}
                className="w-full px-4 py-2 font-bold rounded-full border border-white md:border-black bg-transparent text-white md:text-gray-400 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
              >
                <option value="" disabled>Select city</option>
                {preferredCitiesList.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}

              </select>
              {preferredState && errors.preferredCity && <p className="text-red-500">{errors.preferredCity.message}</p>}
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
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex-1 my-4 md:my-7">
          <label
            htmlFor="selectedIntro"
            className="block text-lg font-semibold mb-1 text-white md:text-black"
          >
            Bio
          </label>
          <textarea
            id="selectedIntro"
            name="selectedIntro"
            rows={5}
            placeholder="Let us know something about you"
            {...register("selectedIntro", { required: "Enter something about yourself" })}
            className="bg-gray-100 w-full px-4 py-2 rounded-lg  border-none text-black"
          />
          {errors.selectedIntro && <p className="text-red-500">{errors.selectedIntro.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Form5;
