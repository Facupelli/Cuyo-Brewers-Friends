const Fav = require("../dao/favDAO");

class FavController {
  static async addFav(req, res, next) {
    try {
      const user_id = req.body.user_id;
      const recipe_id = req.body.recipe_id;

      const addFav = await Fav.addFav(user_id, recipe_id);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async deleteFav (req, res, next) {
      try{
        const user_id = req.body.user_id;
      const recipe_id = req.body.recipe_id;

      const deleteFav = await Fav.deleteFav(user_id, recipe_id);
      res.json({ status: "success" });
      }catch(e){
        console.log(`api, ${e}`);
        res.status(500).json({ error: e.message });
      }
  }
}


module.exports = FavController;