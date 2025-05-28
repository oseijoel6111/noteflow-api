import { Request, Response } from 'express';
import logger from '../utils/logger';

export const signUp = (req:Request, res:Response)=>{

    const userResponse = {
        status: 'success',
        message: 'User created successfully',
        data: {
            user: req.body
        },
        token : '1234567890abcdefg'
    }
    res.json(userResponse);
}

export const login = (req:Request, res:Response)=>{
    const userResponse = {
        status: 'success',
        message: 'User logged in successfully',
        data: {
            user: req.body
        },
        token : '1234567890abcdefloging'
    }
    res.json(userResponse);
}