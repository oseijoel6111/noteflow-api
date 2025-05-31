import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { errorResponse,logger } from '../utils'
import { StatusCodes } from 'http-status-codes'


export const validate = (schema: ZodSchema, schemaType: 'body' | 'params' | 'query' = 'body') => {
   return (req: Request, res: Response, next: NextFunction):void => {
        try {
            logger.info({ message: 'Validating request', body: req.body, query: req.query, params: req.params })
            switch (schemaType) {
                case 'body':
                    req.body = schema.parse(req.body)
                    break
                case 'params':
                    req.params = schema.parse(req.params)
                    break
                case 'query':
                    req.query = schema.parse(req.query)
                    break
                default:
                    throw new Error('Invalid schema type')
            }
            next()
        } catch (error: any) {
            errorResponse(res, StatusCodes.BAD_REQUEST, 'Validation failed', error)
        }

    }

}