
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
// import Form4 from "./Form4";
import Form5 from "./Form5";
// import Form6 from "./Form6";
import uploadProfile from "../../../assets/Images/UserProfiles/upload.svg";
import SidebarComponent from "../SidebarComponent";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { useAuth } from "../../auth/useAuthClient";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ThreeDots } from "react-loader-spinner";

// const schema = yup.object({
//   usergender: yup.string().required('Gender is required'),
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   username: yup.string().required('Username is required'),
//   mobile: yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Mobile number is required'),
//   dob: yup.date().required('Date of birth is required'),
//   genderPronouns: yup.string().required('Gender pronouns are required'),
//   selectedReligion: yup.string().required('A religion selection is required'),
//   selectedLifePathNumber: yup.number().positive('Life-path number must be greater than 0').integer('Life-path number must be an integer').required('Life-path number is required'),
//   selectedZodiac: yup.string().required('Zodiac sign is required'),
//   selectedFooding: yup.string().required('Fooding preference is required'),
//   selectedWhatYouDo: yup.string().required('Occupation is required'),
//   selectedLookingFor: yup.string().required('Relationship preference is required'),
//   selectedsmoking: yup.string().required('Smoking preference is required'),
//   selecteddrink: yup.string().required('Drinking preference is required'),
//   selectedhobbies: yup.array().of(yup.string()).min(2, 'At least 2 hobbies must be selected').required(),
//   selectedsports: yup.array().of(yup.string()).min(2, 'At least 2 sports must be selected').required(),
//   selectedArt: yup.array().of(yup.string()).min(2, 'Select up to 2 arts only').required(),
//   selectedPets: yup.string().required('Pet selection is required'),
//   selectedHabits: yup.array().of(yup.string()).min(2, 'Select up to 2 habits only').required(),
//   selectedActivities: yup.array().of(yup.string()).min(2, 'Select up to 2 activities only').required(),
//   selectedMovies: yup.array().of(yup.string()).min(2, 'Select up to 2 movies only').required(),
//   selectedTravel: yup.array().of(yup.string()).min(2, 'Select up to 2 travel options only').required(),
//   selectedInterests: yup.array().of(yup.string()).min(1, 'Select at least one interest').required('Interests are required'),
//   selectedPreferAge: yup.string().required('Preferred age is required'),
//   selectedLocation: yup.string().required('Location is required'),
//   selectedPreferLocation: yup.string().required('Preferred location is required'),
//   selectedIntro: yup.string().required('Introduction is required'),
// }).required();

