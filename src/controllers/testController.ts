import type { NextFunction, Request, Response } from 'express';
import TestService from '../services/testService';

class TestController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, questions } = req.body;
      const userId = req.user.id;
      const test = await TestService.create(title, questions, userId);
      return res.json(test);
    } catch (e) {
      next(e);
    }
  }

  async getAllTests(req: Request, res: Response, next: NextFunction) {
    try {
      const tests = await TestService.getAllTests()
      return res.json(tests)
    } catch (e) {
      next(e);
    }
  }

  async getAllUserTests(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const tests = await TestService.getAllUserTests(userId)
      return res.json(tests)
    } catch (e) {
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
        const testId = req.params.id
        const userId = req.user.id;
        const test = await TestService.getById(testId, userId)
        return res.json(test)
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
        const {id, ...data} = req.body;
        const userId = req.user.id;
        const updatedTest = await TestService.update(id, userId, data)
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
      const userId = req.user.id;
      const completedTestsList = await TestService.getAllCompletedTests(userId)
      return res.json(completedTestsList)
    } catch (e) {
      next(e);
    }
  }

  async getComplitedById(req: Request, res: Response, next: NextFunction) {
    try {
      const testId = req.params.id
      const userId = req.user.id;
      const completedTest = await TestService.getCompletedTestById(testId, userId)
      return res.json(completedTest)
    } catch (e) {
      next(e);
    }
  }

}

export default new TestController();
