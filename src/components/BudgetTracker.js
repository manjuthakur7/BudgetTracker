import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
// Define inline styles
const headerStyle = {
    fontSize: '1.5rem',
    color: '#333',
  };
  
  const textStyle = {
    fontSize: '1rem',
    color: '#555',
  };
  

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BudgetTracker = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [expense, setExpense] = useState({ name: "", amount: "" });
  const [expenses, setExpenses] = useState([]);

  const handleBudgetChange = (e) => {
    const budget = parseFloat(e.target.value) || 0;
    setTotalBudget(budget);
    setRemainingBudget(budget - expenses.reduce((acc, item) => acc + item.amount, 0));
  };

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const addExpense = () => {
    const amount = parseFloat(expense.amount) || 0;
    if (!expense.name || amount <= 0) return alert("Please enter valid expense details.");

    const newExpenses = [...expenses, { name: expense.name, amount }];
    setExpenses(newExpenses);
    setRemainingBudget(totalBudget - newExpenses.reduce((acc, item) => acc + item.amount, 0));
    setExpense({ name: "", amount: "" });
  };

  const data = {
    labels: expenses.map((item) => item.name),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((item) => item.amount),
        backgroundColor: expenses.map(
          (_, index) => `hsl(${(index * 45) % 360}, 70%, 50%)`
        ),
      },
    ],
  };

  return (
   
        <div className="budget-tracker">
      <h1 style={headerStyle}>Budget Tracker</h1>
      <p style={textStyle}>Manage your expenses effectively!</p>
      
    
      <div className="input-section">
        <label>
          Total Budget:
          <input
            type="number"
            value={totalBudget}
            onChange={handleBudgetChange}
            placeholder="Enter your total budget"
          />
        </label>
        <label>
          Expense Name:
          <input
            type="text"
            name="name"
            value={expense.name}
            onChange={handleExpenseChange}
            placeholder="Enter expense name"
          />
        </label>
        <label>
          Expense Amount:
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleExpenseChange}
            placeholder="Enter expense amount"
          />
        </label>
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="budget-summary">
        <p><strong>Total Budget:</strong> ${totalBudget.toFixed(2)}</p>
        <p><strong>Remaining Budget:</strong> ${remainingBudget.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ${expenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}</p>
      </div>

      <div className="chart-section">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default BudgetTracker;
