const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  images: { type: Array, default: [] },
  title: { type: String, required: true, min: 2, max: 225 },
  description: { type: String, required: true, min: 6, max: 225 },
  price: {type: Number, require: true},
  available: {type: Boolean, require: true},
  owner:[{type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
  date: { type: String, default: Date.now },
});

const productModel = mongoose.model("ProductModel", ProductSchema);
module.exports = { productModel };
