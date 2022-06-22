import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exeptions/apiError';

export default function(error:any, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    if(error instanceof ApiError) {
        
        return res.status(error.status).json({message: error.message, error: error.errors})
    }
    
    return res.status(500).json({message: 'Unexpected Server Error', error: error.message})
}