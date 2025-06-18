import express from 'express';
import {signUp, login, resendVerificationCode} from '../controllers'
import { validate } from '../middlewares/validate.middleware';
import { userSignUpSchema, userVerificationSchema } from '../validators/user.validator';

const userRouter = express.Router()

userRouter.post('/signup', validate(userSignUpSchema, 'body'), signUp);
userRouter.post('/resend-verify-email', validate(userVerificationSchema), resendVerificationCode)
userRouter.post('/login', login)

export {userRouter};