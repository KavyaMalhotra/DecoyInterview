import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  age: Number,
  gender: String,
  password: String,
});

export const User = mongoose.model('User', userSchema);
