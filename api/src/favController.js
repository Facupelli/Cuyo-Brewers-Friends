const Fav = require("../dao/favDAO");

class FavController {
  static async addFav(req, res, next) {
    try {
      const user_id = req.body.user_id;
      const recipe_id = req.body.recipe_id;

      if (user_id && recipe_id) {
        await Fav.addFav(user_id, recipe_id);
        res.json({ status: "success" });
      } else {
        res.status(400).json({ error: "missing data" });
      }
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async deleteFav(req, res, next) {
    try {
      const user_id = req.body.user_id;
      const recipe_id = req.body.recipe_id;

      if (user_id && recipe_id) {
        await Fav.deleteFav(user_id, recipe_id);
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

module.exports = FavController;
