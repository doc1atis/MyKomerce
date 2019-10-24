const express = require("express");
const cartController = require("./controller/cartController");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("heyyy from cart");
});
router.post("/product", async (req, res) => {
  //let total = await cartController.addItemsInCart(req.user._id, req.body);
  console.log(await cartController.addItemsInCart(req.user._id, req.body));

  res.send(req.body);
});
module.exports = router;
