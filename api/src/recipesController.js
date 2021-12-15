const Recipes = require("../dao/recipes.js");

class RecipesController {
  static async getRecipes(req, res, next) {
    try {
      const recipesPerPage = req.query.recipesPerPage
        ? pareseInt(req.query.recipesPerPage, 10)
        : 20;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;

      let filters = {}; //filters start as an empty object
      if (req.query.brewery) {
        filters.brewery = req.query.brewery;
      } else if (req.query.style) {
        filters.style = req.query.style;
      } else if (req.query.name) {
        filters.name = req.query.name;
      }

      const { allRecipes, totalNumRecipes } =
        await Recipes.getRecipes({
          filters,
          page,
          recipesPerPage,
        });

      let response = {
        recipes: allRecipes,
        page: page,
        filters: filters,
        entries_per_page: recipesPerPage,
        total_results: totalNumRecipes,
      };
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

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
