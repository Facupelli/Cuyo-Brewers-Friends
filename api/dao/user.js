const mongodb = require("mongodb");
const { userModel } = require("../models/user");
const ObjectId = mongodb.ObjectId;

class User {
  static async getUserInfo(id) {
    try {
      return await userModel.findById(ObjectId(id), '_id username').populate('ownRecipes').exec();
    } catch (e) {
      console.error(`Something went wrong in getUserInfo: ${e}`);
      throw e;
    }
  }
}

module.exports = User;
