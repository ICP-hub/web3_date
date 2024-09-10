import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const Form1 = () => {
    const { register, formState: { errors }, setValue, defaultvalues, getValues, watch } = useFormContext();
    const selectedGender = watch('usergender');  // This will monitor changes in 'usergender'

    console.log("Errors:", errors);
    console.log("Register:", register);
    // Set the default value
    // useEffect(() => {
    // setValue('usergender', 'Male');
    // }, [])


    return (
        <div className="w-full rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none">
            {/* Gender Selection */}
            <fieldset className="mb-3">
                <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                    Choose Your Gender
                    {errors.usergender && <span className="text-red-500">*</span>}
                </legend>
                <div className="flex flex-wrap gap-2 md:gap-2 -mb-1 py-2 px-0 rounded-3xl">
                    {["Male", "Female", " Non binary"].map((gender) => (
                        <label key={gender} className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300
                            ${selectedGender === gender ? 'bg-primary-option_color text-black' : 'bg-transparent hover:bg-primary-option_color hover:text-black text-white md:text-black border border-white md:border-black'}`}>
                            <input
                                type="radio"
                                name="usergender"
                                value={gender}
                                {...register("usergender", { required: "Gender is required" })}
                                // {...register("usergender")}
                                className="hidden"
                            />
                            {gender}
                        </label>
                    ))}
                </div>
                {errors.usergender && <p className="text-red-500">{errors.usergender.message}</p>}
            </fieldset>

            {/* Email Input */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold mb-2 text-white md:text-black">
                    Enter Your Email ID {errors.email && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" } })}
                    // {...register('email')}
                    className="form-input bg-transparent w-full border-2 text-sm px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Username Input */}
            <div className="mb-4">
                <label htmlFor="username" className="block text-lg font-semibold mb-2 text-white md:text-black">
                    Enter Your Username {errors.username && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    // {...register('username', { required: "Username is required" })}
                    // {...register('username')}
                    {...register('username', {
                        required: "Username is required",
                        validate: {
                            hasLetters: (value) =>
                                /[a-zA-Z]/.test(value) || "Username must contain at least one letter",
                            hasNumbers: (value) =>
                                /\d/.test(value) || "Username must contain at least one number",
                            validLength: (value) =>
                                value.length >= 6 || "Username must be at least 6 characters long",
                            noSpecialChars: (value) =>
                                /^[a-zA-Z\d]+$/.test(value) || "Username can only contain letters and numbers",
                        },
                    })}
                    className="form-input bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black text-sm"
                />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>

            {/* Mobile Number Input */}
            <div className="mb-4">
                <label htmlFor="mobile" className="block text-lg font-semibold mb-2 text-white md:text-black">
                    Enter Your Mobile No {errors.mobile && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    {...register('mobile', { required: "Mobile number is required", pattern: { value: /^\d{10}$/, message: "Invalid mobile number" } })}
                    // {...register('mobile')}
                    className="form-input text-sm bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black "
                />
                {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
            </div>

            {/* DOB Input */}
            <div className="mb-4">
                <label htmlFor="dob" className="block text-lg font-semibold mb-2 text-white md:text-black">
                    Enter Your DOB
                    {errors.dob && <span className="text-red-500">*</span>}
                </label>
                <input
                    id="dob"
                    type="date"
                    name="dob"
                    // {...register('dob', { required: "Date of birth is required"})}
                    // {...register('dob')}
                    {...register('dob', {
                        required: "Date of birth is required",
                        validate: {
                            isPastDate: (value) => {
                                const today = new Date();
                                const dob = new Date(value);
                                return dob <= today || "Date of birth cannot be a future date";
                            },
                            isOldEnough: (value) => {
                                const today = new Date();
                                const dob = new Date(value);
                                let age = today.getFullYear() - dob.getFullYear();
                                const monthDiff = today.getMonth() - dob.getMonth();
                                if (
                                    monthDiff < 0 ||
                                    (monthDiff === 0 && today.getDate() < dob.getDate())
                                ) {
                                    age--;
                                }
                                return age >= 18 || "You must be at least 18 years old";
                            },
                        },
                    })}
                    className="form-input bg-transparent text-sm w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black"
                />
                {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
            </div>


        </div>
    );
}

export default Form1;
