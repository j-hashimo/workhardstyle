// WorkoutList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkout, setEditingWorkout] = useState(null);

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/workouts');
            setWorkouts(response.data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/workouts/${id}`);
            fetchWorkouts();
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    const handleEdit = (workout) => {
        setEditingWorkout({ ...workout });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/workouts/${editingWorkout._id}`, editingWorkout);
            setEditingWorkout(null);
            fetchWorkouts();
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };

    const handleChange = (e, field) => {
        setEditingWorkout({ ...editingWorkout, [field]: e.target.value });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Your Workouts</h2>
            <div className="space-y-4">
                {workouts.map(workout => (
                    <div key={workout._id} className="border p-4 rounded">
                        {editingWorkout && editingWorkout._id === workout._id ? (
                            <div>
                                <input type="text" value={editingWorkout.name} onChange={(e) => handleChange(e, 'name')} className="p-2 border border-gray-300 rounded" />
                                <input type="number" value={editingWorkout.weight} onChange={(e) => handleChange(e, 'weight')} className="p-2 border border-gray-300 rounded" />
                                <input type="number" value={editingWorkout.sets} onChange={(e) => handleChange(e, 'sets')} className="p-2 border border-gray-300 rounded" />
                                <input type="number" value={editingWorkout.reps} onChange={(e) => handleChange(e, 'reps')} className="p-2 border border-gray-300 rounded" />
                                <input type="text" value={editingWorkout.machine_settings} onChange={(e) => handleChange(e, 'machine_settings')} className="p-2 border border-gray-300 rounded" />
                                <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-semibold">{workout.name}</h3>
                                <p>Weight: {workout.weight}</p>
                                <p>Sets: {workout.sets}</p>
                                <p>Reps: {workout.reps}</p>
                                {workout.machine_settings && <p>Machine Settings: {workout.machine_settings}</p>}
                                <button onClick={() => handleEdit(workout)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
                                <button onClick={() => handleDelete(workout._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutList;