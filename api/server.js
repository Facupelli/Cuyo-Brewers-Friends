const express = require("express");
const cors = require("cors");
const dashboardRoutes = require('./src/dashboard')
const tokenValidation = require('./validation/tokenValidation')
const dotenv = require("dotenv");
dotenv.config();

const recipeRoutes = require('./routes/recipeRoutes')
const userRoutes = require('./routes/userRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')



const app = express(); //server

app.use(cors());
app.use(express.json()); //can accept json on the body of requests


app.use('/recipe', recipeRoutes)
app.use('/user', userRoutes)
app.use('/review', reviewRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)



//route protected with token
app.use("/dashboard", tokenValidation, dashboardRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;
