const Users = require("../dao/users.js");

class RegisterController {
    static async postUser(req, res, next) {
    try {
      const user = {
          name: req.body.name,
          lastname: req.body.lastname,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
      }

      const UserResponse = await Users.addUser(user);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = RegisterController;
