import express from 'express'
import {Request,Response} from 'express'
const port = 4500
import dotenv from 'dotenv'
dotenv.config()
import pg from 'node-postgres'
import { pool } from './db'
import { userRouter } from './routers/routes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
pool.connect().then((client) => {
    console.log('Connected to the database')
    client.release();
}).catch((err) => {
    console.error('Error connecting to the database', err.stack)
})

app.use('/user',userRouter)

// app.get('/',async (req,res:Response) => {
//         const data = pool.query('SELECT * FROM testproducts',(err,result) => {
//             if(err){
//                 console.log('Error fetching products',err.message)
//             }

//             res.status(200).json({
//                 success:true,
//                 message:'your little beach boy fucking loves you',
//                 data:result.rows
//             })
//         })
    
// })

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})