const mongoose = require("mongoose");

const EnterpriseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    bankDetails: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

const Enterprise = mongoose.model("Enterprise", EnterpriseSchema);
module.exports = Enterprise;
