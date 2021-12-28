const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  username: String,
  date: {type: String, default: Date.now},
  rating: { type: Number},
  // user_id: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel" }],
  recipe: {
    title: { type: String, index: true },
    style: { type: String },
    sub_category: { type: String },
    brewery: { type: String, default: null },
    parameters: {
      boil_time: Number,
      batch_size: Number,
      pre_boil_size: Number,
      pre_boil_gravity: Number,
      mash_ph: Number,
      efficiency: Number,
    },
    characteristics: {
      original_gravity: Number,
      final_gravity: Number,
      alcohol_by_volume: Number,
      ibu: Number,
      srm: Number,
    },
    ingredients: {
      fermentables: { type: Array, default: [] },
      hops: { type: Array, default: [] },
      yeast: { type: Array, default: [] },
      water_profile: {
        calcium: Number,
        magnesium: Number,
        sodium: Number,
        chlorine: Number,
        sulfate: Number,
        bicarbonate: Number,
      },
      photos: { type: Array, default: [] },
    },
  },
});

RecipeSchema.index({ "recipe.title": "text", username: "text" });

const recipeModel = mongoose.model("RecipeModel", RecipeSchema);
module.exports = { recipeModel };
