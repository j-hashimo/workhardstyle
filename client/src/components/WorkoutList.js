// WorkoutList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/workouts');
                setWorkouts(response.data);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Your Workouts</h2>
            <div className="space-y-4">
                {workouts.map(workout => (
                    <div key={workout._id} className="border p-4 rounded">
                        <h3 className="text-lg font-semibold">{workout.name}</h3>
                        <p>Weight: {workout.weight}</p>
                        <p>Sets: {workout.sets}</p>
                        <p>Reps: {workout.reps}</p>
                        {workout.machine_settings && <p>Machine Settings: {workout.machine_settings}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutList;
