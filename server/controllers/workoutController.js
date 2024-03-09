// workoutController.js in /server/controllers directory

const Workout = require('../models/workoutModel');

// all controller functions use a try catch block. the try block does the intended action for that function, while the error block is what shows if try block fails (i.e. if there is an error). these controller functions are asynchronous, allowing Node.js to continue executing other code while waiting for the database operation to complete - it is more convenient and flexible


// Create a new workout
// this function does 3 things: 1) extracts the parameters of the model from the request, 2) stores said parameters into the variable newWorkout, created from the schema of the workout model (the create a method is from mongoose), and 3) sends said variable into the response.
// if it doesn't work it returns an error



exports.createWorkout = async (req, res, next) => {
    try {
        const { name, weight, sets, reps, machine_settings, muscleGroup } = req.body;
        // Add the user ID from the verified token to the workout
        const userId = req.user.id; // Assuming the user ID is stored in req.user by your auth middleware

        const newWorkout = await Workout.create({
            user: userId,
            name,
            weight,
            sets,
            reps,
            machine_settings,
            muscleGroup
        });
        res.status(201).json(newWorkout);
    } catch (error) {
        next(error);
    }
};


// Get all workouts
exports.getAllWorkouts = async (req, res, next) => {
    try {
        const workouts = await Workout.find({user: req.user.id});
        res.status(200).json(workouts);
    } catch (error) {
        next(error);
    }
};

// old getAllWorkouts:
//finds workout object (each object has an id)
// exports.getWorkoutById = async (req, res, next) => {
//     try {
//         const workout = await Workout.findById(req.params.id);
//         if (!workout) {
//             return res.status(404).json({ message: 'Workout not found' });
//         }
//         res.status(200).json(workout);
//     } catch (error) {
//         next(error);
//     }
// };

// Get a workout by ID
exports.getWorkoutById = async (req, res, next) => {
    try {
        const workout = await Workout.findOne({ _id: req.params.id, user: req.user.id });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        next(error);
    }
};

// Update a workout by ID
// stores workout schema, then uses findOneAndUpdate method to rewrite workout schema in order to update
// The findByIdAndUpdate method is a Mongoose method that is used to find a document by its ID and update it in a single operation. It belongs to the Mongoose model, which in this case is Workout. This method takes several parameters:

// The first parameter is the ID of the document to update, which is obtained from req.params.id where req.params contains route parameters (in this case, the workout's ID).
// The second parameter is an object containing the updates to apply to the document. This object is { name, weight, sets, reps, machine_settings } in your function.
// The third parameter is an options object. Setting { new: true } as an option tells Mongoose to return the modified document rather than the original. If { new: true } is not set, Mongoose will return the document as it was before the update was applied.

exports.updateWorkoutById = async (req, res, next) => {
    try {
        const { name, weight, sets, reps, machine_settings, muscleGroup } = req.body;
        // Find the workout and update it only if the user owns the workout
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, 
            { name, weight, sets, reps, machine_settings, muscleGroup }, 
            { new: true }
        );
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found or not authorized' });
        }
        res.status(200).json(updatedWorkout);
    } catch (error) {
        next(error);
    }
};

// Delete a workout by ID
//findOneAndDelete method from mongoose is passed to delete the selected workout, which is id'd by req.params.id, i.e. from the request. 
// if the workout is not found or if the user doesn't own the workout, it returns an error


exports.deleteWorkoutById = async (req, res, next) => {
    try {
        // Find the workout and delete it only if the user owns the workout
        const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found or not authorized' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};


// New function to get workouts by muscle group
exports.getWorkoutsByMuscleGroup = async (req, res, next) => {
    try {
        const muscleGroup = req.params.muscleGroup;
        const workouts = await Workout.find({ 
            muscleGroup: muscleGroup,
            user: req.user.id // Ensure workouts are fetched for the logged-in user
        });
        res.status(200).json(workouts);
    } catch (error) {
        next(error);
    }
};