// Navbar.js

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Retrieve authentication status

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <div className="text-white text-lg font-semibold">Workout Tracker</div>
                        <div>
                            {isAuthenticated && (
                                <>
                                    <button onClick={() => setCurrentPage('workouts')} className="text-gray-300 hover:text-white px-3">Workouts</button>
                                    <button onClick={() => setCurrentPage('add-workout')} className="text-gray-300 hover:text-white px-3">Add Workout</button>
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
