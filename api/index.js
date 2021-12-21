const app = require("./server.js");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const ReviewsDAO = require("./dao/reviewsDAO.js");
const { loadRecipes } = require("./mock/recipes/index.js");
const mongoose = require("mongoose");
const { recipeModel, createIndexes } = require("./models/recipe.js");
const { reviewModel } = require("./models/review");

dotenv.config();

//-------------------------- MONGO LOCAL DB --------------------------------------

mongoose.connect(process.env.LOCAL_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(27017, async () => {
  try {
    // await reviewModel.deleteMany({}).then(() => console.log("previous reviews deleted"));

    // await recipeModel
    //   .deleteMany({})
    //   .then(() => console.log("previous recipes deleted"));

    await loadRecipes().then(() => console.log("recipes loaded"));

    console.log("Server is running at port 27017");
  } catch (e) {
    console.log(e);
  }
});

// --------------------- MONGO ATLAS -------------------------------------------

// const MongoClient = mongodb.MongoClient; //access to mongoclient

// const port = process.env.PORT || 8000; //create port number

// MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
//   maxPoolSize: 50,
//   useNewUrlParser: true,
// })
//   .catch((err) => {
//     console.error(err.stack);
//     process.exit(1);
//   })
//   .then(async (client) => {
//     await RecipesDAO.injectDB(client) // initial reference to the collection
//     await ReviewsDAO.injectDB(client)
//     await loadRecipes().then(() => console.log('recipes loaded'))
//     app.listen(port, () => {
//       console.log(`listening on port ${port}`);
//     });
//   });

//---------------------------------------------------------------------------------
