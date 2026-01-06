const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("InventoryModel", inventorySchema);
