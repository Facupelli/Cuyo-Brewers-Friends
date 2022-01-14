const express=require("express")
const FavController = require("../src/favController")

const router=express.Router()

router.post('/', FavController.addFav)
router.delete('/', FavController.deleteFav)


module.exports=router