import { useEffect, useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [error, settError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await fetch("http://localhost:5000/transactions");
    const data = await response.json(); 

    setTransactions(data);
  };

  const handleSubmit = async() => {
    if (!amount || !type) {
      settError("Please fill in all fields")
      return;
    }

    settError("");

    const transaction = {
      amount,
      type,
    }

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
  };

  return (
    <>
      <h1>Budget Tracker</h1>
      {transactions.map((transaction) => (
        <p key={transaction.id}>
          {transaction.type} - {transaction.amount}
        </p>
      ))}
      <h2>Add Transaction</h2>
      {error && <p>{error}</p>}
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
