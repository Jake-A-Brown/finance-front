import React, { useState } from "react";

const AddIncome = ({ onIncomeAdded }) => {
    const [newIncome, setNewIncome] = useState({ source: "", amount: "", date: "" });

    const handleChange = (e) => {
        setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newIncome.source || !newIncome.amount || !newIncome.date) return;

        try {
            const response = await fetch("https://finance-backend-0z1m.onrender.com/api/income/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIncome),
            });

            const data = await response.json();
            if (response.ok) {
                onIncomeAdded(data.income); // 👈 Update income table after adding
                setNewIncome({ source: "", amount: "", date: "" }); // Reset form
            } else {
                console.error("Error adding income:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="add-income-container" style={{display:'flex', flexDirection:'column'}}>
            <h3>Add Income</h3>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={handleSubmit}>
                <input style={{width:'13vw'}} type="text" name="source" placeholder="Income Source" value={newIncome.source} onChange={handleChange} />
                <input style={{width:'13vw'}} name="amount" placeholder="Amount" value={newIncome.amount} onChange={handleChange} />
                <input style={{width:'13vw'}} type="date" name="date" value={newIncome.date} onChange={handleChange} />
                <button style={{width:'13vw', alignSelf:'end'}} type="submit">Add Income</button>
            </form>
        </div>
    );
};

export default AddIncome;
