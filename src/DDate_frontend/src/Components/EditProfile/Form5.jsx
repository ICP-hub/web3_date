import React, { useEffect, useState } from 'react'

const Form5 = ({ index, setIndex, updateFormData, AllformData }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    const [formData, setFormData] = useState({
        selectedintrests: AllformData.selectedintrests || "",
        selectedpreferAge: AllformData.selectedpreferAge || "",
        selectedLocation: AllformData.selectedLocation || "",
        selectedPrefferedLocation: AllformData.selectedPrefferedLocation || "",

    });

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);

        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const handleFormChange = (e) => {
        const { name, value } = e.target;

        if (name === "selectedpreferAge") {
            let minAge, maxAge;

            if (value === "above 30") {
                // Set default values for "above 30" option
                minAge = 30;
                maxAge = 60;
            } else {
                [minAge, maxAge] = value.split("-").map(Number);
            }

            setFormData((prevData) => ({
                ...prevData,
                min_age: minAge,
                max_age: maxAge,
                selectedpreferAge: value,
            }));
        } else if (
            name === "selectedLocation" ||
            name === "selectedPrefferedLocation"
        ) {
            const lowercaseLocation = value.toLowerCase();
            setFormData((prevData) => ({
                ...prevData,
                [name]: lowercaseLocation,
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateFormData(formData);
        setIndex(index + 1);
    };


    return (
        <form
            className="w-full rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
        >
            {/* intrests Selection */}
            <div className="mb-2 grid grid-cols-5 gap-8">
                <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                    Your Interests In
                </legend>
                <div className="flex col-span-3 flex-wrap gap-2 md:gap-2 mb-4 py-2 px-2 rounded-3xl">
                    {["Male", "Female", "All"].map((intrests) => (
                        <label
                            key={intrests}
                            className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedintrests === intrests
                                ? "bg-yellow-500 text-black"
                                : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                                }`}
                        >
                            <input
                                type="radio"
                                name="selectedintrests"
                                value={intrests}
                                onChange={handleFormChange}
                                style={{ display: "none" }}
                            />
                            {intrests}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-2 grid grid-cols-5 gap-8">
                <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                    Preferred Age
                </legend>
                <div className="flex col-span-3 flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
                    {["18-20", "20-25", "25-30", "above 30"].map((preferAge) => (
                        <label
                            key={preferAge}
                            className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedpreferAge === preferAge
                                ? "bg-yellow-500 text-black"
                                : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                                }`}
                        >
                            <input
                                type="radio"
                                name="selectedpreferAge"
                                value={preferAge}
                                onChange={handleFormChange}
                                style={{ display: "none" }}
                            />
                            {preferAge}
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
                <div className="flex-1 gap-8 mb-4 md:mb-0">
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
                        value={formData.selectedLocation}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
                    />
                </div>

                <div className="flex-1 gap-8">
                    <label
                        htmlFor="selectedPrefferedLocation"
                        className="block text-lg font-semibold mb-1 text-white md:text-black"
                    >
                        Preferred Location
                    </label>
                    <input
                        type="text"
                        id="selectedPrefferedLocation"
                        name="selectedPrefferedLocation"
                        placeholder="Your Preffered Location"
                        value={formData.selectedPrefferedLocation}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
                    />
                </div>
            </div>



            <div className="flex justify-center mt-6">
                <button
                    type="submit"
                    className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black"
                >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Form5