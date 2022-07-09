import { NextFunction, Request, Response } from "express";
import {findByApiKey} from "../repositories/companyRepository.js"
export async function validateApiKey(req : Request,res : Response,next : NextFunction){
        const key = req.headers["x-api-key"].toString();
        if(!key){
                return res.sendStatus(409)
        }
        const company = await findByApiKey(key)

        if(!company){
                return res.sendStatus(404)
        }
        next()
}