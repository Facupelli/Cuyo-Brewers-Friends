const loginValidation = require("../validation/loginValidation");

class LoginController {
  static async loginUser(req, res, next) {
    try {
      //JOI VALIDATION
      const { error } = loginValidation(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.status(400).json({ error: "Email is incorrect" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({ error: "Password is incorrect" });
      }

      res.json({
        error: null,
        data: {
          message: "Login successful",
        },
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = LoginController;
