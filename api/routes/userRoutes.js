const express=require("express")
const UserController = require('../src/userController')

const router=express.Router()

router.get('/', UserController.getUserInfo)
router.post('/', UserController.becomeSeller)



module.exports=router