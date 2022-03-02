const express=require("express")
const ProductsController = require("../src/productsController.js")

const router=express.Router()

router.get('/', ProductsController.getProducts)
// router.get('/:id', RecipesController.getRecipeById)

router.post('/', ProductsController.postProduct)
router.put('/', ProductsController.editProduct)


// router.delete('/', RecipesController.deleteRecipe)


module.exports=router