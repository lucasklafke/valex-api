import { Router } from "express";
import cardRouter from "./cardRouter.js";
import purchaseRouter from "./purchaseRouter.js";
var globalRouter = Router();
globalRouter.use(cardRouter);
globalRouter.use(purchaseRouter);
export default globalRouter;
