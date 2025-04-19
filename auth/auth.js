import { request } from 'express'
import jwt from 'jsonwebtoken'

export const protect = (req,res,next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
}