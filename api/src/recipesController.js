const { ObjectId } = require("mongodb");
const Recipes = require("../dao/recipes.js");
const { recipeModel } = require("../models/recipe");

class RecipesController {
  static async getRecipes(req, res, next) {
    try {
      const recipesPerPage = req.query.recipesPerPage
        ? parseInt(req.query.recipesPerPage, 10)
        : 30;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;

      let filters = {}; //filters start as an empty object
      if (req.query.brewery) {
        filters.brewery = req.query.brewery;
      } else if (req.query.style) {
        filters.style = req.query.style;
      } else if (req.query.title) {
        filters.title = req.query.title;
      } else if (req.query.username) {
        filters.username = req.query.username;
      }

      const { allRecipes, totalNumRecipes } = await Recipes.getRecipes({
        filters,
        page,
        recipesPerPage,
      });

      let response = {
        recipesList: allRecipes,
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

  static async getRecipeById(req, res, next) {
    try {
      const { id } = req.params;

      const recipe = await Recipes.getRecipeById(id)

      if(!recipe){
        res.status(404).json({error: "Not found !recipe"})
        return
      }

      res.json(recipe);
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e.message });
    }
  }

  static async postRecipe(req, res, next) {
    try {
      const recipe = req.body.recipe;
      const userInfo = {
        username: req.body.username,
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
