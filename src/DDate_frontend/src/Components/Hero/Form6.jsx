import React, { useEffect, useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import compressImage from '../ImageCompressFolder/CompressImage';

const Form6 = () => {
    const { register, setValue, formState: { errors }, unregister, trigger } = useFormContext();
    // const { register, setValue, formState: { errors }, unregister, trigger, setError } = useFormContext();
    const [imageFields, setImageFields] = useState([]);
    const [err, setErr] = useState(false);
    const [popUp, setPopUp] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null);
    const modalRef = useRef(null);  // Reference for the modal
    const fileInputRef = useRef(null)

    function handleError() {
        setErr(true);
    }

    useEffect(() => {
        // to create five empty object for images.
        setImageFields(Array.from({ length: 5 }, () => ({})))
    }, [])

    // Handle click outside of the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setPopUp(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

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
                    // newImageFields[index].arrayBuffer = arrayBuffer;
                    // Optionally update state with newImageFields if needed
                    newImageFields[index] = { arrayBuffer }
                    //  adding some new code.
                    setImageFields(newImageFields)
                    setPopUp(false); // Close the popup after uploading the image
                };
                reader.readAsArrayBuffer(compressedFile);

                const byteArray = await compressedFile.arrayBuffer(); // Convert compressedFile to byte array
                setValue(`firstImage${index}`, Array.from(new Uint8Array(byteArray)));
                // setImageFields([...imageFields, Array.from(new Uint8Array(byteArray))]); // Update imageFields state with new byte array
                // setValue(`firstImage${index}`, Array.from(new Uint8Array(byteArray))); // Update form value with byte array

            } else {
                console.log("ERROR -- handleImageUpload: image trigger failed");
            }
        } catch (error) {
            console.error("Error processing image:", error);
            // Handle errors here if needed
        }
    };

    // const handleAddField = () => {
    //     if (imageFields.length < 5) {
    //         setImageFields([...imageFields, {}]);
    //     }
    // };

    const handleRemoveField = (index) => {
        const newImageFields = imageFields.filter((_, i) => i !== index);
        setImageFields(newImageFields);
        unregister(`firstImage${index}`);
    };

    console.log('imageFields', imageFields)

    const renderImagePreviews = () => {
        return imageFields.map((field, index) => (
            <div key={index} className="relative group mb-4">
                {field.arrayBuffer ? (
                    <div className="relative">
                        <img src={URL.createObjectURL(new Blob([new Uint8Array(field.arrayBuffer)], { type: 'image/jpeg' }))} alt={`Preview ${index + 1}`} className=" w-full object-fill rounded-2xl" />
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
                        className="h-36 w-full flex justify-center items-center border bg-gray-200 rounded-2xl cursor-pointer"
                        // onClick={() => document.getElementById(`file-input-${index}`).click()}
                        onClick={() => { setPopUp(true); setCurrentIndex(index) }}
                    >
                        <div className="flex items-center justify-center w-10 h-10 bg-white border-2 rounded-full">
                            <span className="text-2xl text-gray-200">+</span>
                        </div>
                    </div>
                )}
                {/* <input
                    type="file"
                    accept="image/*"
                    {...register(`firstImage${index}`)}
                    className="hidden"
                    id={`file-input-${index}`}
                    onChange={(e) => { handleImageUpload(e, index); handleError(); }}
                /> */}
            </div>
        ));
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div className="p-4">
            <div className='flex space-x-6'>
                <h3 className="text-xl font-semibold mb-4">Add Photos</h3>
                <h3 className="text-gray-400 text-xl font-semibold mb-4">(Add maximum 5 photos for better reach)</h3>

            </div>

            <div className="grid grid-cols-4 sm:grid-cols-4 items-center gap-4 mb-4">
                {renderImagePreviews()}
            </div>

            {/* {imageFields.length < 5 && (
                <button
                    type="button"
                    onClick={handleAddField}
                    className="px-4 py-2 bg-yellow-500 text-black rounded mb-4"
                >
                    Add Image
                </button>
            )} */}
            <div>
                {!err && <p className="text-red-500 text-sm">At least one image is required</p>}
            </div>

            {popUp && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="mx-60 flex items-center justify-center w-full">
                        <label
                            ref={modalRef}  // Attach the modal reference here
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-96 rounded-lg bg-gray-50 dark:bg-gray-700 ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-12 h-12 mb-4 font-semibold text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 font-bold text-gray-400 dark:text-gray-400">Drag and Drop to upload</p>
                                <p className="font-bold text-gray-400 dark:text-gray-400">or</p>

                                <button
                                    type="button"
                                    className="px-12 py-2 mt-4 bg-yellow-400 text-black font-bold rounded-full"
                                    onClick={handleButtonClick}
                                >
                                    Browse Image
                                </button>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={(e) => { handleImageUpload(e, currentIndex); handleError(); }}
                                />
                            </div>
                        </label>
                    </div>+
                </div>
            )}
        </div>
    );
};

export default Form6;
