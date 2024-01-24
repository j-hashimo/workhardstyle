// WorkoutForm.js

import React, { useState } from 'react';
import axios from 'axios';



const WorkoutForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState(0);
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [machineSettings, setMachineSettings] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const workout = { name, weight, sets, reps, machine_settings: machineSettings };
            const response = await axios.post('http://localhost:5000/api/workouts', workout);
            onAdd(response.data);
        } catch (error) {
            console.error('Error adding workout:', error);
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border border-gray-300 rounded" placeholder="Workout Name" />
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-2 border border-gray-300 rounded" placeholder="Weight" />
                <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} className="p-2 border border-gray-300 rounded" placeholder="Sets" />
                <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="p-2 border border-gray-300 rounded" placeholder="Reps" />
                <input type="text" value={machineSettings} onChange={(e) => setMachineSettings(e.target.value)} className="p-2 border border-gray-300 rounded" placeholder="Machine Settings (Optional)" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default WorkoutForm;
