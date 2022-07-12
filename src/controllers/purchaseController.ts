import {Request,Response,} from "express"
import * as purchaseService from "../services/purchaseService.js"
export default async function purchase(req : Request,res : Response) {
        const {cardId, password, amount, businessId} : {cardId : number, password: string, amount: number, businessId: number} = req.body
        try{
                await purchaseService.purchase(cardId, password, amount, businessId)
                res.status(200).send("purchase")
        }catch(err){
                err.code ? res.status(err.code).send(err.message) : res.sendStatus(500)
        }
                
}