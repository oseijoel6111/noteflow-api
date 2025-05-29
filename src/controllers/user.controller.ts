import { Request, Response } from 'express';


export const signUp = (req:Request, res:Response)=>{

    const userResponse = {
        status: 'success',
        message: 'User created successfully. A verification code has been sent to your email.',
        data: {
            user: req.body
        }
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