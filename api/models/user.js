const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userImg: String,
  name: { type: String, required: true, min: 2, max: 225 },
  lastname: { type: String, required: true, min: 2, max: 225 },
  username: { type: String, required: true, min: 2, max: 225 },
  password: { type: String, required: true, min: 8, max: 225 },
  email: { type: String, required: true, min: 6, max: 225 },
  date: { type: Date, default: Date.now },
});

const userModel = mongoose.model("UserModel", UserSchema);
module.exports = { userModel };
