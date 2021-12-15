let recipes; // store a reference to db

class RecipesDAO {
  //initialy connect to db, call this method as soon as the server start
  //when the server start we get a reference to the restaurant db

  static async injectDB(conn) {
    if (recipes) {
      // if we got a reference then return
      return;
    }
    try {
      // if restaurant is empty we fill the reference
      recipes = await conn.db(process.env.RESTREVIEWS_NS).collection("recipes");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in recipesDAO: ${e}`
      );
    }
  }

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

    let cursor;
    try {
      cursor = await recipes // find all the recipes that go along with the query
        .find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { restaruantsList: [], totalNumRecipes: 0 };
    }

    const displayCursor = cursor
      .limit(recipesPerPage)
      .skip(recipesPerPage * page);

    try {
      const recipesList = await displayCursor.toArray(); // convert to an array
      const totalNumRecipes = await recipes.countDocuments(query);

      return { recipesList, totalNumRecipes }; //return the array
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { recipesList: [], totalNumRecipes: 0 };
    }
  }
}

module.exports = {
  RecipesDAO: RecipesDAO,
  recipes,
};
