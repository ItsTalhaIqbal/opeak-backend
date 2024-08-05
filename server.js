import express from 'express';
import connectDB from './DB/mongodb.js';
import cors from 'cors';
import productRoute from './route/Product.js';
import uploadRouter from './route/upload.js';
import categoryRoute from './route/categorey.js';
import orderRoute from './route/Order.js';
import messageRoute from './route/Messages.js';
import featureProduct from './route/Feature.js';
import Auth from './route/AuthRoute.js';
import { config } from 'dotenv';
import fs from 'fs';

// Initialize environment variables
config();

// Create an instance of Express
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Create 'uploads' directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Use the routes
app.use('/api', uploadRouter);
app.use('/api', productRoute);
app.use('/api', categoryRoute);
app.use('/api', orderRoute);
app.use('/api', messageRoute);
app.use('/api', featureProduct);
app.use('/api', Auth);

// Connect to the database and handle errors
connectDB()
  .then(() => {
    // Start the server after the database connection is successful
    const port = process.env.PORT || 8000; // Default to port 8000 if PORT is not set
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Export the Express app
export default app;
