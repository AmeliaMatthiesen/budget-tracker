import { useEffect, useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [error, settError] = useState("");
  const [success, settSuccess] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await fetch("http://localhost:5000/transactions");
    const data = await response.json();

    setTransactions(data);
  };

  const handleSubmit = async () => {
    if (!amount || !type) {
      settError("Please fill in all fields");
      return;
    }

    if (type === "expense" && Number(amount) >  balance) {
      settError("Insufficient funds");
      return;
    }

    settError("");

    const transaction = {
      amount,
      type,
    };

    await fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    await fetchTransactions();
    setAmount("");
    setType("");

    settSuccess("Transaction added successfully");
  };

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income",
  );

  const incomeTotal = incomeTransactions.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0,
  );

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const expenseTotal = expenseTransactions.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0,
  );

  const balance = incomeTotal - expenseTotal;

  return (
    <>
      <h1>Budget Tracker</h1>
      <h2>Current Balance</h2>
      <p>{balance}</p>
      {transactions.map((transaction) => (
        <p
          key={transaction.id}
          style={{
            color: transaction.type === "income" ? "green" : "red",
          }}
        >
          {transaction.type} - {transaction.amount}
        </p>
      ))}
      <h2>Add Transaction</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <input
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <select value={type} onChange={(event) => setType(event.target.value)}>
        <option value="">Choose type</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button onClick={handleSubmit}>Add Transaction</button>
    </>
  );
}

export default App;
