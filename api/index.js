import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RecipesDAO from './dao/recipesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'
import { loadRecipes } from "./mock/recipes/index.js";
dotenv.config();
const MongoClient = mongodb.MongoClient; //access to mongoclient

const port = process.env.PORT || 8000; //create port number

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RecipesDAO.injectDB(client) // initial reference to the collection
    await ReviewsDAO.injectDB(client)
    await loadRecipes().then(() => console.log('recipes loaded'))
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
