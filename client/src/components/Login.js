// Login.js in /src/components

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authSuccess, authFail } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', 
      { 
        email: loginEmail,
        password: loginPassword
      });
      dispatch(authSuccess(response.data)); // Dispatch authSuccess with the response data
      navigate('/'); // Redirect to the homepage or dashboard on successful login
    } catch (error) {
      console.error('Error logging in:', error.response?.data.msg || error.message);
      setErrorMessage(error.response?.data.msg || "An error occurred while logging in.");
      dispatch(authFail()); // Dispatch authFail on login failure
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
