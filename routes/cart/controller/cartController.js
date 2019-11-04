const Cart = require("../models/Cart");
module.exports = {
  createUserCart: async userId => {
    try {
      const cart = new Cart({
        owner: userId,
        totalItems: 0,
        totalPrice: 0,
        items: []
      });
      await cart.save();
    } catch (error) {
      console.log("there was an error in creating cart olgy: ", error);
    }
  },
  addItemsInCart: async (userId, product) => {
    try {
      let cart = await Cart.findOne({ owner: userId });
      product = {
        item: product.productID,
        qty: Number(product.quantity),
        unitPrice: Number(product.priceHidden)
      };
      cart.items.push(product);
      if (product.qty === 1) {
        cart.totalItems++;
        cart.totalPrice += product.unitPrice;
      } else {
        cart.totalItems += product.qty;
        cart.totalPrice += product.unitPrice * product.qty;
      }
      await cart.save();
      return { totalPrice: cart.totalPrice, totalItems: cart.totalItems };
    } catch (error) {
      console.log(
        "there was an error in adding item in the cart olgy: ",
        error
      );
    }
  },
  getUserShoppingCart: async userId => {
    try {
      let cart = await Cart.findOne({ owner: userId }).populate("items.item");
      //console.log(cart.items);
      return cart;
    } catch (error) {
      console.log("there was an error getting the user's cart olgy: ", error);
    }
  },
  removeProduct: async (userId, product) => {
    try {
      let cart = await Cart.findOne({ owner: userId });
      cart.items.pull(product.item); // remove objects from mongoose array using it's id
      if (Number(product.qty) === 1) {
        cart.totalItems--;
      } else {
        cart.totalItems = cart.totalItems - Number(product.qty);
      }

      cart.totalPrice =
        cart.totalPrice - Number(product.price) * Number(product.qty);
      await cart.save();
    } catch (error) {
      console.log("There was an error in pulling Olgy: ", error);
      let errors = {};
      errors.status = 500;
      errors.message = error;
    }
  }
};
