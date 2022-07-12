import { Router } from "express";
import purchase from "../controllers/purchaseController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import purchaseSchema from "../schemas/purchaseSchemas.js";
var purchaseRouter = Router();
purchaseRouter.post("/purchase", schemaValidator(purchaseSchema), purchase);
export default purchaseRouter;
