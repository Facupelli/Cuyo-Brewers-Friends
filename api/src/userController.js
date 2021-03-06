const { ObjectId } = require("mongodb");
const User = require("../dao/userDAO");

class UserController {
  static async getUserInfo(req, res, next) {
    try {
      const userId = req.query.id;
      const username = req.query.username;

      let user;

      if (username) {
        try {
          const username = req.query.username;
          user = await User.getUserByUsername(username);
        } catch (e) {
          console.log(`api, ${e}`);
          res.status(500).json({ error: e.message });
        }
      } else {
        user = await User.getUserInfo(userId);

        if (!user) {
          res.status(404).json({ error: "Not found !user" });
          return;
        }
      }

      res.json(user);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async becomeSeller(req,res,next)  {
    try{
      const userId = req.body.id;
      await User.becomeSeller(userId)
      res.status(200).json({message: 'success'})
    }catch(e){
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = UserController;
