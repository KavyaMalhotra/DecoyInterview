import express from 'express';
import { User } from '../models/User.js'; // Assuming you have User model imported

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, age, gender, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      fullName,
      email,
      age,
      gender,
      password, // You may want to hash this in the future
    });

    // Save user to the database
    await newUser.save();

    // Send a response confirming registration
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('❌ Error in registration:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' }); // If email doesn't exist
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ message: 'Wrong password' }); // Wrong password
    }

    // If email and password match, create a session
    req.session.userId = user._id; // Store user ID in the session
    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error('❌ Error in login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// This route can be used to fetch session data
router.get('/session', (req, res) => {
  if (req.session.userId) {
    res.json({ userId: req.session.userId });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

export default router;