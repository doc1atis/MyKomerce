require("dotenv").config();
const express = require("express");
const User = require("../users/models/User");
const async = require("async");
const Cart = require("./models/Cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //secretkey
const cartController = require("./controller/cartController");
const router = express.Router();
router.get("/", async (req, res) => {
  const cart = await cartController.getUserShoppingCart(req.user._id);
  res.render("cart/cart", { toprice: cart.totalPrice, cartItems: cart.items });
});
router.post("/product", async (req, res) => {
  try {
    await cartController.addItemsInCart(req.user._id, req.body);
    res.redirect("/api/cart");
  } catch (error) {
    console.log("there was an error in post product: ", error);
    res.send("ERROR");
  }
});
router.post("/payment", async (req, res, next) => {
  try {
    const stripeToken = req.body.stripeToken;
    const currentCharges = req.body.stripeMoney;
    // create the customer object
    const customer = await stripe.customers.create({
      source: stripeToken,
      email: "jeangillesolgy@rocketmail.com",
      name: "Olgy boki"
    });
    // charge the customer
    const result = await stripe.charges.create({
      amount: currentCharges,
      currency: "usd",
      customer: customer.id,
      receipt_email: "jeangillesolgy@rocketmail.com"
    });
    console.log(result);
    // find the customer's cart in db
    let cart = await Cart.findOne({ owner: req.user._id });
    // find customer in db
    //let user = await User.findById(req.user._id);
    cart.items.forEach(item => {
      // user.history.push({ paid: item.unitPrice, item: item.item });
      req.user.history.push({ paid: item.unitPrice, item: item.item });
    });
    //await user.save();
    cart.items = [];
    cart.totalPrice = 0;
    cart.totalItems = 0;
    await cart.save();
    res.send("card was charge");
  } catch (error) {
    console.log("olgy error processing payment olgy: ", error);
    let errors = {};
    errors.status = 500;
    errors.message = error;
    res.status(errors.status).json(errors.message);
  }
});
router.delete("/remove", (req, res) => {
  cartController.removeProduct(req.user._id, req.body);
  req.flash("success", "successfully removed");
  res.redirect("back");
});
//4242424242424242
module.exports = router;
