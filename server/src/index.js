const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middlewares

app.use(express.json());
app.use(cors());

// Get currency names from API

app.get("/getCurrencyNames", async (req, res) => {
    const currencyNamesURL = `https://openexchangerates.org/api/currencies.json?app_id=f4cebdcb1711422ba97435bed5415c52`;

    try {
        const currencyNamesResponse = await axios.get(currencyNamesURL);
        const currencyNamesData = currencyNamesResponse.data;
        return res.json(currencyNamesData);
    } catch (err) {
        console.error(err);
    }
});

// Get the target amount 

app.get("/convertCurrency", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

    try {
        const historicalDataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=f4cebdcb1711422ba97435bed5415c52`;
        const historicalDataResponse = await axios.get(historicalDataURL);
        const rates = historicalDataResponse.data.rates;

        // Rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        // Calculate target value
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

        // Return result 
        return res.json(targetAmount.toFixed(2));
    } catch (error) {
        console.error(error);
    }
});

// Listen to a port

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
