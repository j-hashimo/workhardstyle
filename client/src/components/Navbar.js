// Navbar.js

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Retrieve authentication status
    const navigate = useNavigate(); // Hook for navigation
    const handleNavigate = (path) => {
        navigate(path); // Function to navigate to the specified path
    };

    

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-lg font-semibold">
                            <button onClick={() => handleNavigate('/')} className="text-gray-300 hover:text-white px-3">WorkHardStyle</button>
                        </div>
                        <div>
                            {isAuthenticated && (
                                <>
                                    <button onClick={() => handleNavigate('/workoutlist')} className="text-gray-300 hover:text-white px-3">Workouts</button>
                                    <button onClick={() => handleNavigate('/addworkout')} className="text-gray-300 hover:text-white px-3">Add Workout</button>
                                </>
                            )}
                        </div>
                    
                    </div>
                </div>
            </nav>
            <div>
                {currentPage === 'workouts' && <WorkoutList />}
                {currentPage === 'add-workout' && <WorkoutForm />}
            </div>
        </div>
    );
};

export default Navbar;
