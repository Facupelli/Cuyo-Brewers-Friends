const express=require("express")
const {ReviewsController} = require("../src/reviews.controller")

const router=express.Router()

router.post('/', ReviewsController.apiPostReview)
router.get('/:id', ReviewsController.apiGetReviewByRecipeId)



module.exports=router