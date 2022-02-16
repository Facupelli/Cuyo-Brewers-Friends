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
        productsList: allRecipes,
        page: page,
        entries_per_page: productsPerPage,
        total_results: totalNumProducts,
      };
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = ProductsController;
