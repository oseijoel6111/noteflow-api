import { Request, Response } from 'express';
import { findUserByEmail } from '../services'
import { successResponse } from '../utils/response.util'

export const signUp = (req: Request, res: Response) => {

    //    determine if user already exist
    const existingUser = findUserByEmail(req.body.email);
    if (!existingUser) return successResponse(res, 400, 'User already exists', { email: 'Email already registered' });

    // hash password
    

    // save user to database

    // send verification email

    const userResponse = {
        status: 'success',
        message: 'User created successfully. A verification code has been sent to your email.',
        data: {
            user: req.body
        }
    }
    res.json(userResponse);
}

export const login = (req: Request, res: Response) => {
    const userResponse = {
        status: 'success',
        message: 'User logged in successfully',
        data: {
            user: req.body
        },
        token: '1234567890abcdefloging'
    }
    res.json(userResponse);
}