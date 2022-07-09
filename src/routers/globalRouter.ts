import {Router} from "express"
import cardRouter from "./cardRouter.js";
const globalRouter = Router()
globalRouter.use(cardRouter)
export default globalRouter;