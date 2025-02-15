import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseTable from './expensetable';

import './expense.css';


const Expense = () => {
    const navigate = useNavigate();
  return (
    <div>Expense
        <ExpenseTable />
        <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
    </div>
  )
}

export default Expense;