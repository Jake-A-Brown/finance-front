import React from 'react';
import Login from '../../comonents/Login/login';

import './home.css';

const Home = () => {
  return (
    <div className='home-container'>
        <h1>Finance App</h1>
        <Login />
    </div>
  )
}

export default Home;