// index.js in /server directory

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
// const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

// Import middleware
// const errorHandler = require('./utils/errorHandler');

// Environment variables
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Enables CORS
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads

// API Routes
// app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for testing purposes
module.exports = app;
