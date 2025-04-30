// models/Video.js

import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  video: { type: Buffer, required: true }, // Storing video as a buffer
  score: { type: Number, default: null }, // Score will be set after processing
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

export { Video };
