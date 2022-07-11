import {Request, Response, NextFunction} from "express"
import {findById} from "../repositories/cardRepository.js"
import dayjs from "dayjs"
export async function validateCardCanBeActivated(req : Request, res : Response, next : NextFunction){
        console.log("uie")
        const {id} : {id : number } = req.body
        const card = await findById(id)
        console.log("salve",card)
        if(!card){
                throw {code:404, message:"Card not found"}
        }
        if(card.password){
                    throw {code:409, message:"Card already activated"}
        }
        if(card.expirationDate < dayjs().format("MM-YY")){
                throw {code:409, message:"Card expired"}
        }
        if(card.isBlocked === false){
                    throw {code:409, message:"Card already activated"}
        }
        next()
}