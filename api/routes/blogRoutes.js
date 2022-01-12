const express=require("express")
const blogController = require("../src/blogController")

const router=express.Router()

router.get('/', blogController.getBlogs)
router.get('/:id', blogController.getBlogById)
router.post('/', blogController.postBlog)


module.exports=router