const recipeModel = require("../models/recipe");

class Recipes {
  static async getRecipes({
    // we call this when we want a list of all recipes
    filters = null,
    page = 0,
    recipesPerPage = 20, // options created, when call the method we can put filters, pages and perpage
  } = {}) {
    let query; // first the query is empty and remain empty unless someone pass a filter
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("brewery" in filters) {
        query = { brewery: { $eq: filters["brewery"] } };
      } else if ("style" in filters) {
        query = { style: { $eq: filters["style"] } };
      }
    }

    let allRecipes;
    try {
      allRecipes = await recipeModel
        .find(query)
        .limit(recipesPerPage)
        .skip(recipesPerPage * page);
      // find all the recipes that go along with the query
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { recipesList: [], totalNumRecipes: 0 };
    }

    // const homeDisplayRecipes = allRecipes
    //   .limit(recipesPerPage)
    //   .skip(recipesPerPage * page);

    try {
      // const recipesList = await allRecipes.toArray(); 
      const totalNumRecipes = await recipeModel.countDocuments(query);
      console.log(totalNumRecipes)

      return { allRecipes, totalNumRecipes }; //return the array
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { allRecipes: [], totalNumRecipes: 0 };
    }
  }

  static async addRecipe(recipe, user, date) {
    try {
      const reviewDoc = {
        recipe: recipe,
        name: user.name,
        user_id: user._id,
        date: date,
      };

      const response = await recipeModel.create(reviewDoc);

      console.log(response);

      // return await recipes.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Recipes;
