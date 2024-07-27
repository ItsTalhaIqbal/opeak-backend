import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a file to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });

    // File has been uploaded successfully
    console.log('File is uploaded on Cloudinary', response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log('Cloudinary upload error', error);
    throw error;
  }
};

export { uploadToCloudinary };
