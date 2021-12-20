const express = require ('express')
const recipeModel = require('../models/recipe')
const RecipesCotroller = require ('./recipesController.js')
const RegisterController = require('./registerUserController.js')
const LoginController = require('./loginUserController')
const {ReviewsController} = require('./reviews.controller')

const router = express.Router()  //acess to express router

router
    .route('/')
    .get(RecipesCotroller.getRecipes) 

router
    .route('/:id')
    .get(RecipesCotroller.getRecipeById)

router
    .route('/create')
    .post(RecipesCotroller.postRecipe)

router
    .route('/register')
    .post(RegisterController.registerUser)

router
    .route('/login')
    .post(LoginController.loginUser)

router
    .route('/review')
    .post(ReviewsController.apiPostReview)


module.exports = router