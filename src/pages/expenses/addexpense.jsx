import React, {useState} from 'react';

const AddExpense = ({onExpenseAdded}) => {
    const [newExpense, setNewExpense] = useState({expensename:"", category:"", amount:"", duedate:"", dateentered:"", datepaid:""});

    const handleChange = (e) => {
        setNewExpense(prevState => ({
            ...prevState,  // ✅ Preserve previous state
            [e.target.name]: e.target.name === "amount" ? Number(e.target.value) : e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newExpense.expensename || !newExpense.category || !newExpense.amount || !newExpense.duedate || !newExpense.dateentered || !newExpense.datepaid) return;

        try{
            const response = await fetch("https://finance-backend-0z1m.onrender.com/api/expense/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExpense),
            });

            const data = await response.json();
            if (response.ok) {
                onExpenseAdded(data.expense); // 👈 Update expense table after adding
                setNewExpense({ expensename:"", category:"", amount:"", duedate:"", dateentered:"", datepaid:"" }); // Reset form
            } else {
                console.error("Error adding expense:", data.message);
            }
        }catch(error){console.error("Error:", error);}

    };
  return (
    <div className="add-income-container" style={{display:'flex', flexDirection:'column'}}>
    <h3>Add Expense</h3>
    <form style={{display:'flex', flexDirection:'column'}} onSubmit={handleSubmit}>
        <input style={{width:'13vw'}} type="text" name="expensename" placeholder="Expense Name" value={newExpense.expensename} onChange={handleChange} />
        <input style={{width:'13vw'}} name="category" placeholder="Category" value={newExpense.category} onChange={handleChange} />
        <input style={{width:'13vw'}} name='amount' placeholder='Amount' value={newExpense.amount} onChange={handleChange}/>
        <input style={{width:'13vw'}} type='date' name='duedate' placeholder='Due Date' value={newExpense.duedate} onChange={handleChange} />
        <input style={{width:'13vw'}} type='date' name='dateentered' placeholder='Date Entered' value={newExpense.dateentered} onChange={handleChange} />
        <input style={{width:'13vw'}} type="date" name="datepaid" value={newExpense.datepaid} onChange={handleChange} />
        <button style={{width:'13vw', alignSelf:'end'}} type="submit">Add Expense</button>
    </form>
</div>  )
}

export default AddExpense;