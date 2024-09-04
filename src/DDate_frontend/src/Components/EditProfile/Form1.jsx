import React, { useEffect } from 'react';
import CompressImage from "../ImageCompressFolder/CompressImage";
import { useFormContext } from 'react-hook-form';

const Form1 = ({ index, setIndex, AllformData, formData, setFormData }) => {

    const { register, formState: { errors }, setValue, getValues, watch, handleSubmit } = useFormContext();

    const selectedGender = watch('usergender');

    // useEffect(() => {
    //     if (updateFormData) {

    //     }
    // }, []);

    // const calculateAge = (dobString) => {
    //     const dob = new Date(dobString);
    //     const currentDate = new Date();

    //     if (dob > currentDate) {
    //         alert("Please enter a valid date of birth.");
    //         return null;
    //     }

    //     let age = currentDate.getFullYear() - dob.getFullYear();

    //     if (
    //         currentDate.getMonth() < dob.getMonth() ||
    //         (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
    //     ) {
    //         age--;
    //     }

    //     return age;
    // };

    // const handleImageChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         try {
    //             const compressedFile = await CompressImage(file);
    //             const reader = new FileReader();
    //             reader.readAsDataURL(compressedFile);
    //             reader.onload = () => {
    //                 setValue('images', [reader.result]); // Set the image in form context
    //             };
    //         } catch (error) {
    //             console.error("Error compressing the image:", error);
    //         }
    //     }
    // };

    // const onSubmit = (data) => {
    //     const age = calculateAge(data.dob);
    //     const formDataWithAge = {
    //         ...data,
    //         age: age,
    //     };
    //     updateFormData(formDataWithAge);
    //     setIndex(index + 1);
    // };

    function handleUpdateInput(e) {
        console.log(e.target.name + " and " + e.target.value)
        console.log("formdata =", formData.gender)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="w-full 
         mx-auto px-4 md:px-0">
            {/* <form
                className="w-full rounded-lg p-8 shadow-md md:bg-transparent md:shadow-none"
                onSubmit={handleSubmit(onSubmit)}
            > */}
            {/* <div className="flex justify-start mb-4 relative ">
                    <input
                        id="images"
                        type="file"
                        name="images"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="images"
                        className="h-32 w-32 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
                        style={{
                            background: "linear-gradient(transparent, transparent), radial-gradient(circle at center, #cccccc, #cccccc)",
                            backgroundBlendMode: "multiply",
                        }}
                    >
                        {watch('images')?.length > 0 ? (
                            <div className="relative w-full h-full" style={{ top: "0.45rem ", left: "-0.15rem" }}>
                                <img
                                    src={watch('images')[0] || "default-placeholder.jpg"}
                                    alt="Profile"
                                    className="rounded-full w-full h-full object-cover absolute"
                                    style={{ marginTop: "-8px", marginLeft: "2px" }}
                                />
                            </div>
                        ) : (
                            <svg
                                className="w-full h-full p-4 text-gray-200 dark:text-gray-700"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        )}
                    </label>
                </div> */}

            <label htmlFor="username" className="block text-lg font-semibold ">
                Username
            </label>
            <input
                id="username"
                type="text"
                name="username"
                value={formData?.username ?? ""}
                // {...register('username')}
                {...register('username', {
                    // required: "Username is required",
                    // validate: {
                    //     hasLetters: (value) =>
                    //         /[a-zA-Z]/.test(value) || "Username must contain at least one letter",
                    //     hasNumbers: (value) =>
                    //         /\d/.test(value) || "Username must contain at least one number",
                    //     validLength: (value) =>
                    //         value.length >= 6 || "Username must be at least 6 characters long",
                    //     noSpecialChars: (value) =>
                    //         /^[a-zA-Z\d]+$/.test(value) || "Username can only contain letters and numbers",
                    // },
                })}
                onChange={handleUpdateInput}
                className="form-input bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-sm"
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}

            <label htmlFor='usergender' className="block font-semibold pt-2 text-lg">
                Gender
            </label>
            <div className="flex flex-wrap gap-2 col-span-3   px-0 rounded-3xl">
                {["Male", "Female", "Non Binary"].map((gender) => (
                    <label
                        key={gender}
                        className={`inline-block px-3 py-1.5 rounded-full text-sm focus:outline-none transition duration-300 ${formData.usergender === gender
                            ? "bg-yellow-500 text-black"
                            : "bg-transparent hover:bg-yellow-500 hover:text-black border border-black"
                            }`}
                    >
                        <input
                            type="radio"
                            value={gender}
                            {...register("usergender")}
                            className="hidden"
                            // onChange={() => selectedGender(gender)}
                            onChange={handleUpdateInput}
                        />
                        {gender}
                    </label>
                ))}
            </div>
            {errors.usergender && <p className="text-red-500">{errors.usergender.message}</p>}

            <label htmlFor="email" className="block font-semibold pt-2 text-lg">
                Email
            </label>
            {console.log("email id of the user =",formData.email)}
            <input
                id="email"
                type="email"
                name='email'
                value={formData.email}
                {...register('email')}
                onChange={handleUpdateInput}
                className="form-input bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-sm"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <label htmlFor="mobile_number" className="block font-semibold pt-2 text-lg">
                Mobile No
            </label>
            <input
                id="mobile_number"
                type="tel"
                value={formData.mobile_number}
                {...register('mobile_number')}
                onChange={handleUpdateInput}
                className="form-input bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-sm"
            />
            {errors.mobile_number && <p className="text-red-500">{errors.mobile_number.message}</p>}

            <label htmlFor="dob" className="block font-semibold pt-2 text-lg">
                DOB
            </label>
            <input
                id="dob"
                type="date"
                value={formData.dob}
                {...register('dob')}
                onChange={handleUpdateInput}
                className="form-input bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-sm"
            />
            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

            <label htmlFor="introduction" className="block font-semibold pt-2 text-lg">
                Bio
            </label>
            <textarea
                id="introduction"
                value={formData.introduction}
                rows={5}
                {...register('introduction')}
                onChange={handleUpdateInput}
                placeholder="Let us know something about you"
                className="bg-gray-100 w-full px-4 py-2 rounded-lg  border-none text-black"
            />
            {errors.introduction && <p className="text-red-500">{errors.introduction.message}</p>}
            {/* </form> */}
        </div>
    );
};

export default Form1;
