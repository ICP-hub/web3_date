{/*
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import CompressImage from "../ImageCompressFolder/CompressImage";
import { Principal } from "@dfinity/principal";
import { DDate_backend } from "../../../../declarations/DDate_backend/index";

const Form6 = ({ AllformData, updateFormData }) => {
    const isMobileView = useMediaQuery({ maxWidth: 767 });
    const navigate = useNavigate();
    const [imageFiles, setImageFiles] = useState([]);
    const [imageError, setImageError] = useState(false);
    const [isButtonDisable, setIsButtonDisable] = useState(false);

    const handleImageChange = async (e, index) => {
        setIsButtonDisable(true);
        const file = e.target.files[0];
        if (file) {
            try {
                const compressedFile = await CompressImage(file);

                const reader = new FileReader();
                reader.onload = (event) => {
                    const updatedImages = [...imageFiles];
                    updatedImages[index] = event.target.result;
                    setImageFiles(updatedImages);
                    setIsButtonDisable(false);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error during image processing:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsButtonDisable(!isButtonDisable);

        if (imageFiles.length === 0) {
            setImageError(true);
            return;
        }

        const principalString = localStorage.getItem("id");
        const principal = convertStringToPrincipal(principalString);

        if (principal) {
            const objectSendToBackendFormat = {
                id: principal,
                gender: AllformData.usergender,
                email: AllformData.email,
                name: AllformData.username,
                mobile_number: AllformData.mobile,
                dob: AllformData.dob,
                gender_pronouns: AllformData.genderPronouns,
                religion: AllformData.selectedReligion,
                height: AllformData.selectedHeight,
                zodiac: AllformData.selectedZodiac,
                diet: AllformData.selectedFooding,
                occupation: AllformData.selectedWhatYouDo,
                looking_for: AllformData.selectedlookingFor,
                smoking: AllformData.selectedsmoking,
                drinking: AllformData.selecteddrink,
                hobbies: AllformData.selectedhobbies,
                sports: AllformData.selectedsports,
                art_and_culture: AllformData.selectedArt,
                pets: AllformData.selectedPets,
                general_habits: AllformData.selectedHabbits,
                outdoor_activities: AllformData.selectedActivities,
                travel: AllformData.selectedTravel,
                movies: AllformData.selectedMovies,
                interests_in: AllformData.selectedintrests,
                age: AllformData.age,
                location: AllformData.selectedLocation,
                min_preferred_age: AllformData.min_age,
                max_preferred_age: AllformData.max_age,
                preferred_gender: AllformData.selectedintrests,
                preferred_location: AllformData.selectedPrefferedLocation,
                introduction: AllformData.selectedIntro,
                images: imageFiles,
            };

            localStorage.setItem("myImage", objectSendToBackendFormat.images[0]);

            try {
                await DDate_backend.add_user_profile(objectSendToBackendFormat);
                navigate("/Swipe");
            } catch (error) {
                console.error("Error sending data to the backend:", error);
            }
        } else {
            console.error("Error converting principal string to Principal object.");
        }
    };

    function convertStringToPrincipal(principalString) {
        try {
            const principal = Principal.fromText(principalString);
            return principal;
        } catch (error) {
            console.error("Error converting string to Principal: ", error);
            return null;
        }
    }

    return (
        <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
        >
            <fieldset className="mb-2">
                <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                    Add Photos{" "}
                    <span className="text-gray-400 text-xs ml-4">
                        (Add maximum 5 photos)
                    </span>
                </legend>
                {imageError && (
                    <p className="text-red-500 text-sm">
                        Please Select at Least One Image
                    </p>
                )}
            </fieldset>

            <div className="flex flex-col w-full justify-center items-center">
                <fieldset className="mb-2 w-full">
                    <div>
                        <div className="flex justify-center items-center w-full mt-4">
                            <div className="w-40 max-w-xs mx-auto">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 0)}
                                    id="file-input-0"
                                    className="hidden"
                                />
                                {imageFiles[0] ? (
                                    <img
                                        src={imageFiles[0]}
                                        alt="Image 0"
                                        className="w-full h-auto object-cover rounded-lg"
                                    />
                                ) : (
                                    <div
                                        className="h-48 w-full flex justify-center items-center border border-gray-400 lg:bg-gray-200 md:bg-gray-200 bg-transparent rounded-2xl cursor-pointer"
                                        onClick={() =>
                                            document.getElementById("file-input-0").click()
                                        }
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                                            <span className="text-2xl text-gray-600">+</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <legend className="block text-md font-semibold text-gray-300 mt-4">
                            Optional
                        </legend>

                        <div className="mt-2 w-full grid grid-cols-3 gap-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex justify-center items-center"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, index + 1)}
                                        id={`file-input-${index + 1}`}
                                        className="hidden"
                                    />
                                    {imageFiles[index + 1] ? (
                                        <img
                                            src={imageFiles[index + 1]}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <label
                                            htmlFor={`file-input-${index + 1}`}
                                            className="h-36 w-full cursor-pointer flex justify-center items-center border border-gray-400 md:bg-gray-200 bg-transparent rounded-2xl hover:bg-gray-300"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                                                <span className="text-2xl text-gray-600">+</span>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 w-full grid grid-cols-3 gap-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-center items-center ${index > 0 ? "hidden" : ""}`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 4)}
                                        id="file-input-4"
                                        className="hidden"
                                    />
                                    {imageFiles[4] ? (
                                        <img
                                            src={imageFiles[4]}
                                            alt="Image 4"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <label
                                            htmlFor={`file-input-4`}
                                            className="h-36 w-full cursor-pointer flex justify-center items-center border border-gray-400 md:bg-gray-200 bg-transparent rounded-2xl hover:bg-gray-300"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                                                <span className="text-2xl text-gray-600">+</span>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </fieldset>
            </div>

        </form>
    );
};

export default Form6;

*/}

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import compressImage from '../ImageCompressFolder/CompressImage';

