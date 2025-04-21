import { NextFunction, Request, request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { error } from '../types'
export const protect = (req:Request,res:Response,next:NextFunction) => {
    try {
        const authHeader = req.cookies.token
        console.log(authHeader)
    if(!authHeader){
        const good:any =  new Error("user not authorized");
        good.statusCode = 401 as Number
        throw good
    }
    const decoded = jwt.verify(authHeader,"good")
    console.log(decoded)
    next()
    } catch (error:any) {
        console.log(error)
        res.status(401).json({
            success:false,
            message:error.message,
            data:null
        })
    }
}