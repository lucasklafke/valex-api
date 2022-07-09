import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response){
        const key = req.headers["x-api-key"].toString();
        const {cpf, type} : {cpf : String, type: String} = req.body

        try{
                await cardService.createCard(key)

        }catch(err){
                res.send(500)
        }
}