const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 250,
      trim: true,
    },
    item_price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    income: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    expenses: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    recommendation: {
      type: String,
      requried:false,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now().toString(),
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goals", GoalSchema);
