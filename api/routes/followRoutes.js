const express=require("express")
const FollowController = require("../src/followController")

const router=express.Router()

router.post('/', FollowController.postFollow)
// router.delete('/', FavController.deleteFav)


module.exports=router