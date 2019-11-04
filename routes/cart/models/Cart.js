const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  totalItems: Number,
  totalPrice: Number,
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      },
      qty: { type: Number, default: 0 },
      unitPrice: { type: Number, default: 0 }
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);
// owner ref to user
// total Number
// items
