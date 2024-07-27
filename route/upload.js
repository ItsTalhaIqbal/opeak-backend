import express from 'express';
import fs from 'fs';
import upload from '../middleware/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();
const uploadRouter = router;

// Define a route to handle file uploads
uploadRouter.post('/upload', upload.array('file', 6), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded');
    }

    const uploadResults = [];

    for (const file of req.files) {

      // Read the file from local storage using the file path
      const fileData = fs.readFileSync(file.path);

      // Upload the file to Cloudinary
      const result = await uploadToCloudinary(file.path);

      // Delete the file from local storage after uploading to Cloudinary
      fs.unlinkSync(file.path);

      uploadResults.push(result.secure_url);
    }

    // Send the Cloudinary URLs of the uploaded files back to the frontend
    res.json({ fileUrls: uploadResults });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Error uploading files');
  }
});

export default uploadRouter;
