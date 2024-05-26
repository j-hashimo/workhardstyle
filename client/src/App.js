// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
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
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/workoutlist" element={!loading && isAuthenticated ? <WorkoutList /> : <Navigate to="/login" />} />
      <Route path="/addworkout" element={!loading && isAuthenticated ? <WorkoutForm /> : <Navigate to="/login" />} />
      <Route path="/grouped-workouts/:muscleGroup" element={!loading && isAuthenticated ? <GroupedWorkoutsPage /> : <Navigate to="/login" />} />
      <Route path="/workout-history/:workoutId" element={!loading && isAuthenticated ? <WorkoutHistory /> : <Navigate to="/login" />} />
      {/* Add other routes here */}
    </Routes>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <AppInitializer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
