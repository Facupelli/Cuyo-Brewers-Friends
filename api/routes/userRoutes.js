const express=require("express")
const UserController = require('../src/userController')

const router=express.Router()

router.get('/', UserController.getUserInfo)


module.exports=router