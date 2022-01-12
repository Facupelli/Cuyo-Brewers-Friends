const mongodb = require("mongodb");
const { recipeModel } = require("../models/recipe");
const ObjectId = mongodb.ObjectId;
const { reviewModel } = require("../models/review");
const { userModel } = require("../models/user");

class ReviewsDAO {
  // static async injectDB(conn) {
  //   if (reviews) {
  //     return;
  //   }
  //   try {
  //     reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
  //   } catch (e) {
  //     console.error(`Unable to establish collection handles in userDAO: ${e}`);
  //   }
  // }

  static async addReview(userInfo, review, date, recipe_id) {
    try {
      const reviewDoc = {
        username: userInfo.username,
        author: userInfo.user_id,
        date: date,
        comment: review.comment,
        score: review.score,
      };
      const response = await reviewModel.create(reviewDoc);
      const addReviewToRecipe = await recipeModel.findOneAndUpdate(
        { _id: review.recipe_id },
        { $push: { reviews: response._id } }
      );
      const addScoreToRecipe = await recipeModel.findOneAndUpdate(
        { _id: review.recipe_id },
        { $push: { reviewsScores: review.score } }
      );
      const addReviewToUser = await userModel.findOneAndUpdate(
        { _id: userInfo.user_id },
        { $push: { ownReviews: review.recipe_id } }
      );
      return response;
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async getReviewsByRecipeId(recipe_id) {
    try {
      return await reviewModel.find({ recipe_id: recipe_id });
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  // static async updateReview(reviewId, userId, text, date) {
  //   try {
  //     const updateResponse = await reviews.updateOne(
  //       { user_id: userId, _id: ObjectId(reviewId) },
  //       { $set: { text: text, date: date } }
  //     );

  //     return updateResponse;
  //   } catch (e) {
  //     console.error(`Unable to update review: ${e}`);
  //     return { error: e };
  //   }
  // }

  // static async deleteReview(reviewId, userId) {
  //   try {
  //     const deleteResponse = await reviews.deleteOne({
  //       _id: ObjectId(reviewId),
  //       user_id: userId,
  //     });

  //     return deleteResponse;
  //   } catch (e) {
  //     console.error(`Unable to delete review: ${e}`);
  //     return { error: e };
  //   }
  // }
}

module.exports = ReviewsDAO;
