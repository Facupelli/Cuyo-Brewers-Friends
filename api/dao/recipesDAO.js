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
    recipesPerPage = 5,
  } = {}) {
    let query;

    if (filters) {
      if (filters.title) {
        query = { "recipe.title": { $regex: filters["title"], $options: "i" } };
      } else if (filters.username) {
        query = { username: { $regex: filters["username"], $options: "i" } };
      } else if (filters.sub_category && filters.sub_category !== "undefined") {
        query = { "recipe.sub_category": filters["sub_category"] };
      } else if (filters.style) {
        query = { "recipe.style": filters["style"] };
      }
    }

    let allRecipes;

    try {
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
            recipe: 1,
            rating: { $ifNull: ["$rating", 0] },
          },
        },
      ];

      if (query) {
        pipeline.push({ $match: query });

        if (filters.orderBy !== "undefined") {
          let sort = filters.orderBy.split(" ");
          let order = sort.includes("asc") ? 1 : -1;
          let sortObj = {};
          if (sort[0] === "rating") {
            sortObj["rating"] = order;
          } else {
            sortObj[`recipe.characteristics.${sort[0]}`] = order;
          }
          pipeline.push({ $sort: sortObj });
        }
        allRecipes = await recipeModel.aggregate(pipeline);
        const totalNumRecipes = await recipeModel.countDocuments(query);
        return { allRecipes, totalNumRecipes };
      }

      top
        ? pipeline.push({ $sort: { rating: -1 } })
        : pipeline.push({ $sort: { date: -1 } });

      pipeline.push(
        {
          $skip: recipesPerPage * page,
        },
        {
          $limit: recipesPerPage,
        }
      );

      if (filters.orderBy && filters.orderBy !== "undefined") {
        let sort = filters.orderBy.split(" ");
        let order = sort.includes("asc") ? 1 : -1;
        let sortObj = {};
        if (sort[0] === "rating") {
          sortObj["rating"] = order;
        } else {
          sortObj[`recipe.characteristics.${sort[0]}`] = order;
        }
        pipeline.push({ $sort: sortObj });
      }

      allRecipes = await recipeModel
        // .find(query)
        // .populate("author", "_id name username")
        // .populate("reviews", "_id score")
        .aggregate(pipeline);
      // .sort(sortBy)
      // .limit(recipesPerPage);
      // .skip(recipesPerPage * page);
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
