import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { errorResponse } from '../utils/response.util'
import { StatusCodes } from 'http-status-codes'
import logger from '../utils/logger'


export const validate = (schema: ZodSchema) =>{
   return (req: Request, res: Response, next: NextFunction):void => {
        try {
            logger.info({ message: 'Validating request', body: req.body, query: req.query, params: req.params })
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next()
        } catch (error: any) {
            errorResponse(res, StatusCodes.BAD_REQUEST, 'Validation failed', error)
        }

    }

}