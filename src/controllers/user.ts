import type { NextFunction, Request, Response } from 'express';
import UserService  from '../services/user';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body;
      const userData = await UserService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge:2592000000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();