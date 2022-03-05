const mongodb = require("mongodb");
const { userModel } = require("../models/user");
const ObjectId = mongodb.ObjectId;

class Fav {
  static async addFav(user_id, recipe_id) {
    try {
      const user = await userModel.find({ _id: user_id });

      if (user) {
        const filter = user[0].favs.filter((el) => el.toString() === recipe_id);

        if (filter.length === 0) {
          await userModel.findOneAndUpdate(
            { _id: user_id },
            { $push: { favs: recipe_id } }
          );
        }
      } else {
        throw new Error("No user found");
      }
    } catch (e) {
      console.error(`Unable to add to favs: ${e}`);
      return { error: e };
    }
  }

  static async deleteFav(user_id, recipe_id) {
    try {
      await userModel.findOneAndUpdate(
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
