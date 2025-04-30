// routes/interviewRoutes.js

import express from 'express';
import multer from 'multer';
import { Video } from '../models/Video.js';
import { User } from '../models/User.js';

const router = express.Router();

// Set up multer storage
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

// Route to handle video upload
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { userId } = req.body;
    const videoBuffer = req.file.buffer;

    // Create a new video document
    const newVideo = new Video({
      userId, // Make sure you have the user ID from the session or frontend
      video: videoBuffer,
    });

    // Save video to the database
    await newVideo.save();

    res.status(201).json({ message: 'Video uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Failed to upload video' });
  }
});

export default router;
