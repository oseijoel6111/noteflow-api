import express from 'express';
import {signUp, login} from '../controllers'
import { validate } from '../middlewares/validate.middleware';
import { userSignUpSchema } from '../validators/user.validator';

const userRouter = express.Router()

userRouter.post('/signup', validate(userSignUpSchema), signUp)
userRouter.post('/login', login)

export {userRouter};