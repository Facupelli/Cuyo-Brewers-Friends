const mongodb = require("mongodb");
const { userModel } = require("../models/user");
const ObjectId = mongodb.ObjectId;


class Fav {
  static async addFav(user_id, recipe_id) {
    try {
      const user = await userModel.find({ _id: user_id });

      const filter = user[0].favs.filter((el) => el.toString() === recipe_id);
      console.log(filter)

      if (filter.length === 0) {
        const addFav = await userModel.findOneAndUpdate(
          { _id: user_id },
          { $push: { favs: recipe_id } }
        );
      }
    } catch (e) {
      console.error(`Unable to add to favs: ${e}`);
      return { error: e };
    }
  }

  static async deleteFav(user_id, recipe_id) {
    try {
      const deleteFav = await userModel.findOneAndUpdate(
        { _id: user_id },
        { $pull: { favs: recipe_id } }
      );
    } catch (e) {
      console.error(`Unable to delete fav: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Fav;
