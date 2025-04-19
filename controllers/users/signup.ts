import { Request, Response } from "express";
import { pool } from "../../db";

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
    
//     if (!username || !email || !password) {
//       throw new Error('Please fill all fields');
//     }

//     // Create table if not exists
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS users (
//         user_id SERIAL PRIMARY KEY,
//         username VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL UNIQUE,
//         password VARCHAR(255) NOT NULL
//       )
//     `;
//     await pool.query(createTableQuery);

//     // Check if user already exists
//     const userCheck = await pool.query(
//       `SELECT * FROM users WHERE email = $1`, 
//       [email]
//     );

//     if (userCheck.rows.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     // Insert new user
//     const insertQuery = `
//       INSERT INTO users (username, email, password)
//       VALUES ($1, $2, $3)
//       RETURNING *
//     `;
//     const result = await pool.query(insertQuery, [username, email, password]);

//     return res.status(201).json({
//       success: true,
//       message: 'User created successfully',
//       data: result.rows[0]  // returning the newly created user
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error:", error.message);
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred",
//         error: error.message,
//       });
//     }
//   }
// };

export const registerUser = async (req:Request,res:Response) => {
      const { username, email, password } = req.body;
      try {
        !username || !email || !password ? res.status(500).json({message:"all fields are required"}) : null
        const tableQuery = `CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL NOT NULL PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL)`
          await pool.query(tableQuery)
        const userCheck = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
        // console.log(userCheck.rows)
        if(userCheck.rows.length > 0){
           res.status(400).json({
            success:false,
            message:'user already exists',
            data:null
          })
        }
        const insertQuery = `INSERT INTO users (username,email,password) 
        VALUES ($1,$2,$3)`
        const insert = await pool.query(insertQuery,[username,email,password])

        res.status(201).json({
          success:true,
          message:'user created successfully',
          data:null
        })
      } catch (error) {
        if(error instanceof Error){
          console.log(error)
          res.status(500).json({
            success:false,
            message:'an error occurred',
            data:error.message
          })
        }
      }
}