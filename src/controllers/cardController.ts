import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"
import { TransactionTypes } from "../repositories/cardRepository.js";
export async function createCard(req: Request, res: Response){
        const key = req.headers["x-api-key"].toString();
        const {id, type} : {id : number, type: TransactionTypes} = req.body

        try{
                await cardService.createCard(key,id,type)

        }catch(err){
                res.send(500)
        }
}