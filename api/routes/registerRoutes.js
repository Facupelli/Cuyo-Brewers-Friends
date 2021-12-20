const express=require("express")
const registerUserController = require("../src/registerUserController")

const router=express.Router()

router.post('/', registerUserController.registerUser)


module.exports=router