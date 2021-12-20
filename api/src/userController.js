const { ObjectId } = require("mongodb");
const User = require("../dao/user");

class UserController {
  static async getUserInfo(req, res, next) {
    try {

      const userId = req.params.id

      console.log(userId)

      const user = await User.getUserInfo(userId);

      if(!user){
        res.status(404).json({error: "Not found !user"})
        return
      }

      res.json(user);
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = UserController;