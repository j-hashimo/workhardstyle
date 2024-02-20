// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import GroupedWorkoutsPage from './components/GroupedWorkoutsPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/workoutlist" element={<WorkoutList />} />
            <Route path="/addworkout" element={<WorkoutForm />} />
            <Route path="/grouped-workouts/:muscleGroup" element={<GroupedWorkoutsPage />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
