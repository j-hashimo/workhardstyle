

// workoutSlice.js in /src/redux

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  workouts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Async thunk to fetch all workouts
export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/workouts`);
  return response.data;
});

// Async thunk to create a new workout
export const createWorkout = createAsyncThunk('workouts/createWorkout', async (workoutData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/workouts`, workoutData);
  return response.data;
});

// Async thunk to update a workout
export const updateWorkout = createAsyncThunk('workouts/updateWorkout', async ({ id, workoutData }) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/workouts/${id}`, workoutData);
  return response.data;
});

// Async thunk to delete a workout
export const deleteWorkout = createAsyncThunk('workouts/deleteWorkout', async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/workouts/${id}`);
  return id;
});

export const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Handle fetchWorkouts
      .addCase(fetchWorkouts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle createWorkout
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
      })
      // Handle updateWorkout
      .addCase(updateWorkout.fulfilled, (state, action) => {
        const index = state.workouts.findIndex(workout => workout._id === action.payload._id);
        state.workouts[index] = action.payload;
      })
      // Handle deleteWorkout
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(workout => workout._id !== action.payload);
      });
  }
});

export default workoutSlice.reducer;
