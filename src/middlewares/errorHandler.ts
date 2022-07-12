import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
export default async function errorHandler(error : any,req : Request,res : Response,next : NextFunction){
        console.log("errorHandler",error)
        // res.status(500).send(error["message"])
        res.status(500).send("Internal server error")
        // res.status(500).send(error["message"])
        next(error);
}