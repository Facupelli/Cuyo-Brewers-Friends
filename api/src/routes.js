const express = require ('express')
const recipeModel = require('../models/recipe')
const RecipesCotroller = require ('./recipesController.js')
const RegisterController = require('./registerUserController.js')
const LoginController = require('./loginUserController')


const router = express.Router()  //acess to express router

router.route('/').get(RecipesCotroller.getRecipes) 

router
    .route('/create')
    .post(RecipesCotroller.postRecipe)

router
    .route('/register')
    .post(RegisterController.registerUser)

router
    .route('/login')
    .post(LoginController.loginUser)

// router
//     .route('/review')
//     .post(ReviewsCtrl.apiPostReview)
//     .put(ReviewsCtrl.apiUpdateReview)
//     .delete(ReviewsCtrl.apiDeleteReview)

module.exports = router