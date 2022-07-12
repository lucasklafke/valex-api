import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import globalRouter from "./src/routers/globalRouter.js";
import cors from "cors";
var app = express();
dotenv.config();
var port = process.env.PORT || 5000;
app.use(json());
app.use(cors());
app.use(globalRouter);
// app.use(errorHandler)
app.listen(port);
