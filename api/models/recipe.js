import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  style: { type: String, required: true },
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
});

const recipeModel = mongoose.model("RecipeModel", RecipeSchema);
export default recipeModel
