import express from "express";
import cors from "cors";
import recipes from "./src/recipes.route.js";

const app = express(); //server

app.use(cors());
app.use(express.json()); //can accept json on the body of requests

app.use("/api/v1/recipes", recipes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
