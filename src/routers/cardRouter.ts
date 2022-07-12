import {Router} from "express"
import { createCard , activateCard, blockCard, unblockCard, rechargeCard, getBalance} from "../controllers/cardController.js"
import  schemaValidator  from "../middlewares/schemaValidator.js"
import { validateApiKey } from "../middlewares/validateApiKey.js"
import { validateCardCanBeActivated } from "../middlewares/validateCardCanBeActivated.js"
import  blockOrUnblockValidator  from "../middlewares/blockOrUnblockValidator.js"
import {createCardSchema, activateCardSchema, blockCardSchema, rechargeSchema} from "../schemas/cardSchemas.js"

const cardRouter = Router()
cardRouter.post("/create/card",schemaValidator(createCardSchema),validateApiKey,createCard)
cardRouter.post("/activate/card",schemaValidator(activateCardSchema),validateCardCanBeActivated,activateCard)
cardRouter.post("/block/card",schemaValidator(blockCardSchema),blockOrUnblockValidator("block"),blockCard)
cardRouter.post("/unblock/card",schemaValidator(blockCardSchema),blockOrUnblockValidator("unblock"),unblockCard)
cardRouter.post("/recharge/card",schemaValidator(rechargeSchema),validateApiKey, rechargeCard)
cardRouter.get("/get/balance/:cardId",getBalance)
export default cardRouter