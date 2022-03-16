const Follow = require("../dao/followDAO.js");

class FollowController {
  static async postFollow(req, res, next) {
    try {
      const { userId, followingId } = req.body;

      await Follow.addFollower(userId, followingId);
      res.status(200).json({ message: "success" });
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async deleteFollow(req, res, next) {
    try {
      const {userId, followedId} = req.body
      
      if (userId && followedId) {
        await Follow.deleteFollow(userId, followedId);
        res.json({ status: "success" });
      } else {
        res.status(400).json({ error: "missing data" });
      }
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = FollowController;
