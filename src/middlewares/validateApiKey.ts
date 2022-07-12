import { NextFunction, Request, Response } from "express";
import {findByApiKey} from "../repositories/companyRepository.js"
export async function validateApiKey(req : Request,res : Response,next : NextFunction){
        const key = req.headers["x-api-key"]
        if(!key){
                return res.sendStatus(409)
        }
        const company = await findByApiKey(key.toString())

        if(!company){
                throw {code:409, message:"Invalid api key"}
        }
        res.locals.company = company
        next()
}