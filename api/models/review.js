const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  recipe_id: { type: String, required: true, min: 2, max: 225 },
  comment: { type: String, required: true, min: 2, max: 500 },
  score: { type: Number, require: true, min: 1, max: 5 },
  user_id: { type: String, required: true, min: 2, max: 225 },
  username: { type: String, required: true, min: 2, max: 500 },
});

const reviewModel = mongoose.model("ReviewModel", ReviewSchema);
module.exports = { reviewModel };
