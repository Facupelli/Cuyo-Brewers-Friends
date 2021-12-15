const Recipes = require("../dao/recipes.js");

class RecipesController {
  static async postRecipe(req, res, next) {
    try {
      const recipe = req.body.recipe;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const ReviewResponse = await Recipes.addRecipe(recipe, userInfo, date);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = RecipesController;
