const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  recipe_id: { type: String, required: true, min: 2, max: 225 },
  text: { type: String, required: true, min: 2, max: 500 },

});

const reviewModel = mongoose.model("ReviewModel", ReviewSchema);
module.exports = { reviewModel };