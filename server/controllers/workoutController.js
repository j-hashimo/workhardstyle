// workoutController.js in /server/controllers directory

const Workout = require('../models/workoutModel');

// Create a new workout
exports.createWorkout = async (req, res, next) => {
    try {
        const { name, weight, sets, reps, machine_settings } = req.body;
        const newWorkout = await Workout.create({ name, weight, sets, reps, machine_settings });
        res.status(201).json(newWorkout);
    } catch (error) {
        next(error);
    }
};

// Get all workouts
exports.getAllWorkouts = async (req, res, next) => {
    try {
        const workouts = await Workout.find({});
        res.status(200).json(workouts);
    } catch (error) {
        next(error);
    }
};

// Get a workout by ID
exports.getWorkoutById = async (req, res, next) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        next(error);
    }
};

// Update a workout by ID
exports.updateWorkoutById = async (req, res, next) => {
    try {
        const { name, weight, sets, reps, machine_settings } = req.body;
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, { name, weight, sets, reps, machine_settings }, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(updatedWorkout);
    } catch (error) {
        next(error);
    }
};

// Delete a workout by ID
exports.deleteWorkoutById = async (req, res, next) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
