import express, {json} from "express"
import "express-async-errors";
import dotenv from "dotenv"
import globalRouter from "./routers/globalRouter.js"
import errorHandler from "./middlewares/errorHandler.js"
import cors from "cors"
const app = express()
dotenv.config()

app.use(json())
app.use(cors())
app.use(globalRouter)
app.use(errorHandler)
export default app