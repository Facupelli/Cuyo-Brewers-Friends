import { americanIPA } from './americanIPA.js'
import { englishIPA } from './englishIPA.js'
import { sessionIPA } from '../recipes/sessionIPA.js'
import { recipes } from '../../dao/recipesDAO.js'

const recipesMock = [
    ...americanIPA,
    ...englishIPA,
    ...sessionIPA,
]

export const loadRecipes = () => recipes.insertMany(recipesMock);


