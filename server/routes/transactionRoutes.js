const express = require("express");
const router = express.Router();

const { 
  createTransaction, 
  getTransactions,
  getTransactionById
} = require("../controllers/transactionController");

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransactionById);

module.exports = router;