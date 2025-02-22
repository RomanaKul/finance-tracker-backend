const mongoose = require("mongoose");

const CurrencyRateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    rates: {
      USD: {
        UAH: {
          type: Number,
        },
        EUR: {
          type: Number,
        },
      },
      UAH: {
        EUR: {
          type: Number,
        },
        USD: {
          type: Number,
        },
      },
      EUR: {
        UAH: {
          type: Number,
        },
        USD: {
          type: Number,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const CurrencyRate = mongoose.model("CurrencyRate", CurrencyRateSchema);
module.exports = CurrencyRate;
