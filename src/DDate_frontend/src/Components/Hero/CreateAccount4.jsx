import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";
import { SlArrowUp,SlArrowDown } from "react-icons/sl";

const CreateAccount4 = () => {
  const navigate = useNavigate();
  const [showArt, setShowArt] = useState(false); 
  const [showActivities, setshowActivities] = useState(false);
  const [showTravel, setshowTravel] = useState(false);
  const [showBussiness, setShowBussiness] = useState(false); 


  const [formData, setFormData] = useState({
    selectedArt: "",
    selectedPets: "",
    selectedHabbits: [],
    selectedActivities: "",
    selectedMovies: "",
    selectedsports: "",
    selectedBussiness: "",
    selectedTravel: "",
  });

  const backpageHandler = () => {
    navigate("/CreateAccount3");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("form4");
    if (savedData) {
      let data = JSON.parse(savedData);
      data.selectedBussiness = [];
      setFormData(data);
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value, checked } = e.target;

    const maxSelections = {
      selectedArt: 6,
      selectedMovies: 19,
      selectedTravel: 14,
      selectedActivities: 8,
      selectedHabbits: 4,
    };
    if (
      name === "selectedArt" ||
      name === "selectedMovies" ||
      name === "selectedTravel" ||
      name === "selectedActivities" ||
      name === "selectedsports" ||
      name === "selectedHabbits"
    ) {
      setFormData((prevData) => {
        let updatedData;
        if (checked) {
          // If the user checks a new option, add it to the selection (up to 2)
          updatedData = {
            ...prevData,
            [name]: [...prevData[name], value],
          };
        } else {
          // If the user unchecks an option, remove it from the selection
          updatedData = {
            ...prevData,
            [name]: prevData[name].filter((item) => item !== value),
          };
        }
        // Limit the selection to 2 items
        if (updatedData[name].length > maxSelections[name]) {
          updatedData[name].shift(); // Remove the first item
        }
        return updatedData;
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("form4", JSON.stringify(formData));
    console.log(formData);
    navigate("/CreateAccount5");
  };
  return (
    <div className="flex w-full h-screen md:flex-row font-num">
      {/* Image container for larger screens */}
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${createAccountImage})` }}
      >
        <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
          <div className="w-full max-w-xl mx-auto text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-num mx-auto">
              Create Your
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              account here
            </h2>
            <p className="text-white text-bold md:text-2xl">Welcome ..</p>
            <p className="text-white font-light md:text-xl">
              Complete Your Profile Here.
            </p>
            <p className="text-white font-extralight md:text-lg">
              Tell us about yourself and let us help you finding the perfect
              match
            </p>
            <p className="italic text-yellow-700 md:text-lg">Good Luck!</p>
          </div>
        </div>

        {/* Image Overlay for smaller screens */}
        <div className="w-full h-full bg-black opacity-50 md:opacity-0"></div>
      </div>

      {/* Form container */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-4 md:px-12 z-10 overflow-y-auto">
        <div className="w-full max-w-md my-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center">
            Allow Us to Know You
          </h2>
          <div className="border-t-2 border-solid md:border-black border-white w-full mt-4 mb-4 ml-6"></div>

          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            {/* art Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Art and Culture <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>

              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2  rounded-3xl">
                {[
                  "Museum",
                  "Drawing",
                  "Theaters",
                  "Craft",
                  "Art Galleries ",
                  "Live music",
                  "Night Life",
                  "Cosplay",
                  "Exhibitions",
                  "Folk music",
                  "Playwriting",
                  "Hip-hop music",
                  "Cultural festivals",
                  "Others"
                ].slice(0, showArt ? undefined : 9)
                .map((art) => (
                  <label
                    key={art}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedArt.includes(art)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedArt"
                      value={art}
                      onChange={handleFormChange}
                      checked={formData.selectedArt.includes(art)}
                      style={{ display: "none" }}
                    />

                    {art}
                  </label>
                ))}
                {showArt && ( // Render the "See Less" button if showAllSports is true
                <button
                  onClick={() => setShowArt(false)}
                  className="text-[#4D73F9] items-center flex text-md font-semibold "
                  type="button"
                >
                  see less <SlArrowUp className="bold-icon ml-[10px] "  />
                </button>
              )}
              <button
                onClick={() => setShowArt(!showArt)}
                className="text-[#4D73F9] text-md flex items-center font-semibold"
                type="button"
              >
                {showArt ? "" : <p className="flex items-center">see more <SlArrowDown className="ml-[10px] font-bold"  /></p>} 
              </button>
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Pets
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["Dogs", "Cats", "Birds", "Others"].map((pets) => (
                  <label
                    key={pets}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedPets === pets
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedPets"
                      value={pets}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {pets}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
                General Habits
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {["Early rise", "Night owl", "lazy", "Active"].map(
                  (habbits) => (
                    <label
                      key={habbits}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                        formData.selectedHabbits.includes(habbits)
                          ? "bg-yellow-500 text-black"
                          : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="selectedHabbits"
                        value={habbits}
                        onChange={handleFormChange}
                        checked={formData.selectedHabbits.includes(habbits)}
                        style={{ display: "none" }}
                      />

                      {habbits}
                    </label>
                  )
                )}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Outdoor Activities  <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
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
                  "Others"
                ].slice(0, showActivities ? undefined : 10)
                .map((activities) => (
                  <label
                    key={activities}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedActivities.includes(activities)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedActivities"
                      value={activities}
                      onChange={handleFormChange}
                      checked={formData.selectedActivities.includes(activities)}
                      style={{ display: "none" }}
                    />

                    {activities}
                  </label>
                ))}
                {showActivities && ( // Render the "See Less" button if showAllSports is true
                <button
                  onClick={() => setshowActivities(false)}
                  className="text-[#4D73F9] items-center flex text-md font-semibold"
                  type="button"
                >
                  see less  <SlArrowUp className="bold-icon ml-[10px] "  />
                </button>
              )}
              <button
                onClick={() => setshowActivities(!showActivities)}
                className="text-[#4D73F9] text-md font-semibold"
                type="button"
              >
                {showActivities ? "" :<p className="flex items-center">see more <SlArrowDown className="ml-[10px] font-bold "/></p>}
              </button>
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Movies  <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {[
                  "Animated",
                  "Action",
                  "Comedy",
                  "Crime",
                  "Romantic",
                  "Rom-com",
                  "Sci-fi",
                  "Thriller",
                  // "Documentary",
                  // "War",
                  // "Film noir",
                  // "Fantasy",
                  // "Bollywood",
                  // "K-drama",
                  // "Sports",
                  // "Historical",
                  // "Superhero",
                  // "Biography",
                  // "Adventure",
                  // "Mystery",
                ].map((movies) => (
                  <label
                    key={movies}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedMovies.includes(movies)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedMovies"
                      value={movies}
                      onChange={handleFormChange}
                      checked={formData.selectedMovies.includes(movies)}
                      style={{ display: "none" }}
                    />

                    {movies}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Travel  <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
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
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedTravel.includes(travel)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedTravel"
                      value={travel}
                      onChange={handleFormChange}
                      checked={formData.selectedTravel.includes(travel)}
                      style={{ display: "none" }}
                    />

                    {travel}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
              Business And Growth  <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {[
                  "Investment",
                  "Networking",
                  "Self Development",
                  "Environmentalism",
                  "Metaverse",
                  "Trading",
                  "DAO’s",
                  "NFT’s",
                  "Crypto",
                  "Service-based Business ",
                  "Franchise ",
                  " Freelancing",
                  "IT Development",
                  "Others",
                ]
                .slice(0, showBussiness ? undefined : 8)
                .map((bussniss) => (
                  <label
                    key={bussniss}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.  selectedBussiness.includes(bussniss)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedBussiness"
                      value={bussniss}
                      onChange={handleFormChange}
                      checked={formData.selectedBussiness.includes(bussniss)}
                      style={{ display: "none" }}
                    />
                    {bussniss}
                  </label>
                ))}
                {showBussiness && ( // Render the "See Less" button if showAllSports is true
                <button
                  onClick={() => setShowBussiness(false)}
                  className="text-[#4D73F9] items-center flex text-md font-semibold"
                  type="button"
                >
                  see less <SlArrowUp className="bold-icon ml-[10px]"  />
                </button>
              )}
              <button
                onClick={() => setShowBussiness(!showBussiness)}
                className="text-[#4D73F9] text-md font-samibold ml-[10px] font-semibold "
                type="button"
              >
                {showBussiness ? "" : <p className="flex items-center">see more <SlArrowDown className="ml-[10px] font-bold"  /></p>}
              </button>
              </div>
              
            </fieldset>

            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-transparent text-white md:text-black font-semibold py-2 px-4 rounded  hover:bg-yellow-500 hover:text-white  hover:border-white border border-white md:border-black"
                onClick={backpageHandler}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount4;
