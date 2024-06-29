import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import compressImage from '../ImageCompressFolder/CompressImage';

const Form6 = () => {
    const { register, setValue, formState: { errors }, unregister, trigger, setError } = useFormContext();
    const [imageFields, setImageFields] = useState([]);
    const [err, setErr] = useState(false);

    function handleError() {
        setErr(true);
    }

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
            setImageFields([...imageFields, {}]);
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
                    onChange={(e) => { handleImageUpload(e, index); handleError(); }}
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
