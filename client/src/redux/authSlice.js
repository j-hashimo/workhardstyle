//This file defines the Redux slice for authentication. It includes the initial state, reducers to handle actions like loading user data, handling authentication success or failure, and logging out. Each reducer updates the state based on the action it receives. The token is stored in localStorage to maintain the session across page reloads. The exported actions are used to interact with this part of the state from the React components.


// Importing the createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state of the auth slice. This will be the starting state when the app loads.
const initialState = {
    // Retrieving any existing token from localStorage to maintain session on page reload.
    token: localStorage.getItem('token'),

    // Represents whether the user is authenticated. Initially set to null (unknown state).
    isAuthenticated: null,

    // Represents whether the authentication state is being loaded. Initially true.
    loading: true,

    // Contains user data; null until a user successfully logs in or registers.
    user: null
};

// Creating the auth slice with a name, initial state, and reducers.
const authSlice = createSlice({
    name: 'auth', // Name of this slice of state.
    initialState, // The initial state for this slice.

    // Reducers are functions that handle actions and update the state accordingly.
    reducers: {
        // Called when user data is loaded to update state.
        userLoaded: (state, action) => {
            state.isAuthenticated = true; // Setting user as authenticated.
            state.loading = false;        // Loading is complete.
            state.user = action.payload;  // Setting user data with payload.
        },
        // Called upon successful authentication (login/register).
        authSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token); // Saving token to localStorage.
            state.token = action.payload.token;                   // Updating token in the state.
            state.isAuthenticated = true;                         // Setting user as authenticated.
            state.loading = false;                                // Loading is complete.
            state.user = action.payload.user;                     // Storing user information in the state.
        },
        
        // Called when authentication fails.
        authFail: state => {
            localStorage.removeItem('token'); // Removing token from localStorage.
            state.token = null;              // Resetting token in state to null.
            state.isAuthenticated = false;   // Setting user as not authenticated.
            state.loading = false;           // Loading is complete.
            state.user = null;               // Resetting user data to null.
        },
        // Called when the user logs out.
        logout: state => {
            localStorage.removeItem('token'); // Removing token from localStorage.
            state.token = null;              // Resetting token in state to null.
            state.isAuthenticated = false;   // Setting user as not authenticated.
            state.loading = false;           // Loading is complete.
            state.user = null;               // Resetting user data to null.
        }
    }
});

// Exporting the action creators for this slice. These can be called from UI components.
export const { userLoaded, authSuccess, authFail, logout } = authSlice.actions;

// Exporting the reducer for this slice. This will be used in the store configuration.
export default authSlice.reducer;