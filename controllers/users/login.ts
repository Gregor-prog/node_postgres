import { Request, Response } from "express"
import { pool } from "../../db"
import jwt from "jsonwebtoken"
// import bcryptj
export const Login = async (req:Request,res:Response) => {
    const JWT_SECRET = 'good'
    const {eemail,epassword} = req.body

    try {
    const getUserQuery = `SELECT * FROM users WHERE email = $1`
    const user = await pool.query(getUserQuery,[eemail])
    if(user.rows.length  == 0 ){
        throw new Error("credentials not correct");
    }
    console.log(user.rows)
    const userCredentials = user.rows[0]
    if(userCredentials.password != epassword){
        throw new Error("credentials not correct")
    }
    const token = jwt.sign(
        {email:userCredentials.email},
        JWT_SECRET,
        {expiresIn:'1h'}
    )
    res.cookie('token',token,{
        httpOnly:true,
        // secure:false,
        // sameSite:"strict",
        // maxAge:60 * 60 *100
    })
    res.status(200).json({
        success:true,
        message:"login successfull",
        data:{
            email:userCredentials.email,
            username:userCredentials.username
        }
    });

    } catch (error) {
        console.log(error)
        if(error){
            res.status(401).json({
                success:false,
                message:error,
                data:null
            })
        }
    }
}