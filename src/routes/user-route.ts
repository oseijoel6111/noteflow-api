import express from 'express';
import {signUp, login} from '../controllers'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)

export {userRouter};