const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeModel" },
  comment: { type: String, required: true, min: 2, max: 500 },
  score: { type: Number, min: 0, max: 5 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  username: { type: String, required: true, min: 2, max: 500 },
  date: { type: String, default: Date.now },
});

const reviewModel = mongoose.model("ReviewModel", ReviewSchema);
module.exports = { reviewModel };
