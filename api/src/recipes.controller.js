import RecipesDAO from "../dao/recipesDAO.js";

export default class RecipesController {

  static async apiGetRecipes(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? pareseInt(req.query.restaurantsPerPage, 10)
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

    const { restaurantsList, totalNumRestaurants } =
      await RecipesDAO.getRecipes({
        filters,
        page,
        restaurantsPerPage,
      });

    let response = {
        recipes: restaurantsList,
        page: page,
        filters: filters,
        entries_per_page: restaurantsPerPage,
        total_results: totalNumRestaurants,
    };
    res.json(response)
  }
}
