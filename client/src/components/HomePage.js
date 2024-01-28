// HomePage.js in /src/components

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Workout Tracker</h1>
      <div className="space-y-4">
        <button 
          onClick={() => navigate('/login')} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        <button 
          onClick={() => navigate('/signup')} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default HomePage;