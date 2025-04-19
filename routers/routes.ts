import express from 'express'
export const userRouter = express.Router()
import { registerUser } from '../controllers/users/signup'
import { Login } from '../controllers/users/login'

userRouter.post('/register',registerUser)
userRouter.post('/login',Login)