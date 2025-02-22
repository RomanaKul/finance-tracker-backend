const express = require("express");
const CurrencyRate = require("../models/currencyRate.model");
const router = express.Router();

const apiURL = "http://api.exchangeratesapi.io/v1";

function params(paramsObj) {
  return new URLSearchParams({
    access_key: process.env.CURRENCY_KEY,
    ...paramsObj,
  });
}

async function getData(date) {
  try {
    const response = await fetch(
      `${apiURL}/${date}?${params({ symbols: "USD, UAH" })}`
    );

    if (!response.ok) {
      throw new Error(
        `No data available for ${date}. Please try a different date. (Status: ${response.status})`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const currencyRate = await CurrencyRate.findOne({ date: date });

    if (currencyRate) {
      res.status(200).json(currencyRate);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    console.error("Error fetching currency rate:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await getData(req.body.date);
    const rate = await CurrencyRate.create({
      date: req.body.date,
      rates: {
        USD: {
          UAH: result.rates.UAH / result.rates.USD,
          EUR: 1 / result.rates.USD,
        },
        UAH: {
          EUR: 1 / result.rates.UAH,
          USD: result.rates.USD / result.rates.UAH,
        },
        EUR: {
          UAH: result.rates.UAH,
          USD: result.rates.USD,
        },
      },
    });
    res.status(200).json(rate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
