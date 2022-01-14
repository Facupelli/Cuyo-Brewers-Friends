const mongodb = require("mongodb");
const { userModel } = require("../models/user");
const { recipeModel } = require("../models/recipe");
const ObjectId = mongodb.ObjectId;

class Recipes {
  static async getRecipes({
    // we call this when we want a list of all recipes
    top,
    filters = null,
    page = 0,
    recipesPerPage = 30, // options created, when call the method we can put filters, pages and perpage
  } = {}) {
    let query; // first the query is empty and remain empty unless someone pass a filter
    if (filters) {
      if ("title" in filters) {
        query = { "recipe.title": { $regex: filters["title"], $options: "i" } };
      } else if ("username" in filters) {
        query = { username: { $regex: filters["username"], $options: "i" } };
      } else if ("sub_category" in filters) {
        query = { "recipe.sub_category": filters["sub_category"] };
      } else if ("style" in filters) {
        query = { "recipe.style": filters["style"] };
      }
    }

    let allRecipes;
    try {
      const sortBy = top ? "-rating" : "-date";

      const addRating = await recipeModel.updateMany({}, [
        { $set: { rating: {$avg: "$reviewsScores"} } },
      ]);

      allRecipes = await recipeModel
        .find(query)
        .sort(sortBy)
        .limit(recipesPerPage)
        .populate("author", "_id name username")
        .populate("reviews", "_id score")
        .skip(recipesPerPage * page);


      // const reviews = allRecipes.forEach((el) => {
      //   const reviewsLength = el.reviews.length;
      //   if (reviewsLength === 0) {
      //     el.rating = 0;
      //   }
      //   if (reviewsLength > 0) {
      //     el.rating =
      //       el.reviews.map((el) => el.score).reduce((a, b) => a + b) /
      //       reviewsLength;
      //   }
      // });

    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { recipesList: [], totalNumRecipes: 0 };
    }

    try {
      // const recipesList = await allRecipes.toArray();
      const totalNumRecipes = await recipeModel.countDocuments(query);

      return { allRecipes, totalNumRecipes }; //return the array
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { allRecipes: [], totalNumRecipes: 0 };
    }
  }

  static async getRecipeById(id) {
    try {
      return await recipeModel
        .findById(id)
        .populate("reviews", "_id score comment username date");
    } catch (e) {
      console.error(`Something went wrong in getRecipeByID: ${e}`);
      throw e;
    }
  }

  static async addRecipe(recipe, user, date) {
    try {
      const reviewDoc = {
        recipe: recipe,
        username: user.username,
        author: user._id,
        date: date,
      };
      const response = await recipeModel.create(reviewDoc);
      const addAuthor = await userModel.findOneAndUpdate(
        { _id: user._id },
        { $push: { ownRecipes: response._id } }
      );

      console.log("MONGO CREATE", response);

      // return await recipes.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post recipe: ${e}`);
      return { error: e };
    }
  }

  static async deleteRecipe(id, user_id){
    try{
      const deleteOne = await recipeModel.deleteOne({_id: id})
      const deleteUserRecipe = await userModel.findOneAndUpdate(
        { _id: user_id },
        { $pull: { ownRecipes: id } }
      )
    }catch(e){
      console.error(`Unable to delete recipe: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Recipes;
