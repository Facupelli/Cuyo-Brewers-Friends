const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  userImg: String,
  name: { type: String, required: true, min: 2, max: 225 },
  lastname: { type: String, required: true, min: 2, max: 225 },
  username: { type: String, required: true, min: 2, max: 225 },
  password: { type: String, required: true, min: 8, max: 225 },
  email: { type: String, required: true, min: 6, max: 225 },
  date: { type: Date, default: Date.now },
  favs: [{ type: mongoose.Schema.Types.ObjectId, ref: "RecipeModel" }],
  ownRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "RecipeModel" }],
  ownReviews:[{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel" }],
  ownBlogs:[{type: mongoose.Schema.Types.ObjectId, ref: "BlogModel" }],
  ownProducts:[{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" }],
  following:[{type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
  seller: {type: Boolean, required: true},
});

const userModel = mongoose.model("UserModel", UserSchema);
module.exports = { userModel };
