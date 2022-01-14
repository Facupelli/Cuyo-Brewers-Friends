const mongodb = require("mongodb");
const { userModel } = require("../models/user");

class Fav {
  static async addFav(user_id, recipe_id) {
    try {
      console.log("user", user_id, typeof user_id, "recipe", recipe_id);
      const addFav = await userModel.findOneAndUpdate(
        { _id: user_id },
        { $push: { favs: recipe_id } }
      );
    } catch (e) {
      console.error(`Unable to add to favs: ${e}`);
      return { error: e };
    }
  }

  static async deleteFav(user_id, recipe_id){
    try{
        const deleteFav = await userModel.findOneAndUpdate(
            {_id: user_id},
            {$pull: {favs: recipe_id}}
        )
    }catch(e){
        console.error(`Unable to delete fav: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Fav;