const EditProfile = () => {
  const formFields = {
    0: ['username', 'usergender', 'email', 'mobile_number', 'dob', 'introduction'],
    1: ['genderPronouns', 'selectedLifePathNumber', 'selectedReligion', 'selectedZodiac', 'selectedFooding', 'selectedWhatYouDo', 'selectedLookingFor'],
    2: ['selectedsmoking', 'selecteddrink', 'selectedhobbies', 'selectedsports'],
    // 3: ['selectedArt', 'selectedPets', 'selectedHabits', 'selectedActivities', 'selectedMovies', 'selectedTravel'],
    3: ['selectedInterests', 'selectedPreferAge', 'selectedLocation', 'selectedPreferLocation',],
    // 5: ['firstImage0', 'firstImage1', 'firstImage2', 'firstImage3', 'firstImage4']
  };
  const [index, setIndex] = useState(0);
  const [imageArray, setImageArray] = useState([[], [], [], [], [], []]);
  const [btnDisable, setBtnDisable] = useState(false)
  // const [fireBaseImageArray, setFireBaseImageArray] = useState([])
  let fireBaseImageArray = [];
  const navigate = useNavigate()

  const location = useLocation();
  const userdata = location.state;
  console.log("userdata = ", userdata)
  // console.log(typeof userdata.dob[0])

  // const myDOB = new Date(userdata.dob[0]);

  // function formatDate(myDOB) {
  //   const year = myDOB.getFullYear();
  //   const month = String(myDOB.getMonth() + 1).padStart(2, '0');
  //   const day = String(myDOB.getDate()).padStart(2, '0');
  //   return `${year} -${month} -${day}`;
  // }

  // const methods = useForm({
  //   resolver: yupResolver(schema),
  //   mode: 'all',
  //   defaultValues: PreValue
  // });
  // const { handleSubmit, trigger } = methods;
  // const [index, setIndex] = React.useState(0);
  const [id, setId] = useState('');
  const [data, setData] = useState('');
  // const [formData, setFormData] = useState({
  //   usergender: "",
  //   email: "",
  //   username: "",
  //   mobile_number: "",
  //   introduction: "",
  //   images: [],
  //   genderPronouns: "",
  //   matches: [],
  //   age: "",
  //   art_and_culture: [],
  //   selectedFooding: "",
  //   dob: "",
  //   selecteddrink: "",
  //   selectedsmoking: "",
  //   general_habbits: "",
  //   height: "",
  //   selectedhobbies: [],
  //   selectedsports: [],
  //   interests_in: "",
  //   location: "",
  //   looking_for: "",
  //   max_preferred_age: "",
  //   min_preferred_age: "",
  //   movies: "",
  //   occupation: "",
  //   outdoor_activities: [],
  //   pets: "",
  //   preferred_gender: "",
  //   preferred_location: "",
  //   selectedReligion: "",
  //   travel: "",
  //   selectedZodiac: "",
  // });

  // useEffect(() => {
  //   if (userdata) {
  //     setFormData({
  //       username: userdata?.name[0] || "",
  //       email: userdata?.email[0] || "",
  //       art_and_culture: userdata?.art_and_culture || [],
  //       selectedFooding: userdata?.diet[0] || "",
  //       dob: userdata?.dob || "",
  //       selectedsports: userdata?.sports || [],
  //       selecteddrink: userdata?.drinking[0] || "",
  //       selectedsmoking: userdata?.smoking[0] || "",
  //       usergender: userdata?.gender[0] || "",
  //       genderPronouns: userdata?.gender_pronouns[0] || "",
  //       general_habbits: userdata?.general_habits || "",
  //       height: userdata?.height[0] || "",
  //       selectedhobbies: userdata?.hobbies || [],
  //       images: userdata?.images || [],
  //       interests_in: userdata?.interests_in[0] || "",
  //       introduction: userdata?.introduction[0] || "",
  //       location: userdata?.location[0] || "",
  //       looking_for: userdata?.looking_for[0] || "",
  //       max_preferred_age: userdata?.max_preferred_age[0] || "",
  //       min_preferred_age: userdata?.min_preferred_age[0] || "",
  //       selectedPreferAge: `${userdata?.max_preferred_age[0]}-${userdata?.min_preferred_age[0]}` || "",
  //       movies: userdata?.movies || "",
  //       occupation: userdata?.occupation[0] || "",
  //       outdoor_activities: userdata?.outdoor_activities || [],
  //       pets: userdata.pets[0] || "",
  //       preferred_gender: userdata?.preferred_gender[0] || "",
  //       preferred_location: userdata?.preferred_location[0] || "",
  //       selectedReligion: userdata?.religion[0] || "",
  //       travel: userdata?.travel || "",
  //       selectedZodiac: userdata.zodiac[0] || "",
  //       mobile_number: userdata.mobile_number[0] || "",
  //     });
  //   }
  // }, [userdata]);

  const methods = useForm({
    defaultValues: {
      username: userdata?.name[0] || "",
      email: userdata?.email[0] || "",
      // art_and_culture: userdata?.art_and_culture || [],
      selectedFooding: userdata?.diet[0] || "",
      dob: userdata?.dob || "",
      selectedsports: userdata?.sports[0] || [],
      selecteddrink: userdata?.drinking[0] || "",
      selectedsmoking: userdata?.smoking[0] || "",
      usergender: userdata?.gender[0] || "",
      genderPronouns: userdata?.gender_pronouns[0] || "",
      selectedLifePathNumber: userdata?.life_path_number[0] || "",
      // general_habbits: userdata?.general_habits || "",
      // height: userdata?.height[0] || "",
      selectedhobbies: userdata?.hobbies[0] || [],
      images: userdata?.images || [],
      selectedInterests: userdata?.interests_in[0] || "",
      introduction: userdata?.introduction[0] || "",
      // location: userdata?.location[0] || "",
      // looking_for: userdata?.looking_for[0] || "",
      selectedCountry: userdata?.location_country[0] || "",
      selectedState: userdata?.location_state[0] || "",
      selectedCity: userdata?.location_city[0] || "",
      preferredCountry: userdata?.preferred_country[0] || "",
      preferredState: userdata?.preferred_state[0] || "",
      preferredCity: userdata?.preferred_city[0] || "",
      max_preferred_age: userdata?.max_preferred_age[0] || "",
      min_preferred_age: userdata?.min_preferred_age[0] || "",
      selectedPreferAge: `${userdata?.min_preferred_age[0]}-${userdata?.max_preferred_age[0]}` || "",
      // movies: userdata?.movies || "",
      // occupation: userdata?.occupation[0] || "",
      // outdoor_activities: userdata?.outdoor_activities || [],
      // pets: userdata.pets[0] || "",
      // preferred_gender: userdata?.preferred_gender[0] || "",
      // preferred_location: userdata?.preferred_location[0] || "",
      selectedReligion: userdata?.religion[0] || "",
      // travel: userdata?.travel || "",
      selectedZodiac: userdata.zodiac[0] || "",
      mobile_number: userdata.mobile_number[0] || "",
    }
  });

  useEffect(() => {
    console.log('Index changed to:', index);
  }, [index]);

  // to get the exiting images of the user.
  useEffect(() => {
    // Create a new array to avoid directly mutating the state
    const updatedImageArray = [...imageArray];

    // Insert the values from userdata.images into the corresponding indices
    userdata.images[0].forEach((image, index) => {
      if (index < updatedImageArray.length) {
        updatedImageArray[index] = image;
      }
    });

    // Update the state with the new array
    setImageArray(updatedImageArray);
    // console.log("updated array = ", updatedImageArray)
  }, [userdata.images]);

  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const { backendActor } = useAuth();

  const onSubmit = async (data) => {
    console.log("auto submission")
    setBtnDisable(true)
    await handleImageToFirebase()
    console.log('Final Form Data', data);
    if (backendActor) {
      const DdateData = {
        // user_id: [userdata?.user_id],
        gender: [data?.usergender],
        email: [data?.email],
        name: [data?.username],
        mobile_number: [data?.mobile_number],
        dob: [String(data?.dob)],
        gender_pronouns: [data?.genderPronouns],
        life_path_number: [data?.selectedLifePathNumber],
        religion: [data?.selectedReligion],
        zodiac: [data?.selectedZodiac],
        diet: [data?.selectedFooding],
        smoking: [data?.selectedsmoking],
        drinking: [data?.selecteddrink],
        hobbies: [data?.selectedhobbies],
        sports: [data?.selectedsports],
        interests_in: [data?.selectedInterests],
        min_preferred_age: [Number((data?.selectedPreferAge).slice(0, 2))],
        max_preferred_age: [Number((data?.selectedPreferAge).slice(3, 5))],
        location_city: [data?.selectedCity],
        location_state: [data?.selectedState],
        location_country: [data?.selectedCountry],
        preferred_city: [data?.preferredCity],
        preferred_state: [data?.preferredState],
        preferred_country: [data?.preferredCountry],
        introduction: [data?.introduction],
        images: [fireBaseImageArray || []],
        age: [Number((data?.selectedPreferAge).slice(0, 2)) + Math.floor(Math.random() * 10 + 1)],
        // art_and_culture: [data?.selectedArt],
        // general_habits: [data?.selectedHabits],
        // movies: [data?.selectedMovies],
        // location: [data?.selectedLocation],
        // preferred_location: [data?.selectedPreferLocation],
        // occupation: [data?.selectedWhatYouDo],
        // height: [],
        // looking_for: [data?.selectedLookingFor],
        // travel: [data?.selectedTravel],
        // pets: [data?.selectedPets],
        // outdoor_activities: [data?.selectedActivities],
        // preferred_gender: [data?.usergender],
      }

      try {
        await backendActor.update_an_account(userdata?.user_id, DdateData).then((result) => {
          if (result) {
            const API = result.Ok;
            console.log(API)
            const trimedId = API.split(":")[1].trim();
            setId(trimedId);
            setBtnDisable(false);
            navigate("/Profile", { state: trimedId })
            console.log("data submitted for testing")
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
    if (isValid) {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const handleSkip = () => {
    setIndex((prevIndex) => prevIndex + 1);
  }

  const handleBack = () => {
    if (index > 0) {
      setIndex(prevIndex => prevIndex - 1);
    }
  };

  function handleAdditionalImageChange(e, index) {
    const file = e.target.files[0];
    // console.log("file to check = ", file)
    if (file) {
      // Update the state with the new image file
      setImageArray(prevFields => {
        const newFields = [...prevFields];
        newFields[index] = file; // Store only the file
        return newFields;
      });
    }
  }

  // function to clear the image from the array.
  const handleClearImage = (index) => {
    const newImageFields = [...imageArray];
    newImageFields[index] = []; // or null, depending on your preference
    setImageArray(newImageFields);
  };

  // Function to get the current date and time in a specific format
  const giveCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };


  function handleImageToFirebase() {
    // Helper function to upload a single image
    const uploadImage = (image) => {
      return new Promise((resolve, reject) => {
        // console.log("image url or html = ", image)
        if (image.length === 0) {
          resolve(); // Resolve immediately if no image
          return;
        }
        if (!image.name) {
          fireBaseImageArray.push(image)
          resolve(); // Resolve immediately if no image
          return;
        }

        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${image.name + " " + dateTime}`);
        const metadata = {
          contentType: image.type,
        };

        // Create the upload task
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        // Handle the upload task
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("progress = ", progress);
          },
          (error) => {
            console.error('Error uploading image:', error);
            reject(error); // Reject the Promise if there's an error
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File successfully uploaded:', downloadURL);
              fireBaseImageArray.push(downloadURL)
              resolve(downloadURL); // Resolve the Promise with the download URL
            } catch (error) {
              console.error('Error getting download URL:', error);
              reject(error); // Reject the Promise if there's an error
            }
            // try {
            //   const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            //   console.log('File successfully uploaded:', downloadURL);

            //   // Log the state before updating
            //   console.log("firebase before =", fireBaseImageArray);

            //   // Update the state with the new download URL
            //   setFireBaseImageArray((prevArray) => {
            //     const newArray = [...prevArray, downloadURL];
            //     // Log the state after updating
            //     console.log("firebase after =", newArray);
            //     return newArray;
            //   });

            //   // Resolve the Promise with the download URL
            //   return downloadURL;
            // } catch (error) {
            //   console.error('Error getting download URL:', error);
            //   // Reject the Promise if there's an error
            //   reject(error);
            // }

          }
        );
      });
    };

    // Chain the image uploads sequentially
    const uploadPromises = imageArray.reduce((promiseChain, image) => {
      return promiseChain
        // function is responsible for uploading a single image and returns a Promise.
        .then(() => uploadImage(image))
        .catch(error => {
          console.error('Error in upload chain:', error);
          // Optionally return a rejected promise to stop the chain
          return Promise.reject(error);
        });
    }, Promise.resolve());

    return uploadPromises;
  }

  const onErrorHandler = (val) => {
    console.log("error", val);
  };

  // const [index, setIndex] = useState(0);

  // const updateFormData = (newData) => {
  //   setFormData(prev => ({ ...prev, ...newData }));
  // };
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
                      <svg onClick={handleBack} className=" mt-10 flex-shrink-0 ml-5 cursor-pointer" width="20" height="12" viewBox="0 0 12 12  " sm:fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.28501 0.285909L0.285013 5.28591C0.193973 5.38101 0.122608 5.49316 0.0750132 5.61591C-0.0250048 5.85937 -0.0250048 6.13245 0.0750133 6.37591C0.122608 6.49866 0.193973 6.6108 0.285013 6.70591L5.28501 11.7059C5.37825 11.7991 5.48894 11.8731 5.61076 11.9236C5.73259 11.974 5.86315 12 5.99501 12C6.26132 12 6.51671 11.8942 6.70501 11.7059C6.89332 11.5176 6.9991 11.2622 6.9991 10.9959C6.9991 10.7296 6.89332 10.4742 6.70501 10.2859L3.40501 6.99591L10.995 6.99591C11.2602 6.99591 11.5146 6.89055 11.7021 6.70301C11.8897 6.51548 11.995 6.26112 11.995 5.99591C11.995 5.73069 11.8897 5.47634 11.7021 5.2888C11.5146 5.10126 11.2602 4.99591 10.995 4.99591L3.40501 4.99591L6.70501 1.70591C6.79874 1.61294 6.87314 1.50234 6.9239 1.38049C6.97467 1.25863 7.00081 1.12792 7.00081 0.995908C7.00081 0.863897 6.97467 0.733191 6.9239 0.611332C6.87314 0.489472 6.79874 0.378873 6.70501 0.285909C6.61205 0.192181 6.50145 0.117785 6.37959 0.0670163C6.25773 0.0162475 6.12703 -0.00988987 5.99501 -0.00988986C5.863 -0.00988986 5.7323 0.0162475 5.61044 0.0670164C5.48858 0.117785 5.37798 0.192181 5.28501 0.285909Z" sm:fill="black" id="svg-path" />
                      </svg>

                      <span className="flex-grow text-left pl-6 md:text-2xl text-xl text-black mt-10">Edit Your Profile</span>
                    </div>
                    <style jsx>{`@media (max-width: 768px) {#svg-path {fill: black;}}`}</style>
                  </h2>
                  <div className="border-t-2 border-solid md:border-black border-white w-[90% ] mt-4 mb-4 md:ml-6"></div>
                  {/* {userdata !== undefined && <form onSubmit={handleSubmit(onSubmit, onErrorHandler)}> */}
                    {index === 0 &&
                      <Form1 />
                    }
                    {index === 1 &&
                      <Form2 />
                    }
                    {index === 2 &&
                      <Form3 />
                    }
                    {index === 3 &&
                      <Form5 />
                    }
                    {/* {index === 1 &&
                      <Form2 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
                    } */}
                    {/* {index === 2 &&
                      <Form3 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} 
                      prevalue={PreValue} />
                    } */}
                    {/* {index === 3 &&
                      <Form4 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
                    }
                    {index === 4 &&
                      <Form5 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
                    }
                    {index === 5 &&
                      <Form6 AllformData={formData} updateFormData={updateFormData} />
                    } */}

                    <div className="flex justify-end mt-6">
                      {/* <button type="button" className="font-semibold py-2 px-6  text-white md:text-black md:hover:text-black" onClick={handleSkip}>Skip</button> */}
                      {index === 3 ? (
                        <>
                          <button
                            disabled={btnDisable}
                            type="button"
                            onClick={handleSubmit(onSubmit,onErrorHandler)}
                            className="bg-primary-color font-semibold py-2 px-6 rounded-full hover:bg-secondary-dark_hover text-white md:text-white md:hover:text-white"
                          >
                            {isSubmitting ? (
                              <ThreeDots
                                visible={true}
                                height="35"
                                width="35"
                                color="#FFFEFF"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperclassName=""
                              />
                            ) : (
                              "Save changes"
                            )}
                          </button>
                        </>
                      ) : (
                        <button type="button" className="bg-primary-color font-semibold py-2 px-6 rounded-full hover:bg-secondary-dark_hover text-white md:text-white md:hover:text-white mb-5" onClick={handleNext}>Next</button>
                      )}
                    </div>
                  {/* </form>} */}
                </div>
                <div className="md:w-2/5 max-h-[90vh] overflow-y-auto">
                  <div className="border-gray-300 font-viga bg-white">
                    <div className="flex flex-col items-center justify-center p-4 mt-[28px]">
                      <p className="text-[24px] flex items-center gap-3 font-[700] text-left">
                        <MdOutlineAddToPhotos />Your Photos
                      </p>
                      <hr className="border-black border-t-2 mt-[8px] w-full" />
                      <div className="text-black text-opacity-50 font-normal text-sm">
                        Add maximum 6 photos for better reach
                      </div>
                    </div>

                    <div className="bg-white flex flex-col gap-6 items-center justify-center mb-[1.5rem] sm:flex-row">
                      {/* First input field for additional photos */}

                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                        {imageArray[0].length !== 0 ? (
                          <div className="relative">
                            <img
                              src={imageArray[0].name ? URL.createObjectURL(imageArray[0]) : imageArray[0]}
                              alt={`Additional Image 1`}
                              loading="lazy"
                              className="w-40 h-[180px] md:h-[196px] object-cover rounded-[15px] cursor-pointer"

                            />
                            <button
                              type="button"
                              onClick={() => handleClearImage(0)}
                              className="absolute top-1 right-1 bg-red-900 text-white p-1.5 rounded-md opacity-75 group-hover:opacity-100 text-xs"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <>
                            <label htmlFor={`additional-image-1`}>
                              <img
                                src={uploadProfile}
                                alt="uploadProfile"
                                loading="lazy"
                                className="rounded-[15px] cursor-pointer" />

                              <input
                                id={`additional-image-1`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleAdditionalImageChange(e, 0)}
                                className="hidden" />
                            </label>
                          </>
                        )}
                      </div>
                      {/* Second input field for additional photos */}
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                        {imageArray[1].length !== 0 ? (
                          <div className="relative">
                            <img
                              src={imageArray[1].name ? URL.createObjectURL(imageArray[1]) : imageArray[1]}
                              alt={`Additional Image 2`}
                              loading="lazy"
                              className="w-40 h-[180px] md:h-[196px] object-cover rounded-[15px] cursor-pointer"
                            />
                            <button
                              type="button"
                              onClick={() => handleClearImage(1)}
                              className="absolute top-1 right-1 bg-red-900 text-white p-1.5 rounded-md opacity-75 group-hover:opacity-100 text-xs"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <>
                            <label htmlFor={`additional-image-2`}>
                              <img
                                src={uploadProfile}
                                alt="uploadProfile"
                                loading="lazy"
                                className="rounded-[15px] cursor-pointer"
                              />
                              <input
                                id={`additional-image-2`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleAdditionalImageChange(e, 1)}
                                className="hidden"
                              />
                            </label>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-white flex flex-col gap-6 items-center justify-center mb-10 sm:flex-row">
                      {/* Third input field for additional photos */}
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                        {imageArray[2].length !== 0 ? (
                          <div className="relative">
                            <img
                              src={imageArray[2].name ? URL.createObjectURL(imageArray[2]) : imageArray[2]}
                              alt={`Additional Image 3`}
                              loading="lazy"
                              className="w-40 h-[180px] md:h-[196px] object-cover rounded-[15px] cursor-pointer"
                            />
                            <button
                              type="button"
                              onClick={() => handleClearImage(2)}
                              className="absolute top-1 right-1 bg-red-900 text-white p-1.5 rounded-md opacity-75 group-hover:opacity-100 text-xs"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <>
                            <label htmlFor={`additional-image-3`}>
                              <img
                                src={uploadProfile}
                                alt="uploadProfile"
                                loading="lazy"
                                className="rounded-[15px] cursor-pointer"
                              />
                              <input
                                id={`additional-image-3`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleAdditionalImageChange(e, 2)}
                                className="hidden"
                              />
                            </label>
                          </>
                        )}

                      </div>

                      {/* Fourth input field for additional photos */}
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                        {imageArray[3].length !== 0 ? (
                          <div className="relative">
                            <img
                              src={imageArray[3].name ? URL.createObjectURL(imageArray[3]) : imageArray[3]}
                              alt={`Additional Image 4`}
                              loading="lazy"
                              className="w-40 h-[180px] md:h-[196px] object-cover rounded-[15px] cursor-pointer"
                            />
                            <button
                              type="button"
                              onClick={() => handleClearImage(3)}
                              className="absolute top-1 right-1 bg-red-900 text-white p-1.5 rounded-md opacity-75 group-hover:opacity-100 text-xs"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <>
                            <label htmlFor={`additional-image-4`}>
                              <img
                                src={uploadProfile}
                                alt="uploadProfile"
                                loading="lazy"
                                className="rounded-[15px] cursor-pointer"
                              />
                              <input
                                id={`additional-image-4`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleAdditionalImageChange(e, 3)}
                                className="hidden"
                              />
                            </label>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-white flex flex-col gap-6 items-center justify-center mb-10 sm:flex-row">
                      {/* Fifth input field for additional photos */}
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                        {imageArray[4].length !== 0 ? (
                          <div className="relative">
                            <img
                              src={imageArray[4].name ? URL.createObjectURL(imageArray[4]) : imageArray[4]}
                              alt={`Additional Image 5`}
                              loading="lazy"
                              className="w-40 h-[180px] md:h-[196px] object-cover rounded-[15px] cursor-pointer"
                            />
                            <button
                              type="button"
                              onClick={() => handleClearImage(4)}
                              className="absolute top-1 right-1 bg-red-900 text-white p-1.5 rounded-md opacity-75 group-hover:opacity-100 text-xs"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <>
                            <label htmlFor={`additional-image-5`}>
                              <img
                                src={uploadProfile}
                                alt="uploadProfile"
                                loading="lazy"
                                className="rounded-[15px] cursor-pointer"
                              />
                              <input
                                id={`additional-image-5`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleAdditionalImageChange(e, 4)}
                                className="hidden"
                              />
                            </label>
                          </>
                        )}
                      </div>

                      {/* Sixth input field for additional photos */}
                      <div className="w-40 h-[180px] md:w-40 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
                        {imageArray[5].length !== 0 ? (
                          <div className="relative">
                            <img
                              src={imageArray[5].name ? URL.createObjectURL(imageArray[5]) : imageArray[5]}
                              alt={`Additional Image 6`}
                              loading="lazy"
                              className="w-40 h-[180px] md:h-[196px] object-cover rounded-[15px] cursor-pointer"
                            />
                            <button
                              type="button"
                              onClick={() => handleClearImage(5)}
                              className="absolute top-1 right-1 bg-red-900 text-white p-1.5 rounded-md opacity-75 group-hover:opacity-100 text-xs"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <><label htmlFor={`additional-image-6`}>
                            <img
                              src={uploadProfile}
                              alt="uploadProfile"
                              loading="lazy"
                              className="rounded-[15px] cursor-pointer" />
                            <input
                              id={`additional-image-6`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleAdditionalImageChange(e, 5)}
                              className="hidden" />
                          </label>
                          </>
                        )}
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
