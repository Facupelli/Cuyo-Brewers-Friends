const { userModel } = require("../models/user");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  static async getUserInfo(id) {
    try {
      return await userModel.findById(id);
    } catch (e) {
      console.error(`Something went wrong in getUserInfo: ${e}`);
      throw e;
    }
  }
}

module.exports = User;
