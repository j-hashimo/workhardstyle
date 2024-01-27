// store.js in /src/redux

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import workoutReducer from './workoutSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
    // Add other reducers here
  },
});

export default store;
