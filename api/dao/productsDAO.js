const mongodb = require("mongodb");
const { productModel } = require("../models/product");
const { userModel } = require("../models/user");

const ObjectId = mongodb.ObjectId;

class Products {
  static async getProducts({
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

      return { allProducts, totalNumProducts }; //return the array
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
      console.error(`Unable to post product: ${e}`);
      return { error: e };
    }
  }

  static async editProduct(productInfo, userInfo, res) {
    try {
      const { _id, title, price, description, available, images } = productInfo;

      const product = await productModel.findById(_id);

      if (product && product.owner[0].toString() === userInfo._id) {
        if (productInfo) {
          product.title = title ? title : product.title;
          product.price = price ? price : product.price;
          product.description = description ? description : product.description;
          product.available = available ? available : product.available;
          product.images = images ? images : product.images;
          await product.save();
          console.log(product)
        } else {
          throw new Error("At least one parameter is required");
        }
      } else {
        throw new Error("Must be the owner of the service");
      }
    } catch (e) {
      console.error(`Unable to edit product: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Products;
