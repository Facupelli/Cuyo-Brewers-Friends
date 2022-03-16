const mongodb = require("mongodb");
const { userModel } = require("../models/user");
const ObjectId = mongodb.ObjectId;

let users;
class User {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.CUYOBREWERS_NS).collection("users");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in recipesDAO: ${e}`
      );
    }
  }

  static async getUserInfo(id) {
    try {
      return await userModel
        .findById(
          ObjectId(id),
          "_id username favs seller ownProducts ownReviews ownRecipes ownBlogs followers following"
        )
        .populate("ownRecipes")
        .populate("ownProducts")
        .populate("ownBlogs")
        .populate("following", "_id username")
        .exec();
    } catch (e) {
      console.error(`Something went wrong in getUserInfo: ${e}`);
      throw e;
    }
  }

  static async getUserByUsername(username) {
    try {
      return await userModel
        .findOne({ username: username })
        .populate("ownBlogs", "blog_title blog_body date")
        .populate("ownProducts", "images title description price date available")
        .populate("ownRecipes", "recipe date")
        .populate("favs", "recipe date");
    } catch (e) {
      console.error(`Something went wrong in getUserByUsernameDAO: ${e}`);
      throw e;
    }
  }

  static async becomeSeller(id) {
    try {
      const userupdate = await userModel.updateOne({ _id: id }, { $set: { seller: true } });
    } catch (e) {
      console.error(`Something went wrong in getUserByUsernameDAO: ${e}`);
      throw e;
    }
  }
}

module.exports = User;
