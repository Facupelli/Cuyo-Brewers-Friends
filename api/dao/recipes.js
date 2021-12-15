const recipeModel = require('../models/recipe')

let recipes;

class Recipes {
  static async addRecipe(recipe, user, date) {
    try {
      const reviewDoc = {
        recipe: recipe,
        name: user.name,
        user_id: user._id,
        date: date,
      };

      const response = await recipeModel.create(reviewDoc)

      console.log(response)

      // return await recipes.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Recipes