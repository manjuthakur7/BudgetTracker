import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <ul>
      {transactions.map(transaction => (
        <li key={transaction._id}>{transaction.description}: ${transaction.amount}</li>
      ))}
    </ul>
  );
};

export default TransactionList;
