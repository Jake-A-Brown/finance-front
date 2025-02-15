import React, { useState, useEffect } from 'react';
import AddExpense from './addexpense';

import './expensetable.css';

const ExpenseTable = () => {
    const [expense, setExpense] = useState([]);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [hideAddExpense, setHideAddExpense] = useState(false);
    const [showAddExpenseButton, setShowAddExpenseButton] = useState(true);

    useEffect(() => {
        fetchExpense();
    }, []);

    const fetchExpense = async () => {
        try {
            const res = await fetch("https://finance-backend-0z1m.onrender.com/api/expense");
            const data = await res.json();
            setExpense(data);
        } catch (err) {
            console.error("Error fetching expense:", err);
        }
    };


    // Function to update expome list after adding new expense
    const handleExpenseAdded = (newExpense) => {
        setExpense((prevExpense) => [...prevExpense, newExpense]);
    };

        // Delete expense by ID
        const handleDelete = async (id) => {
            try {
                const res = await fetch(`https://finance-backend-0z1m.onrender.com/api/expense/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    // Remove the deleted expense from the state
                    setExpense(expense.filter((exp) => exp._id !== id));
                    alert("Expense deleted successfully");
                } else {
                    const errorData = await res.json();
                    console.error("Error deleting expense:", errorData.message);
                }
            } catch (err) {
                console.error("Error:", err);
            }
        };

    return (
        <div className="expense-table-container">
                    <h2>Expense Tracker</h2>
        
                    {showAddExpenseButton && 
                        <button onClick={() => {
                            setShowAddExpenseButton(false); setHideAddExpense(true); setShowAddExpense(true);}}>
                            Show Add Expense
                        </button>}
                        
                    {hideAddExpense && 
                        <button onClick={() => {
                            setHideAddExpense(false); setShowAddExpenseButton(true); setShowAddExpense(false);}}>
                            Hide Add Expense
                        </button>}
        
                    {showAddExpense &&<AddExpense onExpenseAdded={handleExpenseAdded} />}
        
        
                    {/* Expense Table */}
                    <table border="1">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Name of Expense</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Date Entered</th>
                                <th>Date Paid</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expense.map((exp) => (
                                <tr key={exp._id}>
                                    {/* <td>{exp._id}</td> */}
                                    <td>{exp.expensename}</td>
                                    <td>{exp.category}</td>
                                    <td>${exp.amount}</td>
                                    <td>{new Date(exp.duedate).toLocaleDateString()}</td>
                                    <td>{new Date(exp.dateentered).toLocaleDateString()}</td>
                                    <td>{new Date(exp.datepaid).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(exp._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    )
}

export default ExpenseTable;