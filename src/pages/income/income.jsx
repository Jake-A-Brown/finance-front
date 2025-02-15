import React from 'react';
import { useNavigate } from 'react-router-dom';

import './income.css';
import IncomeTable from './incometable';

const Income = () => {
    const navigate = useNavigate();

  return (
    <div>
        <h1>Income</h1>
        <IncomeTable />
        <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
    </div>
  )
}

export default Income;