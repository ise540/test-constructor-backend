import type { NextFunction, Request, Response } from 'express';
import answerService from '../services/answerService';

class AnwerController {
  async sendAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const { testId, value} = req.body;
      const answerId = req.params.answerId;
      const userId = req.user.id;
      const answer = await answerService.sendAnswer(userId, testId, answerId, value);
      return res.json(answer);
    } catch (e) {
      next(e);
    }
  }

  async getTestAnwers(req: Request, res: Response, next: NextFunction) {
    try {
      const testId = req.params.testId;
      const userId = req.user.id;
      const answerList = await answerService.getAllAnswers(userId, testId);
      return res.json(answerList);
    } catch (e) {
      next(e);
    }
  }

  async submitAnswers(req: Request, res: Response, next: NextFunction) {
    try {
      const { testId } = req.body;
      const userId = req.user.id;
      const answerList = await answerService.submit(userId, testId);
      return res.json(answerList);
    } catch (e) {
      next(e);
    }
  }
}

export default new AnwerController();
