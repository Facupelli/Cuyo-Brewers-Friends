import express from "express";
import cors from "cors";
import restaurants from "./src/restaurants.route.js";

const app = express(); //server

app.use(cors());
app.use(express.json()); //can accept json on the body of requests

app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
