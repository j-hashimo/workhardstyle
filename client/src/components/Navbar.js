// Navbar.js

import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div>
                        <a href="/" className="text-white text-lg font-semibold">Workout Tracker</a>
                    </div>
                    <div>
                        <a href="/workouts" className="text-gray-300 hover:text-white px-3">Workouts</a>
                        <a href="/login" className="text-gray-300 hover:text-white px-3">Login</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
