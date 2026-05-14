const transactions = require("../models/transactionModel");
const pool = require("../db");

// CREATE
const createTransaction = async (req, res) => {
  const { amount, type } = req.body;

  const result = await pool.query(
    "INSERT INTO transactions (amount, type) VALUES ($1, $2) RETURNING *",
    [amount, type]
  );

  res.status(201).json(result.rows[0]);
};

// GET ALL
const getTransactions = async (req, res) => {
  const result = await pool.query("SELECT * FROM transactions");

  res.json(result.rows);
};

// GET ONE
const getTransactionById = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM transactions WHERE id = $1",
    [req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(result.rows[0]);
};

//UPDATE
const putUpdateTransaction = async (req, res) => {
  const { amount, type } = req.body;

  const results = await pool.query(
    "UPDATE transactions SET amount = $1, type = $2 WHERE id = $3 RETURNING *",
    [amount, type, req.params.id]
  );

  if (results.rows.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(results.rows[0]);
};

// DELETE
const deleteTransactionById = async (req, res) => {
  const result = await pool.query(
    "DELETE FROM transactions WHERE id = $1 RETURNING *",
    [req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ message: "Deleted successfully" });
};


module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransactionById,
  putUpdateTransaction
};