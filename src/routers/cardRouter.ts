import {Router} from "express"
import { createCard } from "../controllers/cardController.js"
import  schemaValidator  from "../middlewares/schemaValidator.js"
import { validateApiKey } from "../middlewares/validateApiKey.js"
import createCardSchema from "../Schemas/createCardSchema.js"
const cardRouter = Router()

cardRouter.post("/create/card",schemaValidator(createCardSchema),validateApiKey,createCard)
export default cardRouter