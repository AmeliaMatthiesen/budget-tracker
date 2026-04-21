const transactions = require("../models/transactionModel");

const createTransaction = (req, res) => {
  const newTransaction = req.body;
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
};

module.exports = { createTransaction };