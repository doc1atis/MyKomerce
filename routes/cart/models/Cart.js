const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  total: Number,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);
// owner ref to user
// total Number
// items
