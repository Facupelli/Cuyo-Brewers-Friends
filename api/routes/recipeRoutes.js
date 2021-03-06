const express=require("express")
const RecipesController = require("../src/recipesController.js")

const router=express.Router()

router.get('/', RecipesController.getRecipes)
router.get('/:id', RecipesController.getRecipeById)

router.post('/', RecipesController.postRecipe)

router.delete('/', RecipesController.deleteRecipe)


module.exports=router