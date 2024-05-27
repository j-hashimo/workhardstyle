// workoutModel.js in /server/models directory

const mongoose = require('mongoose');

const workoutHistorySchema = new mongoose.Schema({
    weight: { type: String, required: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});


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
    muscleGroup: { // Optional muscle group field
        type: String,
        required: false
    },
    history: [workoutHistorySchema],
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
