const express=require("express")
const LoginUserController = require("../src/loginUserController")

const router=express.Router()

router.post('/', LoginUserController.loginUser)


module.exports=router