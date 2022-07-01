import { UserAnswer } from '../models/UserAnswer';

class AnswerService {
  async sendAnswer(userId: string, testId: string, answerId: string, value: string) {
    const answer = await UserAnswer.create({ userId, testId, answerId, value });
    return answer;
  }

 async getAllAnswers(userId:string, testId:string) {
    const answerList = await UserAnswer.findAll({where:{testId, userId}})
    return answerList;
 }

}

export default new AnswerService();
