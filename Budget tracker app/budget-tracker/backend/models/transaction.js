const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/budget-tracker', { useNewUrlParser: true, useUnifiedTopology: true });

const transactionSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  category: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.post('/api/transactions', async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.send(transaction);
});

app.get('/api/transactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.send(transactions);
});

app.listen(5000, () => console.log('Server started on port 5000'));
