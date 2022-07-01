import type { NextFunction, Request, Response } from 'express';
import answerService from '../services/answerService';

class AnwerController {
  async sendAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const { testId, answerId, value } = req.body;
      const user = req.user;
      const answer = await answerService.sendAnswer(user.id, testId, answerId, value);
      return res.json(answer);
    } catch (e) {
      next(e);
    }
  }

  async getAnwers(req: Request, res: Response, next: NextFunction) {
    try {
      const testId = req.params.testId;
      const userId = req.user.id;
      const answerList = await answerService.getAllAnswers(userId, testId);
      return res.json(answerList);
    } catch (e) {
      next(e);
    }
  }
}

export default new AnwerController();
