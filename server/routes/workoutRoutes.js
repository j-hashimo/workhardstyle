// workoutRoutes.js in /server/routes directory

const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workoutController');

// Route to create a new workout
router.post('/', workoutController.createWorkout);

// Route to get all workouts
router.get('/', workoutController.getAllWorkouts);

// Route to get a specific workout by ID
router.get('/:id', workoutController.getWorkoutById);

// Route to update a specific workout by ID
router.put('/:id', workoutController.updateWorkoutById);

// Route to delete a specific workout by ID
router.delete('/:id', workoutController.deleteWorkoutById);

module.exports = router;
