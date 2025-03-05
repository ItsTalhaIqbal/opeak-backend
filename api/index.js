import connectDB from "./DB/mongodb.js";
import cors from "cors";
import express from "express";
import productRoute from "./route/Product.js";
import { configDotenv } from "dotenv";
import fs from 'fs';
import uploadRouter from "./route/upload.js";
import categoryRoute from "./route/categorey.js";
import orderRoute from "./route/Order.js";
import messageRoute from "./route/Messages.js";
import featureProduct from "./route/Feature.js";
import Auth from "./route/AuthRoute.js";
import { baseURL } from "./constants/constant.js";

const app = express();


//middlewares
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));


// Create 'uploads' directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Use the upload route
app.use('/api', productRoute);
app.use('/api', categoryRoute);
app.use('/api', orderRoute);
app.use('/api', messageRoute);
app.use('/api',featureProduct)
app.use("/api", Auth);




// Load environment variables
configDotenv();
connectDB()
  .then(() => {
    const port = process.env.PORT ; // Use process.env.PORT if available, otherwise default to 8000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
