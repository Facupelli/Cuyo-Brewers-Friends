const americanIPA = require("./americanIPA.js");
const englishIPA = require("./englishIPA.js");
const sessionIPA = require("../recipes/sessionIPA.js");
const porter = require("../recipes/porter.js");
const creamStout = require("../recipes/creamStout.js");
const bock = require("../recipes/bock.js");
const brownIPA = require("../recipes/brownIPA.js");


const recipeModel = require("../../models/recipe");

const recipesMock = [
  ...americanIPA,
  ...englishIPA,
  ...sessionIPA,
  ...bock,
  ...creamStout,
  ...porter,
  ...brownIPA,
];

const loadRecipes = () => recipeModel.insertMany(recipesMock);

module.exports = { loadRecipes };
