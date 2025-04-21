import { Request, Response } from "express"
import { pool } from "../../db"
type error = {
    statusCode:number,
    message:string
}
export const getUsers = async (req:Request,res:Response) => {
    try {
        const query = `SELECT * FROM users`
        const users = await pool.query(query)
        if(users.rows.length == 0){
            const error = new Error("good") as any
            error.statusCode(401)
            throw error
        }
        res.status(200).json({
            success:true,
            message:"users fetched successfully",
            data:users.rows
        })
    } catch (error:any) {
        console.log(error)
        res.status(error.statusCode || 500).json({
            succes:false,
            message:error.message || 'server error',
            data:null
        })
    }
}