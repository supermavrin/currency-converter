import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [inputCurrency, setInputCurrency] = useState("EUR");
  const [outputCurrency, setOutputCurrency] = useState("USD");
  const [error, setError] = useState("");
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      if (!query) return;

      const controller = new AbortController();

      setIsLoading(true);
      async function fetchRate() {
        setError("");
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${query}&from=${inputCurrency}&to=${outputCurrency}`,
            { signal: controller.signal }
          );

          if (inputCurrency === outputCurrency) {
            throw new Error(
              "The input currency and the output currency cannot be the same!"
            );
          }

          if (!res.ok)
            throw new Error("There was an error while fetching rates!");

          const data = await res.json();

          setRates(data);
        } catch (err) {
          if (err !== "AbortError") setError(err.message);
        }
      }

      fetchRate();
      setIsLoading(false);
      setError("");

      return function () {
        controller.abort();
      };
    },
    [query, inputCurrency, outputCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={inputCurrency}
        disabled={isLoading}
        onChange={(e) => {
          setInputCurrency(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={outputCurrency}
        disabled={isLoading}
        onChange={(e) => setOutputCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{error ? error : ""}</p>
      <p>{!error && rates.rates ? rates.rates[outputCurrency] : ""}</p>
    </div>
  );
}
