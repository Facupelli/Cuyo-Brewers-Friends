const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  blog_author: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  blog_title: { type: String, required: true, min: 2, max: 500 },
  blog_body: { type: String, required: true, min: 2, max: 25000 },
  date: { type: String, default: Date.now },
});

const blogModel = mongoose.model("BlogModel", BlogSchema);
module.exports = { blogModel };