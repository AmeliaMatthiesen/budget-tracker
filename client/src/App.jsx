import { useEffect, useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  const handleSubmit = () => {
    console.log(amount);
    console.log(type);
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
