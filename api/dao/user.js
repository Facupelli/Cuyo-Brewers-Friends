const mongodb = require("mongodb");
const { userModel } = require("../models/user");
const ObjectId = mongodb.ObjectId;

class User {
  static async getUserInfo(id) {
    try {
      return await userModel.findById(ObjectId(id), '_id username ownReviews ownRecipes ownBlogs').populate('ownRecipes').exec();
    } catch (e) {
      console.error(`Something went wrong in getUserInfo: ${e}`);
      throw e;
    }
  }

  static async getUserByUsername(username){
    try{
      return await userModel.findOne({username: username}).populate('ownBlogs', "blog_title blog_body date").populate('ownRecipes', 'recipe date')
    }catch(e){
      console.error(`Something went wrong in getUserByUsernameDAO: ${e}`);
      throw e;
    }
  }
}

module.exports = User;
