const americanIPA = require("./americanIPA.js");
const englishIPA = require("./englishIPA.js");
const sessionIPA = require("../recipes/sessionIPA.js");
const recipeModel = require("../../models/recipe");

const recipesMock = [...americanIPA, ...englishIPA, ...sessionIPA];

const loadRecipes = () => recipeModel.insertMany(recipesMock);

module.exports = { loadRecipes };
