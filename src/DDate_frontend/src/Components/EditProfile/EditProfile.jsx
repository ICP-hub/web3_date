
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import Form6 from "./Form6";
import uploadProfile from "../../../assets/Images/UserProfiles/upload.svg";
import SidebarComponent from "../SidebarComponent";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { useAuth } from "../../auth/useAuthClient";


const schema = yup.object({
  usergender: yup.string().required('Gender is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().required('Username is required'),
  mobile: yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Mobile number is required'),
  dob: yup.date().required('Date of birth is required'),
  genderPronouns: yup.string().required('Gender pronouns are required'),
  selectedReligion: yup.string().required('A religion selection is required'),
  selectedLifePathNumber: yup.number().positive('Life-path number must be greater than 0').integer('Life-path number must be an integer').required('Life-path number is required'),
  selectedZodiac: yup.string().required('Zodiac sign is required'),
  selectedFooding: yup.string().required('Fooding preference is required'),
  selectedWhatYouDo: yup.string().required('Occupation is required'),
  selectedLookingFor: yup.string().required('Relationship preference is required'),
  selectedsmoking: yup.string().required('Smoking preference is required'),
  selecteddrink: yup.string().required('Drinking preference is required'),
  selectedhobbies: yup.array().of(yup.string()).min(2, 'At least 2 hobbies must be selected').required(),
  selectedsports: yup.array().of(yup.string()).min(2, 'At least 2 sports must be selected').required(),
  selectedArt: yup.array().of(yup.string()).min(2, 'Select up to 2 arts only').required(),
  selectedPets: yup.string().required('Pet selection is required'),
  selectedHabits: yup.array().of(yup.string()).min(2, 'Select up to 2 habits only').required(),
  selectedActivities: yup.array().of(yup.string()).min(2, 'Select up to 2 activities only').required(),
  selectedMovies: yup.array().of(yup.string()).min(2, 'Select up to 2 movies only').required(),
  selectedTravel: yup.array().of(yup.string()).min(2, 'Select up to 2 travel options only').required(),
  selectedInterests: yup.array().of(yup.string()).min(1, 'Select at least one interest').required('Interests are required'),
  selectedPreferAge: yup.string().required('Preferred age is required'),
  selectedLocation: yup.string().required('Location is required'),
  selectedPreferLocation: yup.string().required('Preferred location is required'),
  selectedIntro: yup.string().required('Introduction is required'),
}).required();
const EditProfile = () => {
  const formFields = {
    0: ['username', 'usergender', 'email', 'mobile', 'dob', 'selectedIntro'],
    1: ['genderPronouns', 'selectedLifePathNumber', 'selectedReligion', 'selectedZodiac', 'selectedFooding', 'selectedWhatYouDo', 'selectedLookingFor'],
    2: ['selectedsmoking', 'selecteddrink', 'selectedhobbies', 'selectedsports'],
    3: ['selectedArt', 'selectedPets', 'selectedHabits', 'selectedActivities', 'selectedMovies', 'selectedTravel'],
    4: ['selectedInterests', 'selectedPreferAge', 'selectedLocation', 'selectedPreferLocation',],
    5: ['firstImage0', 'firstImage1', 'firstImage2', 'firstImage3', 'firstImage4']
  };
  const location = useLocation();
  const userdata = location.state
  console.log("userdata", userdata)
  // console.log(typeof userdata.dob[0])

  // const myDOB = new Date(userdata.dob[0]);

  function formatDate(myDOB) {
    const year = myDOB.getFullYear();
    const month = String(myDOB.getMonth() + 1).padStart(2, '0');
    const day = String(myDOB.getDate()).padStart(2, '0');
    return `${year} -${month} -${day}`;
  }

  const PreValue = {
    username: userdata?.name[0],
    usergender: userdata?.gender[0],
    email: userdata?.email[0],
    mobile: userdata?.mobile_number[0],
    // dob: formatDate(myDOB),
    selectedIntro: userdata?.introduction[0],
    selectedsmoking: userdata?.smoking[0],
    selecteddrink: userdata?.drinking[0],
    selectedhobbies: userdata?.hobbies,
    selectedsports: userdata?.sports,
    genderPronouns: userdata?.gender_pronouns[0],
    selectedReligion: userdata?.religion[0],
    selectedZodiac: userdata?.zodiac[0],
    selectedFooding: userdata?.diet[0],
    selectedWhatYouDo: userdata?.occupation[0],
    selectedLookingFor: userdata?.looking_for[0],
    selectedArt: userdata?.art_and_culture,
    selectedPets: userdata?.pets[0],
    selectedHabits: userdata?.general_habits,
    selectedActivities: userdata?.outdoor_activities,
    selectedMovies: userdata?.movies,
    selectedTravel: userdata?.travel,
    selectedInterests: userdata?.interests_in[0],
    selectedPreferAge: userdata?.age[0],
    selectedPreferLocation: userdata?.preferred_location[0],
  }

  console.log("Previosu data to set as default", PreValue)

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: PreValue
  });
  const { handleSubmit, trigger } = methods;
  const [index, setIndex] = React.useState(0);
  // const [id, setId] = useState('');
  const [data, setData] = useState('');

  const { backendActor } = useAuth();

  const onSubmit = async (data) => {
    console.log('Final Form Data', data);
    if (backendActor) {
      const DdateData = {
        email: [data?.email],
        age: [Number((data?.selectedPreferAge).slice(0, 2)) + Math.floor(Math.random() * 10 + 1)],
        gender: [data?.usergender],
        // dob: [String(data?.dob)],
        dob: [],
        gender_pronouns: [data?.genderPronouns],
        religion: [data?.selectedReligion],
        zodiac: [data?.selectedZodiac],
        looking_for: [data?.selectedLookingFor],
        smoking: [data?.selectedsmoking],
        drinking: [data?.selecteddrink],
        hobbies: [data?.selectedhobbies],
        sports: [data?.selectedsports],
        art_and_culture: [data?.selectedArt],
        general_habits: [data?.selectedHabits],
        movies: [data?.selectedMovies],
        interests_in: data?.selectedInterests,
        location: [data?.selectedLocation],
        preferred_location: [data?.selectedPreferLocation],
        introduction: [data?.selectedIntro],
        occupation: [data?.selectedWhatYouDo],
        height: [],
        mobile_number: [data?.mobile],
        diet: [data?.selectedFooding],
        travel: [data?.selectedTravel],
        name: [data?.username],
        pets: [data?.selectedPets],
        outdoor_activities: [data?.selectedActivities],
        min_preferred_age: [Number((data?.selectedPreferAge).slice(0, 2))],
        preferred_gender: [data?.usergender],
        max_preferred_age: [Number((data?.selectedPreferAge).slice(3, 5))],
        images:
          [
            // data?.firstImage0,
            // data?.firstImage1,
            // data?.firstImage2,
            // data?.firstImage3,
            // data?.firstImage4
          ]

      }
      console.log(' Edited Ddatedata ', DdateData)

      try {
        await backendActor.create_an_account(DdateData).then((result) => {
          if (result) {
            const API = result.Ok;
            console.log(API)
            const trimedId = API.split(":")[1].trim();
            setId(trimedId);
          } else {
            setId('')
          }
        });

      } catch (error) {
        console.error("Error sending data to the backend:", error);
      }
    }
  };



  const handleNext = async () => {
    const isValid = await trigger(formFields[index]);
    console.log('isValid: ', isValid);
    if (isValid) {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const handleBack = () => {
    console.log("It is outside isValid")
    if (index > 0) {
      setIndex(prevIndex => prevIndex - 1);
      console.log("It is inside isValid")
    }
  };

  // const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  return (
    <>
      <div>

        <FormProvider {...methods}>
          <div className=" ">
            <div>
              <div className="absolute z-20">
                {<SidebarComponent />}
              </div>
              <div className="font-viga justify-center md:flex block md:w-[80%] w-full float-right">
                <div className="md:w-3/5 w-full px-6 max-h-[100vh] overflow-y-auto border-[#E4E4E7] border-r-4">

                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center ">
                    <div className="flex items-center">
                      <svg className=" mt-10 flex-shrink-0 ml-5 cursor-pointer" width="20" height="12" viewBox="0 0 12 12  " sm:fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.28501 0.285909L0.285013 5.28591C0.193973 5.38101 0.122608 5.49316 0.0750132 5.61591C-0.0250048 5.85937 -0.0250048 6.13245 0.0750133 6.37591C0.122608 6.49866 0.193973 6.6108 0.285013 6.70591L5.28501 11.7059C5.37825 11.7991 5.48894 11.8731 5.61076 11.9236C5.73259 11.974 5.86315 12 5.99501 12C6.26132 12 6.51671 11.8942 6.70501 11.7059C6.89332 11.5176 6.9991 11.2622 6.9991 10.9959C6.9991 10.7296 6.89332 10.4742 6.70501 10.2859L3.40501 6.99591L10.995 6.99591C11.2602 6.99591 11.5146 6.89055 11.7021 6.70301C11.8897 6.51548 11.995 6.26112 11.995 5.99591C11.995 5.73069 11.8897 5.47634 11.7021 5.2888C11.5146 5.10126 11.2602 4.99591 10.995 4.99591L3.40501 4.99591L6.70501 1.70591C6.79874 1.61294 6.87314 1.50234 6.9239 1.38049C6.97467 1.25863 7.00081 1.12792 7.00081 0.995908C7.00081 0.863897 6.97467 0.733191 6.9239 0.611332C6.87314 0.489472 6.79874 0.378873 6.70501 0.285909C6.61205 0.192181 6.50145 0.117785 6.37959 0.0670163C6.25773 0.0162475 6.12703 -0.00988987 5.99501 -0.00988986C5.863 -0.00988986 5.7323 0.0162475 5.61044 0.0670164C5.48858 0.117785 5.37798 0.192181 5.28501 0.285909Z" sm:fill="black" id="svg-path" />
                      </svg>

                      <span className="flex-grow text-left pl-6 md:text-2xl text-xl text-black mt-10">Edit Your Profile</span>
                    </div>
                    <style jsx>{`@media (max-width: 768px) {#svg-path {fill: black;}}`}</style>
                  </h2>

                  <div className="border-t-2 border-solid md:border-black border-white w-[90% ] mt-4 mb-4 md:ml-6"></div>

                  {index === 0 &&
                    <Form1 index={index} setIndex={setIndex} updateFormData={data} AllformData={formData} />
                  }
                  {index === 1 &&
                    <Form2 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
                  }
                  {index === 2 &&
                    <Form3 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} prevalue={PreValue} />
                  }
                  {index === 3 &&
                    <Form4 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
                  }
                  {index === 4 &&
                    <Form5 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
                  }
                  {index === 5 &&
                    <Form6 AllformData={formData} updateFormData={updateFormData} />
                  }

                  <div className="flex justify-between mt-6">
                    <button type="button" className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black" onClick={handleBack} disabled={index === 0}>Back</button>
                    {index === 5 ? (
                      <>
                        <button type="submit" className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black">Save</button>
                      </>
                    ) : (
                      <button type="button" className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black" onClick={handleNext}>Next</button>
                    )}
                  </div>
                </div>
                <div className="md:w-2/5  max-h-[90vh] overflow-y-auto">
                  <div className="border-gray-300 font-viga bg-white  ">
                    <div className="flex flex-col items-center justify-center p-4 mt-[28px]">
                      <p className="text-[24px] flex items-center gap-3 font-[700]  text-left"><MdOutlineAddToPhotos />Your Photos</p>

                      <hr className="border-black border-t-2 mt-[8px] w-full" />


                      <div className=" text-black text-opacity-50 font-normal text-sm">
                        Add maximum 2 photos for better reach
                      </div>
                    </div>

                    <div className="bg-white flex flex-col gap-6 items-center justify-center mb-[1.5rem] sm:flex-row  ">
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200  flex justify-center items-center">
                        {/* hello */}

                        <div className="w-40 h-[180px] md:w-32 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                          <label htmlFor={`additional-image-1`}>
                            {false ? (
                              <div
                                className="flex items-center justify-center w-40 h-[180px] md:w-32 md:h-[196px] rounded-[15px] bg-zinc-200"
                                key="1"
                              >
                                <svg
                                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                              </div>
                            ) :
                              //   formData?.images[1]
                              false
                                ? (
                                  <img
                                    src={formData?.images[1]}
                                    alt={`Additional Image 1`}
                                    className="w-40 h-[180px] md:w-32 md:h-[196px] rounded-[15px] cursor-pointer"
                                  />
                                ) : (
                                  <img
                                    src={uploadProfile}
                                    alt="uploadProfile"
                                    className=" rounded-[15px] cursor-pointer"
                                  />
                                )}
                            <input
                              id={`additional-image-1`}
                              type="file"
                              // onChange={handleAdditionalImageChange(1)}
                              className="hidden"
                            />
                          </label>
                        </div>

                      </div>
                      {/* Second input field for additional photos */}
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200  flex justify-center items-center">
                        <label htmlFor={`additional-image-2`}>
                          {false ? (
                            <div
                              className="flex items-center justify-center w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200"
                              key="1"
                            >
                              <svg
                                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 18"
                              >
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                              </svg>
                            </div>
                          ) :
                            //   formData?.images[2] 
                            false
                              ? (
                                <img
                                  src={formData?.images[2]}
                                  alt={`Additional Image 2`}
                                  className="w-40 h-[180px] md:w-32 md:h-[196px] rounded-[15px] cursor-pointer"
                                />
                              ) : (
                                <img
                                  src={uploadProfile}
                                  alt="uploadProfile"
                                  className="rounded-[15px] cursor-pointer"
                                />
                              )}
                          <input
                            id={`additional-image-2`}
                            type="file"
                            // onChange={handleAdditionalImageChange(2)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="bg-white flex flex-col gap-6 items-center justify-center mb-10 sm:flex-row">
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200  flex justify-center items-center">
                        {/* hello */}

                        <div className="w-40 h-[180px] md:w-32 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                          <label htmlFor={`additional-image-3`}>
                            {false ? (
                              <div
                                className="flex items-center justify-center w-40 h-[180px] md:w-32 md:h-[196px] rounded-[15px] bg-zinc-200"
                                key="1"
                              >
                                <svg
                                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                              </div>
                            ) :
                              //   formData?.images[3]
                              false
                                ? (
                                  <img
                                    src={formData?.images[3]}
                                    alt={`Additional Image 3`}
                                    className="w-40 h-[180px] md:w-32 md:h-[196px] rounded-[15px] cursor-pointer"
                                  />
                                ) : (
                                  <img
                                    src={uploadProfile}
                                    alt="uploadProfile"
                                    className=" rounded-[15px] cursor-pointer"
                                  />
                                )}
                            <input
                              id={`additional-image-3`}
                              type="file"
                              // onChange={handleAdditionalImageChange(1)}
                              className="hidden"
                            />
                          </label>
                        </div>

                      </div>
                      {/* Second input field for additional photos */}
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200  flex justify-center items-center">
                        <label htmlFor={`additional-image-4`}>
                          {false ? (
                            <div
                              className="flex items-center justify-center w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200"
                              key="1"
                            >
                              <svg
                                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 18"
                              >
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                              </svg>
                            </div>
                          ) :
                            //   formData?.images[4] 
                            false
                              ? (
                                <img
                                  src={formData?.images[4]}
                                  alt={`Additional Image 4`}
                                  className="w-40 h-[180px] md:w-32 md:h-[196px] rounded-[15px] cursor-pointer"
                                />
                              ) : (
                                <img
                                  src={uploadProfile}
                                  alt="uploadProfile"
                                  className="rounded-[15px] cursor-pointer"
                                />
                              )}
                          <input
                            id={`additional-image-4`}
                            type="file"
                            // onChange={handleAdditionalImageChange(2)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* <div className="text-center">
            <h2 >hello</h2>
            <h2 >hello</h2>

            <h2 >hello</h2>
          </div> */}

          </div>
        </FormProvider>
      </div>

    </>

  );
};

export default EditProfile;
