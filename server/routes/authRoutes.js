// authRoutes.js in /server/routes

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.isCorrectPassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;
