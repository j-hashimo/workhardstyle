// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/authSlice';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import GroupedWorkoutsPage from './components/GroupedWorkoutsPage';
import WorkoutHistory from './components/WorkoutHistory';

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return null;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppInitializer />
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/workoutlist" element={<WorkoutList />} />
            <Route path="/addworkout" element={<WorkoutForm />} />
            <Route path="/grouped-workouts/:muscleGroup" element={<GroupedWorkoutsPage />} />
            <Route path="/workout-history/:workoutId" element={<WorkoutHistory />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
