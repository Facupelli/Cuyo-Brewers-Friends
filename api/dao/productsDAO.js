const mongodb = require("mongodb");
const { productModel } = require("../models/product");
const { userModel } = require("../models/user");

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

      static async addProduct(product, user, date) {
        try {
          const reviewDoc = {
            images: product.images,
            title: product.title,
            description: product.description,
            price: product.price,
            available: product.available,
            username: user.username,
            owner: user._id,
            date: date,
          };
          const response = await productModel.create(reviewDoc);
          const addOwner = await userModel.findOneAndUpdate(
            { _id: user._id },
            { $push: { ownProducts: response._id } }
          );
    
          console.log("MONGO CREATE", response);
    
          // return await recipes.insertOne(reviewDoc);
        } catch (e) {
          console.error(`Unable to post recipe: ${e}`);
          return { error: e };
        }
      }
}

module.exports = Products;
