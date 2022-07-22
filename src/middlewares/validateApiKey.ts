import { NextFunction, Request, Response } from "express";
import {findByApiKey} from "../repositories/companyRepository.js"
export async function validateApiKey(req : Request,res : Response,next : NextFunction){
        const apiKey = req.header("Authorization")
        if(!apiKey){
                res.status(404).send("Authorization not found")
                return
        }
        const key = apiKey.replace("Bearer ","").trim()
        res.locals.key = key
        console.log(key)
        if(!key){
                return res.sendStatus(404)
        }
        const company = await findByApiKey(key)

        if(!company){
                throw {code:404, message:"Invalid api key"}
        }
        res.locals.company = company
        next()
}