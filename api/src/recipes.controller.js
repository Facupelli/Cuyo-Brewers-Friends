const RecipesDAO = require("../dao/recipesDAO.js");

class RecipesController {
  static async apiGetRecipes(req, res, next) {
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


    const { recipesList, totalNumrecipes } = await RecipesDAO.RecipesDAO.getRecipes({
      filters,
      page,
      recipesPerPage,
    });

    let response = {
      recipes: recipesList,
      page: page,
      filters: filters,
      entries_per_page: recipesPerPage,
      total_results: totalNumrecipes,
    };
    res.json(response);
  }
}

module.exports = RecipesController;
