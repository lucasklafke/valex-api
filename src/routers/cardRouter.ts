import {Router} from "express"
import { createCard , activateCard} from "../controllers/cardController.js"
import  schemaValidator  from "../middlewares/schemaValidator.js"
import { validateApiKey } from "../middlewares/validateApiKey.js"
import { validateCardCanBeActivated } from "../middlewares/validateCardCanBeActivated.js"
import {createCardSchema, activateCardSchema} from "../schemas/CardSchemas.js"
const cardRouter = Router()

cardRouter.post("/create/card",schemaValidator(createCardSchema),validateApiKey,createCard)
cardRouter.post("/activate/card",validateCardCanBeActivated,schemaValidator(activateCardSchema),validateApiKey,activateCard)
export default cardRouter