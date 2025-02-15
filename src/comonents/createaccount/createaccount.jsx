import React, { useState } from 'react';

import './createaccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://finance-backend-0z1m.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Account created successfully!');
        setFormData({ fname: '', lname: '', email: '', username: '', password: '' });
      } else {
        setMessage(data.message || 'Account creation failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className='create-account-container'>
      <h3>Create New Account</h3>
      <form className='create-account-form' onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button className='create-account-button' type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}

      <p>Already have an account? <a href='/'>Login here</a></p>
    </div>
  );
};

export default CreateAccount;
