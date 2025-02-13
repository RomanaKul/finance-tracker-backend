const mongoose = require("mongoose");

const IndicatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    importance: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["UAH", "USD", "EUR"],
      required: true,
    },
    enterpriseId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Indicator = mongoose.model("Indicator", IndicatorSchema);
module.exports = Indicator;