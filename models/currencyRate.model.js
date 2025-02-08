const mongoose = require("mongoose");

const CurrencyRateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    currencyFrom: {
      type: String,
      enum: ["UAH", "USD", "EUR"],
      required: true,
    },
    currencyTo: {
      type: String,
      enum: ["UAH", "USD", "EUR"],
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CurrencyRate = mongoose.model("CurrencyRate", CurrencyRateSchema);
module.exports = CurrencyRate;
