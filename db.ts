import { Pool } from "pg"; 
export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABSE,
    password: process.env.PASSWORD,
    port: Number(process.env.PORT)
})
