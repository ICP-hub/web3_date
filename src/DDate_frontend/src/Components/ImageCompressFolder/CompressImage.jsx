import imageCompression from "browser-image-compression";
import Resizer from "react-image-file-resizer";

const compressImage = async (file) => {
  try {
    // Resize the image
    const resizedImage = await new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        "JPEG", // format
        100, // quality
        0, // rotation
        (uri) => {
          resolve(uri);
        },
        "blob" // output type
      );
    });

    // Create a File from the resized image blob
    const resizedFile = new File([resizedImage], file.name, {
      type: "image/jpeg",
    });

    // Compress the resized image
    const options = {
      maxSizeMB: 0.05, // Maximum file size you want after compression
      maxWidthOrHeight: 300, // Maximum size of the width or height of the image
      useWebWorker: true, // Utilize Web Worker for performance improvement
    };
    const compressedBlob = await imageCompression(resizedFile, options);

    // Create a base64 string from the compressed blob
    const base64String = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(compressedBlob);
    });

    return base64String;
  } catch (error) {
    console.error("Error resizing and compressing image:", error);
    throw error;
  }
};

export default compressImage;