const Form6 = () => {
    const { register, setValue, formState: { errors }, unregister, setError } = useFormContext();
    const [imageFields, setImageFields] = useState([{ id: Date.now(), file: null }]);
    const [err, setErr] = useState(false);

    //   function handleError() {
    //     setErr(true);
    //   }

    const handleImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) {
            console.log("ERROR -- handleImageUpload: file is missing");
            return;
        }

        try {
            const result = await trigger(`firstImage${index}`); // Assuming trigger function is correctly implemented
            if (result) {
                const compressedFile = await compressImage(file); // Assuming compressImage function is correctly implemented and returns a File object

                const reader = new FileReader();
                reader.onloadend = () => {
                    const newImageFields = [...imageFields];
                    const arrayBuffer = reader.result;
                    newImageFields[index].arrayBuffer = arrayBuffer;
                    // Optionally update state with newImageFields if needed
                };
                reader.readAsArrayBuffer(compressedFile);

                const byteArray = await compressedFile.arrayBuffer(); // Convert compressedFile to byte array
                setImageFields([...imageFields, Array.from(new Uint8Array(byteArray))]); // Update imageFields state with new byte array
                setValue(`firstImage${index}`, Array.from(new Uint8Array(byteArray))); // Update form value with byte array

            } else {
                console.log("ERROR -- handleImageUpload: image trigger failed");
            }
        } catch (error) {
            console.error("Error processing image:", error);
            // Handle errors here if needed
        }
    };
    const handleAddField = () => {
        if (imageFields.length < 5) {
            setImageFields([...imageFields, { id: Date.now(), file: null }]);
        }
    };

    const handleRemoveField = (index) => {
        const newImageFields = imageFields.filter((_, i) => i !== index);
        setImageFields(newImageFields);
        unregister(`firstImage${index}`);
    };

    console.log('imageFields', imageFields)
    const renderImagePreviews = () => {
        return imageFields.map((field, index) => (
            <div key={field.id} className="relative group mb-4">
                {field.file ? (
                    <div className="relative">
                        <img src={field.file} alt={`Preview ${index + 1}`} className="h-36 w-full object-fill rounded-2xl" />
                        <button
                            type="button"
                            onClick={() => handleRemoveField(index)}
                            className="absolute top-1 right-1 bg-red-900 text-white p-1 rounded-md opacity-75 group-hover:opacity-100 text-xs"
                        >
                            X
                        </button>
                    </div>
                ) : (
                    <div
                        className="h-36 w-full flex justify-center items-center border border-gray-400 bg-gray-200 rounded-2xl cursor-pointer"
                        onClick={() => document.getElementById(`file-input-${index}`).click()}
                    >
                        <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-gray-600 rounded-full">
                            <span className="text-2xl text-gray-600">+</span>
                        </div>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    {...register(`firstImage${index}`)}
                    className="hidden"
                    id={`file-input-${index}`}
                    onChange={(e) => { handleImageUpload(e, index); handleError() }}
                />
            </div>
        ));
    };

    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Upload Your Images</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {renderImagePreviews()}
            </div>

            {imageFields.length < 5 && (
                <button
                    type="button"
                    onClick={handleAddField}
                    className="px-4 py-2 bg-yellow-500 text-black rounded mb-4"
                >
                    Add Image
                </button>
            )}
            <div>
                {!err && <p className="text-red-500 text-sm">At least one image is required</p>}
            </div>
        </div>
    );
};

export default Form6;
