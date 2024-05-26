// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoaded: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        authSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload.user;
        },
        authFail: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        }
    }
});

export const { userLoaded, authSuccess, authFail, logout } = authSlice.actions;

export const loadUser = () => async dispatch => {
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(userLoaded(response.data));
        } catch (error) {
            console.error('Error loading user:', error.response?.data.msg || error.message);
            dispatch(authFail());
        }
    } else {
        dispatch(authFail());
    }
};

export default authSlice.reducer;
