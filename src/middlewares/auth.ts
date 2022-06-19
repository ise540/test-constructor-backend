import type { NextFunction, Request, Response } from 'express';
import type { IncomingHttpHeaders } from 'http';
import { ApiError } from '../exeptions/apiError';

interface AuthRequest extends Request {
  headers: IncomingHttpHeaders & { authorization?: string };
}

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  const authorizationToken = req.headers['authorization'];
  if(!authorizationToken) {
    return next(ApiError.unauthorizedError())
  }
}
