// Signup.js in /src/components

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authSuccess, authFail } from '../redux/authSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      dispatch(authSuccess(response.data)); // Dispatch authSuccess with the response data
      // Optionally, navigate to login page or dashboard here
    } catch (error) {
      console.error('Signup failed:', error.response.data);
      dispatch(authFail()); // Dispatch authFail on signup failure
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
