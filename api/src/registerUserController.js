const {RegisterUsers} = require("../dao/register");
const { userModel } = require("../models/user");
const registerValidation = require("../validation/registerValidation");
const bcrypt = require("bcrypt");

class RegisterController {
  static async registerUser(req, res, next) {
    try {
      //JOI VALIDATION
      const { error } = registerValidation(req.body);

      if (error) {
        return res.status(400).jsn({ error: error.details[0].message });
      }

      const isEmailExist = await userModel.findOne({ email: req.body.email });

      if (isEmailExist) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = {
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password,
      };

      const UserResponse = await RegisterUsers.addUser(user);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = RegisterController;
