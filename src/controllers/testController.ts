import type { NextFunction, Request, Response } from 'express';
import TestService from '../services/testService';

class TestController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, questions } = req.body;
      const user = req.user;
      const test = await TestService.create(title, questions, user.id);
      return res.json(test);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const tests = await TestService.getAll(user.id)
      return res.json(tests)
    } catch (e) {
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
        const testId = req.params.id
        const user = req.user;
        const test = await TestService.getById(testId, user.id)
        return res.json(test)
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
        const {id, ...data} = req.body;
        const user = req.user;
        const updatedTest = await TestService.update(id, user.id, data)
        return res.json(updatedTest)
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
        const testId = req.params.id;
        const user = req.user;
        const deletedTest = await TestService.delete(testId, user.id);
        return res.json(deletedTest)
    } catch (e) {
      next(e);
    }
  }

  async getAllComplited(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async getComplitedById(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

export default new TestController();
