import type { NextFunction,Request,Response } from "express";
import { logger } from "../utils/logger.js";


export const request_logger=(req:Request,res:Response,next:NextFunction)=>{
    const start =Date.now()
    res.on("finish",()=>{
        const duration = Date.now()-start
        logger.info(`[${req.method}] {${res.statusCode}} - ${duration}ms - IP: ${req.ip} || ${req.originalUrl}`)
    })
    next()
}