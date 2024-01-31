// workoutModel.js in /server/models directory

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    },
    name: {
        type: String,
        required: true
    },
    weight: {
      type: String,
      required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    machine_settings: {
        type: String,
        required: false
    },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
