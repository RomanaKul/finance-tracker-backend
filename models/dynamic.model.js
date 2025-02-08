const mongoose = require("mongoose");

const DynamicSchema = new mongoose.Schema(
  {
    indicator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Indicator",
      required: true,
    },
    enterprise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enterprise",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Dynamic = mongoose.model("Dynamics", DynamicSchema);
module.exports = Dynamic;