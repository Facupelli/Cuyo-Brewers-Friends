import express from 'express'
import RecipesCtrl from './recipes.controller.js'
import ReviewsCtrl from './reviews.controller.js'

const router = express.Router()  //acess to express router

router.route('/').get(RecipesCtrl.apiGetRecipes) 

router
    .route('/review')
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)


export default router