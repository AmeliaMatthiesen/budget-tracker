const transactions = require("../models/transactionModel");

// CREATE
const createTransaction = (req, res) => {
  const newTransaction = {
    id: Date.now().toString(),
    ...req.body
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
};

// GET ALL
const getTransactions = (req, res) => {
  res.json(transactions);
};

// GET ONE
const getTransactionById = (req, res) => {
  const transaction = transactions.find(
    (transaction) => transaction.id === req.params.id
  );

  if (!transaction) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(transaction);
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById
};