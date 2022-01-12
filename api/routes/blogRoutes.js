const express=require("express")
const blogController = require("../src/blogController")

const router=express.Router()

router.post('/', blogController.postBlog)


module.exports=router