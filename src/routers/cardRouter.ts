import {Router} from "express"
import { createCard , activateCard, blockCard, unblockCard, rechargeCard} from "../controllers/cardController.js"
import  schemaValidator  from "../middlewares/schemaValidator.js"
import { validateApiKey } from "../middlewares/validateApiKey.js"
import { validateCardCanBeActivated } from "../middlewares/validateCardCanBeActivated.js"
import  blockOrUnblockValidator  from "../middlewares/blockOrUnblockValidator.js"
import {createCardSchema, activateCardSchema, blockCardSchema, rechargeSchema} from "../schemas/cardSchemas.js"

const cardRouter = Router()

cardRouter.post("/create/card",schemaValidator(createCardSchema),validateApiKey,createCard)
cardRouter.post("/activate/card",validateCardCanBeActivated,schemaValidator(activateCardSchema),activateCard)
cardRouter.post("/block/card",blockOrUnblockValidator("block"),schemaValidator(blockCardSchema),blockCard)
cardRouter.post("/unblock/card",blockOrUnblockValidator("unblock"),schemaValidator(blockCardSchema),unblockCard)
cardRouter.post("/recharge/card",schemaValidator(rechargeSchema),validateApiKey, rechargeCard)
export default cardRouter