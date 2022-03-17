const mongodb = require("mongodb");
const { userModel } = require("../models/user");
const { recipeModel } = require("../models/recipe");
const { reviewModel } = require("../models/review");
const ObjectId = mongodb.ObjectId;

let recipes;
class Recipes {
  static async injectDB(conn) {
    if (recipes) {
      return;
    }
    try {
      recipes = await conn.db(process.env.CUYOBREWERS_NS).collection("recipes");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in recipesDAO: ${e}`
      );
    }
  }

  static async getRecipes({
    top,
    filters = null,
    page = 0,
    recipesPerPage = 10,
  } = {}) {
    let query;
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

      let pipeline = [
        {
          $lookup: {
            from: "reviewmodels",
            localField: "reviews",
            foreignField: "_id",
            as: "reviews_scores",
          },
        },
        {
          $addFields: {
            rating: { $avg: "$reviews_scores.score" },
          },
        },
        {
          $project: {
            username: 1,
            date: 1,
            author: 1,
            reviews: 1,
            recipe: 1,
            rating: { $ifNull: ["$rating", 0] },
          },
        },
      ];

      if (query) pipeline.push({ $match: query });

      allRecipes = await recipeModel
        // .find(query)
        // .populate("author", "_id name username")
        // .populate("reviews", "_id score")
        .aggregate(pipeline)
        .sort(sortBy)
        .limit(recipesPerPage)
        .skip(recipesPerPage * page);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { recipesList: [], totalNumRecipes: 0 };
    }

    try {
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

  static async deleteRecipe(id, user_id) {
    try {
      const deleteOne = await recipeModel.deleteOne({ _id: id });
      const deleteUserRecipe = await userModel.findOneAndUpdate(
        { _id: user_id },
        { $pull: { ownRecipes: id } }
      );
      const deleteRecipeReviews = await reviewModel.deleteMany({ recipe: id });
      const deleteUserReviews = await userModel.updateMany(
        { ownReviews: id },
        { $pull: { ownReviews: id } }
      );
    } catch (e) {
      console.error(`Unable to delete recipe: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Recipes;
