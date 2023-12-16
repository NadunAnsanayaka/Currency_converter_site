import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CurrencyConverter() {

  // States init
  const [selectedDate, setSelectedDate] = useState(null);
  const [sourceCurrencyCode, setSourceCurrencyCode] = useState('');
  const [targetCurrencyCode, setTargetCurrencyCode] = useState('');
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);

  // Get currency names from server
  useEffect(() => {
    const fetchCurrencyNames = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getCurrencyNames`);
        setCurrencyNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrencyNames();
  }, []);

  // Handle form submission
  const handleConversionSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get('http://localhost:5000/convertCurrency', {
        params: {
          date: selectedDate,
          sourceCurrency: sourceCurrencyCode,
          targetCurrency: targetCurrencyCode,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="lg:mx-32 text-4xl md:text-5xl font-bold text-blue-600">CurrencyConvert Pro</h1>

      <p className="lg:mx-32 opacity-40 py-6 text-white">
        Explore the world of CurrencyConvert Pro! This tool simplifies currency conversion, utilizing up-to-date exchange rates. Whether you're organizing a journey, handling your financial matters, or just intrigued by the value of your money across various currencies, this resource is designed to assist you effortlessly.
      </p>

      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleConversionSubmit}>
            <div className="mb-4">
              <label htmlFor={selectedDate} className="block mb-2 text-sm font-medium text-white dark:text-white">
                Date
              </label>
              <input
                onChange={(e) => setSelectedDate(e.target.value)}
                type="Date"
                id={selectedDate}
                name={selectedDate}
                className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor={sourceCurrencyCode} className="block mb-2 text-sm font-medium text-white dark:text-white">
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrencyCode(e.target.value)}
                className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={sourceCurrencyCode}
                id={sourceCurrencyCode}
                value={sourceCurrencyCode}
              >
                <option value="">Select source currency</option>
                {Object.keys(currencyNames).map((curr) => (
                  <option className="p-1" key={curr} value={curr}>
                    {currencyNames[curr]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor={targetCurrencyCode} className="block mb-2 text-sm font-medium text-white dark:text-white">
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrencyCode(e.target.value)}
                className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={targetCurrencyCode}
                id={targetCurrencyCode}
                value={targetCurrencyCode}
              >
                <option value="">Select Target currency</option>
                {Object.keys(currencyNames).map((curr) => (
                  <option className="p-1" key={curr} value={curr}>
                    {currencyNames[curr]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-white dark:text-white">
                Amount in source currency
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="number"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount in source currency"
                required
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
              Get the target Currency
            </button>
          </form>
        </section>
      </div>

      <div className="flex justify-center">
        <section className="mt-5 text-white">
          {amountInSourceCurrency} {currencyNames[sourceCurrencyCode]} is equals to{' '}
          <span className="text-blue-500 font-bold">{amountInTargetCurrency}</span> in {currencyNames[targetCurrencyCode]}
        </section>
      </div>
    </div>
  );
}
