// app.js (or index.js)

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js'; // Import interview routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());  // Enable CORS
app.use(express.json()); // Parse JSON body

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/interview', interviewRoutes); // Interview-related routes for video upload

// Start the server and connect to the database asynchronously
const startServer = async () => {
  try {
    await connectDB(); // Connect to DB
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting the server:', error.message);
  }
};

startServer();
