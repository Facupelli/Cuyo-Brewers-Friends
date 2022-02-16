const mongodb = require("mongodb");
const { productModel } = require("../models/product");
const ObjectId = mongodb.ObjectId;

class Products {
    static async getRecipes({
        page = 0,
        productsPerPage = 15, // options created, when call the method we can put filters, pages and perpage
      } = {}) {

        let allProducts;
        try {    
          allProducts = await productModel
            .find()
            .limit(productsPerPage)
            .skip(productsPerPage * page);
    
        } catch (e) {
          console.error(`Unable to issue find command, ${e}`);
          return { productsList: [], totalNumProducts: 0 };
        }
    
        try {
          const totalNumProducts = await productModel.countDocuments();
    
          return { allRecipes, totalNumRecipes }; //return the array
        } catch (e) {
          console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
          );
          return { productsList: [], totalNumProducts: 0 };
        }
      }
}

module.exports = Products;
