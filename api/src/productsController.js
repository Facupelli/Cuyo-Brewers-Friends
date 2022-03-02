const Products = require("../dao/productsDAO.js");
const dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

class ProductsController {
  static async getProducts(req, res, next) {
    try {
      const productsPerPage = req.query.productsPerPage
        ? parseInt(req.query.productsPerPage, 10)
        : 15;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;

      const { allProducts, totalNumProducts } = await Products.getProducts({
        page,
        productsPerPage,
      });

      let response = {
        productsList: allProducts,
        page: page,
        entries_per_page: productsPerPage,
        total_results: totalNumProducts,
      };
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async postProduct(req, res, next) {
    try {
      const product = req.body.product;
      const userInfo = {
        username: req.body.username,
        _id: req.body.user_id,
      };
      const date = dayjs().format("DD/MM/YYYY");

      const ReviewResponse = await Products.addProduct(product, userInfo, date);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async editProduct(req, res, next) {
    try {
      const productInfo = req.body.productInfo;
      const userInfo = {
        username: req.body.username,
        _id: req.body._id,
      };

      const ReviewResponse = await Products.editProduct(productInfo, userInfo);
      res.json({ status: "Successfully edited" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = ProductsController;
