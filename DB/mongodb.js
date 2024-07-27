import mongoose from "mongoose";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the provided URI from the environment variables
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        // If connection fails, log the error
        console.log("MongoDB connection error:", error);
    }
};

// Export the connectDB function
export default connectDB;
