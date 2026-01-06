import { useState } from "react";
import Headers from "./components/Headers";
import Balance from "./components/Balance";
import "./App.css";
import Income_Expense from "./components/Income_Expense";
import TransactionList from "./components/TransactionList";
import AddTransactions from "./components/AddTransactions";

function App() {
  return (
    <>
      <div className="container">
        <Headers />
        <div className="container">
          <Balance />
          <Income_Expense />
          <TransactionList />
          <AddTransactions />
        </div>
      </div>
    </>
  );
}

export default App;
