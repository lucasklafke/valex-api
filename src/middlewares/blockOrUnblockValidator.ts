import { NextFunction, Request, Response } from "express";
import {findById} from "../repositories/cardRepository.js"
import dayjs from "dayjs"

export default function blockOrUnblockValidator(type : string){

  return  async (req : Request,res : Response,next : NextFunction) => { 
        const {id} : {id : number } = req.body
        const card = await findById(id)
        if(!card){
                throw {code:404, message:"Card not found"}
        }
        if(type === "block"){
                if(card.isBlocked === true){
                        throw {code:409, message:"Card already blocked"}
                }
        } 
        if(type === "unblock"){
                if(card.isBlocked === false){
                        throw {code:409, message:"Card already unblocked"}
                }
        } 
        if(card.expirationDate < dayjs().format("MM-YY")){
                throw {code:409, message:"Card expired"}
        }
        next()
  }
}