import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [inputCurrency, setInputCurrency] = useState("USD");
  const [outputCurrency, setOutputCurrency] = useState("USD");

  console.log("inputCurrency", inputCurrency);

  useEffect(
    function () {
      if (!query) return;

      async function fetchRate() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${query}&from=EUR&to=USD`
          );

          if (!res.ok)
            throw new Error("There was an error while fetching rates!");

          const data = await res.json();

          console.log("data", data);
        } catch (err) {
          console.error(err.message);
        }
      }

      fetchRate();
    },
    [query]
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select>
        <option value="USD" onChange={(e) => setInputCurrency(e.target.value)}>
          USD
        </option>
        <option value="EUR" onChange={(e) => setInputCurrency(e.target.value)}>
          EUR
        </option>
        <option value="CAD" onChange={(e) => setInputCurrency(e.target.value)}>
          CAD
        </option>
        <option value="INR" onChange={(e) => setInputCurrency(e.target.value)}>
          INR
        </option>
      </select>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
