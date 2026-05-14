const express = require("express");
const router = express.Router();

const { 
  createTransaction, 
  getTransactions, 
  getTransactionById,
  putUpdateTransaction,
  deleteTransactionById
} = require("../controllers/transactionController");

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransactionById);
router.put("/transactions/:id", putUpdateTransaction);
router.delete("/transactions/:id", deleteTransactionById);

module.exports = router;