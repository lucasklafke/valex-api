import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default async function errorHandler(error : ErrorRequestHandler,req : Request,res : Response,next : NextFunction){
        console.log("errorHandler")
        res.status(500).send(error["message"])
}