const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path according to your project structure
const router = express.Router();
const { JWT_SECRET } = process.env;

// Route to register (signup) a new user
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password });

        // Hash the password using Argon2
        user.password = await argon2.hash(password);

        await user.save();

        // Create payload for JWT
        const payload = { user: { id: user.id } };

        // Sign the JWT token with the user ID payload
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) throw err;

            // Respond with a success message along with the token
            res.status(201).json({
                msg: 'User registered successfully',
                token,
            });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// Route to login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Verify the password using Argon2
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create payload for JWT
        const payload = { user: { id: user.id } };

        // Sign the JWT token with the user ID payload
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) throw err;
            // Include user information in the response
            res.json({
                token,
                user: {
                    id: user.id, // Include the user ID
                    email: user.email, // Include the user's email
                    // Add any other user details you want to return
                }
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;