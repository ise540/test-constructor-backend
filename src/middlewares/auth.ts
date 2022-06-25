import type { NextFunction, Request, Response } from 'express';
import type { IncomingHttpHeaders } from 'http';
import type { UserDto } from '../dtos/userDto';
import { ApiError } from '../exeptions/apiError';
import tokenService from '../services/tokenService';

interface AuthRequest extends Request {
  headers: IncomingHttpHeaders & { authorization?: string };
  user: UserDto;
}

export default async function (req: AuthRequest, res: Response, next: NextFunction) {
  const authorizationToken = req.headers['authorization'];
  if (!authorizationToken) {
    return next(ApiError.unauthorizedError());
  }
  const accessToken = authorizationToken.split(' ')[1];
  if (!accessToken) {
    return next(ApiError.unauthorizedError());
  }
  const userData = (await tokenService.validateAccessToken(accessToken)) as any;
  if (!userData) return next(ApiError.notFound('User'));

  req.user = userData;
  next();
}
