import React, { useState } from "react";
import "./App.css";

function App() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseYear, setPurchaseYear] = useState("");
  const [millsTax, setMillsTax] = useState("");
  const [savings, setSavings] = useState(null);
  const [totalSavings, setTotalSavings] = useState(null);

  const formatNumber = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateSavings = () => {
    const currentYear = 2024;
    const price = parseFloat(purchasePrice);
    const year = parseInt(purchaseYear);
    const tax = parseFloat(millsTax);

    if (isNaN(price) || isNaN(year) || isNaN(tax)) {
      setSavings(null);
      setTotalSavings(null);
      return;
    }

    const yearsSincePurchase = currentYear - year;
    const adjustedValue = price * Math.pow(1.02, yearsSincePurchase);
    const expectedTax = adjustedValue * 0.0125;
    const estimatedSavings = expectedTax - tax;
    const cumulativeSavings = estimatedSavings * yearsSincePurchase;

    setSavings(formatNumber(estimatedSavings));
    setTotalSavings(formatNumber(cumulativeSavings));
  };

  return (
    <div className="App" style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
      <h2>Mills Act Savings Calculator</h2>

      <label>Purchase Price ($)</label>
      <input
        type="number"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
      />

      <label>Purchase Year</label>
      <input
        type="number"
        value={purchaseYear}
        onChange={(e) => setPurchaseYear(e.target.value)}
      />

      <label>Current Mills Act Property Tax ($)</label>
      <input
        type="number"
        value={millsTax}
        onChange={(e) => setMillsTax(e.target.value)}
      />

      <button onClick={calculateSavings} style={{ marginTop: "1rem" }}>
        Calculate
      </button>

      {savings && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Estimated Annual Tax Savings:</strong> ${savings}
          </p>
          <p>
            <strong>Total Estimated Savings Since Purchase:</strong> ${totalSavings}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
