import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://finance-backend-0z1m.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('username', username);
        setMessage('Login successful!');
        // Redirect or store user data if needed
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className='login-container'>
      <h3>Login Screen</h3>
      <form className='login-creds' onSubmit={handleLogin}>
        <label>Username: </label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />

        <label>Password: </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button className='login-button' type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}

      <p>Create new Account <a href='/createaccount'>click here</a></p>
    </div>
  );
};

export default Login;
