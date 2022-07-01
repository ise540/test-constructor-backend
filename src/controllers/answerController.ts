import type { NextFunction } from "express";

class AnwerController {
  async sendAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (e) {
      next(e);
    }
  }

  async getAnwers(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (e) {
      next(e);
    }
  }
}

export default new AnwerController();