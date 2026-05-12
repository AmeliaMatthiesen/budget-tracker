const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const transactionRoutes = require("./routes/transactionRoutes");

app.use("/", transactionRoutes);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected:", res.rows);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});