const Product = require("../models/Product");

const paginate = require("../utils/pagination");

module.exports = {
  getAllProducts: params => {
    return new Promise((resolve, reject) => {
      Product.find(params)
        .populate("category")
        .exec()
        .then(products => {
          resolve(products);
        })
        .catch(err => {
          let errors = {};
          errors.status = 500;
          errors.message = err;

          reject(errors);
        });
    });
  },
  getProductByID: id => {
    return new Promise((resolve, reject) => {
      Product.findById(id)
        .then(product => {
          resolve(product);
        })
        .catch(err => {
          let errors = {};
          errors.status = 500;
          errors.message = err;

          reject(errors);
        });
    });
  },
  getProductsByCategoryID: id => {
    return new Promise((resolve, reject) => {
      Product.find({ category: id })
        .populate("category")
        .exec()
        .then(products => {
          resolve(products);
        });
    });
  },
  getPageIfUserLoggedIn: (req, res, next) => {
    if (req.user) paginate(req, res, next);
    else res.render("index");
  },
  searchProductByQuery: (req, res) => {
    if (req.query.q) {
      Product.search(
        { query_string: { query: req.query.q } },
        (error, result) => {
          if (error) {
            let errors = { status: 500, message: error };
            res.status(errors.status).json(errors);
          } else {
            let data = result.hits.hits;

            res.render("search/search-results", { data, word: req.query.q });
          }
        }
      );
    }
  },
  instantSearch: (req, res) => {
    if (req.query.search_item) {
      Product.search(
        {
          query_string: { query: req.query.search_item }
        },
        (error, result) => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.send(result.hits.hits);
          }
        }
      );
    }
  }
};
