import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"
import { TransactionTypes } from "../repositories/cardRepository.js";
export async function createCard(req: Request, res: Response){
        const key = req.headers["x-api-key"].toString();
        const {id, type, } : {id : number, type: TransactionTypes, } = req.body
        try{
                await cardService.createCard(key, id, type)
                res.status(201).send("Card created")
        }catch(err){
                err.code ? res.status(err.code).send(err.message) : res.status(500).send("Internal server error")
        }
}

export async function activateCard(req: Request, res: Response){
        const {id, password, cvv} : {id : number, password: string, cvv: string, } = req.body
        try{
                await cardService.activateCard(id, password, cvv)
                res.status(200).send("Card activated")
        }catch(err){
                err.code ? res.status(err.code).send(err.message) : res.status(500).send("Internal server error")
        }
}