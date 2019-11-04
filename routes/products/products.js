const express = require("express");
const productController = require("./controllers/productController");
const Product = require("./models/Product");

const router = express.Router();

Product.createMapping(function(error, mapping) {
  if (error) {
    console.log("failed to create map olgy: ", error);
  } else {
    console.log("mapping created olgy");
    console.log(mapping);
  }
});

let stream = Product.synchronize();
let count = 0;
stream.on("data", () => {
  count++;
});
stream.on("close", () => {
  console.log(`Indexed ${count} documents`);
});
stream.on("error", error => {
  console.log("olgy this is stream: ", error);
});
router.get("/", (req, res) => {
  productController
    .getAllProducts({})
    .then(products => {
      res.render("products/products", { products: products });
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

router.get("/:id", (req, res) => {
  productController
    .getProductByID(req.params.id)
    .then(product => {
      res.render("products/product", { product: product });
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

router.get("/getproductsbycategoryid/:id", (req, res) => {
  productController
    .getProductsByCategoryID(req.params.id)
    .then(products => {
      res.render("products/products", { products: products });
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});
router.delete("/deleteproductbyid/:id", (req, res) => {
  const deletedProduct = productController.deleProductById(req.params.id);
  res.send(deletedProduct);
});
router.get("/search/product", (req, res) => {
  productController.searchProductByQuery(req, res);
});
router.get("/instant/search", (req, res) => {
  productController.instantSearch(req, res);
});
module.exports = router;
