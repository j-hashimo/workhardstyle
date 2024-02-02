// Navbar.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Retrieve authentication status
    const navigate = useNavigate(); // Hook for navigation
    const handleNavigate = (path) => {
        navigate(path); // Function to navigate to the specified path
    };

    const userEmail = useSelector((state) => state.auth.user?.email); // Assuming user email is stored in auth state
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
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
                            {isAuthenticated ? (
                                <>
                                    <button onClick={() => handleNavigate('/workoutlist')} className="mx-2 text-white">Workouts</button>
                                    <button onClick={() => handleNavigate('/addworkout')} className="mx-2 text-white">Add Workout</button>
                                    <span className="mx-2 font-semibold">{userEmail}</span>
                                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => navigate('/login')} className="mx-2">Login</button>
                                    <button onClick={() => navigate('/signup')} className="mx-2">Signup</button>
                                </>
                            )}
                        </div>
                    
                    </div>
                </div>
            </nav>
            
        </div>
    );
};

export default Navbar;
