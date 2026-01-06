const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "shipped"],
    default: "pending",
  },
});

module.exports = mongoose.model("orderModel", OrderSchema);
