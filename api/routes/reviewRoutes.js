const express=require("express")
const {ReviewsController} = require("../src/reviews.controller")

const router=express.Router()

router.post('/', ReviewsController.apiPostReview)


module.exports=router