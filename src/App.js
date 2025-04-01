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
    <div style={{ fontFamily: "sans-serif", background: "#f9fafb", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>🏛️ Mills Act Savings Calculator</h1>

        <label style={{ display: "block", marginTop: "1rem" }}>Purchase Price ($)</label>
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          placeholder="e.g. 750000"
          style={inputStyle}
        />

        <label style={{ display: "block", marginTop: "1rem" }}>Purchase Year</label>
        <input
          type="number"
          value={purchaseYear}
          onChange={(e) => setPurchaseYear(e.target.value)}
          placeholder="e.g. 2015"
          style={inputStyle}
        />

        <label style={{ display: "block", marginTop: "1rem" }}>Current Mills Act Property Tax ($)</label>
        <input
          type="number"
          value={millsTax}
          onChange={(e) => setMillsTax(e.target.value)}
          placeholder="e.g. 3500"
          style={inputStyle}
        />

        <button
          onClick={calculateSavings}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            width: "100%",
            fontSize: "1rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Calculate Savings
        </button>

        {savings && (
          <div style={{ marginTop: "2rem", fontSize: "1.2rem", lineHeight: "1.6" }}>
            <p><strong>📉 Estimated Annual Tax Savings:</strong><br />${savings}</p>
            <p><strong>💰 Total Estimated Savings Since Purchase:</strong><br />${totalSavings}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  marginTop: "0.25rem",
};

export default App;
