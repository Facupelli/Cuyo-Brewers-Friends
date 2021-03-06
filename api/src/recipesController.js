const { ObjectId } = require("mongodb");
const Recipes = require("../dao/recipesDAO.js");
const { recipeModel } = require("../models/recipe");
const dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

class RecipesController {
  static async getRecipes(req, res, next) {
    try {
      const recipesPerPage = req.query.recipesPerPage
        ? parseInt(req.query.recipesPerPage, 10)
        : 5;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;

      let filters = {
        sub_category : req.query.sub_category,
        // style : req.query.style,
        title: req.query.title,
        username: req.query.username,
        orderBy: req.query.orderBy
      }; 

      // if (req.query.sub_category) {
      //   filters.sub_category = req.query.sub_category;
      // } else if (req.query.style) {
      //   filters.style = req.query.style;
      // } else if (req.query.title) {
      //   filters.title = req.query.title;
      // } else if (req.query.username) {
      //   filters.username = req.query.username;
      // }

      const top = req.query.top ? true : false;

      const { allRecipes, totalNumRecipes } = await Recipes.getRecipes({
        top,
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
      if (id) {
        const recipe = await Recipes.getRecipeById(id);

        if (!recipe) {
          res.status(404).json({ error: "Not found !recipe" });
          return;
        }

        res.json(recipe);
      } else {
        res.status(400).json({ error: "Missing ID" });
      }
    } catch (e) {
      console.log(`api, ${e}`);
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
      const date = dayjs().format("DD/MM/YYYY");

      if (recipe && userInfo.username && userInfo._id) {
        await Recipes.addRecipe(recipe, userInfo, date);
        res.json({ status: "success" });
      } else {
        res.status(400).json({ error: "Missing data" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async deleteRecipe(req, res, next) {
    try {
      const { id } = req.query;
      const { user_id } = req.body;

      if (id && user_id) {
        await Recipes.deleteRecipe(id, user_id);
        res.json({ status: "success" });
      } else {
        res.status(400).json({ error: "Missing data" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = RecipesController;
