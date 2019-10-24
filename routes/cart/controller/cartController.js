const Cart = require("../models/Cart");
module.exports = {
  createUserCart: async userId => {
    try {
      const cart = new Cart({
        owner: userId,
        total: 0,
        items: []
      });
      await cart.save();
    } catch (error) {
      console.log("there was an error in creating cart olgy: ", error);
    }
  },
  addItemsInCart: async (userId, product) => {
    try {
      let cart = await Cart.findOne({ owner: userId }).populate("items");
      cart.items.push(product.productID);
      cart.total += Number(product.priceValue);
      await cart.save();
      return cart.total;
    } catch (error) {
      console.log("there was an error in adding item to cart olgy: ", error);
    }
  }
};
