// routes/userRoutes.js

import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// ─── Register ───────────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, age, gender, password } = req.body;

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ fullName, email, age, gender, password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('❌ Error in registration:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── Login ──────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Set the session userId
    req.session.userId = user._id;

    res.json({ success: true, message: 'Login successful!' });
  } catch (error) {
    console.error('❌ Error in login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── Logout ─────────────────────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('❌ Error destroying session:', err);
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // name of the session cookie
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// ─── Session Check ──────────────────────────────────────────────────────────────
router.get('/session', (req, res) => {
  if (req.session.userId) {
    return res.json({ success: true, userId: req.session.userId });
  }
  res.status(401).json({ success: false, message: 'Not logged in' });
});

export default router;
