import { StatusCodes } from 'http-status-codes'
import { Response } from 'express'

/**
 * Utility functions for sending standardized responses in Express applications.
 * 
 * @module responseUtil
 */
export const successResponse = (res: Response, statusCode: StatusCodes, message: string,
    data: any = {}, token?: string) => {

    const response: any = {
        status: 'success',
        message,
        data,
    }
    if (token) response.token = token;

    return res.status(statusCode).json(response);
}


export const errorResponse = (res: Response, statusCode: StatusCodes, message: string,
    errors:any = {}) => {
    const response: any = {
        status: 'error',
        message,
        errors : errors?.errors || errors
    }

    return res.status(statusCode).json(response);
}   