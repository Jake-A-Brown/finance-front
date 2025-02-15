import React, { useState, useEffect } from "react";
import AddIncome from "./addincome";

import './incometable.css';

const IncomeTable = () => {
    const [income, setIncome] = useState([]);
    const [showAddIncome, setShowAddIncome] = useState(false);
    const [hideAddIncome, setHideAddIncome] = useState(false);
    const [showAddIncomeButton, setShowAddIncomeButton] = useState(true);

    // Fetch income from MongoDB
    useEffect(() => {
        fetchIncome();
    }, []);

    const fetchIncome = async () => {
        try {
            const res = await fetch("https://finance-backend-0z1m.onrender.com/api/income");
            const data = await res.json();
            setIncome(data);
        } catch (err) {
            console.error("Error fetching income:", err);
        }
    };

        // Function to update income list after adding new income
        const handleIncomeAdded = (newIncome) => {
            setIncome((prevIncome) => [...prevIncome, newIncome]);
        };
    

    // Delete income by ID
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://finance-backend-0z1m.onrender.com/api/income/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                // Remove the deleted income from the state
                setIncome(income.filter((inc) => inc._id !== id));
                alert("Income deleted successfully");
            } else {
                const errorData = await res.json();
                console.error("Error deleting income:", errorData.message);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div className="income-table-container">
            <h2>Income Tracker</h2>

            {showAddIncomeButton && 
                <button onClick={() => {
                    setShowAddIncomeButton(false); setHideAddIncome(true); setShowAddIncome(true);}}>
                    Show Add Income
                </button>}
                
            {hideAddIncome && 
                <button onClick={() => {
                    setHideAddIncome(false); setShowAddIncomeButton(true); setShowAddIncome(false);}}>
                    Hide Add Income
                </button>}

            {showAddIncome &&<AddIncome onIncomeAdded={handleIncomeAdded} />}


            {/* Income Table */}
            <table border="1">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Source</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {income.map((inc) => (
                        <tr key={inc._id}>
                            {/* <td>{inc._id}</td> */}
                            <td>{inc.source}</td>
                            <td>${inc.amount}</td>
                            <td>{new Date(inc.date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleDelete(inc._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IncomeTable;
