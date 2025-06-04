import { NextFunction, Request, Response } from 'express';
import { findUserByEmail, createUser } from '../services'
import { generateHash, logger, errorResponse, successResponse, generateCode } from '../utils'
import { StatusCodes } from 'http-status-codes'
import { sendVerificationEmail } from '../mails/mailer.service';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //    determine if user already exist
        const existingUser = await findUserByEmail(req.body.email);
        if (existingUser) successResponse(res, StatusCodes.BAD_REQUEST, 'User already exists', { email: 'Email already registered' });

        // hash password
        const hashPassword = await generateHash(req.body.password)
        req.body.password = hashPassword;

        // generate verification code
        const verificationCode = generateCode();
        logger.info({ message: 'Generated verification code', code: verificationCode });

        req.body.verificationCode = verificationCode;

        // save user to database
        const user = await createUser(req.body)
        if (!user) errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'User creation failed', {});

        // remove sensitive data from response
        delete req.body.password;
        delete req.body.verificationCode;

        // send verification code to user email
        // Note: In a real application, you would send the verification code via email.
        logger.info({ message: 'Sending verification code to user email', email: req.body.email, code: verificationCode });

        const mailResponse = await sendVerificationEmail(req.body.email, verificationCode)
        logger.info({ message: 'Verification email sent', response: mailResponse });
        successResponse(res, StatusCodes.CREATED, 'User created successfully. A verification code has been sent to your email.', { user: req.body });

    } catch (error) {
        errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred while signing up', { error });
    }
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