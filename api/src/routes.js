const express = require ('express')
const recipeModel = require('../models/recipe')
const RecipesCotroller = require ('./recipesController.js')

const router = express.Router()  //acess to express router

router.route('/').get(RecipesCotroller.getRecipes) 

router
    .route('/create')
    .post(RecipesCotroller.postRecipe)

// router
//     .route('/review')
//     .post(ReviewsCtrl.apiPostReview)
//     .put(ReviewsCtrl.apiUpdateReview)
//     .delete(ReviewsCtrl.apiDeleteReview)

module.exports = router