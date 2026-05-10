const express = require("express");
const router = express.Router();

const { 
  createTransaction, 
  getTransactions, 
  getTransactionById,
  deleteTransactionById,
  putUpdateTransaction
} = require("../controllers/transactionController");

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransactionById);
router.delete("/transactions/:id", deleteTransactionById);
router.put("/transactions/:id", putUpdateTransaction);

module.exports = router;