// workoutRoutes.js in /server/routes directory

const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workoutController');
const auth = require('../middleware/auth'); // Import the auth middleware

// Route to create a new workout
router.post('/', auth, workoutController.createWorkout);

// Route to get all workouts
router.get('/', auth, workoutController.getAllWorkouts);

// Route to get a specific workout by ID
router.get('/:id', auth, workoutController.getWorkoutById);

// Route to update a specific workout by ID
router.put('/:id', auth, workoutController.updateWorkoutById);

// Route to delete a specific workout by ID
router.delete('/:id', auth, workoutController.deleteWorkoutById);

module.exports = router;
