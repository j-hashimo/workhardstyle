// Navbar.js

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Retrieve authentication status
    const user = useSelector(state => state.auth.user); // Retrieve user data

    // Debugging logs
    console.log('Authenticated:', isAuthenticated);
    console.log('User:', user);

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-lg font-semibold">Workout Tracker</div>
                        <div>
                            {isAuthenticated && (
                                <>
                                    <button onClick={() => setCurrentPage('workouts')} className="text-gray-300 hover:text-white px-3">Workouts</button>
                                    <button onClick={() => setCurrentPage('add-workout')} className="text-gray-300 hover:text-white px-3">Add Workout</button>
                                </>
                            )}
                        </div>
                        {isAuthenticated && user && (
                            <div className="text-yellow-500 text-lg font-bold">{user.email}</div> // Displaying user's email or username
                        )}
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
