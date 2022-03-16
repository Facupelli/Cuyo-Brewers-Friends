const express=require("express")
const FollowController = require("../src/followController")

const router=express.Router()

router.post('/', FollowController.postFollow)
router.delete('/', FollowController.deleteFollow)

module.exports=router