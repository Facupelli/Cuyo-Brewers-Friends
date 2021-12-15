const americanIPA = require("./americanIPA.js");
const englishIPA = require("./englishIPA.js");
const sessionIPA = require("../recipes/sessionIPA.js");
const recipes = require("../../dao/recipesDAO.js");

const recipesMock = [...americanIPA, ...englishIPA, ...sessionIPA];

const loadRecipes = () => recipes.insertMany(recipesMock);

module.exports = loadRecipes;
