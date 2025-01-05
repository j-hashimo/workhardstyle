const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

// Environment variables
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

// Middleware
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for testing purposes
module.exports = app;
