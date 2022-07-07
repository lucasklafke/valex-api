import express, { Request, Response } from "express"
import dotenv from "dotenv"
const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.get("/", (req: Request,res:Response) => {
        res.send("você conseguiu guerreiro")
})
app.listen(port)