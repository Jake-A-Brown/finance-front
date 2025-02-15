import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IncomeTable from '../income/incometable';
import ExpenseTable from '../expenses/expensetable';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [showIncome, setShowIncome] = useState(false);
    const [showExpense, setShowExpense] = useState(false);
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const username = localStorage.getItem('username') || '';

    useEffect(() => {
        if (!username) navigate('/');
    }, [navigate, username]);

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div className='dashboard-container'>
            <h2>Welcome, {username}! 👋</h2>

            <div className='dashboard-buttons-row'>
                {/* Left Column - Buttons */}
                <div className='dashboard-buttons-column'>
                    <button onClick={() => setShowIncome((prev) => !prev)}>
                        {showIncome ? "Hide Income" : "Show Income"}
                    </button>
                    <button onClick={() => setShowExpense((prev) => !prev)}>
                        {showExpense ? "Hide Expenses" : "Show Expenses"}
                    </button>
                </div>

                {/* Right Column - Display */}
                <div className='dashboard-display'>
                    <div><strong>Balance:</strong> $XXX.XX</div>
                    <div><strong>Cash-flow:</strong> $XXX.XX</div>
                    {showIncome && <IncomeTable />}
                    {showExpense && <ExpenseTable />}
                </div>
            </div>

            {/* Logout Section */}
            <div className='dashboard-logout-buttons'>
                {logoutConfirm ? (
                    <>
                        <button onClick={() => setLogoutConfirm(false)}>Cancel</button>
                        <button onClick={handleLogout}>Confirm Logout</button>
                    </>
                ) : (
                    <button onClick={() => setLogoutConfirm(true)}>Logout</button>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
