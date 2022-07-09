import express, { Request, Response , json} from "express"
import dotenv from "dotenv"
import globalRouter from "./src/routers/globalRouter.js"
import cors from "cors"
const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.use(json())
app.use(cors())
app.use(globalRouter)
app.listen(port)