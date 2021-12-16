const loginValidation = require("../validation/loginValidation");
const { userModel } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class LoginController {
  static async loginUser(req, res, next) {
    try {
      //JOI VALIDATION
      const { error } = loginValidation(req.body);

      if (error) {
        return res
          .status(400)
          .json({ validationError: error.details[0].message });
      }

      const user = await userModel.findOne({ email: req.body.email });

      if (!user) return res.status(400).json({ error: "Email is incorrect" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({ error: "Password is incorrect" });
      }

      // create token
      const token = jwt.sign(
        // payload data
        {
          name: user.name,
          id: user._id,
        },
        process.env.TOKEN_SECRET
      );

      res.header("auth-token", token).json({
        error: null,
        data: {
          token,
        },
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = LoginController;
