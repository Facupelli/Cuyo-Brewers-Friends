const express = require("express");
const cors = require("cors");
const router = require("./src/routes.js");
const dashboardRoutes = require('./src/dashboard')
const tokenValidation = require('./validation/tokenValidation')
const dotenv = require("dotenv");
dotenv.config();

const app = express(); //server

app.use(cors());
app.use(express.json()); //can accept json on the body of requests

app.use("/api/v1/recipes", router);
//route protected with token
app.use("/dashboard", tokenValidation, dashboardRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;
