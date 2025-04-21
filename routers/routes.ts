import express from 'express'
export const userRouter = express.Router()
import { registerUser } from '../controllers/users/signup'
import { Login } from '../controllers/users/login'
import { getUsers } from '../controllers/users/getUsers'
import { protect } from '../auth/auth'

userRouter.post('/register',registerUser)
userRouter.post('/login',Login)

// protected routes
userRouter.get("/getUsers",protect,getUsers)